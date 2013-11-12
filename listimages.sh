#!/bin/bash -e

img_path="${1:-.}"
img_path="${img_path%/}"

function find_images {
    find "$img_path" -type f \
        -iname "*.jpg" -o \
        -iname "*.jpeg" -o \
        -iname "*.png" -o \
        -iname "*.gif"
}

images=$(find_images)
image_paths=(${images//\n/ })

echo "window.imagelist = ["

for img in "${image_paths[@]::${#image_paths[@]}-1}"
do
    echo "\"${img#./}\","
done

last_file=${image_paths[@]: -1:1}
echo "\"${last_file#./}\""
echo "];"
