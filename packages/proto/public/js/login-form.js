import { html, css, shadow } from "@unbndl/html";
import { createViewModel, fromInputs } from "@unbndl/view";

export class LoginFormElement extends HTMLElement {
  viewModel = createViewModel({
    username: "",
    password: ""
  }).with(fromInputs(this), "username", "password");

  view = html`
    <form>
      <slot></slot>

      <button type="submit">
        <slot name="submit-label">Login</slot>
      </button>
    </form>
  `;

  constructor() {
    super();

    shadow(this)
      .styles(LoginFormElement.styles)
      .replace(this.viewModel.render(this.view));

    const form = this.shadowRoot.querySelector("form");
    form.addEventListener("submit", (ev) => {
      this.submitLogin(ev, this.getAttribute("api") || "#");
    });
  }

  submitLogin(event, endpoint) {
    event.preventDefault();

    const data = this.viewModel.toObject();
    const method = "POST";
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(data);

    console.log("Submitting login to", endpoint, data);

    fetch(endpoint, { method, headers, body })
      .then((res) => {
        console.log("login status:", res.status);
        if (res.status !== 200 && res.status !== 201) {
          throw `Form submission failed: Status ${res.status}`;
        }
        return res.json();
      })
      .then((json) => {
        const { token } = json;

        const customEvent = new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect: "/" }]
        });

        this.dispatchEvent(customEvent);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static styles = css`
    :host {
      display: block;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 320px;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    button {
      width: fit-content;
      padding: 8px 12px;
      cursor: pointer;
    }
  `;
}