<script setup>
import {ref} from "vue";
import Cart from "@/components/Cart.vue";
import {useAuthStore} from "@/stores/authStore.js";

const authStore = useAuthStore()
const showCart = ref(false)

function logout() {
  authStore.logout()
}

function toggleShowCart() {
  showCart.value = !showCart.value
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Главная</RouterLink>
        <RouterLink to="/products/add" class="nav-link">Добавить продукт</RouterLink>
        <RouterLink to="/auth" class="nav-link" @click="logout">Выход</RouterLink>

        <a class="nav-link" @click="toggleShowCart">Корзина</a>

        <Cart :showCart="showCart"></Cart>
      </div>
    </div>
  </nav>
  <RouterView></RouterView>
</template>

<style scoped></style>
