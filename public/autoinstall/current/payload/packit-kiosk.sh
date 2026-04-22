#!/bin/bash
set -euo pipefail

STATE_DIR="${XDG_STATE_HOME:-$HOME/.local/state}/thrill"
mkdir -p "$STATE_DIR"
LOG_FILE="$STATE_DIR/packit-kiosk.log"
exec >> "$LOG_FILE" 2>&1

# shellcheck disable=SC1091
[ -f /etc/thrill/thrill.env ] && . /etc/thrill/thrill.env

echo "$(date): Packit kiosk launcher starting..."

MAX_WAIT=900
WAITED=0

while [ ! -f /var/lib/thrill/chromium.ready ]; do
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "$(date): Timeout waiting for Chromium installation. Aborting."
    exit 1
  fi

  if [ -x /snap/bin/chromium ] || command -v chromium >/dev/null 2>&1; then
    echo "$(date): Chromium binary detected."
    break
  fi

  echo "$(date): Chromium not ready yet. Waiting 10s..."
  sleep 10
  WAITED=$((WAITED + 10))
done

sleep 5

exec /snap/bin/chromium \
  --kiosk \
  --app="${PACKIT_URL:-https://packit.thril-usa.com/}" \
  --kiosk-printing \
  --no-first-run \
  --disable-infobars \
  --disable-restore-session-state \
  --disable-session-crashed-bubble \
  --password-store=basic
