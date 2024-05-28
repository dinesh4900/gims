<template>
  <div>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Why choose us?
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          <li v-for="person in 4">
            <img
              class="aspect-[2/3] w-full rounded-2xl object-cover"
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-5"
      >
        <div v-for="item in timeline" :key="item.name">
          <time
            :datetime="item.dateTime"
            class="flex items-center text-sm font-semibold leading-6 text-indigo-600"
          >
            <component :is="item.date" class="w-6 h-6 ml-4" />
            <div
              class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
              aria-hidden="true"
            />
          </time>
          <div class="ml-5">
            <p
              class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900"
            >
              {{ item.name }}
            </p>
            <p class="mt-1 text-base leading-7 text-gray-600">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LightBulbIcon,
  PencilIcon,
  CogIcon,
  MagnifyingGlassIcon,
  WrenchIcon
} from '@heroicons/vue/24/outline'
const timeline = [
  {
    name: 'Define & Plan',
    description:
      'Clearly articulate objectives and requirements; develop a detailed strategy with timelines and resources.',
    date: LightBulbIcon,
    dateTime: '2021-08'
  },
  {
    name: 'Design',
    description:
      'Create detailed designs or prototypes to address requirements before starting development.',
    date: PencilIcon,
    dateTime: '2021-12'
  },
  {
    name: 'Build',
    description:
      'Develop and implement the solution, transforming designs into a functional product.',
    date: CogIcon,
    dateTime: '2022-02'
  },
  {
    name: 'Evaluate',
    description:
      'Assess outcomes against goals, ensuring the solution meets requirements and performs as expected.',
    date: MagnifyingGlassIcon,
    dateTime: '2022-12'
  },
  {
    name: 'Iterate',
    description:
      'Make necessary adjustments based on evaluation, continuously refining the solution for optimal performance.',
    date: WrenchIcon,
    dateTime: '2022-12'
  }
]
</script>
