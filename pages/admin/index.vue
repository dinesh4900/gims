<template>
  <div>Admin index page</div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrentUser } from 'vuefire';

const user = useCurrentUser();
const router = useRouter();

watch(user, (val) => {
  if (val?.email) {
    router.push('/admin');
  } else if (!val?.email) {
    router.push('/login');
  }
});
</script>
