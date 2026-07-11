(function () {
    const toggleButton = document.getElementById("themeToggle");
    const toggleLabel = document.getElementById("toggleLabel");
    const body = document.body;

    // Reflect the theme applied by the early inline script
    const isDarkInitially = body.classList.contains("dark-mode");
    toggleLabel.textContent = isDarkInitially ? "Light" : "Dark";
    toggleButton.setAttribute("aria-pressed", String(isDarkInitially));

    // Toggle function
    toggleButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        const isDark = body.classList.contains("dark-mode");
        toggleLabel.textContent = isDark ? "Light" : "Dark";
        toggleButton.setAttribute("aria-pressed", String(isDark));

        // Save preference
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
})();
