<script setup>
import ProductsSection from "@/components/ProductsSection.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import OrderSection from "@/components/OrderSection.vue";

const products = ref([]);
const searchName = ref('');
const searchPriceFrom = ref(0);
const searchPriceTo = ref(0);

function getProductsHttp() {
  return axios.get('https://fakestoreapi.com/products');
}

async function getProducts() {
  getProductsHttp()
    .then((response) => {
      products.value = response.data;
    });
}

async function searchProducts() {
  getProductsHttp()
    .then((response) => {
      products.value = response.data
        .filter((product) => {
          if (searchName.value) {
            return product.title.toLowerCase().includes(searchName.value.toLowerCase());
          } else {
            return true;
          }
        })
        .filter((product) => {
          if (searchPriceFrom.value >= 0) {
            return product.price >= searchPriceFrom.value;
          } else {
            return true;
          }
        })
        .filter((product) => {
          if (searchPriceTo.value >= 0) {
            return product.price <= searchPriceTo.value;
          } else {
            return true;
          }
        })
    })
}

onMounted(() => {
  getProducts();
});
</script>

<template>
  <header>
    <div class="container">
      <div class="header-content">
        <h1>Интернет-магазин</h1>
        <p>Найдите нужный товар по названию или цене</p>
        <form class="search-form" id="searchForm" @submit.prevent="searchProducts">
          <input type="text" v-model="searchName" placeholder="Поиск по названию...">
          <input type="text" placeholder="Цена от...">
          <input type="text" placeholder="Цена до...">
          <button type="submit">Найти</button>
        </form>
      </div>
    </div>
  </header>

  <ProductsSection :products="products"></ProductsSection>

  <OrderSection></OrderSection>
</template>

<style scoped>
</style>
