const body = document.body;
const toggleLabel = document.getElementById("mode-toggle");
const checkbox = document.getElementById("dark-mode-input");

if (toggleLabel && checkbox) {
  toggleLabel.addEventListener("change", function (event) {
    event.stopPropagation();

    const darkModeEvent = new CustomEvent("darkmode:toggle", {
      bubbles: true,
      detail: {
        checked: event.target.checked
      }
    });

    toggleLabel.dispatchEvent(darkModeEvent);
  });

  body.addEventListener("darkmode:toggle", function (event) {
    if (event.detail.checked) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  });
}