from PIL import Image
from pathlib import Path

scale = 3
input_path = Path("UPC Labels/AKV_GRAY_PSA_RETAIL.png")
output_path = Path("UPC Labels/AKV_GRAY_PSA_RETAIL_fixed.zpl")
img = Image.open(input_path).convert("1")
w, h = img.size
img = img.resize((w * scale, h * scale), Image.NEAREST)
w, h = img.size

bytes_per_row = (w + 7) // 8
pixels = list(img.getdata())
hex_rows = []
for y in range(h):
    row_bytes = []
    for byte_idx in range(bytes_per_row):
        byte_val = 0
        for bit_idx in range(8):
            px_idx = y * w + byte_idx * 8 + bit_idx
            if px_idx < y * w + w:
                px = pixels[px_idx]
                bit = 0 if px else 1
                byte_val = (byte_val >> 1) | (bit << 7)
            else:
                byte_val >>= 1
        row_bytes.append(byte_val)
    hex_rows.append("".join(f"{b:02X}" for b in row_bytes))
hex_str = "".join(hex_rows)
total_bytes = bytes_per_row * h

bottom_padding = 80
side_padding   = 120
top_margin     = 30
left_margin    = 60

label_h = h + bottom_padding
label_w = w + side_padding

zpl = f"^XA\n^PON\n^FWN\n^LL{label_h}\n^PW{label_w}\n^LS0\n^FO{left_margin},{top_margin}^GFA,{total_bytes},{total_bytes},{bytes_per_row},{hex_str}^FS\n^XZ"

with open(output_path, "w") as f:
    f.write(zpl)

print(f"Saved {output_path}  ({w}x{h} dots = {w/203:.2f}\" x {h/203:.2f}\" at 203 DPI)")
