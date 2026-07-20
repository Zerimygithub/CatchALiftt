gsap.to(".car1", {
  x: 180,
  y: -100,
  duration: 7,
  repeat: -1,
  yoyo: true,
  ease: "none",
});

gsap.to(".car2", {
  x: 220,
  y: 60,
  duration: 8,
  repeat: -1,
  yoyo: true,
  ease: "none",
});

gsap.to(".car3", {
  x: -260,
  y: -120,
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: "none",
});

gsap.to(".car4", {
  x: -180,
  y: 130,
  duration: 9,
  repeat: -1,
  yoyo: true,
  ease: "none",
});
const statusBox = document.querySelector(".ride-status");

if (statusBox) {
  const statuses = [
    "Driver accepted your request",
    "Driver is approaching pickup point",
    "Driver reached pickup point",
    "Trip started",
    "Heading to destination",
  ];

  let current = 0;

  setInterval(() => {
    current++;

    if (current < statuses.length) {
      statusBox.textContent = statuses[current];
    }
  }, 5000);
}
const timerElement = document.getElementById("rideTimer");

if (timerElement) {
  let totalSeconds = 240; // 4 minutes

  const timerInterval = setInterval(() => {
    totalSeconds--;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);

      window.location.href = "ride-complete.html";
    }
  }, 1000);
}
