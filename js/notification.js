const filters = document.querySelectorAll(".filter");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
  });
});
