<template>
  <div>
    <Header />
    <slot />
    <template v-if="!isOnline">
      <div
        class="fixed flex items-center justify-center w-full h-12 bg-red-400 text-white bottom-0 z-50 font-medium"
      >
        You seem to be offline. Please connect to the internet and try again
      </div>
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity z-40"
      />
    </template>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Header from '../components/layout/header.vue'
import Footer from '../components/layout/footer.vue'

const isOnline = ref(navigator.onLine)

const toggleOnlineStatus = (flag: boolean) => (isOnline.value = flag)
onMounted(() => {
  window.addEventListener('online', () => toggleOnlineStatus(true))
  window.addEventListener('offline', () => toggleOnlineStatus(false))
})
onUnmounted(() => {
  window.removeEventListener('online', () => toggleOnlineStatus(true))
  window.removeEventListener('offline', () => toggleOnlineStatus(false))
})
</script>
