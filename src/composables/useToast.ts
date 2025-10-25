import { ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

const toasts = ref<Toast[]>([])

export function useToast() {
  function showToast(message: string, type: Toast['type'] = 'info') {
    const id = Date.now()
    toasts.value.push({ id, message, type })

    // remove toast after 3s
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }

  return { toasts, showToast }
}
