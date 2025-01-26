<template>
  <div id="app">
    <h1>Motocicletas App</h1>
    <MultiStepForm />
  </div>
</template>

<script>
import MultiStepForm from './components/MultiStepForm.vue';

export default {
  name: 'App',
  components: {
    MultiStepForm
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