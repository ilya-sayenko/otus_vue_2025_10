<script setup>
  import {CartService} from "@/services/CartService.js";
  import {ref, watch} from "vue";

  const props = defineProps({
    showCart: Boolean
  })

  const cartService = new CartService()
  const products = ref([])
  const totalPrice = ref(0)
  const totalCount = ref(0)

  function removeProductFromCart(id) {
    cartService.removeProduct(id)
    products.value = cartService.getProducts()
  }

  function clearCart() {
    cartService.removeAllProducts()
    products.value = cartService.getProducts()
  }

  function getTotalPrice() {
    return products.value.reduce((acc, item) => acc + (item.count * item.price), 0)
  }

  function getTotalCount() {
    return products.value.reduce((acc, item) => acc + item.count, 0)
  }

  watch(() => props.showCart, (newVal, oldVal) => {
    if (newVal) {
      products.value = cartService.getProducts()
      totalPrice.value = getTotalPrice()
      totalCount.value = getTotalCount()
    }
  })

  watch(() => products.value, (newVal, oldVal) => {
    totalPrice.value = getTotalPrice()
    totalCount.value = getTotalCount()
  })
</script>

<template>

  <div class="cart-dropdown" :class="{active: props.showCart}" id="cartDropdown">
    <h3>Корзина (<span id="cartCount">{{ totalCount }}</span>)</h3>

    <div class="cart-items">
      <div class="cart-item" v-for="product in products">
        <div>
          <img class="cart-item-image" src="@/assets/product-image.png" alt="test"/>
        </div>
        <div class="cart-item-details">
          <div class="cart-item-title">{{ product.title }}</div>
          <div class="cart-item-price">{{ product.price }}</div>
          <div>Количество {{ product.count }}</div>
        </div>
        <button class="cart-item-remove" @click="removeProductFromCart(product.id)">✕</button>
      </div>
    </div>

    <div class="cart-total">
      <span>Итого:</span>
      <span id="cartTotal">{{ totalPrice }}</span> руб.
    </div>

    <div class="cart-actions">
      <button class="cart-btn secondary" @click="clearCart">Очистить</button>
      <button class="cart-btn primary">Оформить</button>
    </div>
  </div>
</template>

<style scoped>

</style>