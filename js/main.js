document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");

  const menuBtn = document.getElementById("menuBtn");
  const sideMenu = document.getElementById("sideMenu");
  const closeBtn = document.getElementById("closeBtn");
  const overlay = document.getElementById("overlay");

  const skipBtn = document.getElementById("skipBtn");

  function showLanding() {
    splash.classList.add("hide");
    mainContent.classList.add("show");
  }

  setTimeout(() => {
    showLanding();
  }, 10000);

  skipBtn.addEventListener("click", showLanding);

  menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});
