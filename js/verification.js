// verification.js

console.log("Verification Page Loaded ✅");

/* ===================================================
   BACK
=================================================== */

function goBack() {
  window.history.back();
}

/* ===================================================
   FORM
=================================================== */

const verificationForm = document.getElementById("verificationForm");

verificationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const phone = document.getElementById("phoneNumber").value;

  const otp = document.getElementById("otpInput").value;

  /* VALIDATION */

  if (phone.length !== 10) {
    alert("Please enter valid 10-digit mobile number");

    return;
  }

  if (otp.length !== 6) {
    alert("Please enter valid 6-digit OTP");

    return;
  }

  /* SUCCESS */

  alert("Verification Successful ✅");

  /* REDIRECT */

  window.location.href = "traveller-dashboard.html";
});
