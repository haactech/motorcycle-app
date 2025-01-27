<template>
  <div>
    <!-- Paso 1: Captura de Datos del Cliente -->
    <div v-if="step === 1">
      <h2>Paso 1: Tus Datos</h2>
      <CustomerForm @form-submitted="handleCustomerData" />
    </div>

    <!-- Paso 2: Selección de Motocicleta -->
    <div v-if="step === 2">
      <h2>Paso 2: Motocicleta de Interés</h2>
      <MotorcycleList @select="handleMotorcycleSelection" />
    </div>

    <!-- Paso 3: Recomendación de Sucursal y Mapa -->
    <div v-if="step === 3">
      <h2>Paso 3: Sucursal Recomendada</h2>
      <BranchRecommendation v-if="nearestBranch" :branch="nearestBranch" />
      <p v-else>Cargando sucursal recomendada...</p>
      <button @click="step = 4">Continuar</button>
    </div>

    <!-- Paso 4: Resumen y Confirmación -->
    <div v-if="step === 4">
      <h2>Paso 4: Resumen</h2>
      <div>
        <h3>Tus Datos:</h3>
        <p>{{ customerData.first_name }} {{ customerData.last_name_1 }}</p>
        <p>{{ customerData.email }}</p>
        <p>{{ customerData.street }} {{ customerData.number }}, {{ customerData.district }}, {{ customerData.city }}, {{ customerData.state }}</p>
      </div>
      <div>
        <h3>Motocicleta Seleccionada:</h3>
        <p>{{ selectedMotorcycle.brand }} {{ selectedMotorcycle.model }} ({{ selectedMotorcycle.year }})</p>
      </div>
      <div>
        <h3>Sucursal Recomendada:</h3>
        <p>{{ nearestBranch.name }} - {{ nearestBranch.address }} ({{ nearestBranch.distance_km }} km)</p>
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
import api from '../api'; // Importa el módulo de la API
import CustomerForm from './CustomerForm.vue';
import MotorcycleList from './MotorcycleList.vue';
import BranchRecommendation from './BranchRecommendation.vue';

export default {
  components: {
    CustomerForm,
    MotorcycleList,
    BranchRecommendation,
  },
  data() {
    return {
      step: 1,
      customerData: {},
      selectedMotorcycle: {},
      motorcycles: [], // Lista de motocicletas desde la API
      nearestBranch: null, // Sucursal recomendada desde la API
    };
  },
  async created() {
    // Obtener las motocicletas al cargar el componente
    try {
      const motorcyclesResponse = await api.getMotorcycles();
      this.motorcycles = motorcyclesResponse.data;
    } catch (error) {
      console.error('Error fetching motorcycles:', error);
    }
  },
  methods: {
    handleCustomerData(customerData) {
      if (!customerData || typeof customerData !== 'object') {
      console.error('Datos del cliente no válidos:', customerData);
      return;
    }
    this.customerData = JSON.parse(JSON.stringify(customerData));
    this.step = 2;
    },
    handleMotorcycleSelection(motorcycle) {
    this.selectedMotorcycle = motorcycle;
    this.step = 3;

    console.log('Datos del cliente antes de calcular la sucursal:', this.customerData); // Verifica los datos

    // Verifica que customerData tenga los valores correctos
    if (
      this.customerData.street &&
      this.customerData.number &&
      this.customerData.district &&
      this.customerData.city &&
      this.customerData.state
    ) {
      this.calculateNearestBranch();
    } else {
      console.error('Datos del cliente incompletos:', this.customerData);
      alert('Por favor, completa todos los campos del formulario.');
    }
  },
    async calculateNearestBranch() {
      try {
        const addressData = {
          street: this.customerData.street,
          number: this.customerData.number,
          district: this.customerData.district,
          city: this.customerData.city,
          state: this.customerData.state,
        };

        console.log('Datos enviados a la API:', addressData); // Verifica los datos enviados

        const response = await api.recommendBranch(addressData);
        this.nearestBranch = response.data.nearest_branch;
      } catch (error) {
        console.error('Error recommending branch:', error);
        alert('Hubo un error al calcular la sucursal recomendada');
      }
    },
    async submitForm() {
      const formData = {
        first_name: this.customerData.first_name,
        last_name_1: this.customerData.last_name_1,
        last_name_2: this.customerData.last_name_2,
        email: this.customerData.email,
        phone: this.customerData.phone,
        birth_date: this.customerData.birth_date, // Asegúrate de que esté en formato 'YYYY-MM-DD'
        street: this.customerData.street,
        number: this.customerData.number,
        district: this.customerData.district,
        city: this.customerData.city,
        state: this.customerData.state,
        motorcycle_ids: [this.selectedMotorcycle.id], // Envía el ID de la motocicleta seleccionada
      };

      try {
        const response = await api.createClient(formData);
        alert('Cliente creado con éxito');
        console.log('Respuesta de la API:', response.data);
        this.step = 4; // Avanzar al paso de resumen
      } catch (error) {
        console.error('Error creating client:', error);
        alert('Hubo un error al crear el cliente');
      }
    },
  },
};
</script>