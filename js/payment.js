gsap.from(".navbar", {
  y: -80,
  opacity: 0,
  duration: 1,
});

gsap.from(".left-panel", {
  x: -120,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".right-panel", {
  x: 120,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".payment-method", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  delay: 0.6,
});

gsap.from(".co2-card", {
  scale: 0.8,
  opacity: 0,
  duration: 1,
  delay: 0.8,
});

gsap.to(".secure-btn", {
  boxShadow: "0 0 30px rgba(215,163,38,0.5)",
  repeat: -1,
  yoyo: true,
  duration: 1.5,
});

gsap.to(".pay-btn", {
  scale: 1.03,
  repeat: -1,
  yoyo: true,
  duration: 1.2,
});

const methods = document.querySelectorAll(".payment-method");

methods.forEach((method) => {
  method.addEventListener("click", () => {
    document.querySelectorAll(".radio").forEach((r) => {
      r.classList.remove("active-radio");
    });

    method.querySelector(".radio").classList.add("active-radio");

    gsap.fromTo(
      method,
      {
        scale: 0.96,
      },
      {
        scale: 1,
        duration: 0.3,
      },
    );
  });
});
