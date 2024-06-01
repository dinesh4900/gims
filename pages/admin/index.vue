<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 mt-6"
      >
        <div v-for="product in routes" :key="product.name" class="group">
          <h3 class="mt-4 text-gray-700 text-center text-lg">
            {{ product.name }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
const router = useRouter()

const routes = [
  { name: 'Tasks', href: '/admin/tasks' },
  { name: 'Contact', href: '/admin/contact' },
  { name: 'Employees', href: '/admin/persons' }
]

watch(user, (val) => {
  if (val?.email) {
    router.push('/admin')
  } else if (!val?.email) {
    router.push('/login')
  }
})
</script>
