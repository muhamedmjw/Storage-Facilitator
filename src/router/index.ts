import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/storages',
    name: 'storages',
    component: () => import('@/views/StoragesView.vue')
  },
  {
    path: '/storages/:id',
    name: 'storage-details',
    component: () => import('@/views/StorageDetailView.vue')
  },
  {
  path: '/add-unit',
  name: 'add-unit',
  component: () => import('@/views/AddStorageView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router