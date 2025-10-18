import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue')
  },
  {
    path: '/projects/:id',
    name: 'board',
    component: () => import('@/views/BoardView.vue')
  },
  {
    path: '/tasks/:id',
    name: 'task',
    component: () => import('@/views/TaskDetailView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router