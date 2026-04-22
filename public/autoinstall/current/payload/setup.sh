#!/bin/bash
set -uo pipefail

log() {
    printf '[thrill-setup] %s\n' "$*"
}

warn() {
    printf '[thrill-setup] WARN: %s\n' "$*" >&2
}

run_or_warn() {
    "$@" || warn "command failed: $*"
}

mkdir -p /etc/thrill /opt/thrill /var/lib/thrill
if [ -f /tmp/thrill/thrill.env ]; then
    install -m 600 /tmp/thrill/thrill.env /etc/thrill/thrill.env
else
    warn "missing /tmp/thrill/thrill.env; using built-in defaults"
fi

if [ -f /tmp/thrill/bundled-packages.txt ]; then
    install -m 644 /tmp/thrill/bundled-packages.txt /opt/thrill/bundled-packages.txt
else
    warn "missing /tmp/thrill/bundled-packages.txt"
fi

# shellcheck disable=SC1091
[ -f /etc/thrill/thrill.env ] && . /etc/thrill/thrill.env

THRILL_USER="${THRILL_USER:-thril}"
PACKIT_URL="${PACKIT_URL:-https://packit.thril-usa.com/}"
WIFI_INTERFACE="${WIFI_INTERFACE:-wlp1s0}"
WIFI_SSID="${WIFI_SSID:-Thril}"
WIFI_PASSWORD="${WIFI_PASSWORD:-}"
PRINTER_NAME="${PRINTER_NAME:-Zebra_ZT410}"
PRINTER_URI="${PRINTER_URI:-socket://192.168.0.254:9100}"
APT_FALLBACK_ONLINE="${APT_FALLBACK_ONLINE:-true}"
THRILL_SKIP_WIFI_CONFIG="${THRILL_SKIP_WIFI_CONFIG:-false}"
THRILL_SKIP_BUNDLED_PACKAGES="${THRILL_SKIP_BUNDLED_PACKAGES:-false}"
THRILL_SKIP_TTY1_IP_DISPLAY="${THRILL_SKIP_TTY1_IP_DISPLAY:-false}"

mkdir -p /etc/gdm3
cat > /etc/gdm3/custom.conf << GDMEOF
[daemon]
AutomaticLoginEnable=true
AutomaticLogin=${THRILL_USER}
GDMEOF

run_or_warn usermod -a -G dialout "${THRILL_USER}"

if [ "${THRILL_SKIP_WIFI_CONFIG}" != "true" ]; then
    mkdir -p /etc/netplan
    cat > /etc/netplan/01-thrill-wifi.yaml << WIFIEOF
network:
  version: 2
  renderer: NetworkManager
  wifis:
    ${WIFI_INTERFACE}:
      dhcp4: true
      access-points:
        "${WIFI_SSID}":
          password: "${WIFI_PASSWORD}"
WIFIEOF
    chmod 600 /etc/netplan/01-thrill-wifi.yaml
else
    log "skipping wifi config"
fi

[ -f /tmp/thrill/install-bundled-apps.sh ] && install -m 755 /tmp/thrill/install-bundled-apps.sh /usr/local/bin/install-bundled-apps.sh || warn "missing install-bundled-apps.sh"
[ -f /tmp/thrill/install-chromium.sh ] && install -m 755 /tmp/thrill/install-chromium.sh /usr/local/bin/install-chromium.sh || warn "missing install-chromium.sh"
[ -f /tmp/thrill/setup-zebra-printer.sh ] && install -m 755 /tmp/thrill/setup-zebra-printer.sh /usr/local/bin/setup-zebra-printer.sh || warn "missing setup-zebra-printer.sh"
[ -f /tmp/thrill/tty1-ip-display.sh ] && install -m 755 /tmp/thrill/tty1-ip-display.sh /usr/local/bin/tty1-ip-display.sh || warn "missing tty1-ip-display.sh"
[ -f /tmp/thrill/packit-kiosk.sh ] && install -m 755 /tmp/thrill/packit-kiosk.sh /usr/local/bin/packit-kiosk.sh || warn "missing packit-kiosk.sh"

