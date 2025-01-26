<template>
  <div id="app">
    <h1>Motocicletas App</h1>
    <CustomerForm @submit="handleSubmit" />
    <MotorcycleList />
    <BranchRecommendation :address="customerAddress" />
  </div>
</template>

<script>
import CustomerForm from './components/CustomerForm.vue';
import MotorcycleList from './components/MotorcycleList.vue';
import BranchRecommendation from './components/BranchRecommendation.vue';

export default {
  name: 'App',
  components: {
    CustomerForm,
    MotorcycleList,
    BranchRecommendation
  },
  data() {
    return {
      customerAddress: ''
    };
  },
  methods: {
    handleSubmit(customer) {
      console.log("Cliente enviado", customer);
      this.customerAddress = customer.address;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>