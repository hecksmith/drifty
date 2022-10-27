const path = require("path");
const { ipcMain, app, BrowserWindow } = require("electron");

const controllerAPI = require("./core/controller")();
const { PATTERNS, startPattern, pauseAndCenter } = require("./core/patterns");

let isConnected = true;

function handleIPC(event, values) {
  const newVars = {
    ...values,
    increment: values.inc,
  };

  console.log("Vars:", newVars);

  if (values.isConnected != isConnected) {
    isConnected = toggleConnected(values.isConnected);
  }

  if (isConnected) {
    if (!values.isPlaying) {
      pauseAndCenter(createController(values.isLeftStick));
      return;
    }

    const pattern = PATTERNS.find((p) => p.id === values.currentPattern);

    startPattern(pattern, createController(values.isLeftStick), newVars);
  }
}

function toggleConnected(shouldConnect) {
  if (shouldConnect) {
    controllerAPI.connect();
  } else {
    controllerAPI.disconnect();
  }

  return shouldConnect;
}

function createController(isLeftStick) {
  return {
    ...controllerAPI,
    activeStick: isLeftStick ? controllerAPI.leftStick : controllerAPI.rightStick,
  };
}

function createWindow() {
  const win = new BrowserWindow({
    frame: false,
    x: 0,
    y: 0,
    width: 515,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  ipcMain.on("update-values", handleIPC);

  win.loadFile("app/index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
