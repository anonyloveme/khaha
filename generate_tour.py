import argparse
import json
import math
import re
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parent

GPS_FILE = ROOT / 'gps_data.json'
WEB_DIR = ROOT / 'web'

OUTPUT_TOUR = WEB_DIR / 'tour.json'
OUTPUT_OVERRIDES_TEMPLATE = WEB_DIR / 'hotspot-overrides.template.js'
OUTPUT_OVERRIDES_LIVE = WEB_DIR / 'hotspot-overrides.js'

# Panorama / tiles config
PANORAMA_WIDTH = 14400
PANORAMA_HEIGHT = 7200
PANORAMA_COLS = 16
PANORAMA_ROWS = 8

# Asset path from web/
PREVIEW_URL_PATTERN = '../preview/{scene_id}.jpg'
TILE_URL_PATTERN = '../tiles/{scene_id}/tile_{col}_{row}.jpg'
THUMB_URL_PATTERN = 'thumbs/{scene_id}.jpg'

# Linking heuristics
DIST_MIN_SAME_SPOT = 10.0
DIST_LINK_MAX = 800.0


SCENE_NAME_FALLBACK = {
    'scene_01': 'Ngã ba keo úc',
    'scene_02': 'Ngã 3 rừng thông',
    'scene_03': 'Ngã 4 KonBrung',
    'scene_04': 'Ngã 3 vườn thực vật',
    'scene_05': 'Chòi canh lửa (góc 2)',
    'scene_06': 'Chòi canh lửa',
    'scene_07': 'Mốc tọa độ Quốc gia (góc 2)',
    'scene_08': 'Mốc tọa độ Quốc gia',
    'scene_09': 'Suối - Vườn thực vật (góc 2)',
    'scene_10': 'Suối - Vườn thực vật',
    'scene_11': 'Ngã 3 rừng thông - VTV (góc 2)',
    'scene_12': 'Ngã 3 rừng thông - VTV',
    'scene_13': 'Nhà hành chính (góc 2)',
    'scene_14': 'Nhà hành chính (góc 3)',
    'scene_15': 'Nhà hành chính Trung tâm',
    'scene_16': 'Ngã 3 rừng trắc (góc 2)',
    'scene_17': 'Ngã 3 rừng trắc',
    'scene_18': 'Đỉnh 1032m (góc 2)',
    'scene_19': 'Đỉnh 1032m',
    'scene_20': 'Ruộng lúa',
    'scene_21': 'Khu dân cư vùng đệm',
    'scene_22': 'Giọt nước làng (góc 2)',
    'scene_23': 'Giọt nước làng',
    'scene_24': 'Cổng Trung tâm (góc 2)',
    'scene_25': 'Cổng Trung tâm (góc 3)',
    'scene_26': 'Cổng Trung tâm',
    'scene_27': 'Bổ sung 01',
    'scene_28': 'Bổ sung 02',
    'scene_29': 'Bổ sung 03',
    'scene_30': 'Bổ sung 04',
}


def _to_float(value):
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        text = value.strip()
        if not text:
            return None
        if ',' in text and '.' not in text:
            text = text.replace(',', '.')
        try:
            return float(text)
        except ValueError:
            return None
    return None


def _pick_first(obj, keys):
    if not isinstance(obj, dict):
        return None
    for key in keys:
        if key in obj and obj[key] not in (None, ''):
            return obj[key]
    return None


def _normalize_scene_id(raw_scene_id, fallback_index=None):
    if raw_scene_id is None:
        if fallback_index is None:
            return None
        return f'scene_{fallback_index:02d}'

    text = str(raw_scene_id).strip()
    if not text:
        if fallback_index is None:
            return None
        return f'scene_{fallback_index:02d}'

    match = re.search(r'(\d+)', text)
    if match:
        return f"scene_{int(match.group(1)):02d}"
    return text


def _extract_lat_lng(record):
    lat = _to_float(_pick_first(record, ['lat', 'latitude', 'Latitude', 'GPSLatitude']))
    lng = _to_float(_pick_first(record, ['lng', 'lon', 'long', 'longitude', 'Longitude', 'GPSLongitude']))

    if lat is not None and lng is not None:
        return lat, lng

    nested_keys = ['gps', 'coords', 'location']
    for key in nested_keys:
        nested = record.get(key)

        if isinstance(nested, dict):
            n_lat, n_lng = _extract_lat_lng(nested)
            if n_lat is not None and n_lng is not None:
                return n_lat, n_lng

        if isinstance(nested, list):
            if len(nested) >= 2:
                a = _to_float(nested[0])
                b = _to_float(nested[1])
                if a is not None and b is not None:
                    if -90 <= a <= 90 and -180 <= b <= 180:
                        return a, b
                    if -90 <= b <= 90 and -180 <= a <= 180:
                        return b, a

            for item in nested:
                if isinstance(item, dict):
                    n_lat, n_lng = _extract_lat_lng(item)
                    if n_lat is not None and n_lng is not None:
                        return n_lat, n_lng

    if isinstance(record.get('gps'), list) and len(record['gps']) >= 2:
        a = _to_float(record['gps'][0])
        b = _to_float(record['gps'][1])
        if a is not None and b is not None:
            if -90 <= a <= 90 and -180 <= b <= 180:
                return a, b
            if -90 <= b <= 90 and -180 <= a <= 180:
                return b, a

    return None, None


