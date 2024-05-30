<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useUser } from './composables/User/useUser'

const firebaseAuth = useFirebaseAuth()
const user = useCurrentUser()
const router = useRouter()
const { onLogin } = useApollo()

const idToken = ref('')

const refreshIdToken = async () => {
  if (firebaseAuth?.currentUser) {
    try {
      const newIdToken = await user.value?.getIdToken(true)
      idToken.value = newIdToken ?? ''
      onLogin(newIdToken, 'default')
    } catch (error) {
      console.error('Error refreshing ID token:', error)
    }
  }
}

onMounted(() => {
  firebaseAuth?.onAuthStateChanged(async (user) => {
    const initialIdToken = await user?.getIdToken()
    idToken.value = initialIdToken ?? ''
    onLogin(initialIdToken, 'default')
    const tokenRefreshInterval = setInterval(refreshIdToken, 300000)
    onUnmounted(() => {
      clearInterval(tokenRefreshInterval)
    })
  })
})

watch(
  user,
  async () => {
    const _user = await getCurrentUser()
    if (!_user) {
      router.push('/login')
    } else if (_user) {
      const { refetch: fetchuser } = useUser()
      await fetchuser()
    }
  },
  { immediate: true }
)
</script>
