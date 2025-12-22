<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/stores/authStore.js";
import {storeToRefs} from "pinia";
import Cart from "@/components/Cart.vue";

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const showCart = ref(false)

function logout() {
  authStore.logout()
}

function toggleShowCart() {
  showCart.value = !showCart.value
}
</script>

<template>
  <div class="wrapper">
    <nav class="navbar" v-if="isAuthenticated">
      <div class="container">
        <div class="navbar-content">
          <RouterLink to="/" class="nav-link">Главная</RouterLink>
          <RouterLink to="/products/add" class="nav-link">Добавить продукт</RouterLink>
          <a class="nav-link" @click="toggleShowCart">Корзина</a>
          <RouterLink to="/auth" class="nav-link" @click="logout">Выход</RouterLink>

          <Cart :showCart="showCart" @closeCart="toggleShowCart"></Cart>
        </div>
      </div>
    </nav>

    <RouterView></RouterView>
  </div>


</template>

<style scoped></style>
