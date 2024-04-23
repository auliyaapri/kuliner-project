<script setup>
import router from "@/router";
import axios from "axios";

import Swal from 'sweetalert2/dist/sweetalert2.all.js';

import { computed, onMounted, ref } from "vue";

const keranjangs = ref([]);
const pesanBooking = ref({ nama_pembeli: '', nomor_telpon: '' })

onMounted(() => {
    console.log(pesanBooking.value);


    // Mengambil data produk berdasarkan ID produk
    axios
        .get(`http://localhost:3000/keranjangs`)
        .then((response) => {
            keranjangs.value = response.data;
            // console.log(keranjangs.value);
        })
        .catch((error) => {
            console.log(error);
        });
});

// Hitung total pembayaran
const totalBayar = computed(() => {
    return keranjangs.value.reduce((total, item) => {
        return total + item.totalHarga;
    }, 0);
});

// Function Hapus Keranjang 
const hapusKeranjangItem = (id) => {
    axios
        .delete(`http://localhost:3000/keranjangs/${id}`)
        .then((response) => {
            keranjangs.value = keranjangs.value.filter(function (item) {
                return item.id !== id
            })
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Dihapus!',
                text: 'Item telah berhasil dihapus dari keranjang!'
            });
        })
        .catch((error) => {
            console.error('Error deleting item:', error);
        });
}

const hapusKeranjangItemPesan = (id) => {
    axios
        .delete(`http://localhost:3000/keranjangs/${id}`)
        .then((response) => {
            keranjangs.value = keranjangs.value.filter(function (item) {
                return item.id !== id
            })

        })
        .catch((error) => {
            console.error('Error deleting item:', error);
        });
}


const pesanMeja = () => {
  const dataPesan = {
    ...pesanBooking.value,
    keranjang: keranjangs.value
  };
  axios.post(`http://localhost:3000/pesanans`, dataPesan)
    .then((response) => {
      // Hapus semua item dari keranjang setelah pesanan berhasil dibuat
      keranjangs.value.forEach(item => {
        hapusKeranjangItemPesan(item.id);
      });
      Swal.fire({
        icon: 'success',
        title: 'Sukses Membeli!',
        text: 'Terimaksih telah membeli produk kami!'
      }).then(() => {
        // Arahkan pengguna kembali ke halaman utama setelah SweetAlert dikonfirmasi
        router.push('/');
      });
    })
    .catch((error) => {
      console.log(error);
    });
}



const no = 1;

</script>

<template>
    <div>
        <br />
        <br />
        <br />
        <div class="container">
            <div class="row">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/">Home</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link to="/foods">Foods</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            <span class="fw-bold"><router-link to="/keranjang">Keranjang</router-link></span>
                        </li>
                    </ol>
                </nav>

                <div class="col">
                    <br />
                    <h1>Keranjang :</h1>
                    <table class="table">
                        <thead class="">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" class="w-25">Foto</th>
                                <th scope="col">Makanan</th>
                                <th scope="col">Keterangan</th>
                                <th scope="col">Jumlah</th>
                                <th scope="col">Harga</th>
                                <th scope="col">Total Harga</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="item in keranjangs" :key="item.id">
                                <td>{{ no++ }}</td>
                                <td>
                                    <img :src="`/public/images/${item.gambar}`" class="w-50 rounded-5"
                                        alt="${getProductById.gambar}" />
                                </td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.keterangan }}</td>
                                <td>{{ item.jumlah_pemesanan }}</td>
                                <td>Rp. {{ Number(item.harga).toLocaleString("id-ID") }}</td>
                                <td>
                                    Rp. {{ Number(item.totalHarga).toLocaleString("id-ID") }}
                                </td>

                                <td>
                                    <button class="btn btn-danger" @click="hapusKeranjangItem(item.id)">
                                        <i class="fas fa-trash-alt"></i> Hapus {{ item.id }}
                                    </button>
                                </td>
                            </tr>

                            <td colspan="12">
                                <div class="text-end fw-bold">Total Bayar : <span class="ms-3">Rp. {{
                                    Number(totalBayar).toLocaleString("id-ID") }}</span> </div>
                            </td>

                        </tbody>
                    </table>
                    <form @submit.prevent>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nama</label>
                            <input type="text" class="form-control" v-model="pesanBooking.nama_pembeli"
                                id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nomor Telepon</label>
                            <input type="number" class="form-control" v-model="pesanBooking.nomor_telpon"
                                id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <button type="submit" @click="pesanMeja" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
