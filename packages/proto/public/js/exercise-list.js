import { html, css, shadow } from "@unbndl/html";

function renderExercise(exercise) {
  const { name, href, muscleGroup, sets, reps } = exercise;

  return html`
    <li>
      <fit-exercise-link
        href="${href}"
        muscle-group="${muscleGroup}"
        sets="${sets}"
        reps="${reps}"
      >
        ${name}
      </fit-exercise-link>
    </li>
  `;
}

export class ExerciseListElement extends HTMLElement {
  constructor() {
    super();
    shadow(this).styles(ExerciseListElement.styles);
  }

  connectedCallback() {
    const src = this.getAttribute("src");
    if (src) {
      this.hydrate(src).then((data) => {
        const view = ExerciseListElement.render(data);
        shadow(this).replace(view);
      });
    }
  }

  static observedAttributes = ["src"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && newValue) {
      this.hydrate(newValue).then((data) => {
        const view = ExerciseListElement.render(data);
        shadow(this).replace(view);
      });
    }
  }

  hydrate(src) {
    return fetch(src)
      .then((response) => {
        if (response.status !== 200) {
          throw `HTTP Status ${response.status}`;
        }
        return response.json();
      })
      .catch((error) => {
        console.log(`Could not fetch ${src}:`, error);
      });
  }

  static render(data) {
    const exercises = data?.exercises || [];

    return html`
      <ul>
        ${exercises.map(renderExercise)}
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
  `;
}