def _extract_name(record):
    raw = _pick_first(record, ['name', 'title', 'label', 'display_name'])
    if raw is None:
        return None
    text = str(raw).strip()
    return text if text else None


def normalize_gps_data(raw):
    """
    Normalize multi-format input to:
    {
      "scene_01": { "lat": 14.0, "lng": 108.0, "name": "..." }
    }
    """
    normalized = {}

    if isinstance(raw, dict):
        iterable = list(raw.items())
    elif isinstance(raw, list):
        iterable = []
        for idx, item in enumerate(raw, start=1):
            if not isinstance(item, dict):
                continue
            scene_id = _pick_first(item, ['id', 'scene_id', 'scene', 'filename', 'key', 'code'])
            iterable.append((_normalize_scene_id(scene_id, idx), item))
    else:
        raise ValueError('gps_data.json must be an object or an array')

    for idx, (scene_id_raw, payload) in enumerate(iterable, start=1):
        scene_id = _normalize_scene_id(scene_id_raw, idx)
        if not scene_id:
            continue

        if isinstance(payload, list):
            lat = _to_float(payload[0]) if len(payload) > 0 else None
            lng = _to_float(payload[1]) if len(payload) > 1 else None
            name = None
        elif isinstance(payload, dict):
            lat, lng = _extract_lat_lng(payload)
            name = _extract_name(payload)
        else:
            raise ValueError(f'{scene_id}: invalid record format (must be object/list)')

        if name is None:
            name = SCENE_NAME_FALLBACK.get(scene_id, scene_id)

        normalized[scene_id] = {
            'lat': lat,
            'lng': lng,
            'name': name,
        }

    return normalized


def validate_gps_data(gps_data):
    errors = []
    if not gps_data:
        errors.append('No record could be normalized from gps_data.json')

    for scene_id, item in sorted(gps_data.items(), key=lambda kv: kv[0]):
        lat = item.get('lat')
        lng = item.get('lng')

        if lat is None or lng is None:
            errors.append(f'{scene_id}: missing lat/lng after normalization')
            continue

        if not (-90 <= lat <= 90):
            errors.append(f'{scene_id}: invalid latitude {lat}')
        if not (-180 <= lng <= 180):
            errors.append(f'{scene_id}: invalid longitude {lng}')

    if errors:
        message = 'gps_data.json validation failed:\n- ' + '\n- '.join(errors[:60])
        raise ValueError(message)


def load_gps(path):
    with path.open('r', encoding='utf-8-sig') as handle:
        raw = json.load(handle)

    normalized = normalize_gps_data(raw)
    validate_gps_data(normalized)
    return normalized


def deg_to_rad(value):
    return value * math.pi / 180.0


def rad_to_deg(value):
    return value * 180.0 / math.pi


def normalize_rad(value):
    while value <= -math.pi:
        value += math.pi * 2
    while value > math.pi:
        value -= math.pi * 2
    return value


def haversine(lat1, lng1, lat2, lng2):
    earth_radius_m = 6371000.0
    p1 = deg_to_rad(lat1)
    p2 = deg_to_rad(lat2)
    dp = deg_to_rad(lat2 - lat1)
    dl = deg_to_rad(lng2 - lng1)

    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return earth_radius_m * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def bearing_rad(lat1, lng1, lat2, lng2):
    p1 = deg_to_rad(lat1)
    p2 = deg_to_rad(lat2)
    dl = deg_to_rad(lng2 - lng1)

    y = math.sin(dl) * math.cos(p2)
    x = math.cos(p1) * math.sin(p2) - math.sin(p1) * math.cos(p2) * math.cos(dl)
    return math.atan2(y, x)


def gps_bearing_to_yaw(bearing):
    return normalize_rad((math.pi / 2) - bearing)


