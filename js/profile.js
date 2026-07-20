document.addEventListener("DOMContentLoaded", () => {
  const bookingData = JSON.parse(
    localStorage.getItem("catchaliftt_selected_host"),
  );

  if (!bookingData) {
    alert("No booking found.");

    window.location.href = "ride-matching.html";

    return;
  }

  document.getElementById("hostName").textContent = bookingData.hostName;

  document.getElementById("hostCommunity").textContent =
    "⭐ " + bookingData.community;

  document.getElementById("hostVehicle").textContent = bookingData.vehicle;

  document.getElementById("hostEta").textContent = "3 Min Away";

  let seconds = 3;

  const countdownElement = document.getElementById("countdown");

  countdownElement.textContent = seconds;

  const timer = setInterval(() => {
    seconds--;

    countdownElement.textContent = seconds;

    if (seconds <= 0) {
      clearInterval(timer);

      window.location.href = "live-pickup.html";
    }
  }, 1000);
});
