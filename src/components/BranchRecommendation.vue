<template>
  <div>
    <h2>Sucursal Recomendada</h2>
    <p v-if="branch">
      {{ branch.name }} - {{ branch.address }} ({{ branch.distance_km }} km)
    </p>
    <p v-else>Cargando sucursal recomendada...</p>
    <BranchMap v-if="branch" :branch="branch" />
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