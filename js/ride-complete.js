gsap.from(".success-circle", {
  scale: 0,
  duration: 1,
  ease: "back.out(1.7)",
});

gsap.from("h1", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.4,
});

gsap.from(".trip-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  delay: 0.8,
});

gsap.from(".rating-section", {
  y: 60,
  opacity: 0,
  duration: 1,
  delay: 1.1,
});

gsap.from(".reward-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  delay: 1.4,
});

const stars = document.querySelectorAll(".star");

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    stars.forEach((s, i) => {
      s.style.color = i <= index ? "#d4af37" : "#ddd";
    });
  });
});
confetti({
  particleCount: 150,
  spread: 90,
  origin: { y: 0.6 },
});
