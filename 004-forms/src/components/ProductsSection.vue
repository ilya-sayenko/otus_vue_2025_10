<script setup>
import ProductCard from "@/components/ProductCard.vue";

const props = defineProps(["products"])
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