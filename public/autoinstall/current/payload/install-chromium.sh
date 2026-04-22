#!/bin/bash
set -euo pipefail

LOG_FILE="/var/log/install-chromium.log"
exec >> "$LOG_FILE" 2>&1

echo "$(date): Starting Chromium installation check..."
mkdir -p /var/lib/thrill

if [ -x /snap/bin/chromium ]; then
    echo "$(date): Chromium already installed."
    touch /var/lib/thrill/chromium.ready
    exit 0
fi

MAX_WAIT=600
WAITED=0

until ping -c 1 -W 5 api.snapcraft.io >/dev/null 2>&1; do
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "$(date): Timeout waiting for api.snapcraft.io. Exiting."
    exit 1
  fi
  echo "$(date): api.snapcraft.io unreachable. Waiting 5s..."
  sleep 5
  WAITED=$((WAITED + 5))
done

echo "$(date): api.snapcraft.io is reachable. Installing Chromium..."
snap install chromium

if [ ! -x /snap/bin/chromium ]; then
    echo "$(date): Chromium install completed but /snap/bin/chromium is missing."
    exit 1
fi

touch /var/lib/thrill/chromium.ready
echo "$(date): Chromium installation complete."