def guess_pitch_by_distance(distance_m):
    if distance_m < 40:
        return deg_to_rad(-28)
    if distance_m < 100:
        return deg_to_rad(-24)
    if distance_m < 200:
        return deg_to_rad(-20)
    if distance_m < 400:
        return deg_to_rad(-16)
    if distance_m < 800:
        return deg_to_rad(-12)
    return deg_to_rad(-10)


def spherical_to_texture(yaw, pitch, pano_width, pano_height):
    texture_x = ((normalize_rad(yaw) + math.pi) / (math.pi * 2)) * pano_width
    texture_y = ((math.pi / 2 - pitch) / math.pi) * pano_height
    return int(round(texture_x)), int(round(texture_y))


def scene_sort_key(scene_id):
    text = str(scene_id)
    if text.startswith('scene_'):
        try:
            return (0, int(text.split('_')[1]))
        except Exception:
            return (0, text)
    return (1, text)


def _build_link_payload(source_id, target_id, gps_data, distance):
    source = gps_data[source_id]
    target = gps_data[target_id]

    bearing = bearing_rad(source['lat'], source['lng'], target['lat'], target['lng'])
    yaw = gps_bearing_to_yaw(bearing)
    pitch = guess_pitch_by_distance(distance)
    texture_x, texture_y = spherical_to_texture(yaw, pitch, PANORAMA_WIDTH, PANORAMA_HEIGHT)

    return {
        'nodeId': target_id,
        'name': target.get('name', target_id),
        'distance_m': round(distance, 1),
        'bearing_deg': round(rad_to_deg(bearing), 3),
        'position': {
            'yaw': round(yaw, 6),
            'pitch': round(pitch, 6),
            'textureX': texture_x,
            'textureY': texture_y,
        },
    }


def compute_links(gps_data):
    scene_ids = sorted(gps_data.keys(), key=scene_sort_key)
    links = defaultdict(list)
    duplicates = defaultdict(list)
    pair_distances = {}

    for i, a_id in enumerate(scene_ids):
        a = gps_data[a_id]
        for b_id in scene_ids[i + 1:]:
            b = gps_data[b_id]
            dist = haversine(a['lat'], a['lng'], b['lat'], b['lng'])
            pair_distances[(a_id, b_id)] = dist
            pair_distances[(b_id, a_id)] = dist

            if dist < DIST_MIN_SAME_SPOT:
                duplicates[a_id].append(b_id)
                duplicates[b_id].append(a_id)
                continue

            if dist <= DIST_LINK_MAX:
                links[a_id].append(_build_link_payload(a_id, b_id, gps_data, dist))
                links[b_id].append(_build_link_payload(b_id, a_id, gps_data, dist))

    # Guarantee each scene has at least one outbound link
    for scene_id in scene_ids:
        if links.get(scene_id):
            continue
        nearest_scene = None
        nearest_distance = float('inf')

        for other_id in scene_ids:
            if other_id == scene_id:
                continue
            dist = pair_distances.get((scene_id, other_id))
            if dist is None:
                continue
            if dist < nearest_distance:
                nearest_distance = dist
                nearest_scene = other_id

        if nearest_scene is not None and math.isfinite(nearest_distance):
            links[scene_id].append(_build_link_payload(scene_id, nearest_scene, gps_data, nearest_distance))

            # Keep connectivity symmetric if opposite link is missing.
            if not any(item['nodeId'] == scene_id for item in links[nearest_scene]):
                links[nearest_scene].append(
                    _build_link_payload(nearest_scene, scene_id, gps_data, nearest_distance)
                )

    for scene_id in scene_ids:
        links[scene_id].sort(key=lambda item: (item['distance_m'], scene_sort_key(item['nodeId'])))
        duplicates[scene_id].sort(key=scene_sort_key)

    return links, duplicates


