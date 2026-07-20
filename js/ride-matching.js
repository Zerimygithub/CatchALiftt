/*==========================================================
  CATCHALIFTT
  RIDE MATCHING PAGE
  VERSION 7
==========================================================*/

"use strict";

/*==========================================================
  SECTION 1A
  GLOBAL DOM REFERENCES
==========================================================*/

// ---------- Top Navigation ----------

const backBtn = document.getElementById("backBtn");
const notificationBtn = document.getElementById("notificationBtn");
const travellerProfileBtn = document.getElementById("travellerProfileBtn");

// ---------- Journey Summary ----------

const pickupLocation = document.getElementById("pickupLocation");
const destinationLocation = document.getElementById("destinationLocation");
const journeyDate = document.getElementById("journeyDate");
const departureTime = document.getElementById("departureTime");
const editSearchBtn = document.getElementById("editSearchBtn");

// ---------- AI Recommendation ----------

const routeMatch = document.getElementById("routeMatch");
const punctualityScore = document.getElementById("punctualityScore");
const reliabilityScore = document.getElementById("reliabilityScore");
const detourScore = document.getElementById("detourScore");

// ---------- Hero Host Card ----------

const heroHostCard = document.getElementById("heroHostCard");

// ---------- Remaining Host Cards ----------

const hostsContainer = document.getElementById("hostsContainer");

// ---------- Bottom Button ----------

const showMoreBtn = document.getElementById("showMoreBtn");

/*==========================================================
  SECTION 1A
  APPLICATION STATE
==========================================================*/

let rideHosts = [];

let displayedHosts = 3;

let currentTraveller = {};

let selectedHost = null;

/*==========================================================
  SECTION 1A
  PAGE INITIALIZATION
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  console.log("CatchALiftt Ride Matching V7 Loaded");
});
/*==========================================================
  SECTION 1B
  STATIC PAGE DATA
==========================================================*/

const journey = {
  pickup: "Koramangala",

  destination: "Manyata Tech Park",

  date: "Tomorrow",

  departure: "08:30 AM",
};

const aiRecommendation = {
  routeMatch: 98,

  punctuality: 99,

  reliability: 97,

  detour: "0.2 KM",
};

rideHosts = [
  {
    id: 1,

    name: "Amit Verma",

    community: "Elite Community Host",

    verified: true,

    profile: "professional",

    vehicle: "Hyundai Verna",

    vehicleColor: "Silver",

    fare: 100,

    seatsAvailable: 2,

    pickupPoint: "Koramangala Sony Signal",

    pickupTime: "08:37 AM",

    arrivalTime: "09:42 AM",

    detour: "0.2 KM",

    routeMatch: 98,

    punctuality: 99,

    reliability: 97,

    memberSince: "Jan 2025",

    distanceShared: "1,240 KM",

    cancellations: 0,

    silentRide: true,

    music: true,

    charging: true,

    ac: true,

    topMatch: true,
  },

  {
    id: 2,

    name: "Priya Sharma",

    community: "Preferred Community Host",

    verified: true,

    profile: "calm",

    vehicle: "Honda City",

    vehicleColor: "White",

    fare: 90,

    seatsAvailable: 3,

    pickupPoint: "Koramangala Forum",

    pickupTime: "08:35 AM",

    arrivalTime: "09:40 AM",

    detour: "0.4 KM",

    routeMatch: 96,

    punctuality: 98,

    reliability: 96,

    memberSince: "Mar 2024",

    distanceShared: "860 KM",

    cancellations: 0,

    silentRide: true,

    music: false,

    charging: true,

    ac: true,

    topMatch: false,
  },

  {
    id: 3,

    name: "Karthik Rao",

    community: "Trusted Community Host",

    verified: true,

    profile: "explorer",

    vehicle: "Hyundai i20",

    vehicleColor: "Blue",

    fare: 85,

    seatsAvailable: 1,

    pickupPoint: "Koramangala BDA Complex",

    pickupTime: "08:40 AM",

    arrivalTime: "09:45 AM",

    detour: "0.5 KM",

    routeMatch: 95,

    punctuality: 97,

    reliability: 95,

    memberSince: "Nov 2023",

    distanceShared: "710 KM",

    cancellations: 1,

    silentRide: false,

    music: true,

    charging: false,

    ac: true,

    topMatch: false,
  },
];

