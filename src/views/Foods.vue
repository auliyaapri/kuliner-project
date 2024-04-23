<template>
  <br>
  <br>
  <div class="container mt-5">
    <div class="row g-0 m-0">
      <h2>Daftar <b>Makanan</b> </h2>
      <div class="col-12 mt-3">
        <input v-model="search" type="text" class="form-control w-50" placeholder="Cari makanan...">
      </div>
      
      <div class="col-md-4 col-sm-6 col-12 mt-5" v-for="product in filteredProducts" :key="product.id" :product="product">        
        <div class="card card-menu">
          <img :src="`/public/images/${product.gambar}`" class="card-img-top" alt="sasas">
          <div class="card-body">
            <h5 class="card-title">{{ product.nama }}</h5>
            <p>{{ truncateDescription(product.deskripsi) }}</p>
            <h5>Rp. {{ Number(product.harga).toLocaleString('id-ID') }}</h5>
            <div class="d-flex justify-content-between mt-3">                            
              <router-link class="btn btn-primary" :to="`foods/${product.id}`"><i class="fas fa-shopping-cart"></i> Beli</router-link>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";

const getAllProducts = ref([]);
const search = ref("");

// Make a request for a user with a given ID
axios.get('http://localhost:3000/products')
  .then((response) => {
    getAllProducts.value = response.data
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
  });

const filteredProducts = computed(() => {
  return getAllProducts.value.filter(product => product.nama.toLowerCase().includes(search.value.toLowerCase()));
});

const truncateDescription = (description) => {
  const maxWords = 15;
  const words = description.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return description;
};
</script>

<style>
.card-menu {
  
  width: 70%;
}

@media (min-width: 768px) { 
  .card-menu {
  
  width: 80%;
}
 }

</style>
