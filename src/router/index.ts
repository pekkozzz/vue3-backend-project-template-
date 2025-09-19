import { createRouter, createWebHistory } from 'vue-router'
import { photoWallRoutes } from './photoWall'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...photoWallRoutes],
})

export default router
