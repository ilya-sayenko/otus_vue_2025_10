import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useCartStore = defineStore('cartStore', () => {

  const data = ref(new Map())

  const products = computed(() => {
    return Array.from(data.value.values())
  })

  const totalPrice = computed(() => {
    return products.value.reduce((acc, item) => acc + (item.count * item.price), 0)
  })

  const totalCount = computed(() => {
    return products.value.reduce((acc, item) => acc + item.count, 0)
  })

  function putProduct(product) {
    if (data.value.has(product.id)) {
      let productData = data.value.get(product.id)
      data.value.set(product.id, {...product, count: productData.count + 1})
    } else {
      data.value.set(product.id, {...product, count: 1})
    }
  }

  function removeProduct(id) {
    data.value.delete(id)
  }

  function removeAllProducts() {
    data.value.clear()
  }

  return { products, totalPrice, totalCount, putProduct, removeProduct, removeAllProducts }
})