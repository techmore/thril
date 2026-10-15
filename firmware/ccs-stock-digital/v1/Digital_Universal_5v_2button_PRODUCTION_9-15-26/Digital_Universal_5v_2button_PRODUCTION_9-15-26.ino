/*
  Production two-button station with CSV release logging
  Original production date: 2026-09-15
  Last updated / verification recorded: 2026-10-15 07:57:17 EDT (-0400)
  Time zone: America/New_York

  Verification status:
    - Compiled successfully for Arduino Nano R4 (arduino:renesas_uno:nanor4).
    - Production firmware uploaded successfully to /dev/cu.usbmodem101.
    - Left button wiring repaired; independent D7/D8 diagnostic checks passed.
    - Each button changed only its own input; both read HIGH when released.
    - Powered single-button checks and complete actuator cycle remain pending.

  CSV timestamp note:
    - Timestamp values are milliseconds since controller startup, not wall time.
    - Release duration is time from release until that button is pressed again.

  Active hardware:
    D7  left button, active LOW
    D8  right button, active LOW
    D9  servo
    D10 left pin-placement mechanism output
    D11 lever-support output
    D12 stock-support/CCS output

  Intentionally disabled for this station:
    OLED/LCD, Wi-Fi/MQTT, photo sensor, carriage sensor, and pin shake.

  Sequence:
    D7 + D8 held 1 s -> D11 ON (lever support) -> wait 300 ms
    -> D12 ON (stock support) + servo to 140 degrees -> wait 500 ms
    -> D10 ON for 0.5 s -> outputs OFF -> reset cycle -> servo home at 34 degrees.

  Stages:
    1. Idle: wait for both buttons.
    2. Arming: both buttons must remain pressed for 1 second.
    3. Lever support: engage D11 and allow 300 ms to settle.
    4. Stock support and servo: engage D12 and rotate the servo to 140 degrees.
    5. Pin placement: engage D10 for 0.5 seconds.
    6. Reset cycle: turn outputs off, wait 600 ms, and return the servo to 34 degrees.

  CSV columns:
    Timestamp, Stage release started in, Which button, Duration of release ms,
    Did this release cause an abort?

  Test behavior: raw D7 and D8 inputs.
    - Current restart logic clears its latch when either button is released.
    - Both inputs must read LOW together to start; a stuck LOW input can allow
      the other button alone to start. Verify both read HIGH when released.
    - Either release aborts before pin placement;
    - Once placement starts, placement and cycle reset finish automatically.
    - Aborts during servo movement are remembered; the servo finishes its move,
      then the cycle aborts and the servo returns home.
    - Each button release is logged as CSV when that button is pressed again.
    - The servo is commanded home at startup. Position is not sensor-verified.
*/

#include <Arduino.h>
#include <Servo.h>

// Wiring
constexpr int LEFT_BUTTON_PIN = D7;
constexpr int RIGHT_BUTTON_PIN = D8;
constexpr int SERVO_PIN = D9;
constexpr int LEFT_PIN_PLACEMENT_OUTPUT_PIN = D10;
constexpr int LEVER_SUPPORT_OUTPUT_PIN = D11;
constexpr int RIGHT_STOCK_SUPPORT_OUTPUT_PIN = D12;

// Servo angles (degrees) and pulse limits (microseconds)
constexpr int SERVO_HOME = 34;
constexpr int SERVO_DRIVE = 140;
constexpr int SERVO_MIN_PULSE_US = 500;
constexpr int SERVO_MAX_PULSE_US = 2500;

// Phase timing (milliseconds)
// Continuous button press required before the lever support engages.
constexpr unsigned long BUTTON_ARMING_HOLD_MS = 1000;
// Wait after D11 engages, before stock support and servo rotation start.
constexpr unsigned long LEVER_SUPPORT_SETTLE_MS = 300;
// Extra wait AFTER servo movement finishes, before pin placement starts.
constexpr unsigned long SERVO_DRIVE_SETTLE_MS = 500;
// Total time D10 is energized; there is no insertion-complete sensor.
constexpr unsigned long PIN_PLACEMENT_DURATION_MS = 500;
// Wait after all actuator outputs turn off, before servo return begins.
constexpr unsigned long SERVO_RETURN_DELAY_MS = 600;
constexpr int SERVO_MOVE_STEP = 1;
constexpr unsigned long SERVO_MOVE_DELAY_MS = 15;

