<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Products
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          We provide world-class services and support with our wide-spread
          expertise in various fields
        </p>
      </div>

      <div class="items-center ml-36">
        <img
          src="/assets/waterjet.jpeg"
          alt="alt-image"
          class="h-[80%] w-[80%] object-cover object-center group-hover:opacity-75"
        />
      </div>

      <div
        v-for="(item, idx) in products"
        :key="idx"
        class="p-4 mt-[50px] shadow-lg bg-blue-700 text-white rounded-xl group-hover:bg-gray-300 group-hover:transform group-hover:scale-105 transition duration-300 ease-in-out"
      >
        <div class="ml-[375px]">
          <img
            src="/assets/waterjet.jpeg"
            alt="item.imageAlt"
            class="h-[300px] w-[450px] object-cover object-center cursor-pointer group-hover:opacity-75"
          />
        </div>
        <div class="flex-grow mt-10">
          <h2 class="font-bold text-center text-2xl">{{ item.title }}</h2>
          <p class="mt-4">
            {{ item.description }}
          </p>

          <div class="mt-4">
            <span class="font-semibold">Key features:</span>
            <div
              v-for="(feature, idx) in item.keyFeatures"
              class="list-decimal pl-6 mt-1"
            >
              <div>&#x2022; {{ feature }}</div>
            </div>
          </div>

          <div class="mt-4">
            <span class="font-semibold">Benefits:</span>
            <div
              v-for="(benefit, idx) in item.benefits"
              class="list-decimal pl-6 mt-1"
            >
              <div>&#x2022; {{ benefit }}</div>
            </div>
          </div>
          <div class="text-right mt-6">
            <Button
              size="md"
              color="white"
              icon-type="endIcon"
              :icon="ArrowDownLeftIcon"
            >
              Download Broucher
            </Button>
          </div>
        </div>
      </div>
      <div class="text-center mt-10">
        <Button size="lg" icon-type="endIcon" class="mr-4 items-center">
          Get Qoute
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../../components/form/button.vue'
import { ArrowDownLeftIcon } from '@heroicons/vue/24/solid'
const products = [
  {
    title:
      'SJ 150 - Precision for Educational Excellence -> Designed for Universities and Colleges',
    description:
      'The SJ 150 is specifically engineered to cater to educational institutions, providing a safe, reliable, and precise cutting solution ideal for training and research purposes.',
    keyFeatures: [
      'User-Friendly Interface: Intuitive controls make it easy for students and instructors to operate.',
      'Safety First: Enhanced safety features ensure a secure learning environment.',
      'Compact Design: Fits easily into laboratory and workshop spaces.',
      'Versatile Applications: Suitable for a wide range of materials and educational projects.'
    ],
    benefits: [
      'Empower students with hands-on experience in advanced cutting technology.',
      'Enhance the curriculum with practical applications in engineering and design.',
      'Reliable support and training from our dedicated team.'
    ],
    image: '../../assets/waterjet.jpeg'
  },
  {
    title:
      'SJ 450 - Efficiency and Precision for MSMEs and SMEs -> Perfect for Medium-Sized Enterprises',
    description:
      'The SJ 450 is the ideal solution for small to medium enterprises seeking to enhance their manufacturing capabilities with high-precision cutting and efficiency.',
    keyFeatures: [
      'Robust Performance: Engineered for high precision and durability.',
      'Cost-Effective: Delivers superior performance with a focus on cost-efficiency.',
      'Flexible Usage: Adaptable for various cutting needs across multiple industries.',
      'Energy Efficient: Designed to minimize power consumption while maximizing output.'
    ],
    benefits: [
      'Improve productivity and reduce operational costs with efficient cutting technology.',
      'Achieve superior quality cuts, enhancing the final product.',
      'Benefit from reliable and responsive customer support tailored to your business needs.'
    ],
    image: '/assets/waterjet.jpeg'
  },
  {
    title:
      'SJ 1000 - The Powerhouse for Exclusive Industrial Applications -> For Heavy-Duty and Specialized Industrial Use',
    description:
      'The SJ 1000 is built to handle the most demanding industrial applications, including ship decommissioning, descaling, and offshore decommissioning.',
    keyFeatures: [
      'Unmatched Power: High-pressure waterjet technology for the toughest jobs.',
      'Extreme Precision: Capable of precise cutting even in the harshest environments.',
      'Durability: Constructed with industrial-grade materials for long-term use.',
      'Advanced Control Systems: Ensure optimal performance and safety.'
    ],
    benefits: [
      'Efficiently handle large-scale decommissioning and descaling tasks.',
      'Ensure safety and precision in hazardous environments.',
      'Rely on a machine designed for maximum uptime and minimal maintenance.'
    ],
    image: '/assets/waterjet.jpeg'
  }
]
</script>
