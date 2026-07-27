# Poly Bagger Printer — AI Context Summary

## Project
Print UPC barcode labels from .docx files → ZPL → Zebra ZTC 110Xi4-203dpi ZPL (203 DPI thermal transfer). Labels feed into an Advanced Poly T-1000 bagger machine.

## Critical Rules (learned the hard way)

1. **NEVER use `^PON` or `^FWN` in ZPL** — This printer rejects jobs with those commands ("Zebra is not ready"). Orient the image in Python instead.

2. **Reboot printer to clear errors** — After a bad ZPL, CUPS re-enable won't fix it. The printer needs a power cycle.

3. **Bit ordering** — `byte_val = (byte_val << 1) | bit` where `bit = 0 if px else 1`. First pixel = MSB = leftmost dot. Do NOT reverse bits.

4. **"Flip" = 180° rotation** (upside down ↔ right-side up). Never mirror/flip left-right.

5. **`-o raw` is mandatory** — Without it macOS converts ZPL to raster = garbled.

## Quick Commands

```bash
# One-step automated
python3 print_label.py "UPC Labels/LABEL.docx" --rotate 180

# Generate only
python3 print_label.py "UPC Labels/LABEL.docx" --no-print

# Send existing ZPL
lp -d Zebra -o raw "UPC Labels/LABEL.zpl"

# Check status
lpq -P Zebra
lpstat -p Zebra

# Reboot needed? Cancel + re-enable first:
cancel -a Zebra
cupsenable Zebra
```

## Printer Info
- Model: Zebra ZTC 110Xi4-203dpi ZPL
- Serial: JJL100932
- Connection: USB (usb://Zebra%20Technologies/ZTC%20110Xi4-203dpi%20ZPL?serial=JJL100932)
- DPI: 203
- Queue name: Zebra

## Label Pipeline
.docx → extract image (from word/media/) → optionally rotate 180° → convert to 1-bit → scale (4x = 3.80") → encode as ^GFA hex → wrap in minimal ZPL (^XA ^LL ^PW ^LS0 ^FO ^GFA ^FS ^XZ) → `lp -d Zebra -o raw`

## Padding (adjust if cut off)
- bottom_padding = 80
- side_padding = 120
- top_margin = 30
- left_margin = 60

## Scale Reference (at 203 DPI)
| Scale | Image dots | Physical size |
|-------|-----------|---------------|
| 3×    | 579×150   | 2.85" × 0.74" |
| 4×    | 772×200   | 3.80" × 0.99" |
| 5×    | 965×250   | 4.75" × 1.23" |

## Docs
- `UPC_Label_Bagger_Workflow_v3.html` — full documentation
- `print_label.py` — automated one-step script
- `UPC Labels/*.docx` — source label files
- `UPC Labels/*.zpl` — generated ZPL files
