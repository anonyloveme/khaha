/**
 * hotspot-overrides.template.js
 * Auto-generated from GPS by generate_tour.py
 * Seed file: fine-tune textureX/textureY in hotspot-overrides.js for final visual accuracy.
 */

const DEFAULT_CALIBRATION = {
  bearingOffsetDeg: 0,
  sphereCorrectionPanDeg: 0,
  targetYawDeg: 0,
  targetPitchDeg: -12,
  targetZoom: 52,
};

export const OVERVIEW_SCENES = new Set([
  "scene_01", // Ngã ba keo úc | degree=3 | mean=546.9m | dup=0
  "scene_04", // Ngã 3 vườn thực vật | degree=10 | mean=599.6m | dup=0
  "scene_09", // Suối - Vườn thực vật (góc 2) | degree=14 | mean=531.5m | dup=1
  "scene_10", // Suối - Vườn thực vật | degree=14 | mean=531.3m | dup=1
  "scene_11", // Ngã 3 rừng thông - VTV (góc 2) | degree=14 | mean=450.8m | dup=1
  "scene_12", // Ngã 3 rừng thông - VTV | degree=14 | mean=451.8m | dup=1
  "scene_16", // Ngã 3 rừng trắc (góc 2) | degree=12 | mean=300.4m | dup=0
  "scene_17", // Ngã 3 rừng trắc | degree=12 | mean=299.3m | dup=0
  "scene_30", // Bổ sung 04 | degree=15 | mean=422.9m | dup=0
]);

export function getSceneMode(sceneId) {
  return OVERVIEW_SCENES.has(sceneId) ? 'overview' : 'navigation';
}

const CALIBRATION_SEED = {
  scene_01: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 125.9, targetPitchDeg: -9, targetZoom: 50 },
  scene_02: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -166.6, targetPitchDeg: -16.0, targetZoom: 54 },
  scene_03: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 13.4, targetPitchDeg: -16.0, targetZoom: 54 },
  scene_04: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -58.6, targetPitchDeg: -9, targetZoom: 50 },
  scene_05: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -138.4, targetPitchDeg: -16.0, targetZoom: 54 }, // duplicate-near: scene_06
  scene_06: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -139.4, targetPitchDeg: -16.0, targetZoom: 54 }, // duplicate-near: scene_05
  scene_07: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 41.2, targetPitchDeg: -16.0, targetZoom: 54 }, // duplicate-near: scene_08
  scene_08: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 41.6, targetPitchDeg: -16.0, targetZoom: 54 }, // duplicate-near: scene_07
  scene_09: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -25.0, targetPitchDeg: -9, targetZoom: 50 }, // duplicate-near: scene_10
  scene_10: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -24.5, targetPitchDeg: -9, targetZoom: 50 }, // duplicate-near: scene_09
  scene_11: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -116.6, targetPitchDeg: -9, targetZoom: 50 }, // duplicate-near: scene_12
  scene_12: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -116.6, targetPitchDeg: -9, targetZoom: 50 }, // duplicate-near: scene_11
  scene_13: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 23.6, targetPitchDeg: -28.0, targetZoom: 54 }, // duplicate-near: scene_14, scene_15
  scene_14: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 24.3, targetPitchDeg: -28.0, targetZoom: 54 }, // duplicate-near: scene_13, scene_15
  scene_15: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 19.1, targetPitchDeg: -28.0, targetZoom: 54 }, // duplicate-near: scene_13, scene_14
  scene_16: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -139.0, targetPitchDeg: -9, targetZoom: 50 },
  scene_17: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 152.8, targetPitchDeg: -9, targetZoom: 50 },
  scene_18: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 28.7, targetPitchDeg: -12.0, targetZoom: 54 }, // duplicate-near: scene_19
  scene_19: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 28.7, targetPitchDeg: -12.0, targetZoom: 54 }, // duplicate-near: scene_18
  scene_20: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 24.4, targetPitchDeg: -16.0, targetZoom: 54 },
  scene_21: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -155.6, targetPitchDeg: -16.0, targetZoom: 54 },
  scene_22: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -151.4, targetPitchDeg: -12.0, targetZoom: 54 }, // duplicate-near: scene_23
  scene_23: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -151.3, targetPitchDeg: -12.0, targetZoom: 54 }, // duplicate-near: scene_22
  scene_24: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -156.4, targetPitchDeg: -28.0, targetZoom: 54 }, // duplicate-near: scene_25, scene_26
  scene_25: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -159.2, targetPitchDeg: -28.0, targetZoom: 54 }, // duplicate-near: scene_24, scene_26
  scene_26: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -155.9, targetPitchDeg: -28.0, targetZoom: 54 }, // duplicate-near: scene_24, scene_25
  scene_27: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -63.6, targetPitchDeg: -10.0, targetZoom: 54 },
  scene_28: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 162.1, targetPitchDeg: -12.0, targetZoom: 54 },
  scene_29: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: -124.8, targetPitchDeg: -12.0, targetZoom: 54 },
  scene_30: { bearingOffsetDeg: 0, sphereCorrectionPanDeg: 0, targetYawDeg: 21.7, targetPitchDeg: -9, targetZoom: 50 },
};

