/* =======================================
   CATCHALIFT V4 PROTOTYPE
======================================= */

const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijk4OGEzN2Q5Nzg3MDQxM2M4NDllODgyY2YxYWRmZjc2IiwiaCI6Im11cm11cjY0In0=";

const start = [77.5946, 12.9716];
const end = [77.6245, 12.9352];

/* =======================================
   MAP
======================================= */

const map = new maplibregl.Map({
  container: "map",

  style: "https://tiles.openfreemap.org/styles/liberty",

  center: start,

  zoom: 17,

  pitch: 65,

  bearing: 45,

  antialias: true,
});

map.addControl(new maplibregl.NavigationControl(), "top-right");
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

/* =======================================
   NAVIGATION DOT
======================================= */

const dot = document.createElement("div");

dot.style.width = "30px";
dot.style.height = "30px";
dot.style.borderRadius = "50%";

dot.style.background = "#4285F4";

dot.style.border = "4px solid white";

dot.style.boxShadow =
  "0 0 0 8px rgba(66,133,244,.15), 0 0 30px rgba(66,133,244,.7)";

const vehicleMarker = new maplibregl.Marker({
  element: dot,
});

vehicleMarker.setLngLat(start).addTo(map);

/* =======================================
   ROUTE DATA
======================================= */

let routeCoords = [];

let currentIndex = 0;

let currentBearing = 0;

/* =======================================
   LOAD ROUTE
======================================= */

async function loadRoute() {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`,
    );

    const data = await response.json();

    routeCoords = data.features[0].geometry.coordinates;

    if (map.isStyleLoaded()) {
      drawRoute();
    } else {
      map.once("load", drawRoute);
    }
  } catch (err) {
    console.error(err);
  }
}

/* =======================================
   DRAW ROUTE
======================================= */

function drawRoute() {
  map.addSource("route", {
    type: "geojson",

    lineMetrics: true,

    data: {
      type: "Feature",

      geometry: {
        type: "LineString",

        coordinates: routeCoords,
      },
    },
  });

  map.addLayer({
    id: "route-glow",

    type: "line",

    source: "route",

    paint: {
      "line-color": "#00BFFF",

      "line-width": 24,

      "line-blur": 6,

      "line-opacity": 0.65,
    },
  });
  map.addLayer({
    id: "traffic-overlay",

    type: "line",

    source: "route",

    paint: {
      "line-color": [
        "interpolate",
        ["linear"],
        ["line-progress"],
        0,
        "#00C853",
        0.6,
        "#FFD600",
        1,
        "#FF1744",
      ],

      "line-width": 12,

      "line-opacity": 0.45,
    },
  });

  map.addLayer({
    id: "route-main",

    type: "line",

    source: "route",

    paint: {
      "line-color": "#D4AF37",

      "line-width": 8,
    },
  });

  startNavigation();
}
/* =======================================
   HEADING CALCULATION
======================================= */

function getHeading(current, next) {
  const lng1 = (current[0] * Math.PI) / 180;
  const lng2 = (next[0] * Math.PI) / 180;

  const lat1 = (current[1] * Math.PI) / 180;
  const lat2 = (next[1] * Math.PI) / 180;

  const y = Math.sin(lng2 - lng1) * Math.cos(lat2);

  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);

  let brng = (Math.atan2(y, x) * 180) / Math.PI;

  return (brng + 360) % 360;
}

/* =======================================
   ETA UPDATE
======================================= */

function updateETA(index) {
  const eta = Math.max(1, Math.floor((routeCoords.length - index) / 25));

  const distance = ((routeCoords.length - index) * 0.03).toFixed(1);

  const instructionBox = document.querySelector(".current-instruction");

  const nextTurnBox = document.querySelector(".next-turn");

  const etaBox = document.querySelector(".eta-time");

  if (etaBox) {
    etaBox.textContent = eta + " MIN";
  }

  const values = document.querySelectorAll(".bottom-value");

  if (values.length >= 2) {
    values[0].textContent = eta + " MIN";
    values[1].textContent = distance + " KM";
  }

  const current = routeCoords[index];
  const lookAhead = routeCoords[Math.min(index + 20, routeCoords.length - 1)];

  if (current && lookAhead && instructionBox) {
    const futureHeading = getHeading(current, lookAhead);

    let turnType = "Continue Straight";

    let diff = futureHeading - currentBearing;

    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    if (diff > 35) {
      turnType = "Turn Right Ahead";
    }

    if (diff < -35) {
      turnType = "Turn Left Ahead";
    }

    instructionBox.textContent = turnType;

    if (nextTurnBox) {
      if (turnType === "Continue Straight") {
        nextTurnBox.textContent = "Stay On Route";
      }

      if (turnType === "Turn Right Ahead") {
        nextTurnBox.textContent = "Prepare To Turn Right";
      }

      if (turnType === "Turn Left Ahead") {
        nextTurnBox.textContent = "Prepare To Turn Left";
      }
    }
  }
}

/* =======================================
   CAMERA FOLLOW
======================================= */

function updateCamera(position, bearing) {
  map.jumpTo({
    center: position,

    zoom: 18,

    pitch: 75,

    bearing: bearing,
  });
}

/* =======================================
   NAVIGATION ENGINE
======================================= */

function startNavigation() {
  console.log("Index:", currentIndex, "Route Length:", routeCoords.length);
  const animation = setInterval(() => {
    console.log("Navigation Loop Running");
    if (currentIndex >= routeCoords.length - 2) {
      clearInterval(animation);

      document.querySelector(".current-instruction").textContent =
        "Destination Reached";

      document.querySelector(".next-turn").textContent = "Trip Completed";

      return;
    }

    const idx = Math.floor(currentIndex);

    const current = routeCoords[idx];

    const next = routeCoords[Math.min(idx + 1, routeCoords.length - 1)];

    if (!current) return;

    const heading = getHeading(current, next);
    console.log("Heading:", heading);
    console.log("Current Bearing:", currentBearing);

    const rotationThreshold = 15;

    if (Math.abs(heading - currentBearing) > rotationThreshold) {
      let delta = heading - currentBearing;

      if (delta > 180) delta -= 360;

      if (delta < -180) delta += 360;

      currentBearing += delta * 0.25;
    }
    console.log("Moving To:", current);
    console.log("Moving To:", current);

    const smoothLng = current[0] + (next[0] - current[0]) * 0.35;

    const smoothLat = current[1] + (next[1] - current[1]) * 0.35;

    vehicleMarker.setLngLat([smoothLng, smoothLat]);

    updateCamera(current, currentBearing);

    updateETA(currentIndex);

    currentIndex++;
  }, 500);
}

/* =======================================
   BUTTONS
======================================= */

document.querySelector(".share-btn")?.addEventListener("click", () => {
  alert("Trip Sharing Coming Soon");
});

document.querySelector(".sos-btn")?.addEventListener("click", () => {
  alert("SOS Activated");
});

/* =======================================
   START
======================================= */

loadRoute();
