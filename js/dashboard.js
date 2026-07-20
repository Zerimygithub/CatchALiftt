"use strict";

/* ==========================================================
   DOM REFERENCES
========================================================== */

const dashboardUserName = document.getElementById("dashboardUserName");

const countdownTimer = document.getElementById("countdownTimer");

const walletBalance = document.getElementById("walletBalance");

const notificationBtn = document.getElementById("notificationBtn");

const walletBtn = document.getElementById("walletBtn");

const profileBtn = document.getElementById("profileBtn");

const liveTrackingBtn = document.getElementById("liveTrackingBtn");

/* ==========================================================
   DEMO USER DATA
========================================================== */

const dashboardData = {
  firstName: "Rahul",

  wallet: 1250,

  pickupHour: 8,

  pickupMinute: 30,

  journeyStatus: "confirmed",
};

/* ==========================================================
   GREETING
========================================================== */

function loadDashboardUser() {
  dashboardUserName.textContent = dashboardData.firstName;

  walletBalance.textContent = `₹${dashboardData.wallet.toLocaleString("en-IN")}`;
}

/* ==========================================================
   COUNTDOWN TIMER
========================================================== */

function updateCountdown() {
  const now = new Date();

  const pickupTime = new Date();

  pickupTime.setHours(
    dashboardData.pickupHour,
    dashboardData.pickupMinute,
    0,
    0,
  );

  let difference = pickupTime - now;

  if (difference < 0) {
    countdownTimer.textContent = "Journey Started";

    return;
  }

  const hours = Math.floor(difference / 3600000);

  const minutes = Math.floor((difference % 3600000) / 60000);

  if (hours > 0) {
    countdownTimer.textContent = `${hours}h ${minutes}m`;
  } else {
    countdownTimer.textContent = `${minutes} mins`;
  }
}

/* ==========================================================
   TIMELINE UPDATE
========================================================== */

function updateTimeline() {
  const timelineSteps = document.querySelectorAll(".timeline-item");

  timelineSteps.forEach((step) => {
    step.classList.remove("active");
  });

  if (timelineSteps.length > 0) {
    timelineSteps[0].classList.add("active");
  }
}
/* ==========================================================
   NOTIFICATION BUTTON
========================================================== */

function openNotifications() {
  alert("Notifications panel will be available in V2.");
}

/* ==========================================================
   WALLET BUTTON
========================================================== */

function openWallet() {
  window.location.href = "wallet.html";
}

/* ==========================================================
   PROFILE BUTTON
========================================================== */

function openProfile() {
  window.location.href = "profile.html";
}
/* ==========================================================
   QUICK ACTIONS
========================================================== */

function setupQuickActions() {
  const quickItems = document.querySelectorAll(".quick-item");

  quickItems.forEach((item) => {
    item.addEventListener("click", () => {
      console.log(`Opening: ${item.textContent.trim()}`);
    });
  });
}

/* ==========================================================
   LIVE TRACKING
========================================================== */

function startLiveTracking() {
  window.location.href = "navigation-v4.html";
}

/* ==========================================================
   EVENT LISTENERS
========================================================== */

if (notificationBtn) {
  notificationBtn.addEventListener("click", openNotifications);
}

if (walletBtn) {
  walletBtn.addEventListener("click", openWallet);
}

if (profileBtn) {
  profileBtn.addEventListener("click", openProfile);
}

if (liveTrackingBtn) {
  liveTrackingBtn.addEventListener("click", startLiveTracking);
}

/* ==========================================================
   PAGE INITIALIZATION
========================================================== */

updateCountdown();

updateTimeline();

loadDashboardUser();

setupQuickActions();

setInterval(
  updateCountdown,

  60000,
);
