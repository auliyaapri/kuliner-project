<template>
    <div class="home">
      <div class="container-fluid bg-main">
        <Hero />
      </div>
      <div class="container mt-5">
        <div class="row">
            <h2>Best <b>Foods</b> </h2>
          <CardProduct v-for="product in products" :key="product.id" :product="product" class="col-md-4" />
          <div class="col-12 text-center mt-5">
            
            <router-link to="/foods" class="btn btn-success">Lihat Lainnya</router-link>

          </div>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Hero from "@/components/Hero.vue";
  import CardProduct from "@/components/CardProduct.vue";
  
  import axios from "axios";
  import { onMounted, ref } from "vue";
  
  const products = ref([]);
  
  onMounted(() => {
    axios
      .get("http://localhost:3000/best-products")
      .then((response) => {
        products.value = response.data;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  });
  </script>
  
  