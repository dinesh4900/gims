<template>
  <div>Home page</div>
</template>

<script setup lang="ts">
const user = useCurrentUser();

onMounted(() => {
  if (user?.value?.email) {
    navigateTo('/');
  } else if (!user.value?.email) {
    navigateTo('/login');
  }
});
</script>
<style lang="scss">
.nav-link {
  @apply px-4 py-2 text-sm font-semibold leading-6 rounded-md hover:bg-gray-50 lg:rounded-none flex lg:inline-flex items-center lg:px-1 lg:pt-1 lg:text-base lg:border-b-2 lg:border-transparent text-gray-400 lg:font-medium lg:hover:border-gray-300 hover:text-gray-600 lg:hover:bg-transparent;
}
.router-link-active.router-link-exact-active {
  @apply border-purple-500 text-gray-700 font-extrabold;
}
</style>
