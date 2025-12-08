import {defineStore} from "pinia";
import {ref} from "vue";
import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'

export const useAuthStore = defineStore('authStore', () => {

  const isAuthenticated = ref(!!Cookies.get(AUTH_TOKEN_KEY))

  async function login(username, password) {
    const authToken = `${username}-${password}`
    Cookies.set(AUTH_TOKEN_KEY, authToken)
    isAuthenticated.value = true
  }

  function logout() {
    Cookies.remove(AUTH_TOKEN_KEY)
    isAuthenticated.value = false
  }

  return { login, logout, isAuthenticated }
})