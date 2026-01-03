import {describe, expect, test, beforeEach} from 'vitest';
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from "pinia";
import ProductCard from "@/components/ProductCard.vue";

describe('Product Card Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('render product card component', () => {
    const product = {
      id: 1,
      title: 'title',
      price: 100
    }
    const wrapper = mount(ProductCard, {
      props: {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category
      }
    })

    expect(wrapper.text()).toContain(product.title)
    expect(wrapper.text()).toContain(product.price)
  })
})