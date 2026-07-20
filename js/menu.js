const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

let closeTimer;

/* OPEN MENU */

function openMenu() {
  clearTimeout(closeTimer);

  sideMenu.classList.add("active");
  overlay.classList.add("active");
}

/* CLOSE MENU */

function closeMenu() {
  closeTimer = setTimeout(() => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  }, 250);
}

/* HOVER OPEN */

menuBtn.addEventListener("mouseenter", openMenu);

/* KEEP OPEN WHEN MOVING TO MENU */

sideMenu.addEventListener("mouseenter", () => {
  clearTimeout(closeTimer);
});

/* CLOSE WHEN LEAVING MENU */

sideMenu.addEventListener("mouseleave", closeMenu);

/* CLOSE BUTTON */

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});

/* CLICK OUTSIDE */

overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});
