<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ContactItem></ContactItem>
</template>

<script>
import ContactItem from "./components/Contact.vue";

export default {
  name: 'App',
  components: {
      ContactItem
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";

</style>
