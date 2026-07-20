/* =======================================
   CATCHALIFTT V3 - WORKING NAVIGATION
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
  zoom: 16,
  pitch: 60,
  bearing: 0,
  antialias: true,
});

map.addControl(new maplibregl.NavigationControl(), "top-right");

/* =======================================
   VEHICLE MARKER
======================================= */

const carElement = document.createElement("div");

carElement.style.width = "18px";
carElement.style.height = "18px";
carElement.style.background = "#4285F4";
carElement.style.border = "4px solid white";
carElement.style.borderRadius = "50%";
carElement.style.boxShadow = "0 0 12px rgba(0,0,0,0.35)";

const vehicleMarker = new maplibregl.Marker({
  element: carElement,
  rotationAlignment: "map",
  pitchAlignment: "map",
});

vehicleMarker.setLngLat(start).addTo(map);

/* =======================================
   ROUTE
======================================= */

let routeCoords = [];

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
  const layers = map.getStyle().layers;

  layers.forEach((layer) => {
    if (layer.type === "fill-extrusion") {
      map.setPaintProperty(layer.id, "fill-extrusion-opacity", 0.18);
    }
  });

  map.addSource("route", {
    type: "geojson",
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
      "line-color": "#FFFFFF",
      "line-width": 10,
      "line-opacity": 1,
    },
  });

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    paint: {
      "line-color": "#D4AF37",
      "line-width": 5,
    },
  });

  startNavigation();
}

/* =======================================
   HEADING
======================================= */

function getHeading(current, next) {
  const dx = next[0] - current[0];
  const dy = next[1] - current[1];

  return Math.atan2(dx, dy) * (180 / Math.PI);
}

/* =======================================
   NAVIGATION
======================================= */

function startNavigation() {
  let index = 0;
  let currentBearing = 0;

  const animation = setInterval(() => {
    if (index >= routeCoords.length - 2) {
      clearInterval(animation);
      return;
    }

    const current = routeCoords[index];
    const next = routeCoords[index + 1];

    const heading = getHeading(current, next);

    let bearingDelta = heading - currentBearing;

    if (bearingDelta > 180) bearingDelta -= 360;
    if (bearingDelta < -180) bearingDelta += 360;

    currentBearing += bearingDelta * 0.15;

    vehicleMarker.setLngLat(current).setRotation(currentBearing);

    const lookIndex = Math.min(index + 45, routeCoords.length - 1);

    const lookAheadPoint = routeCoords[lookIndex];

    map.easeTo({
      center: lookAheadPoint,
      zoom: 19.2,
      pitch: 82,
      bearing: currentBearing,
      duration: 250,
      easing: (t) => t,
      essential: true,
    });

    const remainingRoute = routeCoords.slice(index);

    map.getSource("route").setData({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: remainingRoute,
      },
    });

    const eta = Math.max(1, Math.floor((routeCoords.length - index) / 25));

    const distance = ((routeCoords.length - index) * 0.03).toFixed(1);

    const etaBox = document.querySelector(".eta-time");

    if (etaBox) {
      etaBox.textContent = eta + " MIN";
    }

    const values = document.querySelectorAll(".bottom-value");

    if (values.length >= 2) {
      values[0].textContent = eta + " MIN";
      values[1].textContent = distance + " KM";
    }

    index++;
  }, 180);
}

/* =======================================
   BUTTONS
======================================= */

document
  .querySelector(".share-btn")
  ?.addEventListener("click", () => alert("Trip Sharing Coming Soon"));

document
  .querySelector(".sos-btn")
  ?.addEventListener("click", () => alert("SOS Activated"));

/* =======================================
   START
======================================= */

loadRoute();
