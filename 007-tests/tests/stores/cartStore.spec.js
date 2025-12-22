import { beforeEach, describe, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import {useCartStore} from "@/stores/cartStore.js";

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('put product', () => {
    const store = useCartStore()
    store.putProduct({
      id: 1,
      title: 'test',
      price: 10
    })

    expect(store.products.length).toBe(1)
  })

  test('remove product', () => {
    const store = useCartStore()
    store.putProduct({
      id: 1,
      title: 'test',
      price: 10
    })
    store.removeProduct(1)

    expect(store.products.length).toBe(0)
  })

  test('remove all products', () => {
    const store = useCartStore()
    store.putProduct({
      id: 1,
      title: 'test',
      price: 10
    })
    store.putProduct({
      id: 2,
      title: 'test',
      price: 10
    })
    store.removeAllProducts()

    expect(store.products.length).toBe(0)
  })

  test('calculate total price', () => {
    const store = useCartStore()
    store.putProduct({
      id: 1,
      title: 'test',
      price: 10
    })
    store.putProduct({
      id: 2,
      title: 'test',
      price: 10
    })
    store.putProduct({
      id: 2,
      title: 'test',
      price: 10
    })

    expect(store.totalPrice).toBe(30)
  })

  test('calculate total count', () => {
    const store = useCartStore()
    store.putProduct({
      id: 1,
      title: 'test',
      price: 10
    })
    store.putProduct({
      id: 2,
      title: 'test',
      price: 10
    })
    store.putProduct({
      id: 2,
      title: 'test',
      price: 10
    })

    expect(store.totalCount).toBe(3)
  })
})