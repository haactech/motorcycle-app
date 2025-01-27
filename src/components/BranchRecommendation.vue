<template>
  <div class="space-y-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Sucursal Recomendada</h2>
      
      <div v-if="branch" class="space-y-6">
        <div class="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <div class="flex items-start space-x-4">
            <div class="p-2 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ branch.name }}</h3>
              <p class="text-gray-600 mb-2">{{ branch.address }}</p>
              <div class="flex items-center text-sm text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>A {{ branch.distance_km }} kilómetros de tu ubicación</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mapa -->
        <div class="rounded-lg overflow-hidden border border-gray-200 shadow-md">
          <BranchMap :branch="branch" class="h-[400px] w-full" />
        </div>

        <!-- Información adicional -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <h4 class="font-medium text-gray-800 mb-2">Horario de Atención</h4>
            <p class="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
            <p class="text-gray-600">Sábado: 9:00 - 14:00</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <h4 class="font-medium text-gray-800 mb-2">Contacto</h4>
            <p class="text-gray-600">Tel: (55) 5555-5555</p>
            <p class="text-gray-600">Email: contacto@sucursal.com</p>
          </div>
        </div>
      </div>

      <div v-else class="flex items-center justify-center p-12">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p class="text-gray-600">Cargando sucursal recomendada...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BranchMap from './BranchMap.vue';

export default {
  components: {
    BranchMap,
  },
  props: {
    branch: {
      type: Object,
      required: true,
    },
  },
};
</script>