import { createRouter, createWebHistory } from 'vue-router'
import RequestList from '../views/request/RequestList.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/quan-li-don'
    },
    {
      path: '/quan-li-don',
      name: 'quan-li-don',
      component: RequestList,
    }
  ]
})

export default router
