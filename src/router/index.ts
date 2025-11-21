import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes: Array<RouteRecordRaw> = [
  // Public routes
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUpView.vue'),
    meta: { requiresAuth: false }
  },
  // Protected routes
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/storages',
    name: 'storages',
    component: () => import('@/views/Storage/StoragesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/storages/:id',
    name: 'storage-details',
    component: () => import('@/views/Storage/StorageDetailView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add-unit',
    name: 'add-unit',
    component: () => import('@/views/Storage/AddStorageView.vue'),
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/views/Customer/CustomersView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/customers/:id',
    name: 'customer-details',
    component: () => import('@/views/Customer/CustomerDetailView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/Transaction/TransactionsView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth
  const requiredRoles = to.meta.roles as string[] | undefined

  // Public route
  if (requiresAuth === false) {
    if (authStore.isAuthenticated) {
      next('/')
    } else {
      next()
    }
    return
  }

  // Protected route
  if (requiresAuth) {
    if (!authStore.isAuthenticated) {
      next({ path: '/login', query: { redirect: to.fullPath } })
      return
    }

    // Check token expiry
    if (!authStore.checkTokenExpiry()) {
      next('/login')
      return
    }

    // Check roles
    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = authStore.userRole
      if (!userRole || !requiredRoles.includes(userRole)) {
        next('/')
        return
      }
    }
  }

  next()
})

export default router