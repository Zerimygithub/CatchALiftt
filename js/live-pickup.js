/*=========================================================
    CATCHALIFT
    LIVE PICKUP V3
    PART 1
    FOUNDATION
=========================================================*/

"use strict";

/*=========================================================
    GLOBAL VARIABLES
=========================================================*/

let map;

let rideData = {};

let vehicleMarker = null;
let pickupMarker = null;
let destinationMarker = null;
let routePolyline = null;
let routingControl = null;

let routeCoordinates = [];

let currentStep = 0;

let animationTimer = null;

let rideCompleted = false;

/*=========================================================
    DOM READY
=========================================================*/

document.addEventListener(
  "DOMContentLoaded",

  initializeLivePickup,
);

/*=========================================================
    INITIALIZATION
=========================================================*/

function initializeLivePickup() {
  console.log("Live Pickup V3 Started");

  loadRideData();

  populateUI();

  initializeMap();
}
/*=========================================================
    LOAD RIDE DATA
=========================================================*/

function loadRideData() {
  const storedRide = localStorage.getItem("catchaliftt_selected_host");

  if (!storedRide) {
    console.warn("No booking found.");

    createDemoRide();

    return;
  }

  try {
    rideData = {
      ...JSON.parse(storedRide),
    };
  } catch (error) {
    console.error(error);

    createDemoRide();

    return;
  }

  applyDefaultValues();
}
/*=========================================================
    DEFAULT VALUES
=========================================================*/

function applyDefaultValues() {
  rideData.hostName ??= "Amit Verma";

  rideData.vehicle ??= "Hyundai Verna";

  rideData.rating ??= "4.9";

  rideData.trips ??= "1200+ Trips";

  rideData.fare ??= "₹100";

  rideData.eta ??= "4";

  rideData.distance ??= "2.4 km";

  rideData.otp ??= "4832";

  rideData.pickupLocation ??= "Bluestone High Street";

  rideData.dropLocation ??= "Kempegowda Airport";

  rideData.pickupLat ??= 13.0985;

  rideData.pickupLng ??= 77.5637;

  rideData.dropLat ??= 13.1986;

  rideData.dropLng ??= 77.7066;
}
/*=========================================================
    DEMO DATA
=========================================================*/

function createDemoRide() {
  rideData = {
    hostName: "Amit Verma",

    vehicle: "Hyundai Verna",

    rating: "4.9",

    trips: "1200+ Trips",

    fare: "₹100",

    eta: "4",

    distance: "2.4 km",

    otp: "4832",

    pickupLocation: "Bluestone High Street",

    dropLocation: "Kempegowda Airport",

    pickupLat: 13.0985,

    pickupLng: 77.5637,

    dropLat: 13.1986,

    dropLng: 77.7066,
  };
}
/*=========================================================
    AVATAR
=========================================================*/

function getInitials(name) {
  if (!name) return "CA";

  return name

    .split(" ")

    .map((word) => word[0])

    .join("")

    .substring(0, 2)

    .toUpperCase();
}
/*=========================================================
    POPULATE UI
=========================================================*/

function populateUI() {
  setText(
    "driverName",

    rideData.hostName,
  );

  setText(
    "driverVehicle",

    rideData.vehicle,
  );

  setText(
    "arrivalTime",

    rideData.eta + " min",
  );

  setText(
    "distanceText",

    rideData.distance,
  );

  setText(
    "rideFare",

    rideData.fare,
  );

  setText(
    "pickupLocation",

    rideData.pickupLocation,
  );

  setText(
    "dropLocation",

    rideData.dropLocation,
  );

  setText(
    "etaText",

    rideData.eta + " min away",
  );

  const avatar = document.getElementById("driverAvatar");

  if (avatar) {
    avatar.textContent = getInitials(rideData.hostName);
  }
}
/*=========================================================
    HELPER
=========================================================*/

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}
/*=========================================================
    PART 2
    LEAFLET MAP ENGINE
=========================================================*/

