<template>
  <div
    class="p-10 rounded-2xl text-black mt-8 flex justify-between items-center"
  >
    <h2 class="items-center ml-[300px] text-2xl font-bold">
      Explore Our Innovative and Reliable Machines
    </h2>
    <div class="flex gap-2 font-semibold">Explore products</div>
  </div>

  <div
    class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 mt-6"
  >
    <div
      v-for="product in products"
      :key="product.id"
      class="group relative cursor-pointer"
    >
      <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg group-hover:bg-gray-300 group-hover:transform group-hover:scale-105 transition duration-300 ease-in-out group-hover:shadow-blue-200 relative"
        @click="handleRedirect"
      >
        <img
          :src="product.imageSrc"
          :alt="product.imageAlt"
          class="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-blue-700 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
        >
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <h3 class="text-white text-center text-lg">
              {{ product.name }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const handleRedirect = () => {
  router.push('/products')
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
  }
]
</script>