// The minimal sketch sends only a few messages per cycle, so 9600 is enough.
// 115200 baud is roughly 12 times faster, which was useful for the old
// diagnostic-heavy sketch. Set the Serial Monitor to this same value.
constexpr unsigned long SERIAL_BAUD = 9600;

// Phases, in execution order. enum class gives us human-readable phase names
// instead of having to track unclear values such as phase 1, phase 2, or phase 9.
enum class State : uint8_t {
  idle,
  arming,
  leverSupport,
  stockSupportAndServo,
  pinPlacement,
  resetCycle,
  error
};
State state = State::idle;
unsigned long stateStartedMs = 0;  // When the current phase began.
unsigned long lastLeftReleaseMs = 0;
unsigned long lastRightReleaseMs = 0;
bool previousLeftPressed = false;
bool previousRightPressed = false;
bool leftReleasePending = false;
bool rightReleasePending = false;
const char* leftReleasedInStage = "idle";
const char* rightReleasedInStage = "idle";
bool leftReleaseCausedAbort = false;
bool rightReleaseCausedAbort = false;
Servo servo;
bool servoAttached = false;
bool releaseRequiredBeforeNextCycle = false;

const char* stageName() {
  switch (state) {
    case State::idle: return "idle";
    case State::arming: return "arming";
    case State::leverSupport: return "leverSupport";
    case State::stockSupportAndServo: return "stockSupportAndServo";
    case State::pinPlacement: return "pinPlacement";
    case State::resetCycle: return "resetCycle";
    case State::error: return "error";
  }
  return "unknown";
}

// Hardware helpers
bool leftButtonPressed() {
  return digitalRead(LEFT_BUTTON_PIN) == LOW;
}

bool rightButtonPressed() {
  return digitalRead(RIGHT_BUTTON_PIN) == LOW;
}

bool bothButtonsPressed() {
  return leftButtonPressed() && rightButtonPressed();
}

void logButtonChange(bool pressedNow, bool& previousPressed,
                     unsigned long& lastReleaseMs, bool& releasePending,
                     const char*& releasedInStage, bool& releaseCausedAbort,
                     const char* buttonName) {
  if (pressedNow == previousPressed) return;

  const unsigned long now = millis();
  if (pressedNow) {
    if (releasePending) {
      Serial.print(lastReleaseMs);
      Serial.print(',');
      Serial.print(releasedInStage);
      Serial.print(','); Serial.print(buttonName); Serial.print(',');
      Serial.print(now - lastReleaseMs);
      Serial.print(',');
      Serial.println(releaseCausedAbort ? F("YES") : F("NO"));
      releasePending = false;
    }
  } else {
    lastReleaseMs = now;
    releasedInStage = stageName();
    releaseCausedAbort = state == State::arming ||
                         state == State::leverSupport ||
                         state == State::stockSupportAndServo;
    releasePending = true;
  }
  previousPressed = pressedNow;
}

void allOutputsOff() {
  digitalWrite(LEFT_PIN_PLACEMENT_OUTPUT_PIN, LOW);
  digitalWrite(LEVER_SUPPORT_OUTPUT_PIN, LOW);
  digitalWrite(RIGHT_STOCK_SUPPORT_OUTPUT_PIN, LOW);
}

bool moveServoGradual(int destination, bool abortOnRelease = false) {
  int position = servo.read();
  bool releaseDetected = false;
  while (position != destination) {
    if (abortOnRelease && !bothButtonsPressed()) releaseDetected = true;
    if (position < destination) {
      position = min(position + SERVO_MOVE_STEP, destination);
    } else {
      position = max(position - SERVO_MOVE_STEP, destination);
    }
    servo.write(position);
    delay(SERVO_MOVE_DELAY_MS);
  }
  return !releaseDetected;
}

void attachServo() {
  if (!servoAttached) {
    servo.attach(SERVO_PIN, SERVO_MIN_PULSE_US, SERVO_MAX_PULSE_US);
    servoAttached = servo.attached();
  }
}

