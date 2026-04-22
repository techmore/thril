#!/bin/bash
set -uo pipefail

# shellcheck disable=SC1091
[ -f /etc/thrill/thrill.env ] && . /etc/thrill/thrill.env

MAX_WAIT=300
WAITED=0

while true; do
  IP=$(ip -4 addr show "${WIFI_INTERFACE:-wlp1s0}" 2>/dev/null | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | head -n 1)
  if [ -n "$IP" ]; then
    printf "\033[2J\033[H" > /dev/tty1
    printf "\n\n" > /dev/tty1
    printf "========================================\n" > /dev/tty1
    printf "        THRIL KIOSK BOOT INFO          \n" > /dev/tty1
    printf "========================================\n" > /dev/tty1
    printf "  Wi-Fi Interface: %-20s\n" "${WIFI_INTERFACE:-wlp1s0}" > /dev/tty1
    printf "  IP Address:      %s\n" "$IP" > /dev/tty1
    printf "  SSID:            %-20s\n" "${WIFI_SSID:-Thril}" > /dev/tty1
    printf "========================================\n" > /dev/tty1
    printf "\n\n" > /dev/tty1
    break
  fi

  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    printf "\n\nTHRIL KIOSK: Could not obtain Wi-Fi IP within 5 minutes.\n\n" > /dev/tty1
    break
  fi

  sleep 5
  WAITED=$((WAITED + 5))
done
