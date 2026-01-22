<script setup>
const { data: products } = await useFetch('https://fakestoreapi.com/products');
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