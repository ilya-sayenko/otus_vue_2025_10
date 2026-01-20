import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'

export const useAuthStore = defineStore('authStore', () => {
  const token = useCookie(AUTH_TOKEN_KEY);
  const isAuthenticated = computed(() => !!token.value || !!Cookies.get(AUTH_TOKEN_KEY));

  async function login(username, password) {
    const accessToken = `${username}-${password}`;
    Cookies.set(AUTH_TOKEN_KEY, accessToken);
    token.value = accessToken;
  }

  function logout() {
    Cookies.remove(AUTH_TOKEN_KEY);
    token.value = null;
  }

  return { login, logout, isAuthenticated }
});