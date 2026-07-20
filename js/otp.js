/* ==========================================================
   CatchALiftt
   OTP Verification Controller
   Version : 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================
       DOM ELEMENTS
    ============================================ */

  const otpInputs = document.querySelectorAll(".otp-input");

  const verifyBtn = document.getElementById("verifyBtn");

  const resendBtn = document.getElementById("resendBtn");

  const timer = document.getElementById("timer");

  const otpError = document.getElementById("otpError");

  const phoneDisplay = document.getElementById("mobileNumber");

  /* ============================================
       LOAD SESSION
    ============================================ */

  const session = Storage.getSession();

  if (!session) {
    window.location.href = "../pages/login.html";

    return;
  }

  /* ============================================
       SHOW REGISTERED NUMBER
    ============================================ */

  if (session.phoneNumber) {
    const phone = session.phoneNumber;

    const masked = phone.slice(-4);

    phoneDisplay.textContent = "+91 ••••••" + masked;
  }

  /* ============================================
       OTP SETTINGS
    ============================================ */

  const DEMO_OTP = "123456";

  let countdown = 30;

  let timerInterval = null;
  /* ============================================
       START COUNTDOWN
    ============================================ */

  function startTimer() {
    clearInterval(timerInterval);

    countdown = 30;

    resendBtn.disabled = true;

    timer.textContent = "00:30";

    timerInterval = setInterval(() => {
      countdown--;

      const seconds = String(countdown).padStart(2, "0");

      timer.textContent = `00:${seconds}`;

      if (countdown <= 0) {
        clearInterval(timerInterval);

        timer.textContent = "00:00";

        resendBtn.disabled = false;
      }
    }, 1000);
  }

  /* ============================================
       AUTO MOVE TO NEXT BOX
    ============================================ */

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      input.value = input.value.replace(/\D/g, "").slice(0, 1);

      otpError.textContent = "";

      if (input.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }

      checkOtpCompletion();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        if (input.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      }
    });
  });
  /* ============================================
       PASTE OTP
    ============================================ */

  otpInputs[0].addEventListener("paste", (e) => {
    e.preventDefault();

    const pasted = (e.clipboardData || window.clipboardData).getData("text");

    const digits = pasted.replace(/\D/g, "").slice(0, 6);

    digits.split("").forEach((digit, index) => {
      if (otpInputs[index]) {
        otpInputs[index].value = digit;
      }
    });

    checkOtpCompletion();
    otpInputs[Math.min(digits.length, 5)].focus();
  });

  /* ============================================
       CHECK IF OTP COMPLETE
    ============================================ */

  function checkOtpCompletion() {
    const otp = [...otpInputs]

      .map((box) => box.value.trim())

      .join("");

    verifyBtn.disabled = otp.length !== 6;
  }

  /* ============================================
       INITIAL STATE
    ============================================ */

  verifyBtn.disabled = true;

  startTimer();
  /* ============================================
       VERIFY OTP
    ============================================ */

  verifyBtn.addEventListener("click", () => {
    const enteredOtp = Array.from(otpInputs)
      .map((input) => input.value)
      .join("");

    if (enteredOtp.trim() !== DEMO_OTP) {
      otpError.textContent = "Invalid OTP. Please try again.";

      otpInputs.forEach((input) => {
        input.style.borderColor = "#E53935";
      });

      otpInputs[0].focus();

      return;
    }

    otpInputs.forEach((input) => {
      input.style.borderColor = "#2E7D32";
    });

    Session.login();

    const session = Storage.getSession();

    session.isVerified = true;

    Storage.saveSession(session);

    verifyBtn.disabled = true;

    verifyBtn.textContent = "Verified ✓";

    setTimeout(() => {
      if (!session.profileCompleted) {
        window.location.href = "../pages/profile-setup.html";
      } else {
        if (session.currentRole === "host") {
          window.location.href = "../pages/host-booking.html";
        } else {
          window.location.href = "../pages/traveller-booking.html";
        }
      }
    }, 900);
  });

  /* ============================================
       RESEND OTP
    ============================================ */

  resendBtn.addEventListener("click", () => {
    otpInputs.forEach((input) => {
      input.value = "";

      input.style.borderColor = "";
    });

    otpError.textContent = "";

    otpInputs[0].focus();

    verifyBtn.disabled = true;

    startTimer();

    console.log("OTP Resent (Demo)");
  });

  /* ============================================
       AUTO FOCUS FIRST BOX
    ============================================ */

  otpInputs[0].focus();
});
/* ============================================
   ENTER KEY SUPPORT
============================================ */

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !verifyBtn.disabled) {
    verifyBtn.click();
  }
});
