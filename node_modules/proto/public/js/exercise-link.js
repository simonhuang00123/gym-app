import { html, css, shadow } from "@unbndl/html";

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

  connectedCallback() {
    this.updateContent();
  }

  static observedAttributes = ["href", "muscle-group", "sets", "reps"];

  attributeChangedCallback() {
    this.updateContent();
  }

  updateContent() {
    if (!this.shadowRoot) return;

    const link = this.shadowRoot.querySelector(".exercise-link");
    const muscleGroup = this.shadowRoot.querySelector(".muscle-group");
    const sets = this.shadowRoot.querySelector(".sets");
    const reps = this.shadowRoot.querySelector(".reps");

    const href = this.getAttribute("href") || "";
    const muscle = this.getAttribute("muscle-group") || "";
    const setsValue = this.getAttribute("sets") || "";
    const repsValue = this.getAttribute("reps") || "";

    if (link) {
      link.setAttribute("href", href);
    }

    if (muscleGroup) {
      muscleGroup.textContent = muscle ? `Muscle group: ${muscle}` : "";
    }

    if (sets) {
      sets.textContent = setsValue ? ` Sets: ${setsValue}` : "";
    }

    if (reps) {
      reps.textContent = repsValue ? ` Reps: ${repsValue}` : "";
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