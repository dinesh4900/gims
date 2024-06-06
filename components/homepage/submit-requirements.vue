<template>
  <div class="bg-blue-700 text-white shadow-xl sm:rounded-lg mt-8 p-8">
    <div class="px-4 py-5 sm:p-6 flex justify-between items-center">
      <h3 class="font-semibold leading-6 text-white-900 text-xl">
        Ready to Enhance Your Production with Our Cutting-Edge Machinery?
      </h3>
      <div
        class="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center"
      >
        <Button color="white" size="md" :icon="ArrowRightIcon"
          >Submit requirements</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../../components/form/button.vue'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
</script>
