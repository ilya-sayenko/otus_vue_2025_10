import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/authStore.js";
import {storeToRefs} from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/ProductsPage.vue'),
    },
    {
      path: '/auth',
      component: () => import('@/pages/AuthPage.vue'),
    },
    {
      path: '/products/:id',
      component: () => import('@/pages/ProductPage.vue')
    },
    {
      path: '/products/add',
      component: () => import('@/pages/AddProductPage.vue')
    }
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)

  if (to.path !== '/auth' && !isAuthenticated.value) {
    return '/auth'
  }
})

export default router
