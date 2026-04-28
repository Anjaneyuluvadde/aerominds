from PIL import Image
import os

def remove_white_background(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return
        
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # Use a threshold (240-255) to catch almost-white pixels too (for anti-aliasing)
    for item in datas:
        # item is (R, G, B, A)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            # Match white: make it transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent logo to {output_path}")

# Run for the header logo
remove_white_background("assets/images/logo_header_raw.png", "assets/images/logo_header_transparent.png")
