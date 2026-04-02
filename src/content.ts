export const setupHighlights = [
  {
    title: 'OS baseline',
    value: 'Ubuntu Desktop 24.04.4 LTS',
    note: 'Current stable LTS point release as of April 2, 2026.',
  },
  {
    title: 'Display path',
    value: 'HDMI/DP for video + separate USB for touch',
    note: 'Most touch panels only expose input over USB, even when video is fine.',
  },
  {
    title: 'Printer path',
    value: 'Wired LAN + static DHCP reservation + raw ZPL queue',
    note: 'This is the most predictable path for a Zebra label printer on Ubuntu.',
  },
  {
    title: 'PacKit',
    value: 'Keep it on Windows only',
    note: 'PacKit is a Windows desktop packaging/deployment tool, not an Ubuntu print service.',
  },
]

export const quickStartSteps = [
  {
    title: '1. Standardize the box',
    body: 'Use one dedicated Ubuntu 24.04.4 LTS workstation for this setup. If the XM-F025 is your all-in-one computer and touch device, let it be the dedicated station instead of adding another PC.',
  },
  {
    title: '2. Wire the touchscreen correctly',
    body: 'If your XM-F025 is an integrated panel PC, focus on Linux display and touch detection first. If your specific unit exposes separate video or USB touch connections, treat those as separate paths and verify both.',
  },
  {
    title: '3. Put the Zebra on wired Ethernet',
    body: 'Give the ZT410 a reserved IP or static IP before you do anything else with CUPS. Do not let the printer address float if this is a production station.',
  },
  {
    title: '4. Create one print path',
    body: 'For ZPL output, create a single raw queue over `socket://printer-ip:9100`. Do not alternate between serial, USB, and LAN for the same workflow.',
  },
  {
    title: '5. Test a real label',
    body: 'Verify media type, print mode, darkness, speed, and stock calibration using the exact labels you will run in production.',
  },
  {
    title: '6. Fix reprints in the app, not at the printer',
    body: 'Archive each sent label payload so operators can intentionally reprint from the application or backend instead of relying on the printer panel.',
  },
  {
    title: '7. Use Cockpit for ops',
    body: 'Use Cockpit to watch logs, network identity, services, and system health from a browser, but keep it on your private network or VPN.',
  },
]

export const recommendation = [
  'Use Ubuntu Desktop 24.04.4 LTS on the XM-F025 itself if it is your integrated workstation, with automatic security updates enabled.',
  'Verify that the XM-F025 touch controller appears in `lsusb`, `libinput list-devices`, or `xinput list`. If your specific unit uses separate touch or video cabling, verify each path independently.',
  'If touch maps to the wrong display, sign into GNOME on Xorg and bind the touch device to the correct output with `xinput map-to-output`.',
  'Put the Zebra ZT410 on wired Ethernet, give it a DHCP reservation or fixed IP, and print to a single CUPS queue over `socket://printer-ip:9100` when your app emits ZPL.',
  'Use Cockpit for browser-based management, logs, services, and metrics, but keep it behind your LAN or VPN instead of exposing port 9090 publicly.',
  'Store label payloads in the application or backend and reprint by resubmitting the archived job instead of relying on panel-side “last label” behavior.',
  'If you still need PacKit, use it from a Windows admin workstation for Windows packaging and deployment only.',
]

export const realityChecks = [
  {
    title: 'PacKit is not the Linux print layer',
    body: 'PacKit’s official docs describe it as a Windows desktop application for packaging, deployment, Intune, MECM, WinGet, and PSADT workflows. That means it should not be the foundation of an Ubuntu kiosk plus Zebra print pipeline.',
  },
  {
    title: 'ZT410 is now a legacy printer',
    body: 'Zebra lists the ZT410 as discontinued and, for North America, service/support ended on September 1, 2025. That makes stability work even more important, but this guide assumes you are keeping the ZT410 and focuses on getting the most reliable setup from the hardware you already own.',
  },
  {
    title: 'XM-F025 support is probably controller-specific',
    body: 'I could not find public XM-F025 Linux documentation, so the guide assumes the unit is an integrated panel PC or touchscreen device that exposes a standard Linux-visible touch controller. In practice, compatibility usually depends more on the touch controller chipset than on the product label.',
  },
]

