import {describe, expect, test, beforeEach} from 'vitest';
import { mount } from '@vue/test-utils'
import Cart from "@/components/Cart.vue";
import {createPinia, setActivePinia} from "pinia";
import {useCartStore} from "@/stores/cartStore.js";

describe('Cart Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('render cart component', () => {
    const wrapper = mount(Cart, {
      props: {
        showCart: true
      }
    })

    expect(wrapper.text()).toContain('Корзина')
  })

  test('show cart component', () => {
    const wrapper = mount(Cart, {
      props: {
        showCart: true
      }
    })

    console.log(wrapper.find('#cartDropdown'))

    expect(wrapper.find('#cartDropdown').classes()).toContain('active')
  })

  test('hide cart component', () => {
    const wrapper = mount(Cart, {
      props: {
        showCart: false
      }
    })

    expect(wrapper.find('#cartDropdown').classes()).not.toContain('active')
  })

  test('show product data in cart component', () => {
    const store = useCartStore()
    const product = {
      id: 1,
      title: 'test',
      price: 10
    }
    store.putProduct(product)
    const wrapper = mount(Cart, {
      props: {
        showCart: true
      }
    })

    expect(wrapper.find('.cart-item-title').text()).toContain(product.title)
    expect(wrapper.find('.cart-item-price').text()).toContain(product.price)
  })
})