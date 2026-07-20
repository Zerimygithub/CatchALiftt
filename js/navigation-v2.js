/* =======================================
   CATCHALIFTT V2 - MAPLIBRE NAVIGATION
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
   VEHICLE
======================================= */

const vehicleEl = document.getElementById("vehicle-marker");

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

    map.on("load", () => {
      const layers = map.getStyle().layers;

      layers.forEach((layer) => {
        if (layer.type === "fill-extrusion") {
          map.setPaintProperty(layer.id, "fill-extrusion-opacity", 0.35);
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

      /* ===================== */
      /* ROUTE GLOW */
      /* ===================== */

      map.addLayer({
        id: "route-glow",

        type: "line",

        source: "route",

        paint: {
          "line-color": "#ffffff",

          "line-width": 28,

          "line-opacity": 2,
        },
      });

      /* ===================== */
      /* ROUTE */
      /* ===================== */

      map.addLayer({
        id: "route",

        type: "line",

        source: "route",

        paint: {
          "line-color": "#D4AF37",

          "line-width": 12,
        },
      });

      startNavigation();
    });
  } catch (error) {
    console.error(error);
  }
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

  const timer = setInterval(() => {
    if (index >= routeCoords.length - 2) {
      clearInterval(timer);
      return;
    }

    const current = routeCoords[index];

    const next = routeCoords[index + 1];

    const heading = getHeading(current, next);

    /* ===================== */
    /* VEHICLE ROTATION */
    /* ===================== */

    vehicleEl.style.transform = "translateX(-50%) rotate(0deg)";

    /* ===================== */
    /* CAMERA */
    /* ===================== */

    const lookAhead = 0.0032;

    const rad = (heading * Math.PI) / 180;

    const cameraCenter = [
      current[0] + Math.sin(rad) * lookAhead,
      current[1] + Math.cos(rad) * lookAhead,
    ];

    map.easeTo({
      center: cameraCenter,
      zoom: 19.4,
      pitch: 84,
      bearing: heading * 0.75,
      duration: 350,
      essential: true,
    });
    /* ===================== */
    /* ETA */
    /* ===================== */

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
