import os
from PIL import Image

PREVIEW_DIR = r"D:\TourProject\preview"
THUMB_DIR   = r"D:\TourProject\web\thumbs"

os.makedirs(THUMB_DIR, exist_ok=True)

files = [f for f in os.listdir(PREVIEW_DIR) if f.endswith(".jpg")]
print(f"🔍 Tìm thấy {len(files)} preview...\n")

for filename in sorted(files):
    src  = os.path.join(PREVIEW_DIR, filename)
    dst  = os.path.join(THUMB_DIR, filename)
    img  = Image.open(src)
    img  = img.resize((200, 100), Image.LANCZOS)
    img.save(dst, "JPEG", quality=80)
    print(f"  ✅ {filename} → thumbs/{filename}")

print(f"\n✅ Xong! {len(files)} thumbnail trong: {THUMB_DIR}")
