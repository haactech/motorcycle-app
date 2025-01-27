<template>
  <form @submit.prevent="submitForm">
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
    <button type="submit">Siguiente</button>
  </form>
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
    };
  },
  methods: {
    submitForm() {
      const customerData = Object.keys(this.customer).reduce((acc, key) => {
        acc[key] = typeof this.customer[key] === 'string' 
          ? this.customer[key].trim() 
          : this.customer[key];
        return acc;
      }, {});

      console.log('Datos emitidos desde CustomerForm:', customerData); // Para depuración
      this.$emit('form-submitted', customerData); // ⬅️ Nombre del evento cambiado
    }
}
};
</script>