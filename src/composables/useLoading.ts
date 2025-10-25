import { ref } from 'vue'

export function useLoading() {
  const isLoading = ref(false)

  function startLoading() {
    isLoading.value = true
  }

  function stopLoading() {
    isLoading.value = false
  }

  return { isLoading, startLoading, stopLoading }
}
