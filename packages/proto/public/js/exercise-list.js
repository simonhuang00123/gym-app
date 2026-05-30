import { css, shadow } from "@unbndl/html";
import { createViewModel } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";

export class ExerciseListElement extends HTMLElement {
  viewModel = createViewModel({
    authenticated: false,
    token: undefined
  }).with(fromAuth(this), "authenticated", "token");

  constructor() {
    super();
    shadow(this).styles(ExerciseListElement.styles);
  }

  connectedCallback() {
    this.viewModel.createEffect(($) => {
      const src = this.getAttribute("src");

      if ($.authenticated && $.token && src) {
        this.hydrate(src).then((data) => {
          this.renderList(data);
        });
      }
    });
  }

  get authorization() {
    const $ = this.viewModel.toObject();

    if ($.authenticated && $.token) {
      return {
        Authorization: `Bearer ${$.token}`
      };
    }

    return {};
  }

  hydrate(src) {
    return fetch(src, { headers: this.authorization })
      .then((response) => {
        if (response.status !== 200) {
          throw `HTTP Status ${response.status}`;
        }
        return response.json();
      })
      .catch((error) => {
        console.log(`Could not fetch ${src}:`, error);
        return [];
      });
  }

  renderList(data) {
    const exercises = Array.isArray(data) ? data : data?.exercises || [];

    const items = exercises.map((exercise) => {
      const { name, href, muscleGroup, sets, reps } = exercise;

      return `
        <li>
          <a href="${href}">${name}</a>
          <span> - ${muscleGroup}, ${sets} sets, ${reps} reps</span>
        </li>
      `;
    }).join("");

    this.shadowRoot.innerHTML = `
      <style>
        ${ExerciseListElement.styles.toString()}
      </style>
      <ul>
        ${items}
      </ul>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    ul {
      padding-left: 1.25rem;
    }

    li {
      margin-bottom: 0.5rem;
    }
  `;
}