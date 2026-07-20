console.log("CatchALiftt Loaded ✅");

/* =========================================================
   ELEMENTS
========================================================= */

const menuBtn = document.querySelector(".menu-btn");

/* =========================================================
   CREATE SIDEBAR
========================================================= */

const sidebarOverlay = document.createElement("div");
sidebarOverlay.classList.add("sidebar-overlay");

const sidebar = document.createElement("aside");
sidebar.classList.add("sidebar");

sidebar.innerHTML = `
  
  <div class="sidebar-top">

      <h2 class="sidebar-logo">
        CatchA<span>Liftt</span>
      </h2>

      <button class="close-sidebar">
        ✕
      </button>

  </div>

  <div class="sidebar-links">

      <a href="#">Home</a>

      <a href="#">Profile</a>

      <a href="#">Ride History</a>

      <a href="#">Wallet</a>

      <a href="#">Rewards</a>

      <a href="#">Notifications</a>

      <a href="#">Support</a>

      <a href="#">Settings</a>

      <a href="#" class="logout-link">
        Logout
      </a>

  </div>

`;

document.body.appendChild(sidebarOverlay);
document.body.appendChild(sidebar);

/* =========================================================
   OPEN SIDEBAR
========================================================= */

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");

  sidebarOverlay.classList.add("active");
});

/* =========================================================
   CLOSE SIDEBAR
========================================================= */

function closeSidebar() {
  sidebar.classList.remove("active");

  sidebarOverlay.classList.remove("active");
}

document
  .querySelector(".close-sidebar")
  .addEventListener("click", closeSidebar);

sidebarOverlay.addEventListener("click", closeSidebar);

/* =========================================================
   ESCAPE CLOSE
========================================================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSidebar();
  }
});

/* =========================================================
   GSAP ANIMATION
========================================================= */

gsap.from(".brand-logo", {
  opacity: 0,
  y: -40,
  duration: 1,
});

gsap.from(".main-car", {
  opacity: 0,
  y: 50,
  duration: 1.2,
  delay: 0.2,
});

gsap.from(".choice-card", {
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 1,
  delay: 0.5,
});

gsap.from(".trust-item", {
  opacity: 0,
  y: 20,
  stagger: 0.15,
  duration: 0.8,
  delay: 1,
});