export const ubuntuSteps = [
  {
    title: '1. Install the base system',
    bullets: [
      'Install Ubuntu Desktop 24.04.4 LTS.',
      'Use a minimal software selection if this box is dedicated to kiosk or line-of-business use.',
      'Apply updates immediately: `sudo apt update && sudo apt full-upgrade -y`.',
      'If the box is dedicated to touch use, disable screen lock and unwanted sleep states.',
    ],
  },
  {
    title: '2. Confirm the display and touch device separately',
    bullets: [
      'If the XM-F025 is an integrated panel PC, the screen can work while touch is absent because the display and touch paths still show up separately inside Linux.',
      'If your specific unit uses an external touch cable or internal USB bridge, make sure that path is connected correctly and not hidden behind a flaky hub.',
      'Use `lsusb`, `sudo dmesg | grep -i -E "hid|touch|input"`, and `libinput list-devices` to confirm Linux actually sees the touch controller.',
      'If nothing appears, the issue is usually cable, power, USB hub quality, or a controller-specific driver gap.',
    ],
  },
  {
    title: '3. Map touch to the correct screen',
    bullets: [
      'For mixed-display setups, Xorg is still the simplest path because `xinput map-to-output` is well understood and scriptable.',
      'Find the display name with `xrandr --listmonitors` and the touch device name with `xinput list`.',
      'Bind them with `xinput map-to-output "YOUR TOUCH DEVICE" HDMI-1`.',
      'If the panel is rotated or offset, persist a calibration matrix with a udev rule using `LIBINPUT_CALIBRATION_MATRIX`.',
    ],
  },
  {
    title: '4. Make it persistent',
    bullets: [
      'If Xorg mapping solves the problem, add the command to a startup script or kiosk session wrapper.',
      'If you need rotation or offset correction, prefer a udev rule so the calibration applies on device attach instead of only after login.',
      'Keep the display topology as fixed as possible so output naming does not drift after cabling or firmware changes.',
    ],
  },
]

export const printerSteps = [
  {
    title: 'Recommended connection order',
    bullets: [
      'Best: wired Ethernet with a reserved IP and one CUPS queue.',
      'Second best: direct USB to a single Ubuntu host.',
      'Last resort: serial, only when a legacy application absolutely requires it.',
    ],
  },
  {
    title: 'Why LAN is the most stable',
    bullets: [
      'It avoids baud, parity, and handshaking mismatches.',
      'It is easier to monitor, easier to re-address, and easier to recover without unplugging cables.',
      'CUPS explicitly supports AppSocket / JetDirect over port 9100, which is also the simplest and fastest backend in its network-printing docs.',
    ],
  },
  {
    title: 'When raw ZPL is the right queue',
    bullets: [
      'If your application emits ZPL already, use a raw queue and send the label as-is.',
      'Example: `sudo lpadmin -p zebra-zt410 -E -v socket://192.168.1.50:9100 -m raw`.',
      'This removes conversion layers and is usually the lowest-friction path for Zebra consistency.',
    ],
  },
  {
    title: 'When to use the Zebra CUPS package',
    bullets: [
      'If the application prints PDFs, images, or generic documents instead of ZPL, install Zebra’s official Linux CUPS package and use the correct model/PPD.',
      'After installing, verify media size, darkness, speed, and stock type on both the printer and the queue defaults.',
    ],
  },
  {
    title: 'Serial guidance if you cannot avoid it',
    bullets: [
      'Serial is the hardest path to keep stable because both ends must agree on baud, data bits, parity, stop bits, and flow control.',
      'Use one known-good USB-to-serial adapter model and one pinned cable standard instead of mixing adapters and null-modem assumptions.',
      'If you move to serial, treat the printer settings label as your source of truth and document every port setting in the site checklist.',
    ],
  },
]

