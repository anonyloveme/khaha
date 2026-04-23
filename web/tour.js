import { Viewer } from '@photo-sphere-viewer/core';
import { EquirectangularTilesAdapter } from '@photo-sphere-viewer/equirectangular-tiles-adapter';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';
import { StereoPlugin } from '@photo-sphere-viewer/stereo-plugin';

// ✅ Import từ hotspot-overrides.js — nguồn duy nhất cho calibration & hotspot
import {
  HOTSPOT_OVERRIDES,
  SCENE_CALIBRATION,
} from './hotspot-overrides.js';

// ─────────────────────────────────────────────
// 1) GPS scene data (giữ nguyên — dùng cho tên & fallback)
// ─────────────────────────────────────────────
const GPS_DATA = {
  scene_01: { lat: 14.078641,  lng: 108.2976508, name: 'Ngã ba keo úc' },
  scene_02: { lat: 14.0760493, lng: 108.293333,  name: 'Ngã 3 rừng thông' },
  scene_03: { lat: 14.0753959, lng: 108.2905006, name: 'Ngã 4 KonBrung' },
  scene_04: { lat: 14.0708977, lng: 108.286561,  name: 'Ngã 3 vườn thực vật' },
  scene_05: { lat: 14.0671733, lng: 108.2848014, name: 'Chòi canh lửa (góc 2)' },
  scene_06: { lat: 14.0671766, lng: 108.2848839, name: 'Chòi canh lửa' },
  scene_07: { lat: 14.0652664, lng: 108.2825527, name: 'Mốc tọa độ Quốc gia (góc 2)' },
  scene_08: { lat: 14.0652621, lng: 108.2825792, name: 'Mốc tọa độ Quốc gia' },
  scene_09: { lat: 14.0679348, lng: 108.2895221, name: 'Suối - Vườn thực vật (góc 2)' },
  scene_10: { lat: 14.0679234, lng: 108.2895128, name: 'Suối - Vườn thực vật' },
  scene_11: { lat: 14.0671686, lng: 108.2915407, name: 'Ngã 3 rừng thông - VTV (góc 2)' },
  scene_12: { lat: 14.0671890, lng: 108.2915605, name: 'Ngã 3 rừng thông - VTV' },
  scene_13: { lat: 14.0630617, lng: 108.2942519, name: 'Nhà hành chính (góc 2)' },
  scene_14: { lat: 14.0630575, lng: 108.2942498, name: 'Nhà hành chính (góc 3)' },
  scene_15: { lat: 14.0630546, lng: 108.2941707, name: 'Nhà hành chính Trung tâm' },
  scene_16: { lat: 14.0659569, lng: 108.2926679, name: 'Ngã 3 rừng trắc (góc 2)' },
  scene_17: { lat: 14.0658744, lng: 108.2927392, name: 'Ngã 3 rừng trắc' },
  scene_18: { lat: 14.0792122, lng: 108.2750405, name: 'Đỉnh 1032m (góc 2)' },
  scene_19: { lat: 14.0792178, lng: 108.2750418, name: 'Đỉnh 1032m' },
  scene_20: { lat: 14.0827195, lng: 108.2960128, name: 'Ruộng lúa' },
  scene_21: { lat: 14.0839675, lng: 108.2988530, name: 'Khu dân cư vùng đệm' },
  scene_22: { lat: 14.0813856, lng: 108.2791414, name: 'Giọt nước làng (góc 2)' },
  scene_23: { lat: 14.0813862, lng: 108.2791331, name: 'Giọt nước làng' },
  scene_24: { lat: 14.0631581, lng: 108.2944796, name: 'Cổng Trung tâm (góc 2)' },
  scene_25: { lat: 14.0631491, lng: 108.2944897, name: 'Cổng Trung tâm (góc 3)' },
  scene_26: { lat: 14.0631611, lng: 108.2944806, name: 'Cổng Trung tâm' },
  scene_27: { lat: 14.0954640, lng: 108.2807396, name: 'Bổ sung 01' },
  scene_28: { lat: 14.0799531, lng: 108.2837240, name: 'Bổ sung 02' },
  scene_29: { lat: 14.0839897, lng: 108.2866149, name: 'Bổ sung 03' },
  scene_30: { lat: 14.0669598, lng: 108.2908468, name: 'Bổ sung 04' },
};

// ─────────────────────────────────────────────
// 2) Utils
// ─────────────────────────────────────────────
const TWO_PI = Math.PI * 2;

