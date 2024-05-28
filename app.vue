<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const firebaseAuth = useFirebaseAuth();
const user = useCurrentUser();
const router = useRouter();

const idToken = ref('');

const refreshIdToken = async () => {
  const accessToken = useCookie('accessToken');
  if (firebaseAuth?.currentUser) {
    try {
      const newIdToken = await user.value?.getIdToken(true);
      accessToken.value = newIdToken;
    } catch (error) {
      console.error('Error refreshing ID token:', error);
    }
  }
};

onMounted(() => {
  firebaseAuth?.onAuthStateChanged(async (user) => {
    const accessToken = useCookie('accessToken');
    const initialIdToken = await user?.getIdToken();
    accessToken.value = initialIdToken;
    const tokenRefreshInterval = setInterval(refreshIdToken, 900000);
    onUnmounted(() => {
      clearInterval(tokenRefreshInterval);
    });
  });
});

watch(
  user,
  async () => {
    const _user = await getCurrentUser();
    if (!_user) {
      router.push('/login');
    } else if (_user) {
      // const { refetch: fetchuser } = useUser();
      // await fetchuser();
    }
  },
  { immediate: true }
);
</script>
