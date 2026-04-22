#!/bin/bash
set -euo pipefail

LOG_FILE="/var/log/install-bundled-apps.log"
exec >> "$LOG_FILE" 2>&1

mkdir -p /var/lib/thrill

# shellcheck disable=SC1091
[ -f /etc/thrill/thrill.env ] && . /etc/thrill/thrill.env

echo "$(date): Starting bundled package/app installation..."

if [ "${THRILL_SKIP_BUNDLED_PACKAGES:-false}" = "true" ]; then
    echo "$(date): Skipping bundled package installation by policy."
    touch /var/lib/thrill/bundled-apps.ready
    exit 0
fi

manifest="/opt/thrill/bundled-packages.txt"
packages=()

if [ -f "$manifest" ]; then
    while IFS= read -r line; do
        line="${line%%#*}"
        line="${line#"${line%%[![:space:]]*}"}"
        line="${line%"${line##*[![:space:]]}"}"
        [ -n "$line" ] && packages+=("$line")
    done < "$manifest"
fi

if [ ${#packages[@]} -gt 0 ] && [ "${APT_FALLBACK_ONLINE:-true}" = "true" ]; then
    apt-get update
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends "${packages[@]}"
fi

touch /var/lib/thrill/bundled-apps.ready
echo "$(date): Bundled package/app installation finished."
