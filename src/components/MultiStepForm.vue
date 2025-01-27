<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between mb-2">
        <div v-for="i in 4" :key="i" 
             class="flex items-center relative">
          <div :class="`rounded-full h-10 w-10 flex items-center justify-center border-2 
            ${step >= i ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-500'}
            transition-all duration-300 ease-in-out`">
            {{ i }}
          </div>
          <div v-if="i < 4" class="w-24 h-1 mx-2 transition-all duration-300 ease-in-out"
               :class="step > i ? 'bg-blue-500' : 'bg-gray-300'"></div>
        </div>
      </div>
      <div class="flex justify-between px-2 mt-2">
        <span class="text-sm text-gray-600">Datos</span>
        <span class="text-sm text-gray-600">Motocicleta</span>
        <span class="text-sm text-gray-600">Sucursal</span>
        <span class="text-sm text-gray-600">Resumen</span>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out">
      <div v-if="step === 1" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Paso 1: Tus Datos</h2>
        <CustomerForm @form-submitted="handleCustomerData" />
      </div>

      <div v-if="step === 2" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Paso 2: Motocicleta de Interés</h2>
        <MotorcycleList @select="handleMotorcycleSelection" />
      </div>

      <div v-if="step === 3" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Paso 3: Sucursal Recomendada</h2>
        <BranchRecommendation v-if="nearestBranch" :branch="nearestBranch" />
        <p v-else class="text-gray-600 italic">Cargando sucursal recomendada...</p>
        <button 
          @click="step = 4"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
        >
          Continuar
        </button>
      </div>

      <div v-if="step === 4" class="space-y-8">
        <h2 class="text-2xl font-bold text-gray-800">Paso 4: Resumen</h2>
        
        <div class="space-y-6">
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Tus Datos:</h3>
            <div class="space-y-2 text-gray-600">
              <p class="font-medium">{{ customerData.first_name }} {{ customerData.last_name_1 }}</p>
              <p>{{ customerData.email }}</p>
              <p>{{ customerData.street }} {{ customerData.number }}, {{ customerData.district }}, {{ customerData.city }}, {{ customerData.state }}</p>
            </div>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Motocicleta Seleccionada:</h3>
            <p class="text-gray-600">{{ selectedMotorcycle.brand }} {{ selectedMotorcycle.model }} ({{ selectedMotorcycle.year }})</p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Sucursal Recomendada:</h3>
            <p class="text-gray-600">{{ nearestBranch.name }} - {{ nearestBranch.address }} ({{ nearestBranch.distance_km }} km)</p>
          </div>
        </div>

        <button 
          @click="submitForm"
          class="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition duration-200"
        >
          Confirmar
        </button>
      </div>

      <div v-if="step > 1" class="mt-6 flex justify-between">
        <button 
          @click="step--"
          class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200"
        >
          Anterior
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';
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
      motorcycles: [], 
      nearestBranch: null,
    };
  },
  async created() {

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

    console.log('Datos del cliente antes de calcular la sucursal:', this.customerData); 

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
        birth_date: this.customerData.birth_date,
        street: this.customerData.street,
        number: this.customerData.number,
        district: this.customerData.district,
        city: this.customerData.city,
        state: this.customerData.state,
        motorcycle_ids: [this.selectedMotorcycle.id], 
      };

      try {
        const response = await api.createClient(formData);
        alert('Cliente creado con éxito');
        console.log('Respuesta de la API:', response.data);
        this.step = 4; 
      } catch (error) {
        console.error('Error creating client:', error);
        alert('Hubo un error al crear el cliente');
      }
    },
  },
};
</script>