if [ "${THRILL_SKIP_BUNDLED_PACKAGES}" != "true" ] && [ -x /usr/local/bin/install-bundled-apps.sh ] && ! /usr/local/bin/install-bundled-apps.sh; then
    warn "install-bundled-apps.sh did not finish successfully during install; it will retry on boot"
fi

mkdir -p /etc/chromium/policies/managed
mkdir -p /var/snap/chromium/common/policies/managed
if [ -f /tmp/thrill/serial_scale.json ]; then
    install -m 644 /tmp/thrill/serial_scale.json /etc/chromium/policies/managed/serial_scale.json
    install -m 644 /tmp/thrill/serial_scale.json /var/snap/chromium/common/policies/managed/serial_scale.json
else
    warn "missing serial_scale.json"
fi

mkdir -p "/home/${THRILL_USER}/Desktop" "/home/${THRILL_USER}/.config/autostart" /usr/share/applications
if [ -f /tmp/thrill/packit.desktop ]; then
    install -m 755 /tmp/thrill/packit.desktop "/home/${THRILL_USER}/Desktop/Packit.desktop"
    install -m 755 /tmp/thrill/packit.desktop "/home/${THRILL_USER}/.config/autostart/Packit.desktop"
    install -m 644 /tmp/thrill/packit.desktop /usr/share/applications/Packit.desktop
else
    warn "missing packit.desktop"
fi
run_or_warn chown -R "${THRILL_USER}:${THRILL_USER}" "/home/${THRILL_USER}/Desktop" "/home/${THRILL_USER}/.config"

cat > /etc/systemd/system/install-bundled-apps.service << 'SVCEOF'
[Unit]
Description=Install bundled packages and apps
After=local-fs.target
ConditionPathExists=!/var/lib/thrill/bundled-apps.ready

[Service]
Type=oneshot
ExecStart=/usr/local/bin/install-bundled-apps.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
SVCEOF

cat > /etc/systemd/system/install-chromium.service << 'SVCEOF'
[Unit]
Description=Install Chromium Snap on First Boot
After=network-online.target snapd.seeded.service install-bundled-apps.service
Wants=network-online.target snapd.seeded.service
ConditionPathExists=!/var/lib/thrill/chromium.ready

[Service]
Type=oneshot
ExecStart=/usr/local/bin/install-chromium.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
SVCEOF

cat > /etc/systemd/system/setup-zebra-printer.service << 'SVCEOF'
[Unit]
Description=Setup Zebra ZT410 Raw Printer on First Boot
After=cups.service network.target
Wants=cups.service
ConditionPathExists=!/var/lib/thrill/printer.ready

[Service]
Type=oneshot
ExecStart=/usr/local/bin/setup-zebra-printer.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
SVCEOF

cat > /etc/systemd/system/tty1-ip-display.service << 'SVCEOF'
[Unit]
Description=Display IP on TTY1
After=network-online.target
Wants=network-online.target
Before=gdm3.service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/tty1-ip-display.sh
StandardOutput=tty
StandardInput=tty
TTYPath=/dev/tty1
TTYReset=yes
TTYVHangup=yes

[Install]
WantedBy=multi-user.target
SVCEOF

run_or_warn systemctl daemon-reload
run_or_warn systemctl enable install-bundled-apps.service
run_or_warn systemctl enable install-chromium.service
run_or_warn systemctl enable setup-zebra-printer.service
if [ "${THRILL_SKIP_TTY1_IP_DISPLAY}" != "true" ]; then
    run_or_warn systemctl enable tty1-ip-display.service
else
    log "skipping tty1 ip display service"
fi
systemctl enable cups.service || true

rm -rf /tmp/thrill
log "setup complete"
