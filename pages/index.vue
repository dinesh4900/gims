<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <HeroSection />
      <WhatWeDo />
      <SubmitRequirements />
      <Products />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '../components/homepage/hero-section.vue'
import WhatWeDo from '../components/homepage/what-we-do.vue'
import SubmitRequirements from '../components/homepage/submit-requirements.vue'
import Products from '../components/homepage/products.vue'
import Button from '../components/form/button.vue'
import { useRouter } from 'vue-router'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'

const storage = useFirebaseStorage()

const router = useRouter()

const handleUpload = async (e: any) => {
  console.log(e, '## event')
  const mountainFileRef = storageRef(storage, e.name)

  console.log(mountainFileRef, '## mountain ref')

  const { url, uploadProgress, uploadError, uploadTask, upload } =
    useStorageFile(mountainFileRef)

  const dataResp = await upload(e)

  console.log('## came to last file', url)
}

const handleOpenSubmitRequirements = () => {}
</script>
<style lang="scss">
.nav-link {
  @apply px-4 py-2 text-sm font-semibold leading-6 rounded-md hover:bg-gray-50 lg:rounded-none flex lg:inline-flex items-center lg:px-1 lg:pt-1 lg:text-base lg:border-b-2 lg:border-transparent text-gray-400 lg:font-medium lg:hover:border-gray-300 hover:text-gray-600 lg:hover:bg-transparent;
}
.router-link-active.router-link-exact-active {
  @apply border-blue-500 text-gray-700 font-extrabold;
}
</style>
