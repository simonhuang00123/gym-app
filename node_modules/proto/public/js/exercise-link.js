import { html, css, shadow } from "@unbnd/html";

export class ExerciseLinkElement extends HTMLElement {
  static template = html`
    <template>
      <a class="exercise-link" href="">
        <slot></slot>
      </a>
      <p class="meta">
        <span class="muscle-group"></span>
        <span class="sets"></span>
        <span class="reps"></span>
      </p>
    </template>
  `;

  constructor() {
    super();
    shadow(this)
      .template(ExerciseLinkElement.template)
      .styles(ExerciseLinkElement.styles);
  }

  static observedAttributes = ["href", "muscle-group", "sets", "reps"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;

    if (name === "href") {
      const link = this.shadowRoot.querySelector(".exercise-link");
      if (link) {
        link.setAttribute("href", newValue ?? "");
      }
    }

    if (name === "muscle-group") {
      const muscleGroup = this.shadowRoot.querySelector(".muscle-group");
      if (muscleGroup) {
        muscleGroup.textContent = newValue ? `Muscle group: ${newValue}` : "";
      }
    }

    if (name === "sets") {
      const sets = this.shadowRoot.querySelector(".sets");
      if (sets) {
        sets.textContent = newValue ? ` Sets: ${newValue}` : "";
      }
    }

    if (name === "reps") {
      const reps = this.shadowRoot.querySelector(".reps");
      if (reps) {
        reps.textContent = newValue ? ` Reps: ${newValue}` : "";
      }
    }
  }

  static styles = css`
    :host {
      display: block;
    }

    .exercise-link {
      color: var(--color-link);
      text-decoration: none;
      font-weight: bold;
    }

    .exercise-link:hover {
      text-decoration: underline;
    }

    .meta {
      margin-top: 0.25rem;
      font-size: 0.9rem;
    }
  `;
}