import os
import json
import math
from PIL import Image
import piexif

ORIGINAL_DIR = r"D:\TourProject\original"
OUTPUT_FILE  = r"D:\TourProject\gps_data.json"

# Mapping tên file gốc → scene_id (từ scene_mapping.txt)
SCENE_MAPPING = {
    "01_Ngã ba keo úc.JPG":                          "scene_01",
    "02_Ngã 3 rừng thông.JPG":                       "scene_02",
    "03_Ngã 4 KonBrung.JPG":                         "scene_03",
    "04_Ngã 3 vườn thực vật.JPG":                    "scene_04",
    "05_Chòi canh lửa (2).JPG":                      "scene_05",
    "05_Chòi canh lửa.JPG":                          "scene_06",
    "06_964 - Mốc toạ độ Quốc gia (2).JPG":         "scene_07",
    "06_964 - Mốc toạ độ Quốc gia.JPG":             "scene_08",
    "07_Suối - vườn thực vật (2).JPG":               "scene_09",
    "07_Suối - vườn thực vật.JPG":                   "scene_10",
    "08_Ngã 3 rừng thông - Vườn thực vật (2).JPG":  "scene_11",
    "08_Ngã 3 rừng thông - vườn thực vật.JPG":      "scene_12",
    "09_Nhà hành chính Trung tâm (2).JPG":           "scene_13",
    "09_Nhà hành chính Trung tâm (3).JPG":           "scene_14",
    "09_Nhà hành chính Trung tâm.JPG":               "scene_15",
    "10_Ngã 3 rừng trắc (2).JPG":                   "scene_16",
    "10_Ngã 3 rừng trắc.JPG":                       "scene_17",
    "11_Đỉnh 1032m (2).JPG":                        "scene_18",
    "11_Đỉnh 1032m.JPG":                            "scene_19",
    "12_Ruộng lúa.JPG":                             "scene_20",
    "13_Khu dân cư vùng đệm.JPG":                   "scene_21",
    "14_Giọt nước làng (2).JPG":                    "scene_22",
    "14_Giọt nước làng.JPG":                        "scene_23",
    "15_Cổng Trung tâm (2).JPG":                    "scene_24",
    "15_Cổng Trung tâm (3).JPG":                    "scene_25",
    "15_Cổng Trung tâm.JPG":                        "scene_26",
    "16_Bổ sung 01.JPG":                            "scene_27",
    "17_Bổ sung 02.JPG":                            "scene_28",
    "18_Bổ sung 03.JPG":                            "scene_29",
    "19_Bổ sung 04.JPG":                            "scene_30",
}

def to_degrees(value):
    """Chuyển GPS rational sang degrees thập phân"""
    d = value[0][0] / value[0][1]
    m = value[1][0] / value[1][1]
    s = value[2][0] / value[2][1]
    return d + (m / 60.0) + (s / 3600.0)

def get_gps(filepath):
    try:
        img = Image.open(filepath)
        exif_data = piexif.load(img.info.get("exif", b""))
        gps = exif_data.get("GPS", {})

        if not gps:
            return None

        lat  = to_degrees(gps[piexif.GPSIFD.GPSLatitude])
        lng  = to_degrees(gps[piexif.GPSIFD.GPSLongitude])
        lat_ref = gps.get(piexif.GPSIFD.GPSLatitudeRef, b'N').decode()
        lng_ref = gps.get(piexif.GPSIFD.GPSLongitudeRef, b'E').decode()

        if lat_ref == 'S': lat = -lat
        if lng_ref == 'W': lng = -lng

        # Heading (hướng máy ảnh khi chụp)
        heading = None
        if piexif.GPSIFD.GPSImgDirection in gps:
            h = gps[piexif.GPSIFD.GPSImgDirection]
            heading = round(h[0] / h[1], 2)

        return {"lat": round(lat, 7), "lng": round(lng, 7), "heading": heading}

    except Exception as e:
        print(f"  ⚠️  Lỗi đọc GPS: {e}")
        return None

# ── Main ──────────────────────────────────────────────────────────────────────
results = {}
print("🔍 Đang đọc GPS từ ảnh gốc...\n")

for filename, scene_id in SCENE_MAPPING.items():
    filepath = os.path.join(ORIGINAL_DIR, filename)
    if not os.path.exists(filepath):
        print(f"  ❌ Không tìm thấy: {filename}")
        results[scene_id] = {"file": filename, "gps": None}
        continue

    gps = get_gps(filepath)
    if gps:
        print(f"  ✅ {scene_id}: lat={gps['lat']}, lng={gps['lng']}, heading={gps['heading']}")
    else:
        print(f"  ⚠️  {scene_id}: Không có GPS — {filename}")

    results[scene_id] = {"file": filename, "gps": gps}

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\n✅ Đã lưu kết quả vào: {OUTPUT_FILE}")
