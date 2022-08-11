if (!localStorage.getItem("lightPreference")) {
    console.log("%cNo preference found, using default system preference.", "color: red; font-size: 16px;");
} else {
    localStorage.getItem("lightPreference") == "dark" ? document.body.classList.add("dark-mode") : document.body.classList.add("light-mode");
}