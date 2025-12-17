<script setup>
  import {useCartStore} from "@/stores/cartStore.js";
  import {storeToRefs} from "pinia";

  const props = defineProps({
    showCart: Boolean
  })

  const cartStore = useCartStore()
  const { products, totalPrice, totalCount } = storeToRefs(cartStore)

  function removeProductFromCart(id) {
    cartStore.removeProduct(id)
  }

  function clearCart() {
    cartStore.removeAllProducts()
  }
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