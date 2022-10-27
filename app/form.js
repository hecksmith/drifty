import { html } from "../node_modules/htm/preact/standalone.module.js";
import { css } from "../node_modules/emotion/esm/emotion.js";

export function FormGroup({ children }) {
  return html`
    <div
      className=${css`
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 0.4rem;
        min-height: 25px; /* TODO: Better solution here */
      `}
    >
      ${children}
    </div>
  `;
}

export function Label({ htmlFor, children }) {
  return html`
    <label
      htmlFor=${htmlFor}
      className=${css`
        font-size: 0.8rem;
        text-transform: uppercase;
        text-align: right;
        color: #555;
        width: 18%;

        /* TODO: Better solution here (pixel tweak for checkboxes) */
        position: relative;
        bottom: -1px;
      `}
      >${children}</label
    >
  `;
}