export const transportComparison = [
  {
    point: 'What CUPS says',
    ip: 'CUPS says AppSocket / JetDirect is the simplest and fastest network printing protocol and uses the `socket` backend over port 9100.',
    serial:
      'CUPS treats serial as a dedicated backend with configurable baud and other options, which means more communication variables to keep aligned.',
  },
  {
    point: 'What Zebra says',
    ip: 'ZT410 supports internal 10/100 Ethernet and Zebra notes that this enables Webview and Alert features, which helps management and diagnostics.',
    serial:
      'Zebra says the baud rate, data bits, parity, and flow control must match the host, requires a null-modem cable or adapter, and limits cable length to 50 ft / 15.24 m.',
  },
  {
    point: 'Operational stability',
    ip: 'With a reserved IP, one queue, and one protocol, you can test reachability with `ping`, `nc`, and CUPS logs without touching cabling.',
    serial:
      'Serial failures are often ambiguous because cable type, adapter quality, handshake mode, and host settings can all break communication in similar ways.',
  },
  {
    point: 'Best fit for Zebra labels',
    ip: 'If your app already emits ZPL, raw `socket://printer-ip:9100` removes extra conversion layers and is usually the cleanest path.',
    serial:
      'Serial can still work, but it is best reserved for a legacy application that truly cannot use the printer over LAN or USB.',
  },
]

export const consistencyChecklist = [
  'Keep one printer, one IP, one queue, and one protocol. Do not alternate between LAN, USB, and serial on the same production workflow.',
  'Calibrate the media whenever stock changes, especially if gaps, black marks, or label dimensions differ.',
  'Lock print speed and darkness to a tested baseline before blaming the host for intermittent quality issues.',
  'Archive each label payload or generated PDF in the application so reprints are deterministic and auditable.',
  'Use `lpstat -t`, `lpinfo -v`, and `/var/log/cups/error_log` for host-side troubleshooting before swapping cables blindly.',
  'Document the exact ZT410 firmware, stock, darkness, speed, print mode, and queue settings so you can restore the same behavior after maintenance or failure.',
]

export const wineVerdict = [
  'Do not start by installing Zebra Windows printer drivers inside Wine. Wine’s current `ntprint.dll` documentation still shows most printer-driver installation exports as stubs, including `PSetupInstallPrinterDriver`.',
  'If the real blocker is a Windows-only label application, first make native Ubuntu printing work, then test that Windows app under Wine against the already working Linux queue.',
  'Do not run PacKit under Wine as part of the production print path. PacKit is still positioned by its vendor as a Windows desktop deployment tool, so Wine adds complexity without improving Zebra reliability.',
  'If you must test Wine, isolate it in a dedicated `WINEPREFIX`, document the exact app version, and only promote it after repeated print and reprint soak tests.',
]

export const cockpitChecklist = [
  'Install Cockpit and use it as the management plane for networking, services, logs, updates, and system health.',
  'On Ubuntu 24.04, useful add-ons include `cockpit-networkmanager`, `cockpit-packagekit`, `cockpit-pcp`, `cockpit-sosreport`, and `cockpit-storaged` when they match your support policy.',
  'Use Cockpit to verify that the printer host kept its expected IP, the `cups` service is healthy, and the system has not drifted after package updates or reboots.',
  'Keep Cockpit on your local operations network, behind VPN, Tailscale, or a jump host. Do not publish `:9090` directly to the public internet.',
]

export const diagnosticsIdeas = [
  'A small web diagnostics page is feasible and a good fit for a second phase.',
  'The highest-value checks are printer reachability, CUPS queue status, recent CUPS errors, the last successful label or reprint, touch device presence, disk usage, and network identity.',
  'The cleanest version is either a small standalone dashboard that reads local JSON/status files or a custom Cockpit package that surfaces the same checks inside Cockpit.',
  'Cockpit’s package system and `cockpit.file()` API make it possible to build a thin local diagnostics UI without replacing your normal Linux tooling.',
]

export const reprintGuidance = [
  'Yes, moving to a stable wired IP queue can reduce the number of “please hit reprint again” incidents if those incidents are really delivery failures caused by serial mismatches, flaky adapters, or host-side queue confusion.',
  'No, transport alone does not create a proper reprint workflow. If operators regularly need a second copy, a recovery copy, or a later replay, the application should store the original ZPL or rendered label and offer an intentional reprint action.',
  'Zebra does have a printer-side Reprint Mode. In the ZT400 user guide, Zebra says that when Reprint Mode is enabled, pressing the printer’s DOWN ARROW reprints the last label. That is useful as an emergency operator shortcut, but it is not a substitute for auditable app-side reprints.',
  'If reprints are currently happening because the label sometimes never arrives, prefer fixing the transport and queue first. If reprints are happening because users genuinely need duplicates or recovery, fix the product workflow.',
]

