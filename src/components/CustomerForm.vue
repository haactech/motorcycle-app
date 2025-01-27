<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <div v-if="!hasLocation && !showManualInput" class="text-center">
      <p class="mb-4 text-lg text-gray-700">Para una mejor experiencia, permítenos acceder a tu ubicación</p>
      <div class="space-x-4">
        <button 
          @click="requestLocation" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
        >
          Usar mi ubicación
        </button>
        <button 
          @click="showManualInput = true" 
          class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200"
        >
          Ingresar manualmente
        </button>
      </div>
    </div>

    <form v-else @submit.prevent="submitForm" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label for="first_name" class="block text-sm font-medium text-gray-700">Primer Nombre:</label>
          <input 
            type="text" 
            id="first_name" 
            v-model="customer.first_name" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        <!-- Repeat the same pattern for other inputs -->
        <div class="space-y-2">
          <label for="second_name" class="block text-sm font-medium text-gray-700">Segundo Nombre:</label>
          <input 
            type="text" 
            id="second_name" 
            v-model="customer.second_name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div class="space-y-2">
          <label for="last_name_1" class="block text-sm font-medium text-gray-700">Primer Apellido:</label>
          <input 
            type="text" 
            id="last_name_1" 
            v-model="customer.last_name_1"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        <div class="space-y-2">
          <label for="last_name_2" class="block text-sm font-medium text-gray-700">Segundo Apellido:</label>
          <input 
            type="text" 
            id="last_name_2" 
            v-model="customer.last_name_2"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
          <input 
            type="email" 
            id="email" 
            v-model="customer.email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        <div class="space-y-2">
          <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono:</label>
          <input 
            type="text" 
            id="phone" 
            v-model="customer.phone"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        <div class="space-y-2">
          <label for="birth_date" class="block text-sm font-medium text-gray-700">Fecha de Nacimiento:</label>
          <input 
            type="date" 
            id="birth_date" 
            v-model="customer.birth_date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
      </div>

      <!-- Dirección -->
      <div v-if="showManualInput" class="mt-8 space-y-6">
        <h3 class="text-lg font-medium text-gray-900">Dirección</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label for="street" class="block text-sm font-medium text-gray-700">Calle:</label>
            <input 
              type="text" 
              id="street" 
              v-model="customer.street"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div class="space-y-2">
            <label for="number" class="block text-sm font-medium text-gray-700">Número:</label>
            <input 
              type="text" 
              id="number" 
              v-model="customer.number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div class="space-y-2">
            <label for="district" class="block text-sm font-medium text-gray-700">Colonia:</label>
            <input 
              type="text" 
              id="district" 
              v-model="customer.district"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div class="space-y-2">
            <label for="city" class="block text-sm font-medium text-gray-700">Ciudad:</label>
            <input 
              type="text" 
              id="city" 
              v-model="customer.city"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div class="space-y-2">
            <label for="state" class="block text-sm font-medium text-gray-700">Estado:</label>
            <input 
              type="text" 
              id="state" 
              v-model="customer.state"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
        </div>
      </div>

      <!-- Mostrar la dirección obtenida si se usó geolocalización -->
      <div v-else-if="hasLocation" class="mt-8">
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Ubicación detectada:</h3>
          <p class="text-gray-700">{{ customer.street }} {{ customer.number }}</p>
          <p class="text-gray-700">{{ customer.district }}</p>
          <p class="text-gray-700">{{ customer.city }}, {{ customer.state }}</p>
          <button 
            @click="showManualInput = true" 
            class="mt-4 text-blue-500 hover:text-blue-600 underline"
          >
            Editar dirección
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        class="w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200"
      >
        Siguiente
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: {
        first_name: '',
        second_name: '',
        last_name_1: '',
        last_name_2: '',
        email: '',
        phone: '',
        birth_date: '',
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
      },
      hasLocation: false,
      showManualInput: false,
      locationError: null,
    };
  },
  methods: {
    async requestLocation() {
      if (!navigator.geolocation) {
        this.showManualInput = true;
        return;
      }

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        await this.reverseGeocode(position.coords.latitude, position.coords.longitude);
        this.hasLocation = true;
      } catch (error) {
        console.error('Error getting location:', error);
        this.locationError = error.message;
        this.showManualInput = true;
      }
    },

    async reverseGeocode(lat, lon) {
      try {
        const headers = {
          'User-Agent': 'MotorcycleShopApp/1.0'
        };
        
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          { headers }
        );
        const data = await response.json();

        if (!data || !data.address) {
          throw new Error('No se pudo obtener la dirección');
        }

        const address = data.address;
        
        this.customer.street = address.road || 
                             address.street || 
                             address.pedestrian || 
                             address.footway || 
                             '';

        this.customer.number = address.house_number || 
                             (this.customer.street.match(/\d+/) || [''])[0] || 
                             '1'; 

        this.customer.district = address.suburb || 
                               address.neighbourhood || 
                               address.residential || 
                               address.quarter || 
                               address.city_district ||
                               'Centro';

        this.customer.city = address.city || 
                           address.town || 
                           address.municipality || 
                           address.city_district || 
                           '';

        this.customer.state = address.state || 
                            address.region || 
                            '';

        const requiredFields = ['street', 'number', 'district', 'city', 'state'];
        const missingFields = requiredFields.filter(field => !this.customer[field]);

        if (missingFields.length > 0) {
          console.warn('Campos faltantes:', missingFields);
          
          if (missingFields.includes('district') && this.customer.city) {
            this.customer.district = 'Centro';
            missingFields.splice(missingFields.indexOf('district'), 1);
          }

          if (missingFields.length > 0) {
            this.showManualInput = true;
            return;
          }
        }

        this.hasLocation = true;
        
        console.log('Dirección obtenida:', {
          street: this.customer.street,
          number: this.customer.number,
          district: this.customer.district,
          city: this.customer.city,
          state: this.customer.state
        });

      } catch (error) {
        console.error('Error en geocodificación inversa:', error);
        this.showManualInput = true;
      }
    },

    submitForm() {
      const customerData = Object.keys(this.customer).reduce((acc, key) => {
        acc[key] = typeof this.customer[key] === 'string' 
          ? this.customer[key].trim() 
          : this.customer[key];
        return acc;
      }, {});

      this.$emit('form-submitted', customerData);
    }
  }
};
</script>