function initializeMap() {
  map = L.map("liveMap", {
    center: [rideData.pickupLat, rideData.pickupLng],
    zoom: 15,
    zoomControl: false,
    attributionControl: false,
  });

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {
      maxZoom: 20,
    },
  ).addTo(map);

  createRouteCoordinates();

  fitMap();

  createPickupMarker();

  createDestinationMarker();

  createVehicleMarker();

  // drawRoute();
}
/*=========================================================
    VEHICLE ANIMATION
=========================================================*/

let animationIndex = 0;

/*=========================================================*/

function startVehicleAnimation() {
  if (routeCoordinates.length === 0) {
    return;
  }

  animationIndex = 0;

  if (animationTimer) {
    clearInterval(animationTimer);
  }

  animationTimer = setInterval(moveVehicle, 120);
}

/*=========================================================*/

function moveVehicle() {
  if (animationIndex >= routeCoordinates.length) {
    clearInterval(animationTimer);

    return;
  }

  vehicleMarker.setLatLng(routeCoordinates[animationIndex]);

  animationIndex++;
}
/*=========================================================
    ROUTE COORDINATES
=========================================================*/

function createRouteCoordinates() {
  routeCoordinates = [
    [rideData.pickupLat, rideData.pickupLng],

    [rideData.dropLat, rideData.dropLng],
  ];
}
/*=========================================================
    FIT MAP
=========================================================*/

function fitMap() {
  if (routeCoordinates.length === 0) {
    return;
  }

  const bounds = L.latLngBounds(routeCoordinates);

  map.fitBounds(bounds, {
    padding: [80, 80],
  });

  console.log(map.getCenter());
  console.log(map.getZoom());

  setTimeout(() => {
    console.log("After 2 sec");
    console.log(map.getCenter());
    console.log(map.getZoom());
  }, 2000);
}
/*=========================================================
    PICKUP MARKER
=========================================================*/

function createPickupMarker() {
  const pickupIcon = L.icon({
    iconUrl: "../assets/images/location-pin.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });
  console.log("Pickup");
  console.log(rideData.pickupLat);
  console.log(rideData.pickupLng);
  pickupMarker = L.marker([rideData.pickupLat, rideData.pickupLng], {
    icon: pickupIcon,
  }).addTo(map);
}
/*=========================================================
    DESTINATION MARKER
=========================================================*/

function createDestinationMarker() {
  const destinationIcon = L.icon({
    iconUrl: "../assets/images/pickup-pin.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });
  console.log("Destination");
  console.log(rideData.dropLat);
  console.log(rideData.dropLng);
  destinationMarker = L.marker([rideData.dropLat, rideData.dropLng], {
    icon: destinationIcon,
  }).addTo(map);
}
/*=========================================================
    VEHICLE MARKER
=========================================================*/

function createVehicleMarker() {
  const carIcon = L.icon({
    iconUrl: "../assets/images/car.png",
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
  console.log("Vehicle");
  console.log(rideData.pickupLat);
  console.log(rideData.pickupLng);
  vehicleMarker = L.marker([rideData.pickupLat, rideData.pickupLng], {
    icon: carIcon,
  }).addTo(map);
}
/*=========================================================
    ROUTE LINE
=========================================================*/

/*=========================================================
    ROAD ROUTE
=========================================================*/

function drawRoute() {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(
        rideData.pickupLat,

        rideData.pickupLng,
      ),

      L.latLng(
        rideData.dropLat,

        rideData.dropLng,
      ),
    ],

    addWaypoints: false,

    draggableWaypoints: false,

    fitSelectedRoutes: false,

    show: false,

    routeWhileDragging: false,

    createMarker: function () {
      return null;
    },

    lineOptions: {
      styles: [
        {
          color: "#C89B3C",

          weight: 7,

          opacity: 0.9,
        },
      ],
    },
  }).addTo(map);
  routingControl.on("routesfound", function (e) {
    const route = e.routes[0];

    routeCoordinates = [];

    route.coordinates.forEach(function (point) {
      routeCoordinates.push([point.lat, point.lng]);
    });

    console.log("Road Points:", routeCoordinates.length);

    fitMap();

    startVehicleAnimation();
  });
}