def classify_scene_modes(scene_ids, links, duplicates):
    """Conservative overview split: roughly 25-30% of scenes."""
    total = len(scene_ids)
    if total == 0:
        return set(), {}

    min_overview = max(1, math.ceil(total * 0.25))
    max_overview = max(min_overview, math.ceil(total * 0.30))
    target_count = min_overview

    ranking = []
    metrics = {}

    for scene_id in scene_ids:
        scene_links = links.get(scene_id, [])
        degree = len(scene_links)
        mean_distance = (
            sum(item['distance_m'] for item in scene_links) / degree if degree else DIST_LINK_MAX * 2
        )
        nearest_distance = scene_links[0]['distance_m'] if degree else DIST_LINK_MAX * 2
        duplicate_count = len(duplicates.get(scene_id, []))

        # Positive: graph-central + long-view capability
        # Negative: dense duplicates around same physical spot
        score = degree * 1.9 + (mean_distance / 230.0) - duplicate_count * 2.2
        if degree <= 1:
            score -= 1.8

        metrics[scene_id] = {
            'degree': degree,
            'mean_distance': round(mean_distance, 1),
            'nearest_distance': round(nearest_distance, 1),
            'duplicates': duplicate_count,
            'score': round(score, 3),
        }
        ranking.append((score, scene_id))

    ranking.sort(key=lambda item: (-item[0], scene_sort_key(item[1])))
    overview = {scene_id for _, scene_id in ranking[:target_count]}

    # Prefer the first scene in overview for a good entry scene.
    first_scene = scene_ids[0]
    overview.add(first_scene)

    # Keep count in 25-30% band where possible.
    if len(overview) > max_overview:
        removable = [scene for _, scene in reversed(ranking) if scene in overview and scene != first_scene]
        for scene_id in removable:
            if len(overview) <= max_overview:
                break
            overview.remove(scene_id)

    return overview, metrics


def choose_focus(scene_links, mode):
    if not scene_links:
        return {'targetYawDeg': 0, 'targetPitchDeg': -12, 'targetZoom': 52}

    if mode == 'overview':
        sample = scene_links[: min(6, len(scene_links))]
        yaw_values = [item['position']['yaw'] for item in sample]
        x = sum(math.cos(yaw) for yaw in yaw_values)
        y = sum(math.sin(yaw) for yaw in yaw_values)
        focus_yaw = math.atan2(y, x) if (x or y) else 0.0
        return {
            'targetYawDeg': round(rad_to_deg(focus_yaw), 1),
            'targetPitchDeg': -9,
            'targetZoom': 50,
        }

    nearest = scene_links[0]
    return {
        'targetYawDeg': round(rad_to_deg(nearest['position']['yaw']), 1),
        'targetPitchDeg': round(rad_to_deg(nearest['position']['pitch']), 1),
        'targetZoom': 54,
    }


def generate_tour_json(scene_ids, gps_data, links):
    nodes = []

    for scene_id in scene_ids:
        node_links = []
        for item in links.get(scene_id, []):
            node_links.append(
                {
                    'nodeId': item['nodeId'],
                    'name': item.get('name', item['nodeId']),
                    'distance_m': item['distance_m'],
                    'bearing_deg': item['bearing_deg'],
                    'position': item['position'],
                }
            )

        node = {
            'id': scene_id,
            'name': gps_data[scene_id].get('name', scene_id),
            'thumbnail': THUMB_URL_PATTERN.format(scene_id=scene_id),
            'panorama': {
                'width': PANORAMA_WIDTH,
                'cols': PANORAMA_COLS,
                'rows': PANORAMA_ROWS,
                'baseUrl': PREVIEW_URL_PATTERN.format(scene_id=scene_id),
                'tileUrl': TILE_URL_PATTERN.format(scene_id=scene_id, col='{col}', row='{row}'),
            },
            'links': node_links,
        }
        nodes.append(node)

    return {
        'version': 2,
        'default': {'firstNode': scene_ids[0] if scene_ids else None},
        'nodes': nodes,
    }


def js_string(value):
    return json.dumps(value, ensure_ascii=False)


