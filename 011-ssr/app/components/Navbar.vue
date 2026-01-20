<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <nav class="navbar" >
    <div class="container">
      <div class="navbar-content">
        <NuxtLink to="/" class="nav-link">Главная</NuxtLink>
        <NuxtLink to="/products/add" class="nav-link">Добавить продукт</NuxtLink>
        <NuxtLink to="/cart" class="nav-link">Корзина</NuxtLink>
        <NuxtLink to="/auth" class="nav-link" @click="authStore.logout()">Выход</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>