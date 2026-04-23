@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ================================
echo  TILE GENERATOR - PSV TOUR
echo ================================

set INPUT_DIR=original
set TILES_DIR=tiles
set PREVIEW_DIR=preview

:: Tạo thư mục output
if not exist "%TILES_DIR%" mkdir "%TILES_DIR%"
if not exist "%PREVIEW_DIR%" mkdir "%PREVIEW_DIR%"

:: Đếm và đặt tên theo số thứ tự — bỏ qua tên gốc có dấu
set COUNT=0

for %%f in ("%INPUT_DIR%\*.JPG" "%INPUT_DIR%\*.jpg") do (
    set /a COUNT+=1

    :: Đặt tên output theo số thứ tự: scene_01, scene_02...
    set "NUM=0!COUNT!"
    set "NUM=!NUM:~-2!"
    set "SCENE_ID=scene_!NUM!"

    echo.
    echo [!COUNT!] Processing: %%~nf
    echo       Output ID : !SCENE_ID!
    echo -------------------

    :: Tạo thư mục riêng cho scene này
    if not exist "%TILES_DIR%\!SCENE_ID!" (
        mkdir "%TILES_DIR%\!SCENE_ID!"
    )

    :: Tạo tiles 900x900
    magick "%%f" ^
        -crop 900x900 ^
        -quality 90 ^
        -set filename:col "%%[fx:page.x/900]" ^
        -set filename:row "%%[fx:page.y/900]" ^
        "%TILES_DIR%\!SCENE_ID!\tile_%%[filename:col]_%%[filename:row].jpg"

    :: Tạo preview nhỏ
    magick "%%f" ^
        -resize 1800x900 ^
        -quality 75 ^
        "%PREVIEW_DIR%\!SCENE_ID!_preview.jpg"

    :: Lưu mapping tên gốc → scene_id vào file log
    echo !SCENE_ID! = %%~nf >> scene_mapping.txt

    echo Done: !SCENE_ID!
)

echo.
echo ================================
echo  TOTAL: %COUNT% scenes processed
echo  Check scene_mapping.txt for ID mapping
echo ================================
pause