function degToRad(deg)  { return deg * Math.PI / 180; }
function normalizeRad(rad) {
  let r = rad;
  while (r <= -Math.PI) r += TWO_PI;
  while (r >   Math.PI) r -= TWO_PI;
  return r;
}
function shortestArc(from, to)  { return normalizeRad(to - from); }
function lerp(a, b, t)          { return a + (b - a) * t; }
function lerpAngle(a, b, t)     { return normalizeRad(a + shortestArc(a, b) * t); }
function easeInOutQuad(t)       { return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2; }
function sleep(ms)              { return new Promise(r => setTimeout(r, ms)); }

function escapeHtml(str = '') {
  return str
    .replaceAll('&',  '&amp;')
    .replaceAll('<',  '&lt;')
    .replaceAll('>',  '&gt;')
    .replaceAll('"',  '&quot;')
    .replaceAll("'",  '&#039;');
}

function haversine(lat1, lng1, lat2, lng2) {
  const R  = 6371000;
  const p1 = degToRad(lat1), p2 = degToRad(lat2);
  const dp = degToRad(lat2 - lat1), dl = degToRad(lng2 - lng1);
  const a  = Math.sin(dp/2)**2 + Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function bearingRad(lat1, lng1, lat2, lng2) {
  const p1 = degToRad(lat1), p2 = degToRad(lat2);
  const dl = degToRad(lng2 - lng1);
  return Math.atan2(
    Math.sin(dl) * Math.cos(p2),
    Math.cos(p1)*Math.sin(p2) - Math.sin(p1)*Math.cos(p2)*Math.cos(dl)
  );
}

function textureToSpherical(textureX, textureY, panoW, panoH) {
  const yaw   = (textureX / panoW) * TWO_PI - Math.PI;
  const pitch = Math.PI / 2 - (textureY / panoH) * Math.PI;
  return { yaw: normalizeRad(yaw), pitch };
}

function sphericalToTexture(yaw, pitch, panoW, panoH) {
  const nYaw = normalizeRad(yaw);
  let tx = ((nYaw + Math.PI) / TWO_PI) * panoW;
  if (tx < 0)    tx += panoW;
  if (tx > panoW) tx -= panoW;
  const ty = ((Math.PI / 2 - pitch) / Math.PI) * panoH;
  return { textureX: tx, textureY: ty };
}

function guessPitchByDistance(d) {
  if (d <  40) return degToRad(-28);
  if (d < 100) return degToRad(-24);
  if (d < 200) return degToRad(-20);
  if (d < 400) return degToRad(-16);
  if (d < 800) return degToRad(-12);
  return degToRad(-10);
}

function gpsBearingToYaw(fromSceneId, bearing) {
  const cal    = SCENE_CALIBRATION[fromSceneId] || {};
  const offset = degToRad(cal.bearingOffsetDeg || 0);
  return normalizeRad((Math.PI / 2) - bearing + offset);
}

function createThumbHotspotHtml(targetId, targetName) {
  const safe = escapeHtml(targetName || targetId);
  return `
    <div class="thumb-hotspot" data-node-id="${escapeHtml(targetId)}" title="${safe}">
      <img src="thumbs/${escapeHtml(targetId)}.jpg" alt="${safe}" />
    </div>
  `;
}

async function tween(duration, onTick) {
  const start = performance.now();
  return new Promise(resolve => {
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      onTick(t);
      if (t < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// ─────────────────────────────────────────────
// 3) Resolve hotspot position
//    Priority: HOTSPOT_OVERRIDES → tour.json texture
//            → tour.json yaw/pitch → GPS fallback
// ─────────────────────────────────────────────
function resolveLinkPosition(fromNode, link) {
  const pW = fromNode.panorama.width;
  const pH = pW / 2;

  // A. override
  const ov = HOTSPOT_OVERRIDES[fromNode.id]?.[link.nodeId];
  if (ov?.textureX != null && ov?.textureY != null) {
    const pos = textureToSpherical(ov.textureX, ov.textureY, pW, pH);
    return { ...pos, textureX: ov.textureX, textureY: ov.textureY, source: 'override' };
  }

  // B. tour.json textureX/Y
  const jp = link.position ?? {};
  if (jp.textureX != null && jp.textureY != null) {
    const pos = textureToSpherical(jp.textureX, jp.textureY, pW, pH);
    return { ...pos, textureX: jp.textureX, textureY: jp.textureY, source: 'tour-json-texture' };
  }

  // C. tour.json yaw/pitch
  if (jp.yaw != null && jp.pitch != null) {
    const tex = sphericalToTexture(jp.yaw, jp.pitch, pW, pH);
    return { yaw: jp.yaw, pitch: jp.pitch, ...tex, source: 'tour-json-position' };
  }
  if (link.yaw != null) {
    const pitch = link.pitch ?? degToRad(-14);
    const tex   = sphericalToTexture(link.yaw, pitch, pW, pH);
    return { yaw: link.yaw, pitch, ...tex, source: 'tour-json-yaw' };
  }

  // D. GPS fallback
  const gA = GPS_DATA[fromNode.id], gB = GPS_DATA[link.nodeId];
  if (gA && gB) {
    const dist    = haversine(gA.lat, gA.lng, gB.lat, gB.lng);
    const bearing = bearingRad(gA.lat, gA.lng, gB.lat, gB.lng);
    const yaw     = gpsBearingToYaw(fromNode.id, bearing);
    const pitch   = guessPitchByDistance(dist);
    const tex     = sphericalToTexture(yaw, pitch, pW, pH);
    return { yaw, pitch, ...tex, source: 'gps-fallback' };
  }

  // E. default
  return {
    yaw: 0, pitch: degToRad(-14),
    textureX: pW / 2, textureY: pH * 0.62,
    source: 'default-fallback',
  };
}

// ─────────────────────────────────────────────
// 4) Build nodes & markers
// ─────────────────────────────────────────────
function buildPreparedNode(rawNode) {
  const gps = GPS_DATA[rawNode.id];
  const cal = SCENE_CALIBRATION[rawNode.id] || {};

  const links = (rawNode.links || [])
    .filter(l => l.nodeId !== rawNode.id)
    .map(l => {
      const pos = resolveLinkPosition(rawNode, l);
      return {
        nodeId: l.nodeId,
        name: GPS_DATA[l.nodeId]?.name || l.name || l.nodeId,
        position: { yaw: pos.yaw, pitch: pos.pitch },
      };
    });

  return {
    id:        rawNode.id,
    name:      gps?.name || rawNode.name || rawNode.id,
    caption:   gps?.name || rawNode.name || rawNode.id,
    thumbnail: `thumbs/${rawNode.id}.jpg`,
    panorama: {
      width:   rawNode.panorama.width,
      cols:    rawNode.panorama.cols,
      rows:    rawNode.panorama.rows,
      baseUrl: rawNode.panorama.baseUrl,
      tileUrl: (col, row) =>
        rawNode.panorama.tileUrl.replace('{col}', col).replace('{row}', row),
    },
    sphereCorrection: typeof cal.sphereCorrectionPanDeg === 'number'
      ? { pan: `${cal.sphereCorrectionPanDeg}deg` }
      : undefined,
    links,
    data: {
      focusYaw:   degToRad(cal.targetYawDeg   ?? 0),
      focusPitch: degToRad(cal.targetPitchDeg ?? -12),
      focusZoom:  cal.targetZoom ?? 50,
      panoWidth:  rawNode.panorama.width,
      panoHeight: rawNode.panorama.width / 2,
    },
  };
}

function buildSceneMarkers(rawNode) {
  const pW = rawNode.panorama.width;
  const pH = pW / 2;

  return (rawNode.links || [])
    .filter(l => l.nodeId !== rawNode.id)
    .map(l => {
      const name = GPS_DATA[l.nodeId]?.name || l.name || l.nodeId;
      const pos  = resolveLinkPosition(rawNode, l);
      return {
        id:       `marker_${rawNode.id}_${l.nodeId}`,
        position: { yaw: pos.yaw, pitch: pos.pitch },
        html:     createThumbHotspotHtml(l.nodeId, name),
        anchor:   'center center',
        tooltip:  { content: name, position: 'top center' },
        data: {
          nodeId:   l.nodeId,
          source:   pos.source,
          textureX: Math.round(pos.textureX),
          textureY: Math.round(pos.textureY),
          panoWidth: pW, panoHeight: pH,
        },
      };
    });
}

function getSceneFocus(preparedNode) {
  return {
    yaw:   preparedNode?.data?.focusYaw   ?? 0,
    pitch: preparedNode?.data?.focusPitch ?? degToRad(-12),
    zoom:  preparedNode?.data?.focusZoom  ?? 50,
  };
}

// ─────────────────────────────────────────────
// 5) Init
// ─────────────────────────────────────────────
async function initTour() {
  const tourData    = await fetch('tour.json').then(r => r.json());
  const rawNodeMap  = new Map(tourData.nodes.map(n => [n.id, n]));
  const preparedNodes   = tourData.nodes.map(buildPreparedNode);
  const preparedNodeMap = new Map(preparedNodes.map(n => [n.id, n]));

  const viewer = new Viewer({
    container: document.getElementById('viewer'),
    adapter:   EquirectangularTilesAdapter,
    loadingTxt: '',
    mousemove: false, mousewheel: false, touchmoveTwoFingers: false,
    defaultPitch:   -Math.PI / 2,
    defaultYaw:      Math.PI / 2,
    defaultZoomLvl:  0,
    maxFov: 130, minFov: 30, fisheye: 2,
    defaultTransition: { speed: 1500, rotation: true, effect: 'fade' },
    plugins: [
      [GalleryPlugin,    { thumbnailSize: { width: 140, height: 80 } }],
      [MarkersPlugin,    {}],
      [VirtualTourPlugin, {
        nodes:        preparedNodes,
        startNodeId:  tourData.default?.firstNode || preparedNodes[0]?.id,
        positionMode: 'manual',
        renderMode:   '3d',
        preload:       false,
        transitionOptions: { showLoader: true, speed: '20rpm', fadeIn: true, rotation: true },
        arrowStyle:    { className: 'vt-arrow-hidden' },
      }],
      [GyroscopePlugin, { touchmove: true }],
      [StereoPlugin,    {}],
    ],
    navbar: ['zoom', 'move', 'gyroscope', 'stereo', 'fullscreen'],
  });

  const virtualTour     = viewer.getPlugin(VirtualTourPlugin);
  const markers         = viewer.getPlugin(MarkersPlugin);
  const gallery         = viewer.getPlugin(GalleryPlugin);
  const loadingOverlay  = document.getElementById('loading-overlay');
  const captionEl       = document.getElementById('scene-caption');
  const galleryToggleEl = document.getElementById('gallery-toggle');

  let introPlayed     = false;
  let isSwitchingFocus = false;

  const updateGalleryButton = () =>
    galleryToggleEl.classList.toggle('active', gallery.isVisible());

  function renderMarkersForScene(sceneId) {
    const rawNode = rawNodeMap.get(sceneId);
    if (rawNode) markers.setMarkers(buildSceneMarkers(rawNode));
  }

  async function animateToSceneFocus(sceneId) {
    if (isSwitchingFocus) return;
    const focus = getSceneFocus(preparedNodeMap.get(sceneId));
    try {
      isSwitchingFocus = true;
      await viewer.animate({ ...focus, speed: '10rpm', easing: 'inOutQuad' });
    } catch { /* animation cancelled — ignore */ }
    finally { isSwitchingFocus = false; }
  }

  async function playLittlePlanetIntro() {
    const focus = getSceneFocus(virtualTour.getCurrentNode());
    await sleep(300);

    // Use native camera animation for smoother motion, and only tween optical params.
    const cameraAnim = viewer.animate({
      yaw: focus.yaw,
      pitch: focus.pitch,
      zoom: focus.zoom,
      speed: '6rpm',
      easing: 'inOutSine',
    });

    const opticsTween = tween(1700, t => {
      const k = easeOutCubic(t);
      viewer.setOptions({
        fisheye: lerp(2, 0, k),
        maxFov: lerp(130, 90, k),
      });
    });

    await Promise.allSettled([cameraAnim, opticsTween]);

    viewer.setOptions({
      fisheye: 0,
      maxFov: 90,
      mousemove: true,
      mousewheel: true,
      touchmoveTwoFingers: true,
    });
  }

  // ── Events ──────────────────────────────────
  markers.addEventListener('select-marker', ({ marker }) => {
    if (marker?.data?.nodeId) virtualTour.setCurrentNode(marker.data.nodeId);
  });

  virtualTour.addEventListener('node-changed', ({ node }) => {
    captionEl.textContent = GPS_DATA[node.id]?.name || node.name || node.id;
    renderMarkersForScene(node.id);
    if (introPlayed) setTimeout(() => animateToSceneFocus(node.id), 120);
  });

  gallery.addEventListener('show-gallery', updateGalleryButton);
  gallery.addEventListener('hide-gallery', updateGalleryButton);
  galleryToggleEl.addEventListener('click', () => { gallery.toggle(); updateGalleryButton(); });

  viewer.addEventListener('ready', async () => {
    const cur = virtualTour.getCurrentNode();
    if (cur) {
      captionEl.textContent = GPS_DATA[cur.id]?.name || cur.name || cur.id;
      renderMarkersForScene(cur.id);
    }
    loadingOverlay.classList.add('hidden');
    if (!introPlayed) { introPlayed = true; await playLittlePlanetIntro(); }
  });

  // ── Debug click: lấy textureX/Y để tinh chỉnh hotspot ──
  viewer.addEventListener('click', ({ data }) => {
    if (data.rightclick) return;
    const cur = virtualTour.getCurrentNode();
    if (!cur) return;
    const raw = rawNodeMap.get(cur.id);
    const pW  = raw?.panorama?.width || 14400;
    const tex = sphericalToTexture(data.yaw, data.pitch, pW, pW / 2);
    console.log(
      `[${cur.id}] textureX=${Math.round(tex.textureX)}, ` +
      `textureY=${Math.round(tex.textureY)}, ` +
      `yaw=${data.yaw.toFixed(4)}, pitch=${data.pitch.toFixed(4)}`
    );
  });

  updateGalleryButton();
}

initTour().catch(err => console.error('❌ Lỗi khởi tạo tour:', err));
