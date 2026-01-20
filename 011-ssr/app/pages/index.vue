<script setup>
import axios from "axios";

const products = ref([])

function getProductsHttp() {
  return axios.get('https://fakestoreapi.com/products');
}

async function getProducts() {
  getProductsHttp()
    .then((response) => {
      products.value = response.data;
    });
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <section class="products-section">
    <div class="container">
      <h2 class="section-title">Наши товары</h2>
      <div class="products-grid">
        <ProductCard
          v-for="product in products"
          :id="product.id"
          :title="product.title"
          :description="product.description"
          :image="product.image"
          :price="product.price"
        ></ProductCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>