currentTraveller = {
  name: "Traveller Rahul",
};
/*==========================================================
  SECTION 2A
  POPULATE JOURNEY SUMMARY
==========================================================*/

function populateJourneySummary() {
  pickupLocation.textContent = journey.pickup;

  destinationLocation.textContent = journey.destination;

  journeyDate.textContent = journey.date;

  departureTime.textContent = journey.departure;
}
/*==========================================================
  SECTION 2B
  POPULATE AI RECOMMENDATION
==========================================================*/

function populateAIRecommendation() {
  routeMatch.textContent = `${aiRecommendation.routeMatch}%`;

  punctualityScore.textContent = `${aiRecommendation.punctuality}%`;

  reliabilityScore.textContent = `${aiRecommendation.reliability}%`;

  detourScore.textContent = aiRecommendation.detour;
}
/*==========================================================
  SECTION 3A
  POPULATE HERO HOST
==========================================================*/

function populateHeroHost() {
  const heroHost = rideHosts[0];

  document.getElementById("heroProfileSymbol").textContent = "🦊";

  document.getElementById("heroHostName").childNodes[0].textContent =
    heroHost.name + " ";

  document.getElementById("heroCommunityBadge").textContent =
    "🟣 " + heroHost.community;

  document.getElementById("heroVehicle").textContent =
    `${heroHost.vehicle} • ${heroHost.vehicleColor}`;

  document.getElementById("heroPickupLocation").textContent =
    heroHost.pickupPoint;

  document.getElementById("heroPickupTime").textContent = heroHost.pickupTime;

  document.getElementById("heroArrivalTime").textContent = heroHost.arrivalTime;

  document.getElementById("heroFare").textContent = `₹${heroHost.fare}`;

  document.getElementById("heroSeats").textContent =
    `${heroHost.seatsAvailable} Seats Available`;

  document.getElementById("heroPunctuality").textContent =
    `${heroHost.punctuality}%`;

  document.getElementById("heroDistance").textContent = heroHost.distanceShared;

  document.getElementById("heroCancellation").textContent =
    heroHost.cancellations;

  document.getElementById("heroMemberSince").textContent = heroHost.memberSince;
}
/*==========================================================
  SECTION 3B
  POPULATE SECONDARY HOST CARDS
==========================================================*/

function populateHostCards() {
  const secondHost = rideHosts[1];

  document.getElementById("host2Profile").textContent = "🦁";

  document.getElementById("host2Name").childNodes[0].textContent =
    secondHost.name + " ";

  document.getElementById("host2Badge").textContent =
    "🔵 " + secondHost.community;

  document.getElementById("host2Vehicle").textContent =
    `${secondHost.vehicle} • ${secondHost.vehicleColor}`;

  document.getElementById("host2Pickup").textContent = secondHost.pickupPoint;

  document.getElementById("host2Time").textContent = secondHost.pickupTime;

  document.getElementById("host2Detour").textContent = secondHost.detour;

  document.getElementById("host2Fare").textContent = `₹${secondHost.fare}`;

  document.getElementById("host2Seats").textContent =
    `${secondHost.seatsAvailable} Seats Available`;

  const thirdHost = rideHosts[2];

  document.getElementById("host3Profile").textContent = "🐼";

  document.getElementById("host3Name").childNodes[0].textContent =
    thirdHost.name + " ";

  document.getElementById("host3Badge").textContent =
    "🟢 " + thirdHost.community;

  document.getElementById("host3Vehicle").textContent =
    `${thirdHost.vehicle} • ${thirdHost.vehicleColor}`;

  document.getElementById("host3Pickup").textContent = thirdHost.pickupPoint;

  document.getElementById("host3Time").textContent = thirdHost.pickupTime;

  document.getElementById("host3Detour").textContent = thirdHost.detour;

  document.getElementById("host3Fare").textContent = `₹${thirdHost.fare}`;

  document.getElementById("host3Seats").textContent =
    `${thirdHost.seatsAvailable} Seat${thirdHost.seatsAvailable > 1 ? "s" : ""} Available`;
}
/*==========================================================
  SECTION 4A
  BUTTON EVENTS
==========================================================*/

