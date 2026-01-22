export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if (to.path !== '/auth' && !isAuthenticated.value) {
    return navigateTo('/auth');
  }
})