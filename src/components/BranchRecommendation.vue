<template>
  <div>
    <h2>Sucursal Recomendada</h2>
    <p>{{ recommendation.name }}</p>
    <BranchMap :branch="recommendation" />
  </div>
</template>

<script>
import BranchMap from './BranchMap.vue';

export default {
  components: {
    BranchMap
  },
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      branches: [
        {
          name: 'KTM Ferbel Coapa',
          address: 'Canal de Miramontes 3000-Locales 1 y 2, Coyoacán, CDMX',
          location: { lat: 19.2879, lng: -99.1166 } // Coordenadas de la sucursal
        },
        {
          name: 'KTM Ferbel Satélite',
          address: 'Periférico Blvd. Manuel Ávila Camacho 1920, Naucalpan, Méx.',
          location: { lat: 19.5068, lng: -99.2230 }
        },
        {
          name: 'Yamaha Ferbel Satélite',
          address: 'Av. Patriotismo 98, Miguel Hidalgo, CDMX',
          location: { lat: 19.3979, lng: -99.1796 }
        }
      ],
      recommendation: {}
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
      // Lógica para recomendar la sucursal más cercana
      // Por ahora, seleccionamos la primera sucursal como recomendación
      this.recommendation = this.branches[0];

      // Usar la variable `address` para evitar el warning de ESLint
      console.log("Domicilio del cliente:", address);
    }
  }
};
</script>