function registerButtonEvents() {
  console.log("registerButtonEvents Started");
  // ---------- Back ----------

  if (backBtn) {
    console.log("Back Button OK");
    backBtn.addEventListener("click", () => {
      window.history.back();
    });
  }

  // ---------- Edit Search ----------

  if (editSearchBtn) {
    console.log("Edit Button OK");
    editSearchBtn.addEventListener("click", () => {
      console.log("Edit Search Clicked");
    });
  }

  // ---------- Book Ride Buttons ----------

  document.querySelectorAll(".book-ride-btn").forEach((button) => {
    button.addEventListener("click", () => {
      alert("Button Clicked");
      const card = button.closest(".host-card");

      if (!card) return;

      const hostName = card.querySelector(".host-name").textContent.trim();

      const community = card
        .querySelector(".community-host")
        .textContent.trim();

      const vehicle = card.querySelector(".vehicle-name").textContent.trim();

      const fare = card.querySelector(".host-price").textContent.trim();

      const bookingData = {
        hostName,
        community,
        vehicle,
        fare,

        pickup: "Bluestone Store",
        destination: "Kempegowda Airport",

        bookingTime: new Date().toISOString(),
      };

      localStorage.setItem(
        "catchaliftt_selected_host",
        JSON.stringify(bookingData),
      );

      console.log("Booking Object:");
      console.log(bookingData);

      alert("Saved = " + localStorage.getItem("catchaliftt_selected_host"));

      window.location.href = "booking-confirmation.html";
    });
  });
}

/*==========================================================
  SECTION 4B
  PAGE INITIALIZATION
==========================================================*/

function initializeRideMatchingPage() {
  populateJourneySummary();

  populateAIRecommendation();

  populateHeroHost();

  populateHostCards();

  registerButtonEvents();

  console.log("Ride Matching Page Initialized Successfully");
}
/*==========================================================
  START APPLICATION
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  initializeRideMatchingPage();
});
/*==========================================================
  SECTION 5A
  SAMPLE HOST DATABASE
==========================================================*/

const hostDatabase = [
  {
    id: 1,

    name: "Amit Verma",

    badge: "Elite Community Host",

    vehicle: "Hyundai Verna",

    vehicleColor: "Silver",

    fare: 100,

    availableSeats: 2,

    pickup: "Koramangala Sony Signal",

    pickupTime: "08:37 AM",

    arrival: "09:42 AM",

    detour: "0.2 KM",

    punctuality: 99,

    sharedDistance: "1,240 KM",

    cancellations: 0,

    memberSince: "Jan 2025",

    routeMatch: 98,

    reliability: 97,

    profile: "Professional",

    silentRide: true,

    music: true,

    charging: true,

    ac: true,
  },

  {
    id: 2,

    name: "Priya Sharma",

    badge: "Preferred Community Host",

    vehicle: "Honda City",

    vehicleColor: "White",

    fare: 85,

    availableSeats: 3,

    pickup: "Koramangala Forum",

    pickupTime: "08:35 AM",

    arrival: "09:40 AM",

    detour: "0.4 KM",

    punctuality: 97,

    sharedDistance: "860 KM",

    cancellations: 1,

    memberSince: "Apr 2024",

    routeMatch: 95,

    reliability: 96,

    profile: "Calm",

    silentRide: true,

    music: false,

    charging: true,

    ac: true,
  },

  {
    id: 3,

    name: "Karthik Rao",

    badge: "Trusted Community Host",

    vehicle: "Hyundai i20",

    vehicleColor: "Grey",

    fare: 75,

    availableSeats: 1,

    pickup: "Koramangala BDA Complex",

    pickupTime: "08:40 AM",

    arrival: "09:45 AM",

    detour: "0.5 KM",

    punctuality: 95,

    sharedDistance: "520 KM",

    cancellations: 2,

    memberSince: "Nov 2023",

    routeMatch: 93,

    reliability: 94,

    profile: "Explorer",

    silentRide: false,

    music: true,

    charging: false,

    ac: true,
  },
];
/*==========================================================
  SECTION 5B-1
  POPULATE HOST CARDS
==========================================================*/

