document.addEventListener("DOMContentLoaded", () => {
  let sections = document.querySelectorAll("main section");

  sections.forEach(section => {
    section.addEventListener("click", () => {
      if (!section.classList.contains("fullscreen")) {
        section.classList.add("fullscreen");
        document.body.classList.add("noscroll");

        // Clicking again exits fullscreen
        section.addEventListener("click", function exitFullscreen(e) {
          if (section.classList.contains("fullscreen")) {
            section.classList.remove("fullscreen");
            document.body.classList.remove("noscroll");
            section.removeEventListener("click", exitFullscreen);
          }
        });
      }
    });
  });
});
