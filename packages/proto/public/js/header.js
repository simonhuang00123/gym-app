import { html, css, shadow } from "@unbndl/html";
import { createViewModel } from "@unbndl/view";
import { Auth, fromAuth } from "@unbndl/auth";

export class HeaderElement extends HTMLElement {
  viewModel = createViewModel({
    authenticated: false,
    username: "",
    token: undefined
  }).with(fromAuth(this), "authenticated", "username", "token");

  view = html`
    <header>
      <h1>Fitness App</h1>

      <nav
        class=${($) => ($.authenticated ? "logged-in" : "logged-out")}
      >
        <p>Hello, ${($) => $.username || "guest"}</p>

        <menu>
          <li class="when-signed-in">
            <button>Sign Out</button>
          </li>

          <li class="when-signed-out">
            <a href="/login.html">Sign In</a>
          </li>
        </menu>
      </nav>
    </header>
  `;

  constructor() {
    super();

    shadow(this)
      .styles(HeaderElement.styles)
      .replace(this.viewModel.render(this.view))
      .delegate(".when-signed-in button", {
        click: () => this.signout()
      });
  }

  signout() {
    const customEvent = new CustomEvent("auth:message", {
      bubbles: true,
      composed: true,
      detail: ["auth/signout"]
    });

    this.dispatchEvent(customEvent);
  }

  static styles = css`
    li {
      display: none;
    }

    .logged-in .when-signed-in,
    .logged-out .when-signed-out {
      display: block;
    }
  `;
}