function populateHostCards() {
  const cards = document.querySelectorAll(".host-card");

  if (cards.length === 0) {
    console.warn("No Host Cards Found");
    return;
  }

  hostDatabase.forEach((host, index) => {
    const card = cards[index];

    if (!card) return;

    /*
        --------------------------------------------------
        Host Name
        --------------------------------------------------
        */

    const hostName = card.querySelector(".host-name");

    if (hostName) {
      hostName.textContent = host.name;
    }

    /*
        --------------------------------------------------
        Community Badge
        --------------------------------------------------
        */

    const badge = card.querySelector(".community-host");

    if (badge) {
      badge.textContent = host.badge;
    }

    /*
        --------------------------------------------------
        Vehicle
        --------------------------------------------------
        */

    const vehicle = card.querySelector(".vehicle-name");

    if (vehicle) {
      vehicle.textContent = `${host.vehicle} • ${host.vehicleColor}`;
    }
    /*
        --------------------------------------------------
        Fare
        --------------------------------------------------
        */

    const price = card.querySelector(".host-price");

    if (price) {
      price.textContent = `₹${host.fare}`;
    }

    /*
        --------------------------------------------------
        Seats Available
        --------------------------------------------------
        */

    const seats = card.querySelector(".seat-count");

    if (seats) {
      if (host.availableSeats === 1) {
        seats.textContent = "1 Seat Available";
      } else {
        seats.textContent = `${host.availableSeats} Seats Available`;
      }
    }
    /*
        --------------------------------------------------
        Pickup Location
        --------------------------------------------------
        */

    const pickup = card.querySelector(".pickup-location-text");

    if (pickup) {
      pickup.textContent = host.pickup;
    }

    /*
        --------------------------------------------------
        Pickup Time
        --------------------------------------------------
        */

    const pickupTime = card.querySelector(".pickup-time");

    if (pickupTime) {
      pickupTime.textContent = host.pickupTime;
    }

    /*
        --------------------------------------------------
        Arrival Time
        --------------------------------------------------
        */

    const arrival = card.querySelector(".arrival-time");

    if (arrival) {
      arrival.textContent = host.arrival;
    }

    /*
        --------------------------------------------------
        Detour
        --------------------------------------------------
        */

    const detour = card.querySelector(".detour-distance");

    if (detour) {
      detour.textContent = host.detour;
    }

    /*
        --------------------------------------------------
        Profile Symbol
        --------------------------------------------------
        */

    const profile = card.querySelector(".profile-symbol");

    if (profile) {
      profile.textContent = host.profile.charAt(0);
    }
    /*
--------------------------------------------------
Verified Badge
--------------------------------------------------
*/

    const verifiedIcon = card.querySelector(".verified-icon");

    if (verifiedIcon) {
      verifiedIcon.style.display = host.verified ? "inline-flex" : "none";
    }

    /*
--------------------------------------------------
Silent Ride
--------------------------------------------------
*/

    const silentTag = card.querySelector(".silent-tag");

    if (silentTag) {
      silentTag.style.display = host.silentRide ? "inline-flex" : "none";
    }
  });
}

/*
==================================================
SECTION 5B-2A
PAGE EVENT LISTENERS
==================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  console.log("Ride Matching Page Initialized Successfully");

  populateHostCards();

  /*
    --------------------------------------------------
    Notification Button
    --------------------------------------------------
    */

  if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {
      alert("Notifications will be available soon.");
    });
  }

  /*
    --------------------------------------------------
    Traveller Profile
    --------------------------------------------------
    */

  if (travellerProfileBtn) {
    travellerProfileBtn.addEventListener("click", () => {
      alert("Traveller Profile Coming Soon.");
    });
  }

  /*
    --------------------------------------------------
    Show More Hosts
    --------------------------------------------------
    */

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      alert("More Hosts Feature Coming Soon.");
    });
  }
  /*
--------------------------------------------------
Host Card Selection
--------------------------------------------------
*/

  const hostCards = document.querySelectorAll(".host-card");

  let selectedHost = null;

  hostCards.forEach((card) => {
    card.addEventListener("click", () => {
      /*
        Remove previous selection
        */

      hostCards.forEach((item) => {
        item.classList.remove("selected-host");
      });

      /*
        Select current host
        */

      card.classList.add("selected-host");

      selectedHost = rideHosts[[...hostCards].indexOf(card)];

      console.log(
        "Selected Host :",
        card.querySelector(".host-name")?.textContent,
      );
    });
  });
});
