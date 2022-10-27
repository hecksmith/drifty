import { html, render } from "../node_modules/htm/preact/standalone.module.js";

import App from "./App.js";

render(html`<${App} />`, document.getElementById("root"));
