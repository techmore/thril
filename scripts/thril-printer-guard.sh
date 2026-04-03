#!/usr/bin/env bash
set -euo pipefail

PRINTER_NAME="${PRINTER_NAME:-zebra-zt410}"
PRINTER_IP="${PRINTER_IP:-192.168.0.100}"
APP_USER="${APP_USER:-thril}"
LOG_FILE="${LOG_FILE:-/var/log/thril-printer-guard.log}"
STATE_DIR="${STATE_DIR:-/var/lib/thril-printer-guard}"
ENV_FILE="${ENV_FILE:-/etc/default/thril-printer-guard}"

if [[ -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$ENV_FILE"
fi

mkdir -p "$STATE_DIR"
touch "$LOG_FILE"
chmod 0644 "$LOG_FILE"

timestamp() {
  date '+%Y-%m-%dT%H:%M:%S%z'
}

log() {
  local message="$1"
  printf '%s %s\n' "$(timestamp)" "$message" | tee -a "$LOG_FILE" >/dev/null
  logger -t thril-printer-guard -- "$message"
}

home_for_user() {
  getent passwd "$1" | cut -d: -f6
}

snapshot_path() {
  printf '%s/%s\n' "$STATE_DIR" "$1"
}

system_default() {
  lpstat -d 2>&1 | sed 's/^system default destination: //'
}

user_default() {
  local user="$1"
  if id "$user" >/dev/null 2>&1; then
    runuser -u "$user" -- lpoptions 2>/dev/null | sed -n 's/^Default //p' | awk '{print $1}' || true
  fi
}

record_snapshot() {
  local name="$1"
  shift
  "$@" >"$(snapshot_path "$name")" 2>&1 || true
}

if ! lpstat -p "$PRINTER_NAME" >/dev/null 2>&1; then
  log "queue_missing printer=$PRINTER_NAME"
  exit 1
fi

record_snapshot lpstat-before.txt lpstat -t
record_snapshot lpoptions-root-before.txt lpoptions
record_snapshot env-before.txt sh -lc 'printf "LPDEST=%s\nPRINTER=%s\n" "${LPDEST-}" "${PRINTER-}"'

APP_HOME=""
if id "$APP_USER" >/dev/null 2>&1; then
  APP_HOME="$(home_for_user "$APP_USER")"
  mkdir -p "$APP_HOME/.cups"
  chown "$APP_USER" "$APP_HOME/.cups"
  runuser -u "$APP_USER" -- sh -lc 'lpoptions' >"$(snapshot_path "lpoptions-${APP_USER}-before.txt")" 2>&1 || true
fi

BEFORE_SYSTEM_DEFAULT="$(system_default)"
BEFORE_USER_DEFAULT="$(user_default "$APP_USER")"

if nc -zw3 "$PRINTER_IP" 9100 >/dev/null 2>&1; then
  log "printer_reachable ip=$PRINTER_IP"
else
  log "printer_unreachable ip=$PRINTER_IP"
fi

cupsenable "$PRINTER_NAME" || true
cupsaccept "$PRINTER_NAME" || true
lpadmin -d "$PRINTER_NAME" || true
lpoptions -d "$PRINTER_NAME" || true

if [[ -n "$APP_HOME" ]]; then
  runuser -u "$APP_USER" -- lpoptions -d "$PRINTER_NAME" || true
fi

AFTER_SYSTEM_DEFAULT="$(system_default)"
AFTER_USER_DEFAULT="$(user_default "$APP_USER")"

record_snapshot lpstat-after.txt lpstat -t
record_snapshot lpoptions-root-after.txt lpoptions

if [[ -n "$APP_HOME" ]]; then
  runuser -u "$APP_USER" -- sh -lc 'lpoptions' >"$(snapshot_path "lpoptions-${APP_USER}-after.txt")" 2>&1 || true
  if [[ -f "$APP_HOME/.cups/lpoptions" ]]; then
    cp "$APP_HOME/.cups/lpoptions" "$(snapshot_path "lpoptions-${APP_USER}.file")"
  fi
fi

if [[ -f /etc/cups/lpoptions ]]; then
  cp /etc/cups/lpoptions "$(snapshot_path "lpoptions-system.file")"
fi

if [[ "$BEFORE_SYSTEM_DEFAULT" != "$AFTER_SYSTEM_DEFAULT" || "$BEFORE_USER_DEFAULT" != "$AFTER_USER_DEFAULT" ]]; then
  log "default_repaired printer=$PRINTER_NAME system_before=$BEFORE_SYSTEM_DEFAULT system_after=$AFTER_SYSTEM_DEFAULT user=$APP_USER user_before=$BEFORE_USER_DEFAULT user_after=$AFTER_USER_DEFAULT"
else
  log "default_verified printer=$PRINTER_NAME system=$AFTER_SYSTEM_DEFAULT user=$APP_USER user_default=$AFTER_USER_DEFAULT"
fi
