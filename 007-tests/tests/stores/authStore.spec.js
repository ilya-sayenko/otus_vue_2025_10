import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore.js'

describe('Auth Store', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should login', () => {
    const store = useAuthStore()
    store.login('test', 'test')

    expect(store.isAuthenticated).toBe(true)
  })

  it('should logout', () => {
    const store = useAuthStore()
    store.login('test', 'test')
    store.logout()

    expect(store.isAuthenticated).toBe(false)
  })
})