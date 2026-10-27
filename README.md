# Thril

Thril is a static, wiki-style site for shop-floor and quality documentation:
an ISO 9001:2015 QMS hub plus equipment guides for the poly bagger, CCS stock
fixtures and the shop compressor.

Live site (GitHub Pages): https://techmore.github.io/thril/

## Run or deploy

There is no build step. The pages are plain HTML with inline CSS/JS (fonts and
icons load from Google Fonts and jsDelivr).

- Preview locally: open `index.html` in a browser, or run
  `python3 -m http.server` in the repo root and visit http://localhost:8000.
- Deploy: push to the default branch; GitHub Pages serves the repo root.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Home page: QMS wiki for ISO 9001:2015, links to the guides below |
| `iso9001_implementation_roadmap.html` | ISO 9001 implementation roadmap (HTML fragment, linked from the home page) |
| `poly-bagger.html` | Poly bagger guide: label printing, machine setup, bag change, sealing, end of day |
| `operator-menu.html` | Poly bagger operator menu reference |
| `ccs-stocks.html` | CCS stock devices, fixes and digital firmware notes |
| `fortress-compressor.html` | Fortress pancake compressor notes |
| `manufacturing-resources.html` | Production methods, equipment and cost |
| `poly-bagger/` | Label tooling and bagger reference material (see below) |
| `firmware/ccs-stock-digital/v1/` | CCS digital stock Arduino sketch, zip, SHA256 sums and repair notes |
| `bagger-usb-backup/` | Backup of the bagger's USB recipe/sample data |

### `poly-bagger/`

- `print_label.py`: converts a UPC label `.docx` to ZPL and sends it to the
  Zebra printer with `lp -o raw`. Needs Python 3 and Pillow.

  ```bash
  cd poly-bagger
  python3 print_label.py "UPC Labels/LABEL.docx" --rotate 180   # generate and print
  python3 print_label.py "UPC Labels/LABEL.docx" --no-print     # generate only
  ```

- `generate_fixed.py`: one-off PNG-to-ZPL conversion script.
- `UPC Labels/`: label sources (`.docx`, `.nlbl`) and generated `.png`/`.zpl`.
- `UPC_Label_Bagger_Workflow*.html/.txt`: label workflow write-ups.
- `diagrams/`, `images/`, `media/`: threading diagrams, screen photos, the
  T-1000 operation manual and a film-threading video.
- `AGENTS.md`: printer rules learned the hard way (no `^PON`/`^FWN`, raw
  printing, bit order, 180° rotation). Read it before changing label output.

## Status

In active use as an internal reference. Content is updated as equipment
procedures change; there are no tests or CI.
