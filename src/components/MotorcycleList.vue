<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Motocicletas Disponibles</h2>
      <div class="flex space-x-4">
        <input 
          type="text" 
          placeholder="Buscar motocicleta..." 
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="motorcycle in motorcycles" 
        :key="motorcycle.id" 
        @click="selectMotorcycle(motorcycle)"
        class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
              {{ motorcycle.brand }} {{ motorcycle.model }}
            </h3>
            <p class="text-gray-600">{{ motorcycle.year }}</p>
          </div>
          <div class="text-gray-400 group-hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <!-- Podríamos agregar más detalles aquí -->
        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Potencia
            </span>
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Disponible
            </span>
          </div>
        </div>
      </div>
    </div>
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
  },
  methods: {
    selectMotorcycle(motorcycle) {
      this.$emit('select', motorcycle);
    }
  }
};
</script>