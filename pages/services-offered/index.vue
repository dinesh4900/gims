<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <div class="w-full">
        <div class="flex items-center justify-between end-0">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Services and support
          </h2>
          <div class="text-center">
            <Button
              color="blue"
              size="md"
              class="!font-medium items-start"
              @click="handleOpenSubmitRequirements"
            >
              Submit requirements
            </Button>
          </div>
        </div>

        <p class="mt-6 text-lg leading-8 text-gray-600">
          We provide world-class services and support with our wide-spread
          expertise in various fields
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 mt-6"
      >
        <div v-for="product in products" :key="product.id" class="group">
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg group-hover:bg-gray-300 group-hover:transform group-hover:scale-105 transition duration-300 ease-in-out group-hover:shadow-blue-200"
          >
            <img
              :src="product.imageSrc"
              :alt="product.imageAlt"
              class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-gray-700 text-center text-lg">
            {{ product.name }}
          </h3>
        </div>
      </div>
      <div class="mt-10 text-center">
        <Button
          color="blue"
          size="md"
          class="!font-medium items-start"
          @click="handleOpenSubmitRequirements"
        >
          Submit requirements
        </Button>
      </div>
    </div>
  </div>
  <ServiceRequirements
    :is-modal-open="openSubmitRequirements"
    @update:open-event="openSubmitRequirements = $event"
  />
</template>

<script setup lang="ts">
import Button from '../../components/form/button.vue'

const openSubmitRequirements = ref(false)

const handleOpenSubmitRequirements = () => {
  openSubmitRequirements.value = true
}

const products = [
  {
    id: 1,
    name: '3D modelling and CAD design',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.'
  },
  {
    id: 2,
    name: 'Simulation and Analysis',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.'
  },
  {
    id: 3,
    name: 'Waterjet cutting ',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.'
  },
  {
    id: 4,
    name: 'New Product Development',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.'
  },
  {
    id: 5,
    name: 'Machining',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.'
  },
  {
    id: 6,
    name: '3d printing ',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.'
  }
]
</script>

<style>
.shadow-blue-400 {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>
