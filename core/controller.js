let ViGEmClient = require("vigemclient");

module.exports = function getController() {
  const client = setupClient();
  const controller = client.createX360Controller();

  connect();
  configureController(controller);

  function connect() {
    const err = controller.connect();

    if (err) {
      console.error(`Error while connecting to the virtual controller: ${err.message}`);
      process.exit(1);
    }
  }

  function disconnect() {
    const err = controller.disconnect();

    if (err) {
      console.error(`Error while disconnecting the virtual controller: ${err.message}`);
      process.exit(1);
    }
  }

  function rightStick(x, y) {
    controller.axis.rightX.setValue(x);
    controller.axis.rightY.setValue(y);
    controller.update();
  }

  function leftStick(x, y) {
    controller.axis.leftX.setValue(x);
    controller.axis.leftY.setValue(y);
    controller.update();
  }

  function pressAndReleaseButton(name) {
    toggleButton(name);

    setTimeout(() => toggleButton(name), 10);
  }

  function toggleTrigger(name, newValue = null) {
    let value = newValue != null ? newValue : !controller.axis[name].value;

    controller.axis[name].setValue(value);
    controller.update();
  }

  function toggleButton(name, newValue = null) {
    let value = newValue != null ? newValue : !controller.button[name].value;

    controller.button[name].setValue(value);
    controller.update();
  }

  return {
    rawController: controller,
    connect,
    disconnect,
    pressAndReleaseButton,
    toggleButton,
    toggleTrigger,
    rightStick,
    leftStick,
  };
};

function setupClient() {
  let client = new ViGEmClient();
  let connErr = client.connect();

  if (connErr != null) {
    console.error(`Error while connecting to the ViGEmBus driver: ${connErr.message}`);
    process.exit(1);
  }

  return client;
}

function configureController(controller) {
  if (process.env.DEBUG === "true") {
    controller.on("notification", (n) => console.log("notification", n));
  }

  controller.updateMode = "manual";
}
