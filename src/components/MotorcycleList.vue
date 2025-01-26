<template>
  <div>
    <h2>Motocicletas Disponibles</h2>
    <ul>
      <li v-for="motorcycle in motorcycles" :key="motorcycle.id" @click="selectMotorcycle(motorcycle)">
        {{ motorcycle.brand }} {{ motorcycle.model }} ({{ motorcycle.year }})
      </li>
    </ul>
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

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>