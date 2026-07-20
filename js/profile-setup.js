"use strict";

/* ==========================================================
   CatchALiftt
   Profile Setup
========================================================== */

/* ==========================================================
   DOM REFERENCES
========================================================== */

const profileForm = document.getElementById("profileForm");

const firstNameInput = document.getElementById("firstName");

const lastNameInput = document.getElementById("lastName");

const genderSelector = document.getElementById("genderSelector");

const genderButtons = document.querySelectorAll(".gender-btn");

const profileGallery = document.getElementById("profileGallery");

const profilePrev = document.getElementById("profilePrev");

const profileNext = document.getElementById("profileNext");

const selectedProfileName = document.getElementById("selectedProfileName");

const continueBtn = document.getElementById("continueBtn");

const profileError = document.getElementById("profileError");

/* ==========================================================
   APPLICATION STATE
========================================================== */

let selectedGender = "male";

let selectedProfile = null;

let visibleProfiles = [];

/* ==========================================================
   PROFILE DATABASE
========================================================== */

const PROFILES = {
  male: [
    { id: "explorer", name: "Explorer", icon: "🧭" },
    { id: "thinker", name: "Thinker", icon: "🤓" },
    { id: "minimalist", name: "Minimalist", icon: "🍃" },
    { id: "professional", name: "Professional", icon: "💼" },
    { id: "creative", name: "Creative", icon: "🎨" },
    { id: "adventurer", name: "Adventurer", icon: "🏔️" },
    { id: "calm", name: "Calm", icon: "🪷" },
    { id: "optimist", name: "Optimist", icon: "🙂" },
  ],

  female: [
    { id: "explorer", name: "Explorer", icon: "🧭" },
    { id: "thinker", name: "Thinker", icon: "🤓" },
    { id: "minimalist", name: "Minimalist", icon: "🍃" },
    { id: "professional", name: "Professional", icon: "💼" },
    { id: "creative", name: "Creative", icon: "🎨" },
    { id: "adventurer", name: "Adventurer", icon: "🏔️" },
    { id: "calm", name: "Calm", icon: "🪷" },
    { id: "optimist", name: "Optimist", icon: "🙂" },
  ],

  neutral: [
    { id: "explorer", name: "Explorer", icon: "🧭" },
    { id: "thinker", name: "Thinker", icon: "🤓" },
    { id: "minimalist", name: "Minimalist", icon: "🍃" },
    { id: "professional", name: "Professional", icon: "💼" },
    { id: "creative", name: "Creative", icon: "🎨" },
    { id: "adventurer", name: "Adventurer", icon: "🏔️" },
    { id: "calm", name: "Calm", icon: "🪷" },
    { id: "optimist", name: "Optimist", icon: "🙂" },
  ],
};
/* ==========================================================
   RENDER PROFILES
========================================================== */

function renderProfiles() {
  visibleProfiles = [...PROFILES[selectedGender]];

  profileGallery.innerHTML = "";

  visibleProfiles.forEach((profile) => {
    const card = document.createElement("div");

    card.className = "profile-card-item";

    card.dataset.id = profile.id;

    card.innerHTML = `

    <div class="profile-image">

        <div class="profile-icon">

            ${profile.icon}

        </div>

    </div>

           <div class="profile-name">

            ${profile.name}

        </div>

    `;

    card.addEventListener("click", () => {
      document
        .querySelectorAll(".profile-card-item")
        .forEach((item) => item.classList.remove("active"));

      card.classList.add("active");

      selectedProfile = profile;

      selectedProfileName.textContent = profile.name;

      validateForm();
    });

    profileGallery.appendChild(card);
  });
}

/* ==========================================================
   GENDER SELECTION
========================================================== */

genderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    genderButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    selectedGender = button.dataset.gender;

    selectedProfile = null;

    selectedProfileName.textContent = "None";

    renderProfiles();

    validateForm();
  });
});
/* ==========================================================
   FORM VALIDATION
========================================================== */

function validateForm() {
  const firstNameValid = firstNameInput.value.trim().length > 0;

  const genderValid = selectedGender !== null;

  const profileValid = selectedProfile !== null;

  if (firstNameValid && genderValid && profileValid) {
    continueBtn.disabled = false;

    profileError.textContent = "";
  } else {
    continueBtn.disabled = true;
  }
}

/* ==========================================================
   INPUT EVENTS
========================================================== */

firstNameInput.addEventListener("input", validateForm);

lastNameInput.addEventListener("input", validateForm);

/* ==========================================================
   GALLERY NAVIGATION
========================================================== */

profilePrev.addEventListener("click", () => {
  profileGallery.scrollBy({
    left: -420,

    behavior: "smooth",
  });
});

profileNext.addEventListener("click", () => {
  profileGallery.scrollBy({
    left: 420,

    behavior: "smooth",
  });
});

/* ==========================================================
   CONTINUE
========================================================== */

continueBtn.addEventListener("click", () => {
  if (continueBtn.disabled) return;

  sessionStorage.setItem(
    "catchalifttProfile",

    JSON.stringify({
      firstName: firstNameInput.value.trim(),

      lastName: lastNameInput.value.trim(),

      gender: selectedGender,

      profile: selectedProfile,
    }),
  );

  window.location.href = "ride-setup.html";
});

/* ==========================================================
   INITIALIZE
========================================================== */

renderProfiles();

validateForm();
