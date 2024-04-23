<script setup>
// import { RouterView, useRoute } from "vue-router";
import { RouterView, useRoute } from "vue-router";

// import HelloWorld from './components/HelloWorld.vue'
import Navbar from "./components/layouts/Navbar.vue";
import Footer from "./components/layouts/Footer.vue";

const route = useRoute();

</script>

<template>
  <div>
    <Navbar />  
    <RouterView />    
    <Footer />        
  </div>
</template>

<style scoped>

</style>
