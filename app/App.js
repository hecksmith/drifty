import { html, useEffect, useState } from "../node_modules/htm/preact/standalone.module.js";
import { css } from "../node_modules/emotion/esm/emotion.js";

import csx from "./csx.js";
import { FormGroup, Label } from "./form.js";

const styles = {
  root: css`
    font-family: sans-serif;
  `,
  container: css`
    max-width: 90%;
    margin: 0 auto;
    border: 1px solid #ddd;
    padding: 1.5rem 1rem 1rem;
    ${csx.borderRadius};
  `,
  h1: css`
    color: hotpink;
    font-family: "Lobster", cursive;
    font-weight: 400;
    font-size: 60px;
    margin: 0.25em;
    text-align: center;
  `,
  input: css`
    width: 80%;
    padding: 0.6rem 0.2rem;
    border: 1px solid #ddd;
    ${csx.borderRadius};
  `,
  mono: css`
    font-family: monospace;
    font-size: 0.9rem;
    padding-left: 0.5rem;
  `,
  button: css`
    padding: 0.8rem 2.4rem;
    text-transform: uppercase;
    font-weight: 600;
    color: #555;
    background-color: transparent;
    border: 2px solid #ddd;
    ${csx.borderRadius};
  `,
};

export default function App() {
  const { PATTERNS } = window.electron.INITIAL_DATA;

  const [values, setValues] = useState({
    isPlaying: false,
    isLeftStick: false,
    currentPattern: PATTERNS[0].id,
    isConnected: true,
    driftX: 0,
    driftY: 0,
  });

  function handleChange({ target }) {
    setValues((prev) => ({ ...prev, [target.name]: Number(target.value) }));
  }

  function handleChangeSelect({ target }) {
    setValues((prev) => ({ ...prev, [target.name]: target.value }));
  }

  function handleToggleValue({ target }) {
    setValues((prev) => ({ ...prev, [target.name]: !values[target.name] }));
  }

  useEffect(() => {
    window.electron.updateValues(values);
  }, [values]);

  return html`
    <h1 className=${styles.h1}>Drifty</h1>

    <div className=${styles.root}>
      <div className=${styles.container}>
        <${FormGroup}>
          <${Label} htmlFor="currentPattern">pattern:</label>

          <select id="currentPattern" name="currentPattern" className=${styles.input} onChange=${handleChangeSelect}>
            ${PATTERNS.map((p) => html`<option className=${styles.option} value=${p.id}>${p.desc}</option>`)}
          </select>
        </${FormGroup}>

        <${FormGroup}>
          <${Label} htmlFor="isLeftStick">left-stick:</label>

          <input
            id="isLeftStick"
            name="isLeftStick"
            type="checkbox"
            defaultChecked=${values.isLeftStick}
            onChange=${handleToggleValue}
          />
        </${FormGroup}>

        <${FormGroup}>
          <${Label} htmlFor="driftX">X-Axis:</label>

          <input
            type="text"
            className=${css`
              ${styles.input};
              ${styles.mono};
            `}
            id="driftX"
            name="driftX"
            value=${values.driftX}
            onChange=${handleChange}
          />
        </${FormGroup}>

        <${FormGroup}>
          <${Label} htmlFor="driftY">Y-Axis:</label>

          <input
            type="text"
            className=${css`
              ${styles.input};
              ${styles.mono};
            `}
            id="driftY"
            name="driftY"
            value=${values.driftY}
            onChange=${handleChange}
          />
        </${FormGroup}>

        <div
          className=${css`
            display: flex;
            justify-content: space-between;

            margin-top: 2rem;
            text-align: center;
          `}
        >
          <button type="button" name="isConnected" onClick=${handleToggleValue} className=${styles.button}>
            ${values.isConnected ? "Disconnect" : "Connect"}
          </button>

          <button type="button" name="isPlaying" onClick=${handleToggleValue} className=${styles.button}>
            ${values.isPlaying ? "Stop" : "Start"}
          </button>
        </div>
      </div>
    </div>
  `;
}
