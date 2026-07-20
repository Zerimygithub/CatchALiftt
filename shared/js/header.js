/* ==========================================
   CatchALiftt Header
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-btn");

  const notificationButton = document.querySelector(".notification-btn");

  const profileButton = document.querySelector(".profile-btn");

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      console.log("Menu clicked");
    });
  }

  if (notificationButton) {
    notificationButton.addEventListener("click", () => {
      console.log("Notification clicked");
    });
  }

  if (profileButton) {
    profileButton.addEventListener("click", () => {
      console.log("Profile clicked");
    });
  }
});
