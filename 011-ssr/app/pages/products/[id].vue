<script setup>
const route = useRoute()
const productId = route.params.id
const cartStore = useCartStore()
const { data: product } = await useFetch(`https://fakestoreapi.com/products/${productId}`);

function addProductToCart() {
  cartStore.putProduct({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image
  })
}
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