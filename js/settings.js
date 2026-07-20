const switches = document.querySelectorAll('input[type="checkbox"]');

switches.forEach((toggle) => {
  toggle.addEventListener("change", () => {
    console.log(toggle.parentElement.parentElement.innerText, toggle.checked);
  });
});
