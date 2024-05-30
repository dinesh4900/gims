import { useStorage } from '@vueuse/core'

export function useUserData() {
  return useStorage<any>('user', null)
}
