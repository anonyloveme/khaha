import { Viewer } from '@photo-sphere-viewer/core';
import { EquirectangularTilesAdapter } from '@photo-sphere-viewer/equirectangular-tiles-adapter';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';
import { StereoPlugin } from '@photo-sphere-viewer/stereo-plugin';

/**
 * 1) GPS scene data
 */
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

/**
 * 2) Calibration per scene
 *
 * bearingOffsetDeg:
 *   offset để map bearing GPS -> yaw panorama
 *
 * sphereCorrectionPanDeg:
 *   nếu muốn xoay cả panorama cho đúng "hướng chuẩn"
 *
 * targetYawDeg / targetPitchDeg / targetZoom:
 *   hướng camera "đẹp" sau khi vào scene
 *
 * Bạn có thể tinh chỉnh từng scene dần dần.
 */
const SCENE_CALIBRATION = {
  scene_01: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -6, targetZoom: 50 },
  scene_02: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 8,   targetPitchDeg: -14, targetZoom: 52 },
  scene_03: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -12, targetPitchDeg: -12, targetZoom: 52 },
  scene_04: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -12, targetZoom: 52 },
  scene_05: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 18,  targetPitchDeg: -18, targetZoom: 54 },
  scene_06: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 8,   targetPitchDeg: -18, targetZoom: 54 },
  scene_07: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 15,  targetPitchDeg: -16, targetZoom: 54 },
  scene_08: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 10,  targetPitchDeg: -16, targetZoom: 54 },
  scene_09: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -16, targetZoom: 54 },
  scene_10: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -16, targetZoom: 54 },
  scene_11: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -15, targetZoom: 54 },
  scene_12: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -15, targetZoom: 54 },
  scene_13: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -6,  targetPitchDeg: -12, targetZoom: 56 },
  scene_14: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -8,  targetPitchDeg: -12, targetZoom: 56 },
  scene_15: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -10, targetPitchDeg: -12, targetZoom: 56 },
  scene_16: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 15,  targetPitchDeg: -15, targetZoom: 54 },
  scene_17: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 12,  targetPitchDeg: -15, targetZoom: 54 },
  scene_18: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -8,  targetZoom: 50 },
  scene_19: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -8,  targetZoom: 50 },
  scene_20: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -10, targetZoom: 50 },
  scene_21: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -10, targetZoom: 50 },
  scene_22: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -10, targetZoom: 50 },
  scene_23: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -10, targetZoom: 50 },
  scene_24: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -5,  targetPitchDeg: -12, targetZoom: 56 },
  scene_25: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -5,  targetPitchDeg: -12, targetZoom: 56 },
  scene_26: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -5,  targetPitchDeg: -12, targetZoom: 56 },
  scene_27: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -10, targetZoom: 50 },
  scene_28: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -10, targetZoom: 50 },
  scene_29: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -10, targetZoom: 50 },
  scene_30: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 0,   targetPitchDeg: -12, targetZoom: 52 },
};

/**
 * 3) Manual hotspot overrides
 *
 * Chính chỗ này mới giúp tour giống dulichtadung.
 * Nếu có override textureX/textureY => marker sẽ ghim đúng điểm trên ảnh.
 *
 * Ví dụ mẫu:
 *
 * const HOTSPOT_OVERRIDES = {
 *   scene_01: {
 *     scene_02: { textureX: 2800, textureY: 2500 },
 *     scene_20: { textureX: 4300, textureY: 2200 },
 *   },
 *   scene_15: {
 *     scene_24: { textureX: 6200, textureY: 3400 },
 *   }
 * };
 */
const HOTSPOT_OVERRIDES = {
  // điền dần theo console log textureX/textureY
};

/**
 * 4) Utils
 */
const TWO_PI = Math.PI * 2;

function degToRad(deg) {
  return deg * Math.PI / 180;
}

function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

function normalizeRad(rad) {
  let r = rad;
  while (r <= -Math.PI) r += TWO_PI;
  while (r > Math.PI) r -= TWO_PI;
  return r;
}