// Cycle recovery
void enterError(const char* message) {
  allOutputsOff();
  state = State::error;
  (void)message;
}

void abortCycle() {
  allOutputsOff();
  if (servoAttached) moveServoGradual(SERVO_HOME);
  state = State::idle;
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  Serial.println(F("Timestamp,Stage release started in,Which button,Duration of release ms,Did this release cause an abort?"));

  pinMode(LEFT_BUTTON_PIN, INPUT_PULLUP);
  pinMode(RIGHT_BUTTON_PIN, INPUT_PULLUP);
  pinMode(LEFT_PIN_PLACEMENT_OUTPUT_PIN, OUTPUT);
  pinMode(LEVER_SUPPORT_OUTPUT_PIN, OUTPUT);
  pinMode(RIGHT_STOCK_SUPPORT_OUTPUT_PIN, OUTPUT);
  allOutputsOff();

  attachServo();
  if (!servoAttached) {
    enterError("servo attach failed");
    return;
  }
  servo.write(SERVO_HOME);

  previousLeftPressed = leftButtonPressed();
  previousRightPressed = rightButtonPressed();
  lastLeftReleaseMs = millis();
  lastRightReleaseMs = millis();
  stateStartedMs = millis();
}

void loop() {
  const unsigned long now = millis();
  logButtonChange(leftButtonPressed(), previousLeftPressed, lastLeftReleaseMs,
                  leftReleasePending, leftReleasedInStage,
                  leftReleaseCausedAbort, "LEFT");
  logButtonChange(rightButtonPressed(), previousRightPressed, lastRightReleaseMs,
                  rightReleasePending, rightReleasedInStage,
                  rightReleaseCausedAbort, "RIGHT");

  switch (state) {
    case State::idle:
      if (releaseRequiredBeforeNextCycle) {
        if (!bothButtonsPressed()) releaseRequiredBeforeNextCycle = false;
        break;
      }
      if (bothButtonsPressed()) {
        state = State::arming;
        stateStartedMs = now;
      }
      break;

    case State::arming:
      if (!bothButtonsPressed()) {
        abortCycle();
      } else if (now - stateStartedMs >= BUTTON_ARMING_HOLD_MS) {
        digitalWrite(LEVER_SUPPORT_OUTPUT_PIN, HIGH);
        state = State::leverSupport;
        stateStartedMs = now;
      }
      break;

    case State::leverSupport:
      if (!bothButtonsPressed()) {
        abortCycle();
      } else if (now - stateStartedMs >= LEVER_SUPPORT_SETTLE_MS) {
        attachServo();
        if (!servoAttached) {
          enterError("servo attach failed");
        } else {
          state = State::stockSupportAndServo;
          digitalWrite(RIGHT_STOCK_SUPPORT_OUTPUT_PIN, HIGH);
          if (!moveServoGradual(SERVO_DRIVE, true)) {
            abortCycle();
            break;
          }
          stateStartedMs = millis();
        }
      }
      break;

    case State::stockSupportAndServo:
      // Rotation ran on entry; this timer covers the additional settling wait.
      if (!bothButtonsPressed()) {
        abortCycle();
      } else if (now - stateStartedMs >= SERVO_DRIVE_SETTLE_MS) {
        digitalWrite(LEFT_PIN_PLACEMENT_OUTPUT_PIN, HIGH);
        state = State::pinPlacement;
        stateStartedMs = now;
      }
      break;

    case State::pinPlacement:
      // Once D10 engages, finish insertion even if the button is released.
      if (now - stateStartedMs >= PIN_PLACEMENT_DURATION_MS) {
        allOutputsOff();
        state = State::resetCycle;
        stateStartedMs = millis();
      }
      break;

    case State::resetCycle:
      if (now - stateStartedMs >= SERVO_RETURN_DELAY_MS) {
        moveServoGradual(SERVO_HOME);
        releaseRequiredBeforeNextCycle = true;
        state = State::idle;
        stateStartedMs = millis();
      }
      break;

    case State::error:
      allOutputsOff();
      if (!bothButtonsPressed()) {
        attachServo();
        if (servoAttached) moveServoGradual(SERVO_HOME);
        state = State::idle;
      }
      break;
  }
}
