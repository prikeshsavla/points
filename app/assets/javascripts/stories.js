document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-has-preview]").forEach((element) => {
    let debounceTimer;

    element.addEventListener("input", (e) => {
      const updateMarkdown = () => {
        const form = element.closest("form");
        const preview = form.querySelector(
          "." + element.dataset.previewTarget + " .content"
        );
        if (preview) {
          Rails.ajax({
            type: "POST",
            url: "/stories/render_markdown",
            data: `markdown=${encodeURIComponent(element.value)}`,
            dataType: "text",
            success: (response) => {
              preview.innerHTML = response;
            },
          });
        }
      };

      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(updateMarkdown, 300);
    });
  });
});
