import { createRouter, createWebHistory } from 'vue-router'
import {AuthService} from "@/services/AuthService.js";

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
  const authService = new AuthService()

  if (to.path !== '/auth' && !authService.isAuthenticated()) {
    return '/auth'
  }
})

export default router