export const longTermPlatform = [
  'Short term: stay on Ubuntu 24.04.4 LTS for the XM-F025 until the touch controller, graphics, sleep behavior, printer path, and recovery workflow are proven stable.',
  'Long term: Rocky Linux 9 can make sense if you want a slower-moving appliance-style station. Rocky’s official release notes show Rocky 9 has general support through May 31, 2027 and security support through May 31, 2032.',
  'Important tradeoff: fewer disruptive platform changes does not mean fewer security updates. It means the base platform changes more conservatively. That can be good for a fixed station, but only if the XM-F025 hardware is already known to work well on Rocky.',
  'My recommendation is to stabilize on Ubuntu first, document the exact hardware IDs and settings, then test Rocky 9 on one spare or cloned unit. If touch, graphics, suspend, networking, and printing all behave correctly, Rocky becomes a reasonable long-term appliance candidate.',
]

export const incusGuidance = [
  'Do not put Incus on the production XM-F025 station just to run printing. That adds a management layer to the box that is supposed to stay boring and predictable.',
  'Do use Incus on an admin or lab host if you want to test Ubuntu vs Rocky images, validate cloud-init, reproduce CUPS configuration, or host a small diagnostics service away from the printer station.',
  'Incus profiles plus cloud-init are especially useful if you expect to deploy several similar stations later. They let you standardize package sets, users, SSH keys, Cockpit, and baseline configs before hardware-specific steps.',
  'If you do use Incus for Rocky testing, prefer a VM over a container when you care about desktop, kernel, or hardware-behavior parity.',
]

export const cloudInitGuidance = [
  'A cloud-init addendum is worth having if you expect to deploy multiple XM-F025 stations or rebuild one quickly after disk failure.',
  'Use cloud-init for repeatable first-boot tasks: create the admin user, install Cockpit and CUPS, enable services, set timezone, write a baseline diagnostics script, and drop a first-pass printer setup note on the machine.',
  'Treat cloud-init as the common baseline, not the whole hardware solution. Touch calibration, exact Zebra queue settings, and real label validation still need hands-on confirmation.',
  'For bare-metal style deployments, the usual pattern is to deliver cloud-init through a NoCloud seed or an imaging workflow rather than relying on a cloud provider.',
]

export const cloudInitExample = `#cloud-config
hostname: thril-station
timezone: America/New_York
package_update: true
package_upgrade: true

packages:
  - cups
  - cockpit
  - curl
  - jq
  - netcat-openbsd

users:
  - default
  - name: thril
    gecos: THRIL Admin
    groups: [adm, sudo, lpadmin]
    shell: /bin/bash
    sudo: ALL=(ALL) NOPASSWD:ALL
    lock_passwd: true
    ssh_authorized_keys:
      - ssh-ed25519 REPLACE_ME

write_files:
  - path: /usr/local/bin/thril-healthcheck
    permissions: '0755'
    content: |
      #!/usr/bin/env bash
      set -eu
      PRINTER_IP="\${1:-192.168.1.50}"
      echo "== host =="
      hostnamectl --static || true
      echo "== cups =="
      systemctl is-active cups || true
      lpstat -t || true
      echo "== network printer =="
      ping -c 1 "$PRINTER_IP" || true
      nc -vz "$PRINTER_IP" 9100 || true

runcmd:
  - systemctl enable --now cups
  - systemctl enable --now cockpit.socket
  - usermod -aG lpadmin thril
  - [bash, -lc, 'echo "Use socket://PRINTER-IP:9100 for the Zebra raw queue if the app emits ZPL." > /etc/motd']
`

