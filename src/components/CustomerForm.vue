<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="firstName">Primer Nombre:</label>
      <input type="text" id="firstName" v-model="customer.firstName" required>
    </div>
    <div>
      <label for="secondName">Segundo Nombre:</label>
      <input type="text" id="secondName" v-model="customer.secondName">
    </div>
    <div>
      <label for="firstLastName">Primer Apellido:</label>
      <input type="text" id="firstLastName" v-model="customer.firstLastName" required>
    </div>
    <div>
      <label for="secondLastName">Segundo Apellido:</label>
      <input type="text" id="secondLastName" v-model="customer.secondLastName">
    </div>
    <div>
      <label for="email">Correo Electrónico:</label>
      <input type="email" id="email" v-model="customer.email" required>
    </div>
    <div>
      <label for="address">Domicilio:</label>
      <input type="text" id="address" v-model="customer.address" required>
    </div>
    <button type="submit">Siguiente</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      customer: {
        firstName: '',
        secondName: '',
        firstLastName: '',
        secondLastName: '',
        email: '',
        address: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.customer);
    }
  }
};
</script>