<script setup>
const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String
})
</script>

<template>
  <div class="product-card">
    <img class="product-image" :src="image" :alt="title">
    <h3 class="product-title">{{ title }}</h3>
    <div class="product-price">{{ price }}</div>
    <p class="product-description">{{ description }}</p>
  </div>
</template>

<style scoped>

</style>