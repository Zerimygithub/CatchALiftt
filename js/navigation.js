const map = L.map("map", {
  zoomControl: false,
  attributionControl: false,
});

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 20,
}).addTo(map);

/* ===================================== */
/* ORS API */
/* ===================================== */

const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijk4OGEzN2Q5Nzg3MDQxM2M4NDllODgyY2YxYWRmZjc2IiwiaCI6Im11cm11cjY0In0=";

/* ===================================== */
/* DEMO ROUTE */
/* ===================================== */

const start = [12.9716, 77.5946];
const end = [12.9352, 77.6245];

let routeCoords = [];
let routeLine;
let routeGlow;

/* ===================================== */
/* LOAD ROUTE */
/* ===================================== */

async function loadRoute() {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`,
    );

    const data = await response.json();

    routeCoords = data.features[0].geometry.coordinates.map((coord) => [
      coord[1],
      coord[0],
    ]);

    routeGlow = L.polyline(routeCoords, {
      color: "#ffffff",
      weight: 18,
      opacity: 0.85,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    routeLine = L.polyline(routeCoords, {
      color: "#D4AF37",
      weight: 9,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    const bounds = routeLine.getBounds();

    map.fitBounds(bounds, {
      padding: [60, 60],
    });

    createVehicleMarker(routeCoords[0]);

    setTimeout(() => {
      startNavigation();
    }, 2000);
  } catch (error) {
    console.error("Route Error:", error);
  }
}

/* ===================================== */
/* HEADING */
/* ===================================== */

function getHeading(current, next) {
  const lat1 = current[0];
  const lng1 = current[1];

  const lat2 = next[0];
  const lng2 = next[1];

  const angle = Math.atan2(lng2 - lng1, lat2 - lat1) * (180 / Math.PI);

  return angle;
}

/* ===================================== */
/* NAVIGATION */
/* ===================================== */

let vehicleMarker;
let vehicleIcon;

function createVehicleMarker(startPoint) {
  vehicleIcon = L.divIcon({
    className: "car-marker",
    html: `
      <img
        id="car-icon"
        src="../assets/images/car.svg"
      />
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });

  vehicleMarker = L.marker(startPoint, {
    icon: vehicleIcon,
    zIndexOffset: 9999,
  }).addTo(map);
}
function startNavigation() {
  let index = 0;

  map.setView(routeCoords[0], 18);

  const vehicle = document.getElementById("vehicle");

  const timer = setInterval(() => {
    if (index >= routeCoords.length - 2) {
      clearInterval(timer);
      return;
    }

    const current = routeCoords[index];

    const next = routeCoords[index + 1];

    const heading = getHeading(current, next);

    /* ========================= */
    /* VEHICLE ROTATION */
    /* ========================= */

    vehicle.style.transform = `translateX(-50%) rotate(${heading}deg)`;

    /* ========================= */
    /* CAMERA FOLLOW */
    /* ========================= */

    const forwardDistance = 0.0007;

    const radians = (heading * Math.PI) / 180;

    const cameraLat = current[0] + Math.cos(radians) * forwardDistance;

    const cameraLng = current[1] + Math.sin(radians) * forwardDistance;

    map.panTo([cameraLat, cameraLng], {
      animate: true,
      duration: 0.4,
    });

    /* ========================= */
    /* ETA */
    /* ========================= */

    const eta = Math.max(1, Math.floor((routeCoords.length - index) / 25));

    const distance = ((routeCoords.length - index) * 0.03).toFixed(1);

    document.querySelector(".eta-time").textContent = `${eta} MIN`;

    const values = document.querySelectorAll(".bottom-value");

    if (values.length >= 2) {
      values[0].textContent = `${eta} MIN`;

      values[1].textContent = `${distance} KM`;
    }

    index++;
  }, 350);
}

/* ===================================== */
/* BUTTONS */
/* ===================================== */

document.querySelector(".share-btn")?.addEventListener("click", () => {
  alert("Trip Sharing Coming Soon");
});

document.querySelector(".sos-btn")?.addEventListener("click", () => {
  alert("SOS Activated");
});

/* ===================================== */

loadRoute();
