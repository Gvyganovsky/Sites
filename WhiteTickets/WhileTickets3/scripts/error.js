function show_error(error_text) {
    const error_p = document.getElementById("error")
    error_p.style.visibility = "visible";
    error_p.textContent = error_text
}