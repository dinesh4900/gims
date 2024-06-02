<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <NuxtLink to="/">
        <div class="flex items-center shrink-0">
          <img class="w-auto h-8" src="~/assets/logo.svg" alt="Your Company" />
        </div>
      </NuxtLink>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          class="text-sm font-semibold leading-6 text-gray-900"
          >{{ item.name }}</a
        >
      </div>
      <div
        v-if="token"
        class="justify-end w-full inline-flex items-center lg:w-auto cursor-pointer"
        @click="handleLogout"
      >
        Logout
      </div>
    </nav>
    <Dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="/">
            <div class="flex items-center shrink-0">
              <img
                class="w-auto h-8"
                src="~/assets/logo.svg"
                alt="Your Company"
              />
            </div>
          </NuxtLink>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a
                v-for="item in mobileNavigation"
                :key="item.name"
                :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { signOut } from 'firebase/auth'

const navigation = [
  { name: 'Product', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact-us' }
]

const mobileNavigation = [
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Why Choose Us', href: '/why-us' },
  { name: 'Contact', href: '/contact-us' },
  { name: 'Our Team', href: '/our-team' },
  { name: 'Terms and services', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' }
]

const token = useCookie('apollo:default.token')
const mobileMenuOpen = ref(false)

const auth = useFirebaseAuth()
const { onLogout } = useApollo()

const handleLogout = () => {
  signOut(auth as any).then(
    (_success) => {
      onLogout()
      localStorage.clear()
      navigateTo('/')
    },
    (error) => {
      console.error('[signOut-error]', error)
    }
  )
}
</script>
