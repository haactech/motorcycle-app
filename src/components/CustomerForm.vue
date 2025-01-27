<template>
  <div>
    <div v-if="!hasLocation && !showManualInput" class="text-center">
      <p class="mb-4">Para una mejor experiencia, permítenos acceder a tu ubicación</p>
      <div class="space-x-4">
        <button 
          @click="requestLocation" 
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Usar mi ubicación
        </button>
        <button 
          @click="showManualInput = true" 
          class="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Ingresar manualmente
        </button>
      </div>
    </div>

    <form v-else @submit.prevent="submitForm">
      <!-- Datos personales siempre visibles -->
      <div class="space-y-4">
        <div>
          <label for="first_name">Primer Nombre:</label>
          <input type="text" id="first_name" v-model="customer.first_name" required>
        </div>
        <div>
          <label for="second_name">Segundo Nombre:</label>
          <input type="text" id="second_name" v-model="customer.second_name">
        </div>
        <div>
          <label for="last_name_1">Primer Apellido:</label>
          <input type="text" id="last_name_1" v-model="customer.last_name_1" required>
        </div>
        <div>
          <label for="last_name_2">Segundo Apellido:</label>
          <input type="text" id="last_name_2" v-model="customer.last_name_2">
        </div>
        <div>
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" v-model="customer.email" required>
        </div>
        <div>
          <label for="phone">Teléfono:</label>
          <input type="text" id="phone" v-model="customer.phone" required>
        </div>
        <div>
          <label for="birth_date">Fecha de Nacimiento:</label>
          <input type="date" id="birth_date" v-model="customer.birth_date" required>
        </div>
      </div>

      <!-- Dirección -->
      <div v-if="showManualInput" class="mt-6 space-y-4">
        <div>
          <label for="street">Calle:</label>
          <input type="text" id="street" v-model="customer.street" required>
        </div>
        <div>
          <label for="number">Número:</label>
          <input type="text" id="number" v-model="customer.number" required>
        </div>
        <div>
          <label for="district">Colonia:</label>
          <input type="text" id="district" v-model="customer.district" required>
        </div>
        <div>
          <label for="city">Ciudad:</label>
          <input type="text" id="city" v-model="customer.city" required>
        </div>
        <div>
          <label for="state">Estado:</label>
          <input type="text" id="state" v-model="customer.state" required>
        </div>
      </div>

      <!-- Mostrar la dirección obtenida si se usó geolocalización -->
      <div v-else-if="hasLocation" class="mt-6">
        <div class="bg-gray-100 p-4 rounded">
          <h3 class="font-bold mb-2">Ubicación detectada:</h3>
          <p>{{ customer.street }} {{ customer.number }}</p>
          <p>{{ customer.district }}</p>
          <p>{{ customer.city }}, {{ customer.state }}</p>
          <button 
            @click="showManualInput = true" 
            class="text-blue-500 underline mt-2"
          >
            Editar dirección
          </button>
        </div>
      </div>

      <button type="submit" class="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
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
          'User-Agent': 'MotorcycleShopApp/1.0' // Mismo User-Agent que el backend
        };
        
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          { headers }
        );
        const data = await response.json();

        if (!data || !data.address) {
          throw new Error('No se pudo obtener la dirección');
        }

        // Extraer y normalizar la información de la dirección
        const address = data.address;
        
        // Para la calle, intentamos diferentes campos en orden de preferencia
        this.customer.street = address.road || 
                             address.street || 
                             address.pedestrian || 
                             address.footway || 
                             '';

        // Para el número, usamos house_number o el número del street si existe
        this.customer.number = address.house_number || 
                             (this.customer.street.match(/\d+/) || [''])[0] || 
                             '1'; // Número por defecto si no hay

        // Para el distrito/colonia, intentamos varios campos
        this.customer.district = address.suburb || 
                               address.neighbourhood || 
                               address.residential || 
                               address.quarter || 
                               address.city_district ||
                               'Centro'; // Valor por defecto si no hay

        // Para la ciudad
        this.customer.city = address.city || 
                           address.town || 
                           address.municipality || 
                           address.city_district || 
                           '';

        // Para el estado
        this.customer.state = address.state || 
                            address.region || 
                            '';

        // Verificar que tengamos todos los campos requeridos
        const requiredFields = ['street', 'number', 'district', 'city', 'state'];
        const missingFields = requiredFields.filter(field => !this.customer[field]);

        if (missingFields.length > 0) {
          console.warn('Campos faltantes:', missingFields);
          
          // Si falta la colonia pero tenemos ciudad, podemos usar un valor por defecto
          if (missingFields.includes('district') && this.customer.city) {
            this.customer.district = 'Centro';
            missingFields.splice(missingFields.indexOf('district'), 1);
          }

          // Si aún faltan campos después de los valores por defecto
          if (missingFields.length > 0) {
            this.showManualInput = true;
            return;
          }
        }

        this.hasLocation = true;
        
        // Log para debugging
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