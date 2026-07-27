#!/usr/bin/env python3
"""One-step label printer for Zebra ZTC 110Xi4-203dpi ZPL."""
import argparse, os, subprocess, sys, tempfile
from zipfile import ZipFile
from pathlib import Path
from PIL import Image


def extract_image(docx_path):
    with ZipFile(docx_path) as z:
        image_name = next(n for n in z.namelist() if n.startswith("word/media/"))
        with z.open(image_name) as f:
            return Image.open(f).convert("RGB")


def generate_zpl(img, scale=4, rotate=0):
    if rotate:
        img = img.rotate(rotate, expand=True)
    img = img.convert("1")
    w, h = img.size
    img = img.resize((w * scale, h * scale), Image.NEAREST)
    w, h = img.size
    bpr = (w + 7) // 8
    pixels = list(img.getdata())
    rows = []
    for y in range(h):
        row = []
        for bx in range(bpr):
            bv = 0
            for bi in range(8):
                idx = y * w + bx * 8 + bi
                if idx < y * w + w:
                    p = pixels[idx]
                    bv = (bv << 1) | (0 if p else 1)
                else:
                    bv <<= 1
            row.append(bv)
        rows.append("".join(f"{b:02X}" for b in row))
    data = "".join(rows)
    tb = bpr * h
    lp = 80
    sp = 120
    tm = 30
    lm = 60
    return f"^XA\n^LL{h+lp}\n^PW{w+sp}\n^LS0\n^FO{lm},{tm}^GFA,{tb},{tb},{bpr},{data}^FS\n^XZ"


def send_to_printer(zpl):
    with tempfile.NamedTemporaryFile(mode="w", suffix=".zpl", delete=False) as f:
        f.write(zpl)
        tmp = f.name
    try:
        r = subprocess.run(
            ["lp", "-d", "Zebra", "-o", "raw", tmp],
            capture_output=True, text=True, timeout=30
        )
        if r.returncode != 0:
            print(f"ERROR: {r.stderr.strip()}")
            return False
        print(f"Sent: {r.stdout.strip()}")
        return True
    except subprocess.TimeoutExpired:
        print("ERROR: lp command timed out")
        return False
    finally:
        os.unlink(tmp)


def main():
    ap = argparse.ArgumentParser(description="Print a label from a .docx to the Zebra printer")
    ap.add_argument("docx", help="Path to the .docx file")
    ap.add_argument("--scale", type=int, default=4, choices=[3, 4, 5],
                    help="Scale factor (3=2.85\", 4=3.80\", 5=4.75\")")
    ap.add_argument("--rotate", type=int, default=0,
                    help="Rotate image by degrees (180 for upside-down fix)")
    ap.add_argument("--no-print", action="store_true",
                    help="Only generate ZPL, don't send to printer")
    args = ap.parse_args()

    if not os.path.exists(args.docx):
        print(f"File not found: {args.docx}")
        sys.exit(1)

    print(f"Extracting image from {Path(args.docx).name}...")
    img = extract_image(args.docx)
    print(f"  Image size: {img.size[0]}x{img.size[1]} pixels")

    if args.rotate:
        print(f"  Rotating {args.rotate} degrees...")

    print(f"Generating ZPL (scale={args.scale})...")
    zpl = generate_zpl(img, args.scale, args.rotate)

    output_name = Path(args.docx).stem.replace(" ", "_") + ".zpl"
    output_path = Path("UPC Labels") / output_name if Path("UPC Labels").exists() else Path(output_name)
    with open(output_path, "w") as f:
        f.write(zpl)
    print(f"  Saved: {output_path}")

    if not args.no_print:
        print("Sending to printer...")
        if send_to_printer(zpl):
            print("  Done! Check the printout.")
        else:
            print("  FAILED. Try: reboot the printer, then run again.")
    else:
        print(f"  (--no-print: not sent)")


if __name__ == "__main__":
    main()
