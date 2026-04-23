import { Viewer } from '@photo-sphere-viewer/core';
import { EquirectangularTilesAdapter } from '@photo-sphere-viewer/equirectangular-tiles-adapter';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';
import { StereoPlugin } from '@photo-sphere-viewer/stereo-plugin';

import {
  SCENE_CALIBRATION,
  HOTSPOT_OVERRIDES,
  getSceneMode,
  getLinkStyle,
} from './hotspot-overrides.js';

const DEBUG =
  location.hostname === 'localhost' ||
  location.hostname === '127.0.0.1' ||
  location.search.includes('debug=1');

const GPS_DATA = {
  scene_01: { lat: 14.078641, lng: 108.2976508, name: 'Ngã ba keo úc' },
  scene_02: { lat: 14.0760493, lng: 108.293333, name: 'Ngã 3 rừng thông' },
  scene_03: { lat: 14.0753959, lng: 108.2905006, name: 'Ngã 4 KonBrung' },
  scene_04: { lat: 14.0708977, lng: 108.286561, name: 'Ngã 3 vườn thực vật' },
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

const TWO_PI = Math.PI * 2;

function degToRad(deg) {
  return deg * Math.PI / 180;
}

function guessPitchByDistance(distanceM = 500) {
  if (distanceM < 40) return degToRad(-28);
  if (distanceM < 100) return degToRad(-24);
  if (distanceM < 200) return degToRad(-20);
  if (distanceM < 400) return degToRad(-16);
  if (distanceM < 800) return degToRad(-12);
  return degToRad(-10);
}

function bearingDegToYaw(bearingDeg) {
  return normalizeRad((Math.PI / 2) - degToRad(bearingDeg));
}

function normalizeRad(rad) {
  let value = rad;
  while (value <= -Math.PI) value += TWO_PI;
  while (value > Math.PI) value -= TWO_PI;
  return value;
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
  return t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function sphericalToTexture(yaw, pitch, panoWidth, panoHeight) {
  const nYaw = normalizeRad(yaw);
  let textureX = ((nYaw + Math.PI) / TWO_PI) * panoWidth;

  if (textureX < 0) textureX += panoWidth;
  if (textureX > panoWidth) textureX -= panoWidth;

  const textureY = ((Math.PI / 2 - pitch) / Math.PI) * panoHeight;
  return { textureX, textureY };
}

function textureToSpherical(textureX, textureY, panoWidth, panoHeight) {
  const yaw = (textureX / panoWidth) * TWO_PI - Math.PI;
  const pitch = Math.PI / 2 - (textureY / panoHeight) * Math.PI;
  return { yaw: normalizeRad(yaw), pitch };
}

function getSceneName(sceneId, fallbackName) {
  return GPS_DATA[sceneId]?.name || fallbackName || sceneId;
}

function getSceneFocus(sceneId) {
  const cal = SCENE_CALIBRATION[sceneId] || {};
  return {
    yaw: degToRad(cal.targetYawDeg ?? 0),
    pitch: degToRad(cal.targetPitchDeg ?? -12),
    zoom: cal.targetZoom ?? 52,
  };
}

function tween(duration, onTick) {
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

function createThumbMarkerHtml(targetId, targetName) {
  const safeId = escapeHtml(targetId);
  const safeName = escapeHtml(targetName);

  return `
    <button
      class="tour-marker tour-marker--thumb"
      type="button"
      data-node-id="${safeId}"
      aria-label="${safeName}"
      title="${safeName}"
    >
      <img src="thumbs/${safeId}.jpg" alt="${safeName}" loading="lazy" />
    </button>
  `;
}

function createArrowMarkerHtml(targetId, targetName, variant = 'forward') {
  const safeId = escapeHtml(targetId);
  const safeName = escapeHtml(targetName);
  const safeVariant = escapeHtml(variant);

  return `
    <button
      class="tour-marker tour-marker--arrow is-${safeVariant}"
      type="button"
      data-node-id="${safeId}"
      aria-label="${safeName}"
      title="${safeName}"
    >
      <span class="tour-marker__arrow-core">
        <span class="tour-marker__arrow-shaft"></span>
        <span class="tour-marker__arrow-head"></span>
      </span>
    </button>
  `;
}

function getArrowVariant(sceneId, markerYaw) {
  const focus = getSceneFocus(sceneId);
  const delta = shortestArc(focus.yaw, markerYaw);
  const threshold = degToRad(22);

  if (Math.abs(delta) <= threshold) return 'forward';
  return delta < 0 ? 'left' : 'right';
}

function resolveLinkPlacement(rawNode, link) {
  const panoWidth = rawNode.panorama.width;
  const panoHeight = panoWidth / 2;

  const override = HOTSPOT_OVERRIDES[rawNode.id]?.[link.nodeId];
  const style = getLinkStyle(rawNode.id, link.nodeId);

  if (override?.textureX != null && override?.textureY != null) {
    const pos = textureToSpherical(
      override.textureX,
      override.textureY,
      panoWidth,
      panoHeight
    );

    return {
      yaw: pos.yaw,
      pitch: pos.pitch,
      textureX: override.textureX,
      textureY: override.textureY,
      source: 'override',
      style,
      label: override.label,
    };
  }

  if (link.position?.textureX != null && link.position?.textureY != null) {
    const pos = textureToSpherical(
      link.position.textureX,
      link.position.textureY,
      panoWidth,
      panoHeight
    );

    return {
      yaw: pos.yaw,
      pitch: pos.pitch,
      textureX: link.position.textureX,
      textureY: link.position.textureY,
      source: 'tour-json-texture',
      style,
      label: override?.label,
    };
  }

  if (typeof link.position?.yaw === 'number' && typeof link.position?.pitch === 'number') {
    const tex = sphericalToTexture(link.position.yaw, link.position.pitch, panoWidth, panoHeight);

    return {
      yaw: link.position.yaw,
      pitch: link.position.pitch,
      textureX: tex.textureX,
      textureY: tex.textureY,
      source: 'tour-json-yaw-pitch',
      style,
      label: override?.label,
    };
  }

  if (typeof link.bearing_deg === 'number') {
    const yaw = bearingDegToYaw(link.bearing_deg);
    const pitch = guessPitchByDistance(link.distance_m);
    const tex = sphericalToTexture(yaw, pitch, panoWidth, panoHeight);

    return {
      yaw,
      pitch,
      textureX: tex.textureX,
      textureY: tex.textureY,
      source: 'gps-bearing-fallback',
      style,
      label: override?.label,
    };
  }

  return {
    yaw: 0,
    pitch: degToRad(-14),
    textureX: panoWidth / 2,
    textureY: panoHeight * 0.62,
    source: 'default-fallback',
    style,
    label: override?.label,
  };
}

function buildPreparedNode(rawNode) {
  const sceneId = rawNode.id;
  const cal = SCENE_CALIBRATION[sceneId] || {};
  const sceneName = getSceneName(sceneId, rawNode.name);

  const links = (rawNode.links || [])
    .filter(link => link.nodeId !== sceneId)
    .map(link => {
      const pos = resolveLinkPlacement(rawNode, link);

      return {
        nodeId: link.nodeId,
        name: getSceneName(link.nodeId, link.name),
        position: {
          yaw: pos.yaw,
          pitch: pos.pitch,
        },
      };
    });

  return {
    id: sceneId,
    name: sceneName,
    caption: sceneName,
    thumbnail: `thumbs/${sceneId}.jpg`,
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
      mode: getSceneMode(sceneId),
    },
  };
}

function buildSceneMarkers(rawNode) {
  const sceneId = rawNode.id;
  const panoWidth = rawNode.panorama.width;
  const panoHeight = panoWidth / 2;

  return (rawNode.links || [])
    .filter(link => link.nodeId !== sceneId)
    .map(link => {
      const placement = resolveLinkPlacement(rawNode, link);
      const targetName = placement.label || getSceneName(link.nodeId, link.name);

      const html =
        placement.style === 'thumb'
          ? createThumbMarkerHtml(link.nodeId, targetName)
          : createArrowMarkerHtml(link.nodeId, targetName, getArrowVariant(sceneId, placement.yaw));

      return {
        id: `marker_${sceneId}_${link.nodeId}`,
        position: {
          yaw: placement.yaw,
          pitch: placement.pitch,
        },
        html,
        anchor: 'center center',
        tooltip: {
          content: targetName,
          position: 'top center',
        },
        data: {
          nodeId: link.nodeId,
          sceneId,
          style: placement.style,
          source: placement.source,
          textureX: Math.round(placement.textureX),
          textureY: Math.round(placement.textureY),
          panoWidth,
          panoHeight,
        },
      };
    });
}

async function initTour() {
  const viewerEl = document.getElementById('viewer');
  const loadingOverlay = document.getElementById('loading-overlay');
  const captionEl = document.getElementById('scene-caption');
  const galleryToggleEl = document.getElementById('gallery-toggle');
  const topLogoImg = document.querySelector('#top-logo img');

  if (!viewerEl || !loadingOverlay || !captionEl || !galleryToggleEl) {
    throw new Error('Thiếu phần tử HTML bắt buộc: #viewer, #loading-overlay, #scene-caption hoặc #gallery-toggle');
  }

  const response = await fetch('tour.json', { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`Không tải được tour.json: HTTP ${response.status}`);
  }

  const tourData = await response.json();
  if (!Array.isArray(tourData.nodes) || tourData.nodes.length === 0) {
    throw new Error('tour.json không có scene hợp lệ trong mảng nodes');
  }
  const rawNodeMap = new Map((tourData.nodes || []).map(node => [node.id, node]));
  const preparedNodes = (tourData.nodes || []).map(buildPreparedNode);

  const viewer = new Viewer({
    container: viewerEl,
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

  let introPlayed = false;
  let isAnimatingSceneFocus = false;
  let firstPanoramaLoaded = false;

  const loadingTimeout = setTimeout(() => {
    if (firstPanoramaLoaded) return;
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
      loadingOverlay.innerHTML = `
        <div class="loading-logo" style="color:#ffd27a">Mạng chậm hoặc panorama tải lâu</div>
        <div class="loading-subtitle">Đang thử tải lại scene đầu tiên...</div>
      `;
    }
  }, 15000);

  const hideLoadingOverlay = () => {
    if (firstPanoramaLoaded) return;
    firstPanoramaLoaded = true;
    clearTimeout(loadingTimeout);
    if (loadingOverlay) {
      loadingOverlay.classList.add('hidden');
    }
  };

  if (topLogoImg) {
    topLogoImg.addEventListener('error', () => {
      topLogoImg.src = 'thumbs/scene_01.jpg';
    }, { once: true });
  }

  function updateCaption(sceneId, rawName) {
    const name = getSceneName(sceneId, rawName);
    captionEl.textContent = name;
    captionEl.title = name;
    document.title = `${name} | Virtual Tour 360° - Vườn Quốc Gia`;
  }

  function updateGalleryButton() {
    const visible = gallery.isVisible();
    galleryToggleEl.classList.toggle('active', visible);
    galleryToggleEl.setAttribute('aria-pressed', String(visible));
  }

  function renderMarkers(sceneId) {
    const rawNode = rawNodeMap.get(sceneId);
    if (!rawNode) return;
    markers.setMarkers(buildSceneMarkers(rawNode));
  }

  async function animateToSceneFocus(sceneId) {
    if (isAnimatingSceneFocus) return;
    isAnimatingSceneFocus = true;

    const focus = getSceneFocus(sceneId);

    try {
      await viewer.animate({
        yaw: focus.yaw,
        pitch: focus.pitch,
        zoom: focus.zoom,
        speed: '10rpm',
        easing: 'inOutQuad',
      });
    } catch (error) {
      // ignore interrupted animation
    } finally {
      isAnimatingSceneFocus = false;
    }
  }

  async function playLittlePlanetIntro() {
    const currentNode = virtualTour.getCurrentNode();
    if (!currentNode) return;

    const focus = getSceneFocus(currentNode.id);
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

  virtualTour.addEventListener('node-changed', ({ node }) => {
    updateCaption(node.id, node.name);
    renderMarkers(node.id);

    if (typeof gallery.setCurrentItem === 'function') {
      gallery.setCurrentItem(node.id);
    }

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
      updateCaption(currentNode.id, currentNode.name);
      renderMarkers(currentNode.id);
    }

    if (!introPlayed) {
      introPlayed = true;
      await playLittlePlanetIntro();
    }
  });

  viewer.addEventListener('panorama-loaded', () => {
    hideLoadingOverlay();
  });

  viewer.addEventListener('panorama-error', ({ error }) => {
    clearTimeout(loadingTimeout);
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
      loadingOverlay.innerHTML = `
        <div class="loading-logo" style="color:#ff8686">Không thể tải panorama</div>
        <div class="loading-subtitle">${escapeHtml(error?.message || 'Hãy kiểm tra đường dẫn preview/tiles')}</div>
      `;
    }
  });

  if (DEBUG) {
    viewer.addEventListener('click', ({ data }) => {
      if (!data || data.rightclick) return;

      const currentNode = virtualTour.getCurrentNode();
      if (!currentNode) return;

      const rawNode = rawNodeMap.get(currentNode.id);
      const panoWidth = rawNode?.panorama?.width || 14400;
      const panoHeight = panoWidth / 2;

      const tex = sphericalToTexture(data.yaw, data.pitch, panoWidth, panoHeight);

      console.log(
        `[${currentNode.id}] textureX=${Math.round(tex.textureX)}, textureY=${Math.round(tex.textureY)}, yaw=${data.yaw.toFixed(4)}, pitch=${data.pitch.toFixed(4)}`
      );
    });

    window.__tourDebug = {
      copyOverride(fromSceneId, toSceneId, textureX, textureY, style = getLinkStyle(fromSceneId, toSceneId)) {
        const snippet =
`${fromSceneId}: {
  ${toSceneId}: { textureX: ${Math.round(textureX)}, textureY: ${Math.round(textureY)}, style: '${style}' },
},`;
        console.log(snippet);
        return snippet;
      },
      getSceneMode,
    };
  }

  updateGalleryButton();
}

initTour().catch(error => {
  console.error('❌ Lỗi khởi tạo tour:', error);

  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('hidden');
    loadingOverlay.innerHTML = `
      <div class="loading-logo" style="color:#ff8686">Không thể tải Virtual Tour</div>
      <div class="loading-subtitle">${escapeHtml(error.message || 'Lỗi không xác định')}</div>
    `;
  }
});
