# CCS Stock Fixes — V1 digital firmware

Version: V1

Repair and verification date: October 15, 2026

Source verification record: 2026-10-15 07:57:17 EDT (America/New_York)

This package contains the CCS digital stock fixture's production Arduino sketch,
`Digital_Universal_5v_2button_PRODUCTION_9-15-26.ino`. V1 identifies this
published firmware package and repair record. The original production name and
date are retained so the Arduino sketch folder and filename match.

## Repair notes

The fixture initially did not respond as expected to a two-button hold. Later,
RIGHT alone caused physical movement. An input-only diagnostic, with actuator
power and compressed air isolated, reported D7/LEFT LOW (pressed) while D8/RIGHT
was HIGH (released). The operator repaired the left button wiring.

After repair, the diagnostic confirmed:

- Both untouched inputs read HIGH (released).
- LEFT alone changed D7 to LOW while D8 stayed HIGH.
- RIGHT alone changed D8 to LOW while D7 stayed HIGH.
- Both inputs returned to HIGH after release.

The production sketch compiled and uploaded successfully to an Arduino Nano R4
after the diagnostic. The subsequent source update changed documentation
comments only. The source in this package matches that updated production file.

**Pending:** powered single-button checks and one complete actuator cycle have
not yet been confirmed. Compilation, upload, and input checks passed; this
record does not claim the complete machine has passed its powered cycle check.

## Open and upload

1. Isolate actuator power and compressed air; keep Arduino USB connected.
2. Extract `ccs-stock-digital-v1.zip` and open the `.ino` inside its matching
   `Digital_Universal_5v_2button_PRODUCTION_9-15-26` folder in Arduino IDE.
3. Select **Arduino Nano R4**, FQBN `arduino:renesas_uno:nanor4`.
   The verified installation used Arduino Renesas UNO Boards core 1.6.0.
4. Ensure the Servo library is available, select the connected board's USB port,
   verify, and upload. The commissioning port was `/dev/cu.usbmodem101`; ports
   can differ on other computers.
5. Use Serial Monitor at **9600 baud**. Verify input wiring before restoring
   actuator power. The servo is commanded home on startup.

## Pin map

| Pin | Function | Behavior |
| --- | --- | --- |
| D7 | LEFT button | INPUT_PULLUP; normally open switch to GND; LOW when pressed |
| D8 | RIGHT button | INPUT_PULLUP; normally open switch to GND; LOW when pressed |
| D9 | Servo signal | Home 34 degrees; drive 140 degrees; 500–2500 us pulses |
| D10 | Pin placement | Active HIGH output to driver |
| D11 | Lever support | Active HIGH output to driver |
| D12 | Stock support / CCS | Active HIGH output to driver |

## Implemented sequence

Both inputs LOW continuously for 1 second → D11 HIGH → wait 300 ms → D12 HIGH
and servo sweep to 140 degrees (1 degree per 15 ms) → settle 500 ms → D10 HIGH
for 500 ms → all actuator outputs LOW → wait 600 ms → servo returns to 34 degrees.

Releasing either button before placement aborts the cycle. If release occurs
during the servo sweep, the sweep finishes before recovery. Once D10 placement
starts, placement and reset finish automatically.

## Input and logging limitations

- Both inputs must read LOW to start. A wiring fault that holds one input LOW
  can let the other button start the cycle alone, as observed before repair.
- The current restart latch clears when either button is released; the firmware
  does not enforce release of both buttons or simultaneous fresh presses.
- CSV `Timestamp` is milliseconds since startup, not a calendar date or time.
  A release record prints on that button's next press. Its duration is the
  released interval, not the time the button was held.
- Servo position and completion of insertion are not sensor verified. The
  display, Wi-Fi/MQTT, photo sensor, carriage sensor, and pin shake are disabled.

If either button alone causes movement during the remaining powered checks,
isolate actuator power and air again and inspect the input wiring.

SHA-256 checksums for the downloadable sketch and ZIP are in `SHA256SUMS.txt`.
