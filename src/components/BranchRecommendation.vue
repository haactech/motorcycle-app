<template>
    <div>
      <h2>Sucursal Recomendada</h2>
      <p>{{ recommendation }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      address: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        branches: [
          { name: 'KTM Ferbel Coapa', address: 'Canal de Miramontes 3000-Locales 1 y 2, Coyoacán, CDMX' },
          { name: 'KTM Ferbel Satélite', address: 'Periférico Blvd. Manuel Ávila Camacho 1920, Naucalpan, Méx.' },
          { name: 'Yamaha Ferbel Satélite', address: 'Av. Patriotismo 98, Miguel Hidalgo, CDMX' }
        ],
        recommendation: ''
      };
    },
    watch: {
      address: {
        immediate: true,
        handler(newAddress) {
          this.recommendBranch(newAddress);
        }
      }
    },
    methods: {
      recommendBranch(address) {
        // Example logic: Recommend the first branch for now
        this.recommendation = this.branches[0].name;
  
        // Log the address to ensure it's being used
        console.log("Address received:", address);
      }
    }
  };
  </script>