export const SCENE_CALIBRATION = Object.fromEntries(
  Object.keys(CALIBRATION_SEED).map(sceneId => [sceneId, { ...DEFAULT_CALIBRATION, ...CALIBRATION_SEED[sceneId] }])
);

export const HOTSPOT_OVERRIDES = {
  scene_01: {
    scene_20: { textureX: 11651, textureY: 4080, style: 'thumb', label: "Ruộng lúa" }, // dist=486.7m bearing=-21.283deg
    scene_02: { textureX: 1270, textureY: 4080, style: 'thumb', label: "Ngã 3 rừng thông" }, // dist=547.7m bearing=-121.75deg
    scene_21: { textureX: 10306, textureY: 4080, style: 'thumb', label: "Khu dân cư vùng đệm" }, // dist=606.3m bearing=12.348deg
  },
  scene_02: {
    scene_03: { textureX: 535, textureY: 4240, style: 'arrow', label: "Ngã 4 KonBrung" }, // dist=314.0m bearing=-103.378deg
    scene_01: { textureX: 8470, textureY: 4080, style: 'arrow', label: "Ngã ba keo úc" }, // dist=547.7m bearing=58.249deg
    scene_20: { textureX: 9948, textureY: 4080, style: 'arrow', label: "Ruộng lúa" }, // dist=796.0m bearing=21.29deg
  },
  scene_03: {
    scene_02: { textureX: 7735, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng thông" }, // dist=314.0m bearing=76.622deg
    scene_04: { textureX: 1986, textureY: 4080, style: 'arrow', label: "Ngã 3 vườn thực vật" }, // dist=656.3m bearing=-139.651deg
  },
  scene_04: {
    scene_06: { textureX: 2655, textureY: 4080, style: 'thumb', label: "Chòi canh lửa" }, // dist=451.6m bearing=-156.386deg
    scene_05: { textureX: 2615, textureY: 4080, style: 'thumb', label: "Chòi canh lửa (góc 2)" }, // dist=455.6m bearing=-155.379deg
    scene_09: { textureX: 5364, textureY: 4080, style: 'thumb', label: "Suối - Vườn thực vật (góc 2)" }, // dist=458.9m bearing=135.889deg
    scene_10: { textureX: 5356, textureY: 4080, style: 'thumb', label: "Suối - Vườn thực vật" }, // dist=459.1m bearing=136.089deg
    scene_30: { textureX: 5462, textureY: 4080, style: 'thumb', label: "Bổ sung 04" }, // dist=636.7m bearing=133.447deg
    scene_03: { textureX: 9186, textureY: 4080, style: 'thumb', label: "Ngã 4 KonBrung" }, // dist=656.3m bearing=40.348deg
    scene_11: { textureX: 5693, textureY: 4080, style: 'thumb', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=678.5m bearing=127.668deg
    scene_12: { textureX: 5704, textureY: 4080, style: 'thumb', label: "Ngã 3 rừng thông - VTV" }, // dist=678.9m bearing=127.406deg
    scene_08: { textureX: 2223, textureY: 4080, style: 'thumb', label: "Mốc tọa độ Quốc gia" }, // dist=759.7m bearing=-145.575deg
    scene_07: { textureX: 2215, textureY: 4080, style: 'thumb', label: "Mốc tọa độ Quốc gia (góc 2)" }, // dist=760.9m bearing=-145.377deg
  },
  scene_05: {
    scene_08: { textureX: 1662, textureY: 4240, style: 'arrow', label: "Mốc tọa độ Quốc gia" }, // dist=320.3m bearing=-131.561deg
    scene_07: { textureX: 1646, textureY: 4240, style: 'arrow', label: "Mốc tọa độ Quốc gia (góc 2)" }, // dist=322.2m bearing=-131.16deg
    scene_04: { textureX: 9815, textureY: 4080, style: 'arrow', label: "Ngã 3 vườn thực vật" }, // dist=455.6m bearing=24.621deg
    scene_10: { textureX: 7573, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật" }, // dist=515.0m bearing=80.678deg
    scene_09: { textureX: 7578, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật (góc 2)" }, // dist=516.2m bearing=80.558deg
    scene_30: { textureX: 7117, textureY: 4080, style: 'arrow', label: "Bổ sung 04" }, // dist=652.5m bearing=92.084deg
    scene_11: { textureX: 7198, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=726.9m bearing=90.04deg
    scene_12: { textureX: 7206, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV" }, // dist=729.0m bearing=89.862deg
  },
  scene_06: {
    scene_08: { textureX: 1623, textureY: 4240, style: 'arrow', label: "Mốc tọa độ Quốc gia" }, // dist=327.3m bearing=-130.576deg
    scene_07: { textureX: 1608, textureY: 4240, style: 'arrow', label: "Mốc tọa độ Quốc gia (góc 2)" }, // dist=329.2m bearing=-130.189deg
    scene_04: { textureX: 9855, textureY: 4080, style: 'arrow', label: "Ngã 3 vườn thực vật" }, // dist=451.6m bearing=23.614deg
    scene_10: { textureX: 7578, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật" }, // dist=506.1m bearing=80.556deg
    scene_09: { textureX: 7583, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật (góc 2)" }, // dist=507.3m bearing=80.434deg
    scene_30: { textureX: 7114, textureY: 4080, style: 'arrow', label: "Bổ sung 04" }, // dist=643.6m bearing=92.146deg
    scene_11: { textureX: 7197, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=718.0m bearing=90.07deg
    scene_12: { textureX: 7204, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV" }, // dist=720.1m bearing=89.889deg
  },
  scene_07: {
    scene_05: { textureX: 8846, textureY: 4240, style: 'arrow', label: "Chòi canh lửa (góc 2)" }, // dist=322.2m bearing=48.839deg
    scene_06: { textureX: 8808, textureY: 4240, style: 'arrow', label: "Chòi canh lửa" }, // dist=329.2m bearing=49.811deg
    scene_04: { textureX: 9415, textureY: 4080, style: 'arrow', label: "Ngã 3 vườn thực vật" }, // dist=760.9m bearing=34.622deg
  },
  scene_08: {
    scene_05: { textureX: 8862, textureY: 4240, style: 'arrow', label: "Chòi canh lửa (góc 2)" }, // dist=320.3m bearing=48.438deg
    scene_06: { textureX: 8823, textureY: 4240, style: 'arrow', label: "Chòi canh lửa" }, // dist=327.3m bearing=49.424deg
    scene_04: { textureX: 9423, textureY: 4080, style: 'arrow', label: "Ngã 3 vườn thực vật" }, // dist=759.7m bearing=34.424deg
  },
  scene_09: {
    scene_30: { textureX: 5712, textureY: 4400, style: 'thumb', label: "Bổ sung 04" }, // dist=179.4m bearing=127.19deg
    scene_11: { textureX: 6345, textureY: 4240, style: 'thumb', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=233.8m bearing=111.37deg
    scene_12: { textureX: 6373, textureY: 4240, style: 'thumb', label: "Ngã 3 rừng thông - VTV" }, // dist=235.0m bearing=110.666deg
    scene_16: { textureX: 5882, textureY: 4080, style: 'thumb', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=404.4m bearing=122.95deg
    scene_17: { textureX: 5863, textureY: 4080, style: 'thumb', label: "Ngã 3 rừng trắc" }, // dist=415.8m bearing=123.434deg
    scene_04: { textureX: 12564, textureY: 4080, style: 'thumb', label: "Ngã 3 vườn thực vật" }, // dist=458.9m bearing=-44.11deg
    scene_06: { textureX: 383, textureY: 4080, style: 'thumb', label: "Chòi canh lửa" }, // dist=507.3m bearing=-99.565deg
    scene_05: { textureX: 378, textureY: 4080, style: 'thumb', label: "Chòi canh lửa (góc 2)" }, // dist=516.2m bearing=-99.441deg
    scene_15: { textureX: 5310, textureY: 4080, style: 'thumb', label: "Nhà hành chính Trung tâm" }, // dist=738.8m bearing=137.262deg
    scene_13: { textureX: 5331, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 2)" }, // dist=744.2m bearing=136.725deg
    scene_14: { textureX: 5329, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 3)" }, // dist=744.4m bearing=136.763deg
    scene_26: { textureX: 5409, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm" }, // dist=753.5m bearing=134.783deg
    scene_24: { textureX: 5408, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 2)" }, // dist=753.7m bearing=134.807deg
    scene_25: { textureX: 5408, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 3)" }, // dist=755.2m bearing=134.803deg
  },
  scene_10: {
    scene_30: { textureX: 5733, textureY: 4400, style: 'thumb', label: "Bổ sung 04" }, // dist=179.4m bearing=126.674deg
    scene_11: { textureX: 6360, textureY: 4240, style: 'thumb', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=234.3m bearing=110.992deg
    scene_12: { textureX: 6388, textureY: 4240, style: 'thumb', label: "Ngã 3 rừng thông - VTV" }, // dist=235.5m bearing=110.291deg
    scene_16: { textureX: 5891, textureY: 4080, style: 'thumb', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=404.5m bearing=122.722deg
    scene_17: { textureX: 5871, textureY: 4080, style: 'thumb', label: "Ngã 3 rừng trắc" }, // dist=416.0m bearing=123.213deg
    scene_04: { textureX: 12556, textureY: 4080, style: 'thumb', label: "Ngã 3 vườn thực vật" }, // dist=459.1m bearing=-43.91deg
    scene_06: { textureX: 378, textureY: 4080, style: 'thumb', label: "Chòi canh lửa" }, // dist=506.1m bearing=-99.443deg
    scene_05: { textureX: 373, textureY: 4080, style: 'thumb', label: "Chòi canh lửa (góc 2)" }, // dist=515.0m bearing=-99.32deg
    scene_15: { textureX: 5314, textureY: 4080, style: 'thumb', label: "Nhà hành chính Trung tâm" }, // dist=738.6m bearing=137.138deg
    scene_13: { textureX: 5336, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 2)" }, // dist=744.0m bearing=136.602deg
    scene_14: { textureX: 5334, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 3)" }, // dist=744.2m bearing=136.64deg
    scene_26: { textureX: 5414, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm" }, // dist=753.3m bearing=134.661deg
    scene_24: { textureX: 5413, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 2)" }, // dist=753.5m bearing=134.685deg
    scene_25: { textureX: 5413, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 3)" }, // dist=755.0m bearing=134.681deg
  },
  scene_11: {
    scene_30: { textureX: 689, textureY: 4560, style: 'thumb', label: "Bổ sung 04" }, // dist=78.4m bearing=-107.234deg
    scene_16: { textureX: 5282, textureY: 4400, style: 'thumb', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=181.5m bearing=137.938deg
    scene_17: { textureX: 5277, textureY: 4400, style: 'thumb', label: "Ngã 3 rừng trắc" }, // dist=193.4m bearing=138.067deg
    scene_09: { textureX: 13545, textureY: 4240, style: 'thumb', label: "Suối - Vườn thực vật (góc 2)" }, // dist=233.8m bearing=-68.629deg
    scene_10: { textureX: 13560, textureY: 4240, style: 'thumb', label: "Suối - Vườn thực vật" }, // dist=234.3m bearing=-69.007deg
    scene_15: { textureX: 4872, textureY: 4080, style: 'thumb', label: "Nhà hành chính Trung tâm" }, // dist=538.3m bearing=148.196deg
    scene_13: { textureX: 4905, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 2)" }, // dist=542.3m bearing=147.366deg
    scene_14: { textureX: 4904, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 3)" }, // dist=542.5m bearing=147.412deg
    scene_26: { textureX: 5017, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm" }, // dist=546.9m bearing=144.564deg
    scene_24: { textureX: 5016, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 2)" }, // dist=547.1m bearing=144.593deg
    scene_25: { textureX: 5018, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 3)" }, // dist=548.6m bearing=144.561deg
    scene_04: { textureX: 12893, textureY: 4080, style: 'thumb', label: "Ngã 3 vườn thực vật" }, // dist=678.5m bearing=-52.331deg
    scene_06: { textureX: 14397, textureY: 4080, style: 'thumb', label: "Chòi canh lửa" }, // dist=718.0m bearing=-89.928deg
    scene_05: { textureX: 14398, textureY: 4080, style: 'thumb', label: "Chòi canh lửa (góc 2)" }, // dist=726.9m bearing=-89.958deg
  },
  scene_12: {
    scene_30: { textureX: 733, textureY: 4560, style: 'thumb', label: "Bổ sung 04" }, // dist=81.1m bearing=-108.318deg
    scene_16: { textureX: 5243, textureY: 4400, style: 'thumb', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=181.8m bearing=138.917deg
    scene_17: { textureX: 5241, textureY: 4400, style: 'thumb', label: "Ngã 3 rừng trắc" }, // dist=193.7m bearing=138.985deg
    scene_09: { textureX: 13573, textureY: 4240, style: 'thumb', label: "Suối - Vườn thực vật (góc 2)" }, // dist=235.0m bearing=-69.334deg
    scene_10: { textureX: 13588, textureY: 4240, style: 'thumb', label: "Suối - Vườn thực vật" }, // dist=235.5m bearing=-69.709deg
    scene_15: { textureX: 4859, textureY: 4080, style: 'thumb', label: "Nhà hành chính Trung tâm" }, // dist=539.1m bearing=148.516deg
    scene_13: { textureX: 4893, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 2)" }, // dist=543.0m bearing=147.684deg
    scene_14: { textureX: 4891, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 3)" }, // dist=543.3m bearing=147.731deg
    scene_26: { textureX: 5005, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm" }, // dist=547.5m bearing=144.883deg
    scene_24: { textureX: 5003, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 2)" }, // dist=547.8m bearing=144.913deg
    scene_25: { textureX: 5005, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 3)" }, // dist=549.2m bearing=144.88deg
    scene_04: { textureX: 12904, textureY: 4080, style: 'thumb', label: "Ngã 3 vườn thực vật" }, // dist=678.9m bearing=-52.592deg
    scene_06: { textureX: 4, textureY: 4080, style: 'thumb', label: "Chòi canh lửa" }, // dist=720.1m bearing=-90.109deg
    scene_05: { textureX: 5, textureY: 4080, style: 'thumb', label: "Chòi canh lửa (góc 2)" }, // dist=729.0m bearing=-90.136deg
  },
  scene_13: {
    scene_24: { textureX: 8143, textureY: 4720, style: 'arrow', label: "Cổng Trung tâm (góc 2)" }, // dist=26.8m bearing=66.421deg
    scene_26: { textureX: 8165, textureY: 4720, style: 'arrow', label: "Cổng Trung tâm" }, // dist=27.0m bearing=65.865deg
    scene_25: { textureX: 8030, textureY: 4720, style: 'arrow', label: "Cổng Trung tâm (góc 3)" }, // dist=27.4m bearing=69.249deg
    scene_17: { textureX: 11902, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc" }, // dist=352.8m bearing=-27.55deg
    scene_16: { textureX: 11918, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=364.5m bearing=-27.955deg
    scene_11: { textureX: 12105, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=542.3m bearing=-32.634deg
    scene_12: { textureX: 12093, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV" }, // dist=543.0m bearing=-32.315deg
    scene_30: { textureX: 12411, textureY: 4080, style: 'arrow', label: "Bổ sung 04" }, // dist=568.1m bearing=-40.276deg
    scene_10: { textureX: 12536, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật" }, // dist=744.0m bearing=-43.397deg
    scene_09: { textureX: 12531, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật (góc 2)" }, // dist=744.2m bearing=-43.273deg
  },
  scene_14: {
    scene_24: { textureX: 8172, textureY: 4720, style: 'arrow', label: "Cổng Trung tâm (góc 2)" }, // dist=27.2m bearing=65.71deg
    scene_26: { textureX: 8193, textureY: 4720, style: 'arrow', label: "Cổng Trung tâm" }, // dist=27.4m bearing=65.168deg
    scene_25: { textureX: 8059, textureY: 4720, style: 'arrow', label: "Cổng Trung tâm (góc 3)" }, // dist=27.8m bearing=68.514deg
    scene_17: { textureX: 11899, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc" }, // dist=353.1m bearing=-27.483deg
    scene_16: { textureX: 11916, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=364.8m bearing=-27.889deg
    scene_11: { textureX: 12103, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=542.5m bearing=-32.587deg
    scene_12: { textureX: 12091, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV" }, // dist=543.3m bearing=-32.268deg
    scene_30: { textureX: 12409, textureY: 4080, style: 'arrow', label: "Bổ sung 04" }, // dist=568.3m bearing=-40.228deg
    scene_10: { textureX: 12534, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật" }, // dist=744.2m bearing=-43.359deg
    scene_09: { textureX: 12529, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật (góc 2)" }, // dist=744.4m bearing=-43.236deg
  },
  scene_15: {
    scene_24: { textureX: 7962, textureY: 4720, style: 'arrow', label: "Cổng Trung tâm (góc 2)" }, // dist=35.3m bearing=70.944deg
    scene_26: { textureX: 7980, textureY: 4720, style: 'arrow', label: "Cổng Trung tâm" }, // dist=35.5m bearing=70.492deg
    scene_25: { textureX: 7879, textureY: 4720, style: 'arrow', label: "Cổng Trung tâm (góc 3)" }, // dist=36.0m bearing=73.018deg
    scene_17: { textureX: 11849, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc" }, // dist=349.5m bearing=-26.217deg
    scene_16: { textureX: 11867, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=361.1m bearing=-26.669deg
    scene_11: { textureX: 12072, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=538.3m bearing=-31.803deg
    scene_12: { textureX: 12059, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV" }, // dist=539.1m bearing=-31.483deg
    scene_30: { textureX: 12382, textureY: 4080, style: 'arrow', label: "Bổ sung 04" }, // dist=563.1m bearing=-39.544deg
    scene_10: { textureX: 12514, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật" }, // dist=738.6m bearing=-42.861deg
    scene_09: { textureX: 12509, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật (góc 2)" }, // dist=738.8m bearing=-42.737deg
  },
  scene_16: {
    scene_17: { textureX: 5199, textureY: 4720, style: 'thumb', label: "Ngã 3 rừng trắc" }, // dist=12.0m bearing=140.026deg
    scene_11: { textureX: 12482, textureY: 4400, style: 'thumb', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=181.5m bearing=-42.062deg
    scene_12: { textureX: 12443, textureY: 4400, style: 'thumb', label: "Ngã 3 rừng thông - VTV" }, // dist=181.8m bearing=-41.083deg
    scene_30: { textureX: 13217, textureY: 4240, style: 'thumb', label: "Bổ sung 04" }, // dist=225.9m bearing=-60.415deg
    scene_15: { textureX: 4667, textureY: 4240, style: 'thumb', label: "Nhà hành chính Trung tâm" }, // dist=361.1m bearing=153.331deg
    scene_13: { textureX: 4718, textureY: 4240, style: 'thumb', label: "Nhà hành chính (góc 2)" }, // dist=364.5m bearing=152.044deg
    scene_14: { textureX: 4716, textureY: 4240, style: 'thumb', label: "Nhà hành chính (góc 3)" }, // dist=364.8m bearing=152.11deg
    scene_26: { textureX: 4887, textureY: 4240, style: 'thumb', label: "Cổng Trung tâm" }, // dist=367.3m bearing=147.833deg
    scene_24: { textureX: 4885, textureY: 4240, style: 'thumb', label: "Cổng Trung tâm (góc 2)" }, // dist=367.5m bearing=147.875deg
    scene_25: { textureX: 4887, textureY: 4240, style: 'thumb', label: "Cổng Trung tâm (góc 3)" }, // dist=368.9m bearing=147.814deg
    scene_09: { textureX: 13082, textureY: 4080, style: 'thumb', label: "Suối - Vườn thực vật (góc 2)" }, // dist=404.4m bearing=-57.049deg
    scene_10: { textureX: 13091, textureY: 4080, style: 'thumb', label: "Suối - Vườn thực vật" }, // dist=404.5m bearing=-57.277deg
  },
  scene_17: {
    scene_16: { textureX: 12399, textureY: 4720, style: 'thumb', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=12.0m bearing=-39.974deg
    scene_11: { textureX: 12477, textureY: 4400, style: 'thumb', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=193.4m bearing=-41.933deg
    scene_12: { textureX: 12441, textureY: 4400, style: 'thumb', label: "Ngã 3 rừng thông - VTV" }, // dist=193.7m bearing=-41.015deg
    scene_30: { textureX: 13176, textureY: 4240, style: 'thumb', label: "Bổ sung 04" }, // dist=237.1m bearing=-59.404deg
    scene_15: { textureX: 4649, textureY: 4240, style: 'thumb', label: "Nhà hành chính Trung tâm" }, // dist=349.5m bearing=153.782deg
    scene_13: { textureX: 4702, textureY: 4240, style: 'thumb', label: "Nhà hành chính (góc 2)" }, // dist=352.8m bearing=152.449deg
    scene_14: { textureX: 4699, textureY: 4240, style: 'thumb', label: "Nhà hành chính (góc 3)" }, // dist=353.1m bearing=152.517deg
    scene_26: { textureX: 4876, textureY: 4240, style: 'thumb', label: "Cổng Trung tâm" }, // dist=355.4m bearing=148.095deg
    scene_24: { textureX: 4874, textureY: 4240, style: 'thumb', label: "Cổng Trung tâm (góc 2)" }, // dist=355.6m bearing=148.138deg
    scene_25: { textureX: 4877, textureY: 4240, style: 'thumb', label: "Cổng Trung tâm (góc 3)" }, // dist=357.0m bearing=148.074deg
    scene_09: { textureX: 13063, textureY: 4080, style: 'thumb', label: "Suối - Vườn thực vật (góc 2)" }, // dist=415.8m bearing=-56.565deg
    scene_10: { textureX: 13071, textureY: 4080, style: 'thumb', label: "Suối - Vườn thực vật" }, // dist=416.0m bearing=-56.787deg
  },
  scene_18: {
    scene_23: { textureX: 8348, textureY: 4080, style: 'arrow', label: "Giọt nước làng" }, // dist=503.3m bearing=61.292deg
    scene_22: { textureX: 8346, textureY: 4080, style: 'arrow', label: "Giọt nước làng (góc 2)" }, // dist=504.0m bearing=61.347deg
  },
  scene_19: {
    scene_23: { textureX: 8346, textureY: 4080, style: 'arrow', label: "Giọt nước làng" }, // dist=502.8m bearing=61.346deg
    scene_22: { textureX: 8344, textureY: 4080, style: 'arrow', label: "Giọt nước làng (góc 2)" }, // dist=503.6m bearing=61.402deg
  },
  scene_20: {
    scene_21: { textureX: 8175, textureY: 4240, style: 'arrow', label: "Khu dân cư vùng đệm" }, // dist=336.3m bearing=65.628deg
    scene_01: { textureX: 4451, textureY: 4080, style: 'arrow', label: "Ngã ba keo úc" }, // dist=486.7m bearing=158.716deg
    scene_02: { textureX: 2748, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông" }, // dist=796.0m bearing=-158.709deg
  },
  scene_21: {
    scene_20: { textureX: 975, textureY: 4240, style: 'arrow', label: "Ruộng lúa" }, // dist=336.3m bearing=-114.371deg
    scene_01: { textureX: 3106, textureY: 4080, style: 'arrow', label: "Ngã ba keo úc" }, // dist=606.3m bearing=-167.651deg
  },
  scene_22: {
    scene_19: { textureX: 1144, textureY: 4080, style: 'arrow', label: "Đỉnh 1032m" }, // dist=503.6m bearing=-118.597deg
    scene_18: { textureX: 1146, textureY: 4080, style: 'arrow', label: "Đỉnh 1032m (góc 2)" }, // dist=504.0m bearing=-118.652deg
    scene_28: { textureX: 6486, textureY: 4080, style: 'arrow', label: "Bổ sung 02" }, // dist=519.3m bearing=107.862deg
  },
  scene_23: {
    scene_19: { textureX: 1146, textureY: 4080, style: 'arrow', label: "Đỉnh 1032m" }, // dist=502.8m bearing=-118.653deg
    scene_18: { textureX: 1148, textureY: 4080, style: 'arrow', label: "Đỉnh 1032m (góc 2)" }, // dist=503.3m bearing=-118.707deg
    scene_28: { textureX: 6486, textureY: 4080, style: 'arrow', label: "Bổ sung 02" }, // dist=520.2m bearing=107.839deg
  },
  scene_24: {
    scene_13: { textureX: 943, textureY: 4720, style: 'arrow', label: "Nhà hành chính (góc 2)" }, // dist=26.8m bearing=-113.579deg
    scene_14: { textureX: 972, textureY: 4720, style: 'arrow', label: "Nhà hành chính (góc 3)" }, // dist=27.2m bearing=-114.29deg
    scene_15: { textureX: 762, textureY: 4720, style: 'arrow', label: "Nhà hành chính Trung tâm" }, // dist=35.3m bearing=-109.056deg
    scene_17: { textureX: 12074, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc" }, // dist=355.6m bearing=-31.861deg
    scene_16: { textureX: 12085, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=367.5m bearing=-32.125deg
    scene_11: { textureX: 12216, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=547.1m bearing=-35.406deg
    scene_12: { textureX: 12203, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV" }, // dist=547.8m bearing=-35.087deg
    scene_30: { textureX: 12513, textureY: 4080, style: 'arrow', label: "Bổ sung 04" }, // dist=576.4m bearing=-42.828deg
    scene_10: { textureX: 12613, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật" }, // dist=753.5m bearing=-45.314deg
    scene_09: { textureX: 12608, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật (góc 2)" }, // dist=753.7m bearing=-45.192deg
  },
  scene_25: {
    scene_13: { textureX: 830, textureY: 4720, style: 'arrow', label: "Nhà hành chính (góc 2)" }, // dist=27.4m bearing=-110.751deg
    scene_14: { textureX: 859, textureY: 4720, style: 'arrow', label: "Nhà hành chính (góc 3)" }, // dist=27.8m bearing=-111.486deg
    scene_15: { textureX: 679, textureY: 4720, style: 'arrow', label: "Nhà hành chính Trung tâm" }, // dist=36.0m bearing=-106.982deg
    scene_17: { textureX: 12077, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc" }, // dist=357.0m bearing=-31.925deg
    scene_16: { textureX: 12087, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=368.9m bearing=-32.185deg
    scene_11: { textureX: 12218, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=548.6m bearing=-35.438deg
    scene_12: { textureX: 12205, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV" }, // dist=549.2m bearing=-35.12deg
    scene_30: { textureX: 12514, textureY: 4080, style: 'arrow', label: "Bổ sung 04" }, // dist=577.9m bearing=-42.84deg
    scene_10: { textureX: 12613, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật" }, // dist=755.0m bearing=-45.318deg
    scene_09: { textureX: 12608, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật (góc 2)" }, // dist=755.2m bearing=-45.196deg
  },
  scene_26: {
    scene_13: { textureX: 965, textureY: 4720, style: 'arrow', label: "Nhà hành chính (góc 2)" }, // dist=27.0m bearing=-114.135deg
    scene_14: { textureX: 993, textureY: 4720, style: 'arrow', label: "Nhà hành chính (góc 3)" }, // dist=27.4m bearing=-114.832deg
    scene_15: { textureX: 780, textureY: 4720, style: 'arrow', label: "Nhà hành chính Trung tâm" }, // dist=35.5m bearing=-109.508deg
    scene_17: { textureX: 12076, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc" }, // dist=355.4m bearing=-31.905deg
    scene_16: { textureX: 12087, textureY: 4240, style: 'arrow', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=367.3m bearing=-32.167deg
    scene_11: { textureX: 12217, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=546.9m bearing=-35.436deg
    scene_12: { textureX: 12205, textureY: 4080, style: 'arrow', label: "Ngã 3 rừng thông - VTV" }, // dist=547.5m bearing=-35.116deg
    scene_30: { textureX: 12514, textureY: 4080, style: 'arrow', label: "Bổ sung 04" }, // dist=576.2m bearing=-42.858deg
    scene_10: { textureX: 12614, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật" }, // dist=753.3m bearing=-45.338deg
    scene_09: { textureX: 12609, textureY: 4080, style: 'arrow', label: "Suối - Vườn thực vật (góc 2)" }, // dist=753.5m bearing=-45.215deg
  },
  scene_27: {
    scene_29: { textureX: 4656, textureY: 4000, style: 'arrow', label: "Bổ sung 03" }, // dist=1424.6m bearing=153.589deg
  },
  scene_28: {
    scene_22: { textureX: 13685, textureY: 4080, style: 'arrow', label: "Giọt nước làng (góc 2)" }, // dist=519.3m bearing=-72.136deg
    scene_23: { textureX: 13686, textureY: 4080, style: 'arrow', label: "Giọt nước làng" }, // dist=520.2m bearing=-72.16deg
    scene_29: { textureX: 9409, textureY: 4080, style: 'arrow', label: "Bổ sung 03" }, // dist=546.5m bearing=34.785deg
  },
  scene_29: {
    scene_28: { textureX: 2209, textureY: 4080, style: 'arrow', label: "Bổ sung 02" }, // dist=546.5m bearing=-145.214deg
    scene_27: { textureX: 11856, textureY: 4000, style: 'arrow', label: "Bổ sung 01" }, // dist=1424.6m bearing=-26.41deg
  },
  scene_30: {
    scene_11: { textureX: 7889, textureY: 4560, style: 'thumb', label: "Ngã 3 rừng thông - VTV (góc 2)" }, // dist=78.4m bearing=72.765deg
    scene_12: { textureX: 7933, textureY: 4560, style: 'thumb', label: "Ngã 3 rừng thông - VTV" }, // dist=81.1m bearing=71.682deg
    scene_09: { textureX: 12912, textureY: 4400, style: 'thumb', label: "Suối - Vườn thực vật (góc 2)" }, // dist=179.4m bearing=-52.81deg
    scene_10: { textureX: 12933, textureY: 4400, style: 'thumb', label: "Suối - Vườn thực vật" }, // dist=179.4m bearing=-53.326deg
    scene_16: { textureX: 6017, textureY: 4240, style: 'thumb', label: "Ngã 3 rừng trắc (góc 2)" }, // dist=225.9m bearing=119.585deg
    scene_17: { textureX: 5976, textureY: 4240, style: 'thumb', label: "Ngã 3 rừng trắc" }, // dist=237.1m bearing=120.595deg
    scene_15: { textureX: 5182, textureY: 4080, style: 'thumb', label: "Nhà hành chính Trung tâm" }, // dist=563.1m bearing=140.455deg
    scene_13: { textureX: 5211, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 2)" }, // dist=568.1m bearing=139.724deg
    scene_14: { textureX: 5209, textureY: 4080, style: 'thumb', label: "Nhà hành chính (góc 3)" }, // dist=568.3m bearing=139.771deg
    scene_26: { textureX: 5314, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm" }, // dist=576.2m bearing=137.141deg
    scene_24: { textureX: 5313, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 2)" }, // dist=576.4m bearing=137.171deg
    scene_25: { textureX: 5314, textureY: 4080, style: 'thumb', label: "Cổng Trung tâm (góc 3)" }, // dist=577.9m bearing=137.16deg
    scene_04: { textureX: 12662, textureY: 4080, style: 'thumb', label: "Ngã 3 vườn thực vật" }, // dist=636.7m bearing=-46.552deg
    scene_06: { textureX: 14314, textureY: 4080, style: 'thumb', label: "Chòi canh lửa" }, // dist=643.6m bearing=-87.853deg
    scene_05: { textureX: 14317, textureY: 4080, style: 'thumb', label: "Chòi canh lửa (góc 2)" }, // dist=652.5m bearing=-87.914deg
  },
};

export function getLinkStyle(sceneId, targetSceneId) {
  const overrideStyle = HOTSPOT_OVERRIDES[sceneId]?.[targetSceneId]?.style;
  if (overrideStyle) return overrideStyle;
  return getSceneMode(sceneId) === 'overview' ? 'thumb' : 'arrow';
}
