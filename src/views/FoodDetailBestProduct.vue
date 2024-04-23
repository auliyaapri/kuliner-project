<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const getProductById = ref([]);
const route = useRoute();
const currentPath = ref('');

const pesan = ref({ jumlah_pemesanan: 0, keterangan: '', nama: '', id: '', gambar: '', harga: '', totalHarga: '',bestProduct:'' });


onMounted(() => {
    // Mengakses path URL saat ini
    currentPath.value = route.path;

    // Mengambil bagian terakhir dari path URL (ID produk)
    const parts = currentPath.value.split('/');
    const productId = parts[parts.length - 1];

    // Menambahkan ke variabel const
    pesan.value.id = productId;

    // Mengambil data produk berdasarkan ID produk
    axios.get(`http://localhost:3000/best-products/${productId}`)
        .then((response) => {
            getProductById.value = response.data;
            pesan.value.gambar = getProductById.value.gambar;
            pesan.value.harga = getProductById.value.harga;
            pesan.value.nama = getProductById.value.nama;
            pesan.value.totalHarga = pesan.value.harga * pesan.value.jumlah_pemesanan;
            pesan.value.bestProduct = "true";

        })
        .catch((error) => {
            console.log(error);
        });
});

// ======================= yang lama ======================
// const pemesanan = () => {
//     console.log("Jumlah Pesanan:", pesan.value.jumlah_pemesanan);
//     console.log("Keterangan:", pesan.value.keterangan);

//     if (pesan.value.jumlah_pemesanan > 0) {        
//         axios.post(`http://localhost:3000/keranjangs`, pesan.value)
//             .then(() => {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Sukses Membeli!',
//                     text: 'Terimaksih telah membeli produk kami!'
//                 });
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     } else {
//         Swal.fire({
//             icon: 'error',
//             title: 'Gagal Membeli!',
//             text: 'Jumlah pemesanan harus lebih dari 0!'
//         });
//     }
// }
const pemesanan = () => {
    console.log("Jumlah Pesanan:", pesan.value.jumlah_pemesanan);
    console.log("Keterangan:", pesan.value.keterangan);

    // Mengakses path URL saat ini
    currentPath.value = route.path;

    // Mengambil bagian terakhir dari path URL (ID produk)
    const parts = currentPath.value.split('/');
    const productId = parts[parts.length - 1];

    // Menambahkan ke variabel const
    pesan.value.id = productId;
    if (pesan.value.jumlah_pemesanan > 0) {
        // Cek apakah produk sudah ada di keranjang
        axios.get(`http://localhost:3000/keranjangs/${productId}`)
            .then((response) => {
                // Jika produk sudah ada, gunakan metode PUT untuk mengupdate
                return axios.put(`http://localhost:3000/keranjangs/${pesan.value.id}`, pesan.value);
            })
            .catch((error) => {
                // Jika produk belum ada, gunakan metode POST untuk membuat baru
                return axios.post(`http://localhost:3000/keranjangs`, pesan.value);
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses Membeli!',
                    text: 'Terimaksih telah membeli produk kami!'
                });
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Gagal Membeli!',
            text: 'Jumlah pemesanan harus lebih dari 0!'
        });
    }
}


const hitungTotalHarga = () => {
    pesan.value.totalHarga = pesan.value.harga * pesan.value.jumlah_pemesanan;
}
</script>

<template>
    <div class="">
        <br>
        <br>
        <br>
        <br>
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item "><router-link to="/">Home</router-link></li>
                    <li class="breadcrumb-item"><router-link to="/foods">Foods</router-link></li>
                    <li class="breadcrumb-item  active" aria-current="page"><span class="fw-bold">{{getProductById.nama}}</span> </li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-6">
                    <img :src="`/public/images/${getProductById.gambar}`" class="card-img-top rounded-5"
                        alt="${getProductById.gambar}">

                </div>
                <div class="col-md-6">
                    <h2>{{ getProductById.nama }}</h2>
                    <p class="text-muted">Kategori: Makanan</p>
                    <p>{{ getProductById.deskripsi }}</p>
                    <h5>Rp. {{ Number(getProductById.harga).toLocaleString('id-ID') }}</h5>

                    <!-- cccc -->
                    <form @submit.prevent>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Jumlah Pesanan</label>
                            <input type="number" v-model="pesan.jumlah_pemesanan" class="form-control"
                                id="exampleInputEmail1" aria-describedby="emailHelp" @input="hitungTotalHarga">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Keterangan</label>
                            <textarea class="form-control" v-model="pesan.keterangan" placeholder="Leave a comment here"
                                id="floatingTextarea2" style="height: 100px"></textarea>
                        </div>
                        <!-- gambar  -->
                        <button type="submit" @click="pemesanan" class="btn btn-primary"><i
                                class="fas fa-shopping-cart"></i> Beli Sekarang</button>
                        <button class="btn btn-danger ms-3"><router-link to="/foods">Foods</router-link></button>
                    </form>
                    <!-- cccc -->
                </div>
            </div>
        </div>
    </div>
</template>
