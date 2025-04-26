const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const restaurants = {
  "Poke Poke": [32.739768, -117.257438],
  "Taco Stand": [32.748238, -117.251204],
  "Gelato 101": [32.748005, -117.249972],
  "Seneca's": [32.7171, -117.1686],
  "Maurizio's Trattoria Italiana": [32.7403, -117.1588],
  "Cicciottis": [32.9925, -117.2714],
  "Del Frisco's": [32.8723, -117.2372],
  "Pacific Coast Grill": [33.0214, -117.2942],
  "Rare Society": [32.7528, -117.2004]
};

let map = L.map('map').setView([32.7157, -117.1611], 11); // Centered on San Diego

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

let markers = [];

function updateMarkers(names) {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  names.forEach(name => {
    if (restaurants[name]) {
      const marker = L.marker(restaurants[name]).addTo(map).bindPopup(name);
      markers.push(marker);
    }
  });
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const tab = button.dataset.tab;
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');

    const visibleRestaurants = Array.from(
      document.querySelectorAll(`#tab-${tab} .restaurant h3`)
    ).map(el => el.textContent.trim());

    updateMarkers(visibleRestaurants);
  });
});

// Show all markers on initial load
updateMarkers(Object.keys(restaurants));