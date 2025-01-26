<template>
    <div>
      <!-- Paso 1: Captura de Datos del Cliente -->
      <div v-if="step === 1">
        <h2>Paso 1: Tus Datos</h2>
        <CustomerForm @submit="handleCustomerData" />
      </div>
  
      <!-- Paso 2: Selección de Motocicleta -->
      <div v-if="step === 2">
        <h2>Paso 2: Motocicleta de Interés</h2>
        <MotorcycleList @select="handleMotorcycleSelection" />
      </div>
  
      <!-- Paso 3: Recomendación de Sucursal y Mapa -->
      <div v-if="step === 3">
        <h2>Paso 3: Sucursal Recomendada</h2>
        <BranchRecommendation :address="customerData.address" />
        <button @click="step = 4">Continuar</button>
      </div>
  
      <!-- Paso 4: Resumen y Confirmación -->
      <div v-if="step === 4">
        <h2>Paso 4: Resumen</h2>
        <div>
          <h3>Tus Datos:</h3>
          <p>{{ customerData.firstName }} {{ customerData.lastName }}</p>
          <p>{{ customerData.email }}</p>
          <p>{{ customerData.address }}</p>
        </div>
        <div>
          <h3>Motocicleta Seleccionada:</h3>
          <p>{{ selectedMotorcycle.brand }} {{ selectedMotorcycle.model }} ({{ selectedMotorcycle.year }})</p>
        </div>
        <button @click="submitForm">Confirmar</button>
      </div>
  
      <!-- Navegación entre pasos -->
      <div v-if="step > 1">
        <button @click="step--">Anterior</button>
      </div>
    </div>
  </template>
  
  <script>
  import CustomerForm from './CustomerForm.vue';
  import MotorcycleList from './MotorcycleList.vue';
  import BranchRecommendation from './BranchRecommendation.vue';
  
  export default {
    components: {
      CustomerForm,
      MotorcycleList,
      BranchRecommendation
    },
    data() {
      return {
        step: 1, // Paso actual
        customerData: {}, // Datos del cliente
        selectedMotorcycle: {} // Motocicleta seleccionada
      };
    },
    methods: {
      // Maneja los datos del cliente (Paso 1)
      handleCustomerData(data) {
        this.customerData = data;
        this.step = 2; // Avanzar al siguiente paso
      },
      // Maneja la selección de la motocicleta (Paso 2)
      handleMotorcycleSelection(motorcycle) {
        this.selectedMotorcycle = motorcycle;
        this.step = 3; // Avanzar al siguiente paso
      },
      // Envía el formulario (Paso 4)
      submitForm() {
        const formData = {
          customer: this.customerData,
          motorcycle: this.selectedMotorcycle
        };
        console.log("Formulario enviado:", formData);
        alert("¡Formulario enviado con éxito!");
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369f6e;
  }
  </style>