<template>
    <div>
      <h2>Motocicletas Disponibles</h2>
      <ul>
        <li v-for="motorcycle in motorcycles" :key="motorcycle.id">
          {{ motorcycle.brand }} {{ motorcycle.model }} ({{ motorcycle.year }})
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        motorcycles: [
          { id: 1, brand: 'KTM', model: 'Duke 390', year: 2022 },
          { id: 2, brand: 'Yamaha', model: 'MT-07', year: 2021 }
        ]
      };
    }
  };
  </script>