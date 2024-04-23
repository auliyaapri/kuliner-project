import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/foods',
      name: 'Foods',
      component: () => import("../views/Foods.vue"),
    },
    {
      path: '/foods/:id',
      name: 'FoodsDetails',
      component: () => import("../views/FoodDetail.vue"),
    },
    {
      path: '/best-products/:id',
      name: 'FoodDetailBestProduct',
      component: () => import("../views/FoodDetailBestProduct.vue"),
    },
    {
      path: '/keranjang',
      name: 'KeranjangDetail',
      component: () => import("../views/Keranjang.vue"),
    },

  ]
})

export default router
