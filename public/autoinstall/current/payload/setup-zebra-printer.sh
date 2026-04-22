#!/bin/bash
set -euo pipefail

LOG_FILE="/var/log/setup-zebra-printer.log"
exec >> "$LOG_FILE" 2>&1

# shellcheck disable=SC1091
[ -f /etc/thrill/thrill.env ] && . /etc/thrill/thrill.env

mkdir -p /var/lib/thrill

if lpstat -p "${PRINTER_NAME:-Zebra_ZT410}" >/dev/null 2>&1; then
  lpadmin -d "${PRINTER_NAME:-Zebra_ZT410}"
  lpoptions -d "${PRINTER_NAME:-Zebra_ZT410}" || true
  touch /var/lib/thrill/printer.ready
  exit 0
fi

WAITED=0
MAX_WAIT=30

while ! systemctl is-active --quiet cups.service; do
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    break
  fi
  sleep 5
  WAITED=$((WAITED + 5))
done

sleep 15

lpadmin -p "${PRINTER_NAME:-Zebra_ZT410}" -E -v "${PRINTER_URI:-socket://192.168.0.254:9100}" -m raw
lpadmin -d "${PRINTER_NAME:-Zebra_ZT410}"
lpoptions -d "${PRINTER_NAME:-Zebra_ZT410}" || true
touch /var/lib/thrill/printer.ready
