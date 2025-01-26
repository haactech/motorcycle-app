<template>
    <div>
      <h2>Ubicación de la Sucursal</h2>
      <div id="map" style="height: 400px; width: 100%;"></div>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    props: {
      branch: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        if (!this.branch || !this.branch.location) {
          console.warn('Branch or location data is missing');
          return;
        }
  
        const branchLocation = this.branch.location;
        
        // Create the map
        const map = L.map('map').setView([branchLocation.lat, branchLocation.lng], 13);
  
        // Añadir capa de tiles (puedes usar OpenStreetMap o cualquier otro proveedor)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
  
        // Añadir un marcador en la ubicación de la sucursal
        L.marker([branchLocation.lat, branchLocation.lng])
          .addTo(map)
          .bindPopup(this.branch.name)
          .openPopup();
      }
    }
  };
  </script>
  
  <style scoped>
  #map {
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>