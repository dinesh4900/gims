<template>
  <div
    class="w-full bg-blue-700 h-[550px] rounded-xl shadow-2xl text-white flex items-center p-8 mb-16 relative"
  >
    <div class="ml-6">
      <div>
        <h2 class="font-bold text-3xl font-sans mb-6">
          Guhan Industrial and Manufacturing Solutions
        </h2>
        <div class="flex gap-2 mb-6">
          <p>Engineered by the laws of Physics.</p>
        </div>

        <Button color="white" size="lg" :icon="ArrowRightIcon"
          >Contact us</Button
        >
      </div>
    </div>
    <div class="w-[600px] h-[400px] relative">
      <img class="animate-float" src="/assets/hero-image.png" />
      <div class="absolute top-0 left-0 w-12 h-12 animate-bounce">
        <LightBulbIcon class="text-white w-8 h-8" />
      </div>
      <div class="absolute top-1/2 right-0 w-10 h-10 animate-bounce">
        <WrenchScrewdriverIcon class="text-white w-8 h-8" />
      </div>
      <div class="absolute bottom-0 left-1 w-8 h-8 animate-bounce">
        <PencilIcon class="text-white w-8 h-8" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../../components/form/button.vue'
import {
  ArrowRightIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  PencilIcon
} from '@heroicons/vue/24/solid'
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