export const commandBlocks = [
  {
    title: 'Touch detection and mapping',
    code: `lsusb
sudo dmesg | grep -i -E "hid|touch|input"
libinput list-devices
xrandr --listmonitors
xinput list
xinput map-to-output "YOUR TOUCH DEVICE" HDMI-1`,
  },
  {
    title: 'Basic Ubuntu print setup',
    code: `sudo apt update
sudo apt install -y cups
sudo systemctl enable --now cups
lpinfo -v
sudo lpadmin -p zebra-zt410 -E -v socket://192.168.1.50:9100 -m raw
lpstat -t`,
  },
  {
    title: 'Cockpit setup',
    code: `sudo apt update
sudo apt install -y cockpit
sudo systemctl enable --now cockpit.socket
sudo ss -ltnp | grep 9090`,
  },
  {
    title: 'Useful troubleshooting',
    code: `ping 192.168.1.50
nc -vz 192.168.1.50 9100
lpstat -W not-completed
tail -f /var/log/cups/error_log`,
  },
  {
    title: 'Incus lab examples',
    code: `# Launch a cloud-init capable Ubuntu VM for testing
incus launch images:ubuntu/24.04/cloud thril-ubuntu-test --vm

# Launch a cloud-init capable Rocky VM for testing
incus launch images:rockylinux/9/cloud thril-rocky-test --vm

# Apply cloud-init before first boot when using init
incus init images:ubuntu/24.04/cloud thril-seeded --vm
incus config set thril-seeded cloud-init.user-data - < station-cloud-init.yaml
incus start thril-seeded`,
  },
]

