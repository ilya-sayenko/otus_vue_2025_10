<script setup>
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {useCartStore} from "@/stores/cartStore.js";

const route = useRoute()
const productId = computed(() => route.params.id)
const product = ref({})
const cartStore = useCartStore()

function getProductHttp(id) {
  return axios.get(`https://fakestoreapi.com/products/${id}`)
}

async function getProductData() {
  getProductHttp(productId.value)
    .then((response) => {
      product.value = response.data;
    })
}

function addProductToCart() {
  cartStore.putProduct({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image
  })
}

onMounted(() => {
  getProductData()
})
</script>

<template>
  <div class="container product-content">
<!--    <img class="product-image" :src="product.image" :alt="product.title">-->
    <img class="product-image" src="@/assets/image/product-image.png" :alt="product.title">
    <h3 class="product-title">{{ product.title }}</h3>
    <div class="product-price">{{ product.price }}</div>
    <p class="product-description">{{ product.description }}</p>
    <button class="add-to-cart-btn" @click="addProductToCart">Добавить в корзину</button>
  </div>
</template>

<style scoped>

</style>