def render_overrides_template(scene_ids, gps_data, links, duplicates, overview_set, metrics):
    lines = []
    lines.append('/**')
    lines.append(' * hotspot-overrides.template.js')
    lines.append(' * Auto-generated from GPS by generate_tour.py')
    lines.append(' * Seed file: fine-tune textureX/textureY in hotspot-overrides.js for final visual accuracy.')
    lines.append(' */')
    lines.append('')
    lines.append('const DEFAULT_CALIBRATION = {')
    lines.append('  bearingOffsetDeg: 0,')
    lines.append('  sphereCorrectionPanDeg: 0,')
    lines.append('  targetYawDeg: 0,')
    lines.append('  targetPitchDeg: -12,')
    lines.append('  targetZoom: 52,')
    lines.append('};')
    lines.append('')

    lines.append('export const OVERVIEW_SCENES = new Set([')
    for scene_id in sorted(overview_set, key=scene_sort_key):
        name = gps_data[scene_id].get('name', scene_id)
        meta = metrics.get(scene_id, {})
        lines.append(
            f"  {js_string(scene_id)}, // {name} | degree={meta.get('degree', 0)} | mean={meta.get('mean_distance', 0)}m | dup={meta.get('duplicates', 0)}"
        )
    lines.append(']);')
    lines.append('')
    lines.append('export function getSceneMode(sceneId) {')
    lines.append("  return OVERVIEW_SCENES.has(sceneId) ? 'overview' : 'navigation';")
    lines.append('}')
    lines.append('')

    lines.append('const CALIBRATION_SEED = {')
    for scene_id in scene_ids:
        mode = 'overview' if scene_id in overview_set else 'navigation'
        focus = choose_focus(links.get(scene_id, []), mode)
        dup = duplicates.get(scene_id, [])
        dup_comment = f" // duplicate-near: {', '.join(dup)}" if dup else ''
        lines.append(
            f"  {scene_id}: {{ bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: {focus['targetYawDeg']}, targetPitchDeg: {focus['targetPitchDeg']}, targetZoom: {focus['targetZoom']} }},{dup_comment}"
        )
    lines.append('};')
    lines.append('')
    lines.append('export const SCENE_CALIBRATION = Object.fromEntries(')
    lines.append('  Object.keys(CALIBRATION_SEED).map(sceneId => [sceneId, { ...DEFAULT_CALIBRATION, ...CALIBRATION_SEED[sceneId] }])')
    lines.append(');')
    lines.append('')

    lines.append('export const HOTSPOT_OVERRIDES = {')
    for scene_id in scene_ids:
        node_links = links.get(scene_id, [])
        if not node_links:
            continue
        mode_style = 'thumb' if scene_id in overview_set else 'arrow'
        lines.append(f'  {scene_id}: {{')
        for item in node_links:
            target_id = item['nodeId']
            target_name = gps_data[target_id].get('name', target_id)
            tx = item['position']['textureX']
            ty = item['position']['textureY']
            lines.append(
                f"    {target_id}: {{ textureX: {tx}, textureY: {ty}, style: '{mode_style}', label: {js_string(target_name)} }}, // dist={item['distance_m']}m bearing={item['bearing_deg']}deg"
            )
        lines.append('  },')
    lines.append('};')
    lines.append('')

    lines.append('export function getLinkStyle(sceneId, targetSceneId) {')
    lines.append('  const overrideStyle = HOTSPOT_OVERRIDES[sceneId]?.[targetSceneId]?.style;')
    lines.append('  if (overrideStyle) return overrideStyle;')
    lines.append("  return getSceneMode(sceneId) === 'overview' ? 'thumb' : 'arrow';")
    lines.append('}')
    lines.append('')

    return '\n'.join(lines)


def parse_args():
    parser = argparse.ArgumentParser(description='Generate tour.json and hotspot overrides from GPS data')
    parser.add_argument(
        '--write-live-overrides',
        action='store_true',
        help='Always overwrite web/hotspot-overrides.js from generated template',
    )
    return parser.parse_args()


def main():
    args = parse_args()
    gps_data = load_gps(GPS_FILE)
    scene_ids = sorted(gps_data.keys(), key=scene_sort_key)

    links, duplicates = compute_links(gps_data)
    overview_set, metrics = classify_scene_modes(scene_ids, links, duplicates)

    WEB_DIR.mkdir(parents=True, exist_ok=True)

    tour_json = generate_tour_json(scene_ids, gps_data, links)
    with OUTPUT_TOUR.open('w', encoding='utf-8') as handle:
        json.dump(tour_json, handle, ensure_ascii=False, indent=2)

    template_js = render_overrides_template(
        scene_ids=scene_ids,
        gps_data=gps_data,
        links=links,
        duplicates=duplicates,
        overview_set=overview_set,
        metrics=metrics,
    )

    with OUTPUT_OVERRIDES_TEMPLATE.open('w', encoding='utf-8') as handle:
        handle.write(template_js)

    write_live = args.write_live_overrides or not OUTPUT_OVERRIDES_LIVE.exists()
    if write_live:
        with OUTPUT_OVERRIDES_LIVE.open('w', encoding='utf-8') as handle:
            handle.write(template_js)

    print(f'Loaded {len(scene_ids)} scenes from {GPS_FILE}')
    print(f'Wrote: {OUTPUT_TOUR}')
    print(f'Wrote: {OUTPUT_OVERRIDES_TEMPLATE}')
    if write_live:
        print(f'Wrote: {OUTPUT_OVERRIDES_LIVE}')
    else:
        print(f'Skipped existing live overrides: {OUTPUT_OVERRIDES_LIVE}')

    print('Summary:')
    for scene_id in scene_ids:
        mode = 'overview' if scene_id in overview_set else 'navigation'
        m = metrics.get(scene_id, {})
        print(
            f"- {scene_id}: mode={mode}, links={len(links.get(scene_id, []))}, dup={len(duplicates.get(scene_id, []))}, score={m.get('score', 0)}"
        )


if __name__ == '__main__':
    main()