export const references = [
  {
    title: 'Ubuntu 24.04.4 release images',
    href: 'https://releases.ubuntu.com/noble/',
    detail: 'Current Ubuntu 24.04.4 LTS downloads.',
  },
  {
    title: 'PacKit homepage',
    href: 'https://www.getpackit.com/',
    detail: 'Describes PacKit as a Windows-based tool.',
  },
  {
    title: 'PacKit docs: What is PacKit?',
    href: 'https://www.getpackit.com/docs/using-packit/what-is-packit/',
    detail: 'Official product positioning and workflow scope.',
  },
  {
    title: 'Cockpit project home',
    href: 'https://cockpit-project.org/',
    detail: 'Overview of Cockpit capabilities, supported systems, and access model.',
  },
  {
    title: 'Cockpit deployment guide',
    href: 'https://cockpit-project.org/guide/latest/',
    detail: 'Official guide, package model, and API references.',
  },
  {
    title: 'Ubuntu cockpit package',
    href: 'https://packages.ubuntu.com/noble/admin/cockpit',
    detail: 'Ubuntu 24.04 package details for Cockpit.',
  },
  {
    title: 'Ubuntu cockpit add-ons',
    href: 'https://packages.ubuntu.com/source/noble/cockpit',
    detail: 'Ubuntu source package listing showing network, updates, PCP, storage, and sosreport modules.',
  },
  {
    title: 'Rocky Linux release notes',
    href: 'https://docs.rockylinux.org/release_notes/',
    detail: 'Official Rocky release/support timeline used for the long-term platform recommendation.',
  },
  {
    title: 'Ubuntu wine package',
    href: 'https://packages.ubuntu.com/noble/wine',
    detail: 'Ubuntu 24.04 Wine package information.',
  },
  {
    title: 'Wine ntprint API status',
    href: 'https://source.winehq.org/WineAPI/ntprint.html',
    detail: 'Shows printer-driver related APIs with many unimplemented stubs.',
  },
  {
    title: 'ZT410 support page',
    href: 'https://www.zebra.com/us/en/support-downloads/printers/industrial/zt410.html',
    detail: 'Discontinuation and support information for the ZT410.',
  },
  {
    title: 'ZT410 tech specs',
    href: 'https://www.zebra.com/content/dam/zebra_dam/en/tech-specs/zt410-tech-specs-en-us.pdf',
    detail: 'Lists Ethernet and RS-232 communication capabilities for the ZT410.',
  },
  {
    title: 'ZT400 print settings',
    href: 'https://docs.zebra.com/us/en/printers/industrial/zt400-series-industrial-printer-user-guide/configuration/c-zt4x0-ug-changing-printer-settings/c-zt4x0-ug-changing-printer-settings-through-the-user-menus/r-zt4x0-ug-print-settings.html',
    detail: 'Documents print speed, print mode, and Reprint Mode on the ZT400 series.',
  },
  {
    title: 'ZT400 RS-232 interface requirements',
    href: 'https://docs.zebra.com/us/en/printers/industrial/zt400-series-industrial-printer-user-guide/c-zt4x1-specs/r-zt4x0-ug-communication-interface-specifications/c-zt4x0-ug-standard-connections/r-zt4x1-rs-232-c-serial-data-interface.html',
    detail: 'Zebra notes matching serial settings, null-modem requirements, and cable-length limits.',
  },
  {
    title: 'ZT400 communication issues',
    href: 'https://docs.zebra.com/us/en/printers/industrial/zt400-series-industrial-printer-user-guide/c-zt4x0-ug-diagnostics-and-troubleshooting/c-zt4x0-ug-alerts-and-error-states/c-zt4x1-troubleshooting/r-zt4x0-ug-communication-issues.html',
    detail: 'Troubleshooting guidance that calls out serial port and flow-control mismatches.',
  },
  {
    title: 'ZT411 product page',
    href: 'https://www.zebra.com/us/en/products/printers/industrial/zt400-series/zt411.html',
    detail: 'Official replacement platform for ZT410.',
  },
  {
    title: 'Zebra Linux CUPS installation guide',
    href: 'https://www.zebra.com/content/dam/support-dam/en/documentation/unrestricted/guide/software/ZSN108111-v4_CUPS_Installation.pdf',
    detail: 'Official Zebra driver installation instructions for Linux/CUPS.',
  },
  {
    title: 'CUPS network printing guide',
    href: 'https://www.cups.org/doc/network.html',
    detail: 'AppSocket / JetDirect backend details and URI formats.',
  },
  {
    title: 'CUPS backend manual',
    href: 'https://www.cups.org/doc/man-backend.html',
    detail: 'Backend classifications, including serial devices with configurable baud and options.',
  },
  {
    title: 'CUPS admin guide',
    href: 'https://www.cups.org/doc/admin.html',
    detail: 'Queue administration and device URI usage.',
  },
  {
    title: 'ZPL programming guide',
    href: 'https://cpws.zebra.com/cpws/docs/zpl/zpl_manual.pdf',
    detail: 'ZPL and SGD programming reference.',
  },
  {
    title: 'Zebra developer ZPL overview',
    href: 'https://developer.zebra.com/products/printers/zpl',
    detail: 'Developer-oriented ZPL overview and examples.',
  },
  {
    title: 'xinput manual',
    href: 'https://manpages.ubuntu.com/manpages/focal/en/man1/xinput.1.html',
    detail: 'Documents `map-to-output` for X11-based mapping.',
  },
  {
    title: 'libinput calibration documentation',
    href: 'https://wayland.freedesktop.org/libinput/doc/latest/configuration.html',
    detail: 'Modern input-stack calibration guidance.',
  },
  {
    title: 'libinput udev calibration matrix',
    href: 'https://wayland.freedesktop.org/libinput/doc/1.11.3/udev_config.html',
    detail: 'Persistent `LIBINPUT_CALIBRATION_MATRIX` examples.',
  },
  {
    title: 'shadcn/ui for Vite',
    href: 'https://ui.shadcn.com/docs/installation/vite',
    detail: 'Official Vite installation path for shadcn/ui.',
  },
  {
    title: 'Vite static deploy guide',
    href: 'https://vite.dev/guide/static-deploy.html',
    detail: 'GitHub Pages workflow and base-path guidance.',
  },
  {
    title: 'GitHub Pages docs',
    href: 'https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site',
    detail: 'Pages setup basics and publishing behavior.',
  },
  {
    title: 'Incus cloud-init guide',
    href: 'https://linuxcontainers.org/incus/docs/main/cloud-init/',
    detail: 'Official guidance for using cloud-init with Incus instances.',
  },
  {
    title: 'Incus profiles',
    href: 'https://linuxcontainers.org/incus/docs/main/profiles/',
    detail: 'Official profile model for repeatable Incus instance configuration.',
  },
  {
    title: 'Incus initialization and preseed',
    href: 'https://linuxcontainers.org/incus/docs/main/howto/initialize/',
    detail: 'Documents Incus preseed automation for reproducible lab hosts.',
  },
  {
    title: 'cloud-init examples library',
    href: 'https://cloudinit.readthedocs.io/en/stable/reference/examples_library.html',
    detail: 'Official cloud-init examples for packages, users, files, and first-boot commands.',
  },
]
