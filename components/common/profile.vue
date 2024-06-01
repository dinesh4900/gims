<template>
  <Menu v-if="user?.email" v-slot="{ open }" as="div" class="relative py-4">
    <MenuButton class="-m-1.5 flex items-center p-1.5">
      <span class="sr-only">User menu</span>
      <img
        v-if="loggedInUser?.logoUrl"
        class="w-8 h-8 bg-gray-100 rounded-full p-0.5"
        :src="`https://edvoy-assets-s3.s3.ap-south-1.amazonaws.com/${loggedInUser?.logoUrl}`"
        alt="Your Company"
      />
      <div
        v-else
        class="bg-orange-900 w-8 h-8 rounded-3xl flex items-center justify-center"
      >
        <span className="font-bold text-white text-sm">
          {{ loggedInUser?.name?.substr(0, 1).toUpperCase() }}
        </span>
      </div>
      <span class="hidden lg:flex lg:items-center">
        <span
          class="ms-2 text-sm font-semibold leading-6 text-gray-900 capitalize"
          aria-hidden="true"
        >
          {{ loggedInUser?.name }}
        </span>
        <ChevronDownIcon
          :class="[open ? 'text-gray-700 rotate-180' : 'text-gray-400']"
          class="w-5 h-5 ml-2 transition duration-100 ease-out"
          aria-hidden="true"
        />
      </span>
    </MenuButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
      >
        <div class="px-4 py-4 text-sm text-gray-700 border-b border-gray-100">
          <span class="text-xs font-medium text-gray-400">Email: </span>
          <span class="font-semibold truncate">{{ loggedInUser?.email }}</span>
        </div>
        <MenuItem v-slot="{ active }">
          <button
            type="button"
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-900 w-full leading-6 text-start rounded-md'
            ]"
            @click="handleLogout"
          >
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { signOut } from 'firebase/auth'
import { useUserData } from '~/src/runtime/composables'

const user = useCurrentUser()
const auth = useFirebaseAuth()
const { onLogout } = useApollo()

const useLocalUserData = useUserData()
const loggedInUser = computed(() =>
  useLocalUserData.value ? JSON.parse(useLocalUserData.value) : null
)

const handleLogout = () => {
  signOut(auth as any).then(
    (_success) => {
      onLogout()
      localStorage.clear()
      navigateTo('/login')
    },
    (error) => {
      console.error('[signOut-error]', error)
    }
  )
}
</script>

<style scoped>
.page {
  @apply bg-gray-50 w-auto px-2 h-8 flex-shrink-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}
</style>
