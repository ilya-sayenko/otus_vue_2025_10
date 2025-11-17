<script setup>
  const props = defineProps({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: Object
  })
</script>

<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="props.image" :alt="props.title"/>
    </div>
    <div class="product-info">
      <h2>{{ props.title }}</h2>
      <div>Rating: {{ props.rating.rate }}</div>
      <div>Count: {{ props.rating.count }} </div>
      <div>Price: {{ props.price }}</div>
      <div>Category: {{ props.category }}</div>
      <div class="product-description">
        <h3>Description</h3>
        <p>{{ props.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>