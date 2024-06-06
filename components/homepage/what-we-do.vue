<template>
  <div class="p-10 rounded-2xl text-black">
    <h2 class="text-center text-2xl font-bold">How We Ensure Success</h2>
    <div class="flex flex-wrap justify-between mt-10">
      <div
        v-for="section in content"
        :key="section"
        class="section-item w-full md:w-1/2 p-4 text-center transform transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <div class="mt-4">
          <div class="flex justify-center items-center mb-4">
            <component :is="section.icon" class="w-10 h-10 text-blue-600" />
          </div>
          <h4 class="font-bold">{{ section.title }}</h4>
          <p class="font-normal">{{ section.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CloudArrowUpIcon } from '@heroicons/vue/24/solid'

const content = [
  {
    title: 'Latest Tech',
    description: 'Building the future with next-generation technology',
    icon: CloudArrowUpIcon
  },
  {
    title: 'Protection',
    description: 'Ensures Robust Design and Patent Protection',
    icon: CloudArrowUpIcon
  },
  {
    title: 'Manufacturing',
    description:
      'Can be manufactured across diverse markets at competitive prices',
    icon: CloudArrowUpIcon
  },
  {
    title: 'Global Scalability',
    description:
      'Helps companies scale up globally by mitigating risks in design and R&D',
    icon: CloudArrowUpIcon
  }
]
</script>

<style>
.section-item {
  max-width: 600px; /* Adjust max-width as needed */
}
/*  */
</style>
