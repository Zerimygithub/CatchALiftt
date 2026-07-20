/* ==========================================================
   CatchALiftt
   Login Controller
   Version : 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
       DOM Elements
    ========================================== */

  const phoneInput = document.getElementById("phoneNumber");
  const continueBtn = document.getElementById("continueBtn");

  const heading = document.querySelector(".heading h2");
  const subHeading = document.querySelector(".heading p");

  const brandTagline = document.querySelector(".brand-tagline");

  /* ==========================================
       Read Selected Role
    ========================================== */

  const session = Storage.getSession();

  const currentRole = session?.currentRole || "traveller";

  /* ==========================================
       Update UI Based On Role
    ========================================== */

  function updateRoleUI() {
    if (currentRole === "host") {
      heading.textContent = "Welcome Back";

      subHeading.textContent = "Thank you for making every empty seat count.";
    } else {
      heading.textContent = "Welcome Back";

      subHeading.textContent = "Sign in to continue your journey.";
    }

    brandTagline.textContent = "Designed for Introverts.";
  }

  updateRoleUI();

  /* ==========================================
       Phone Validation
    ========================================== */

  function validatePhone(number) {
    const phoneRegex = /^[6-9]\d{9}$/;

    return phoneRegex.test(number);
  }

  /* ==========================================
       Continue Button Click
    ========================================== */

  continueBtn.addEventListener("click", handleContinue);

  phoneInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleContinue();
    }
  });

  /* ==========================================
       Handle Continue Button
    ========================================== */

  function handleContinue() {
    const phone = phoneInput.value.trim();

    if (!validatePhone(phone)) {
      alert("Please enter a valid 10-digit mobile number.");

      phoneInput.focus();

      return;
    }

    const sessionData = {
      phoneNumber: phone,

      currentRole: currentRole,

      lastUsedRole: currentRole,

      isLoggedIn: false,

      profileCompleted: false,

      userType: "new",

      loginTime: null,
    };

    Session.create(sessionData);

    continueBtn.disabled = true;

    continueBtn.innerHTML = "Sending OTP...";

    setTimeout(() => {
      window.location.href = "otp.html";
    }, 800);
  }

  /* ==========================================
       Page Initialization
    ========================================== */

  function initializePage() {
    // Auto focus mobile number field
    if (phoneInput) {
      phoneInput.focus();
    }

    // Restore button state
    if (continueBtn) {
      continueBtn.disabled = false;
      continueBtn.innerHTML = "Continue →";
    }
  }

  /* ==========================================
       Input Restriction
    ========================================== */

  phoneInput.addEventListener("input", () => {
    // Allow numbers only
    phoneInput.value = phoneInput.value.replace(/\D/g, "");

    // Maximum 10 digits
    if (phoneInput.value.length > 10) {
      phoneInput.value = phoneInput.value.slice(0, 10);
    }
  });

  /* ==========================================
       Start Page
    ========================================== */

  initializePage();
});