function shortestArc(from, to) {
  return normalizeRad(to - from);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpAngle(a, b, t) {
  return normalizeRad(a + shortestArc(a, b) * t);
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(str = '') {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const p1 = degToRad(lat1);
  const p2 = degToRad(lat2);
  const dp = degToRad(lat2 - lat1);
  const dl = degToRad(lng2 - lng1);

  const a =
    Math.sin(dp / 2) ** 2 +
    Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function bearingRad(lat1, lng1, lat2, lng2) {
  const p1 = degToRad(lat1);
  const p2 = degToRad(lat2);
  const dl = degToRad(lng2 - lng1);

  const y = Math.sin(dl) * Math.cos(p2);
  const x =
    Math.cos(p1) * Math.sin(p2) -
    Math.sin(p1) * Math.cos(p2) * Math.cos(dl);

  return Math.atan2(y, x);
}

function textureToSpherical(textureX, textureY, panoWidth, panoHeight) {
  const yaw = (textureX / panoWidth) * TWO_PI - Math.PI;
  const pitch = Math.PI / 2 - (textureY / panoHeight) * Math.PI;
  return { yaw: normalizeRad(yaw), pitch };
}

function sphericalToTexture(yaw, pitch, panoWidth, panoHeight) {
  const nYaw = normalizeRad(yaw);
  let textureX = ((nYaw + Math.PI) / TWO_PI) * panoWidth;
  if (textureX < 0) textureX += panoWidth;
  if (textureX > panoWidth) textureX -= panoWidth;

  const textureY = ((Math.PI / 2 - pitch) / Math.PI) * panoHeight;
  return { textureX, textureY };
}

function guessPitchByDistance(distanceMeters) {
  if (distanceMeters < 40) return degToRad(-28);
  if (distanceMeters < 100) return degToRad(-24);
  if (distanceMeters < 200) return degToRad(-20);
  if (distanceMeters < 400) return degToRad(-16);
  if (distanceMeters < 800) return degToRad(-12);
  return degToRad(-10);
}

function gpsBearingToYaw(fromSceneId, bearing) {
  const cal = SCENE_CALIBRATION[fromSceneId] || {};
  const offset = degToRad(cal.bearingOffsetDeg || 0);

  /**
   * Công thức thực chiến:
   * - bearing là hướng địa lý A -> B
   * - offset dùng để hiệu chỉnh panorama
   *
   * Nếu marker lệch trái/phải đồng loạt:
   * chỉnh bearingOffsetDeg của scene đó
   */
  return normalizeRad((Math.PI / 2) - bearing + offset);
}

function createThumbHotspotHtml(targetId, targetName) {
  const safeName = escapeHtml(targetName || targetId);
  return `
    <div class="thumb-hotspot" data-node-id="${escapeHtml(targetId)}" title="${safeName}">
      <img src="thumbs/${escapeHtml(targetId)}.jpg" alt="${safeName}" />
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

/**
 * 5) Resolve marker/link position
 * Priority:
 *   A. HOTSPOT_OVERRIDES (textureX/textureY)
 *   B. tour.json link.position or link.yaw/pitch if available
 *   C. fallback from GPS bearing
 */
function resolveLinkPosition(fromNode, link) {
  const panoWidth = fromNode.panorama.width;
  const panoHeight = panoWidth / 2;

  const override = HOTSPOT_OVERRIDES[fromNode.id]?.[link.nodeId];
  if (override?.textureX != null && override?.textureY != null) {
    const pos = textureToSpherical(override.textureX, override.textureY, panoWidth, panoHeight);
    return {
      yaw: pos.yaw,
      pitch: pos.pitch,
      textureX: override.textureX,
      textureY: override.textureY,
      source: 'override',
    };
  }

  if (link.position?.textureX != null && link.position?.textureY != null) {
    const pos = textureToSpherical(link.position.textureX, link.position.textureY, panoWidth, panoHeight);
    return {
      yaw: pos.yaw,
      pitch: pos.pitch,
      textureX: link.position.textureX,
      textureY: link.position.textureY,
      source: 'tour-json-texture',
    };
  }

  if (typeof link.position?.yaw === 'number' && typeof link.position?.pitch === 'number') {
    const tex = sphericalToTexture(link.position.yaw, link.position.pitch, panoWidth, panoHeight);
    return {
      yaw: link.position.yaw,
      pitch: link.position.pitch,
      textureX: tex.textureX,
      textureY: tex.textureY,
      source: 'tour-json-position',
    };
  }

  if (typeof link.yaw === 'number' && typeof link.pitch === 'number') {
    const tex = sphericalToTexture(link.yaw, link.pitch, panoWidth, panoHeight);
    return {
      yaw: link.yaw,
      pitch: link.pitch,
      textureX: tex.textureX,
      textureY: tex.textureY,
      source: 'tour-json-yaw-pitch',
    };
  }

  if (typeof link.yaw === 'number') {
    const pitch = typeof link.pitch === 'number' ? link.pitch : degToRad(-14);
    const tex = sphericalToTexture(link.yaw, pitch, panoWidth, panoHeight);
    return {
      yaw: link.yaw,
      pitch,
      textureX: tex.textureX,
      textureY: tex.textureY,
      source: 'tour-json-yaw-only',
    };
  }

  const gA = GPS_DATA[fromNode.id];
  const gB = GPS_DATA[link.nodeId];

  if (gA && gB) {
    const dist = haversine(gA.lat, gA.lng, gB.lat, gB.lng);
    const bearing = bearingRad(gA.lat, gA.lng, gB.lat, gB.lng);
    const yaw = gpsBearingToYaw(fromNode.id, bearing);
    const pitch = guessPitchByDistance(dist);
    const tex = sphericalToTexture(yaw, pitch, panoWidth, panoHeight);

    return {
      yaw,
      pitch,
      textureX: tex.textureX,
      textureY: tex.textureY,
      source: 'gps-fallback',
    };
  }

  return {
    yaw: 0,
    pitch: degToRad(-14),
    textureX: panoWidth / 2,
    textureY: panoHeight * 0.62,
    source: 'default-fallback',
  };
}

/**
 * 6) Build nodes for VirtualTourPlugin
 * IMPORTANT:
 * - dùng manual mode
 * - ẩn arrow mặc định
 * - marker click sẽ đổi scene
 */
function buildPreparedNode(rawNode) {
  const gps = GPS_DATA[rawNode.id];
  const cal = SCENE_CALIBRATION[rawNode.id] || {};
  const panoWidth = rawNode.panorama.width;
  const panoHeight = panoWidth / 2;

  const links = (rawNode.links || [])
    .filter(link => link.nodeId !== rawNode.id)
    .map(link => {
      const pos = resolveLinkPosition(rawNode, link);

      return {
        nodeId: link.nodeId,
        name: GPS_DATA[link.nodeId]?.name || link.name || link.nodeId,
        position: {
          yaw: pos.yaw,
          pitch: pos.pitch,
        },
      };
    });

  return {
    id: rawNode.id,
    name: gps?.name || rawNode.name || rawNode.id,
    caption: gps?.name || rawNode.name || rawNode.id,
    thumbnail: `thumbs/${rawNode.id}.jpg`,
    panorama: {
      width: rawNode.panorama.width,
      cols: rawNode.panorama.cols,
      rows: rawNode.panorama.rows,
      baseUrl: rawNode.panorama.baseUrl,
      tileUrl: (col, row) =>
        rawNode.panorama.tileUrl
          .replace('{col}', col)
          .replace('{row}', row),
    },
    sphereCorrection: typeof cal.sphereCorrectionPanDeg === 'number'
      ? { pan: `${cal.sphereCorrectionPanDeg}deg` }
      : undefined,
    links,
    data: {
      focusYaw: degToRad(cal.targetYawDeg ?? 0),
      focusPitch: degToRad(cal.targetPitchDeg ?? -12),
      focusZoom: cal.targetZoom ?? 50,
      panoWidth,
      panoHeight,
    },
  };
}

function buildSceneMarkers(rawNode) {
  const panoWidth = rawNode.panorama.width;
  const panoHeight = panoWidth / 2;

  return (rawNode.links || [])
    .filter(link => link.nodeId !== rawNode.id)
    .map(link => {
      const targetName = GPS_DATA[link.nodeId]?.name || link.name || link.nodeId;
      const pos = resolveLinkPosition(rawNode, link);

      return {
        id: `marker_${rawNode.id}_${link.nodeId}`,
        position: {
          yaw: pos.yaw,
          pitch: pos.pitch,
        },
        html: createThumbHotspotHtml(link.nodeId, targetName),
        anchor: 'center center',
        tooltip: {
          content: targetName,
          position: 'top center',
        },
        data: {
          nodeId: link.nodeId,
          source: pos.source,
          textureX: Math.round(pos.textureX),
          textureY: Math.round(pos.textureY),
          panoWidth,
          panoHeight,
        },
      };
    });
}

function getSceneFocus(preparedNode) {
  const fallback = {
    yaw: 0,
    pitch: degToRad(-12),
    zoom: 50,
  };

  if (!preparedNode) return fallback;

  return {
    yaw: preparedNode.data?.focusYaw ?? fallback.yaw,
    pitch: preparedNode.data?.focusPitch ?? fallback.pitch,
    zoom: preparedNode.data?.focusZoom ?? fallback.zoom,
  };
}

/**
 * 7) Init
 */
async function initTour() {
  const response = await fetch('tour.json');
  const tourData = await response.json();

  const rawNodeMap = new Map(tourData.nodes.map(node => [node.id, node]));
  const preparedNodes = tourData.nodes.map(buildPreparedNode);
  const preparedNodeMap = new Map(preparedNodes.map(node => [node.id, node]));

  const viewer = new Viewer({
    container: document.getElementById('viewer'),
    adapter: EquirectangularTilesAdapter,

    loadingTxt: '',
    mousemove: false,
    mousewheel: false,
    touchmoveTwoFingers: false,

    defaultPitch: -Math.PI / 2,
    defaultYaw: Math.PI / 2,
    defaultZoomLvl: 0,
    maxFov: 130,
    minFov: 30,
    fisheye: 2,

    defaultTransition: {
      speed: 1500,
      rotation: true,
      effect: 'fade',
    },

    plugins: [
      [GalleryPlugin, {
        thumbnailSize: { width: 140, height: 80 },
      }],
      [MarkersPlugin, {}],
      [VirtualTourPlugin, {
        nodes: preparedNodes,
        startNodeId: tourData.default?.firstNode || preparedNodes[0]?.id,
        positionMode: 'manual',
        renderMode: '3d',
        preload: false,
        transitionOptions: {
          showLoader: true,
          speed: '20rpm',
          fadeIn: true,
          rotation: true,
        },
        arrowStyle: {
          className: 'vt-arrow-hidden',
        },
      }],
      [GyroscopePlugin, { touchmove: true }],
      [StereoPlugin, {}],
    ],

    navbar: ['zoom', 'move', 'gyroscope', 'stereo', 'fullscreen'],
  });

  const virtualTour = viewer.getPlugin(VirtualTourPlugin);
  const markers = viewer.getPlugin(MarkersPlugin);
  const gallery = viewer.getPlugin(GalleryPlugin);

  const loadingOverlay = document.getElementById('loading-overlay');
  const captionEl = document.getElementById('scene-caption');
  const galleryToggleEl = document.getElementById('gallery-toggle');

  let introPlayed = false;
  let isSwitchingFocus = false;

  function updateGalleryButton() {
    galleryToggleEl.classList.toggle('active', gallery.isVisible());
  }

  function renderMarkersForScene(sceneId) {
    const rawNode = rawNodeMap.get(sceneId);
    if (!rawNode) return;

    const sceneMarkers = buildSceneMarkers(rawNode);
    markers.setMarkers(sceneMarkers);
  }

  async function animateToSceneFocus(sceneId) {
    if (isSwitchingFocus) return;

    const preparedNode = preparedNodeMap.get(sceneId);
    const focus = getSceneFocus(preparedNode);

    try {
      isSwitchingFocus = true;
      await viewer.animate({
        yaw: focus.yaw,
        pitch: focus.pitch,
        zoom: focus.zoom,
        speed: '10rpm',
        easing: 'inOutQuad',
      });
    } catch (err) {
      // ignore cancelled animation
    } finally {
      isSwitchingFocus = false;
    }
  }

  async function playLittlePlanetIntro() {
    const currentNode = virtualTour.getCurrentNode();
    const focus = getSceneFocus(currentNode);

    await sleep(800);

    const startState = {
      yaw: Math.PI / 2,
      pitch: -Math.PI / 2,
      zoom: 0,
      maxFov: 130,
      fisheye: 2,
    };

    const endState = {
      yaw: focus.yaw,
      pitch: focus.pitch,
      zoom: focus.zoom,
      maxFov: 90,
      fisheye: 0,
    };

    await tween(2600, t => {
      const k = easeInOutQuad(t);

      viewer.setOptions({
        fisheye: lerp(startState.fisheye, endState.fisheye, k),
        maxFov: lerp(startState.maxFov, endState.maxFov, k),
      });

      viewer.rotate({
        yaw: lerpAngle(startState.yaw, endState.yaw, k),
        pitch: lerp(startState.pitch, endState.pitch, k),
      });

      viewer.zoom(lerp(startState.zoom, endState.zoom, k));
    });

    viewer.setOptions({
      fisheye: 0,
      maxFov: 90,
      mousemove: true,
      mousewheel: true,
    });
  }

  markers.addEventListener('select-marker', ({ marker }) => {
    if (marker?.data?.nodeId) {
      virtualTour.setCurrentNode(marker.data.nodeId);
    }
  });

  virtualTour.addEventListener('node-changed', async ({ node }) => {
    captionEl.textContent = GPS_DATA[node.id]?.name || node.name || node.id;

    renderMarkersForScene(node.id);

    /**
     * Sau mỗi lần đổi scene:
     * - cập nhật marker mới
     * - nếu không phải lần intro đầu tiên, camera quay nhẹ về hướng đẹp
     */
    if (introPlayed) {
      setTimeout(() => {
        animateToSceneFocus(node.id);
      }, 120);
    }
  });

  gallery.addEventListener('show-gallery', updateGalleryButton);
  gallery.addEventListener('hide-gallery', updateGalleryButton);

  galleryToggleEl.addEventListener('click', () => {
    gallery.toggle();
    updateGalleryButton();
  });

  viewer.addEventListener('ready', async () => {
    const currentNode = virtualTour.getCurrentNode();
    if (currentNode) {
      captionEl.textContent = GPS_DATA[currentNode.id]?.name || currentNode.name || currentNode.id;
      renderMarkersForScene(currentNode.id);
    }

    loadingOverlay.classList.add('hidden');

    if (!introPlayed) {
      introPlayed = true;
      await playLittlePlanetIntro();
    }
  });

  /**
   * Click debug:
   * dùng để lấy textureX / textureY thật trên scene hiện tại
   * rồi copy vào HOTSPOT_OVERRIDES
   */
  viewer.addEventListener('click', ({ data }) => {
    const currentNode = virtualTour.getCurrentNode();
    if (!currentNode || data.rightclick) return;

    const rawNode = rawNodeMap.get(currentNode.id);
    const panoWidth = rawNode?.panorama?.width || 14400;
    const panoHeight = panoWidth / 2;

    const tex = sphericalToTexture(data.yaw, data.pitch, panoWidth, panoHeight);

    console.log(
      `[${currentNode.id}] textureX=${Math.round(tex.textureX)}, textureY=${Math.round(tex.textureY)}, yaw=${data.yaw.toFixed(4)}, pitch=${data.pitch.toFixed(4)}`
    );
  });

  updateGalleryButton();
}

initTour().catch(err => {
  console.error('❌ Lỗi khởi tạo tour:', err);
});