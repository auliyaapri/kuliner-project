<script setup>
const props = defineProps({
    product: Object
})

const truncateDescription = (description) => {
    const maxWords = 15;
    const words = description.split(" ");
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
};

</script>
<template>
    <div>


        <div class="mt-4">
            <div class="card" style="max-width: 22.23vw;border-radius: 19px;">
                <img :src="`/public/images/${product.gambar}`" class="card-img-top" alt="sasas">
                <div class="card-body">
                    <h5 class="card-title">{{ product.nama }}</h5>
                    <p>{{ truncateDescription(product.deskripsi) }}</p>
                    <h5>Rp. {{ Number(product.harga).toLocaleString('id-ID') }}</h5>
                    <div class="d-flex justify-content-between">

                        <router-link class="btn btn-primary mt-2" :to="`best-products/${product.id}`"><i class="fas fa-shopping-cart"></i> Beli</router-link>
                        
                    </div>

                </div>
            </div>

        </div>


    </div>
</template>

<style></style>
