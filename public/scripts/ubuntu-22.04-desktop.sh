#!/usr/bin/env bash
set -euo pipefail

if [ "${EUID}" -ne 0 ]; then
  echo "Run this script as root. Example:"
  echo "wget -qO- https://techmore.github.io/thril/scripts/ubuntu-22.04-desktop.sh | sudo bash"
  exit 1
fi

if [ -r /etc/os-release ]; then
  # shellcheck disable=SC1091
  . /etc/os-release
  if [ "${ID:-}" != "ubuntu" ] || [ "${VERSION_ID:-}" != "22.04" ]; then
    echo "This installer is intended for Ubuntu 22.04."
    echo "Detected: ${PRETTY_NAME:-unknown}"
    exit 1
  fi
fi

export DEBIAN_FRONTEND=noninteractive

BASE_URL="https://techmore.github.io/thril/autoinstall/current/payload"
TMP_DIR="$(mktemp -d /tmp/thril-desktop.XXXXXX)"

cleanup() {
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

echo "Installing THRIL desktop fallback on Ubuntu 22.04..."
apt-get update
apt-get install -y wget curl ca-certificates cups cockpit

mkdir -p /tmp/thrill

for file in \
  setup.sh \
  install-bundled-apps.sh \
  install-chromium.sh \
  setup-zebra-printer.sh \
  tty1-ip-display.sh \
  packit-kiosk.sh \
  packit.desktop \
  serial_scale.json \
  thrill.env \
  bundled-packages.txt
do
  wget -q -O "/tmp/thrill/${file}" "${BASE_URL}/${file}"
done

cat >> /tmp/thrill/thrill.env <<'EOF'
THRILL_SKIP_WIFI_CONFIG="true"
THRILL_SKIP_BUNDLED_PACKAGES="true"
THRILL_SKIP_TTY1_IP_DISPLAY="true"
EOF

bash -x /tmp/thrill/setup.sh | tee /var/log/thrill-desktop-bootstrap.log

systemctl start install-bundled-apps.service || true
systemctl start install-chromium.service || true
systemctl start setup-zebra-printer.service || true

echo
echo "THRIL desktop fallback install finished."
echo "Logs:"
echo "  /var/log/thrill-desktop-bootstrap.log"
echo "  /var/log/install-chromium.log"
echo "  /var/log/setup-zebra-printer.log"
echo
echo "Reboot recommended before handing the station to an operator."
