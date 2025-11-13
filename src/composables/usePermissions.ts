import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

export function usePermissions() {
  const authStore = useAuthStore()

  const canEdit = computed(() => authStore.isAdmin)
  const canDelete = computed(() => authStore.isAdmin)
  const canAddUnit = computed(() => authStore.isAdmin)

  const getDisabledMessage = () => {
    return 'Requires Admin Role'
  }

  return {
    canEdit,
    canDelete,
    canAddUnit,
    getDisabledMessage
  }
}