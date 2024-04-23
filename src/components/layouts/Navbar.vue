<script setup>
import axios from 'axios';
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const jumlah_pemesanan = ref([]);

const fetchJumlahPemesanan = () => {
    axios
      .get("http://localhost:3000/keranjangs")
      .then((response) => {
        jumlah_pemesanan.value = response.data;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
};

let intervalId;

onMounted(() => {
    fetchJumlahPemesanan();
    intervalId = setInterval(fetchJumlahPemesanan, 2000); // Update setiap 5 detik
});

onUnmounted(() => {
    clearInterval(intervalId); // Hentikan interval ketika komponen di-unmount
});

// Membuat computed property untuk menghitung panjang jumlah_pemesanan
const jumlah_pemesanan_length = computed(() => jumlah_pemesanan.value.length);

</script>

<template>
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand" href="#">Kuliner</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <RouterLink class="nav-link" :class="{ 'active': route.path === '/' }" to="/">Home</RouterLink>
                    <RouterLink class="nav-link" :class="{ 'active': route.path === '/foods' }" to="/foods">Foods</RouterLink>
                </div>
                <div class="navbar-nav ms-auto">                    
                    <RouterLink to="/keranjang" class="nav-link"><i class="fas fa-cart-plus"></i> Keranjang :</RouterLink>
                    <!-- Menggunakan jumlah_pemesanan_length untuk menampilkan panjang jumlah_pemesanan -->
                    <span class="nav-link text-danger">{{ jumlah_pemesanan_length }}</span>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
.active {
    
    font-weight: bold;
}
</style>


<!-- https://youtu.be/iz2ocdbAku0?list=PLIan8aHxsPj3a7oLHb2a8pw8IHBq45WYu  -->