let points = 0;

const display = document.querySelector(".points-earned");

const counter = setInterval(() => {
  points += 5;

  display.textContent = "+" + points + " CatchPoints Earned";

  if (points >= 50) {
    clearInterval(counter);
  }
}, 60);
