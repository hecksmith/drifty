let timer;

const PATTERNS = [
  { id: "drift", key: "5", fn: drift, desc: "Drift" },
  { id: "buttonTaps", key: "7", fn: buttonTaps, desc: "Button Taps" },
];

module.exports = { PATTERNS, startPattern, pauseAndCenter };

function startPattern(pattern, controller, vars) {
  pauseAndCenter(controller);

  timer = pattern.fn(controller, vars);
}

// Periodically tap the A button
// Useful for "waking up" tools like gamepadviewer.com
function buttonTaps({ pressAndReleaseButton }, vars) {
  return setInterval(() => {
    pressAndReleaseButton("A");
  }, vars.delay);
}

function drift({ activeStick, toggleTrigger }, vars) {
  toggleTrigger("leftTrigger", vars.isADS ? 1 : 0);

  activeStick(vars.driftX, vars.driftY);
}

function pauseAndCenter({ activeStick }) {
  clearInterval(timer);
  activeStick(0, 0);
}
