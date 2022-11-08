import { createRouter, createWebHistory } from 'vue-router'
import OrdersPage from '../pages/OrdersPage.vue'
import OrderPage from '../pages/OrderPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {
      path: '/orders'
    }
  }, {
    path: '/orders',
    name: 'orders.page',
    component: OrdersPage
  }, {
    path: '/orders/:id',
    name: 'order.page',
    component: OrderPage
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
