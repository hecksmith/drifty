const { contextBridge, ipcRenderer } = require("electron");

const { PATTERNS: PATTERNS_RAW } = require("./core/patterns");

const PATTERNS = PATTERNS_RAW.map((p) => ({ id: p.id, desc: p.desc }));

contextBridge.exposeInMainWorld("electron", {
  INITIAL_DATA: {
    PATTERNS,
  },

  updateValues: (values) => {
    console.log("(preload.js) Updating values:", values);

    ipcRenderer.send("update-values", values);
  },
});

window.addEventListener("DOMContentLoaded", () => {
  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

function replaceText(selector, text) {
  const element = document.getElementById(selector);

  if (element) element.innerText = text;
}
