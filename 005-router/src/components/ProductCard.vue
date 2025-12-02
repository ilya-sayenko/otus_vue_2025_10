<script setup>
import {useRouter} from "vue-router";
import {CartService} from "@/services/CartService.js";

const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String
})

const router = useRouter()
const cartService = new CartService()

function routeToProductPage() {
  router.push(`/products/${props.id}`)
}

function addProductToCart() {
  cartService.putProduct({
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image
  })
}
</script>

<template>
  <div class="product-card">
<!--    <img class="product-image" :src="props.image" :alt="props.title">-->
    <img class="product-image" src="@/assets/product-image.png" :alt="props.title">
    <h3 class="product-title" @click="routeToProductPage">{{ props.title }}</h3>
    <div class="product-price">{{ props.price }}</div>
    <button class="add-to-cart-btn" @click="addProductToCart">Добавить в корзину</button>
  </div>
</template>

<style scoped>

</style>