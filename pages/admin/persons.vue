<template>
  <div class="bg-gray-50 p-4 sm:p-6 h-[calc(100vh-64px)] scrollbar-hide">
    <div class="w-full max-w-6xl mx-auto">
      <div class="flex justify-between mb-6">
        <h2 class="text-lg font-semibold">Employees</h2>
        <Button
          color="blue"
          size="md"
          class="tracking-wider"
          @click="handleCreateUser"
        >
          Create User
        </Button>
      </div>

      <div
        class="p-2 pb-0 bg-white rounded-md shadow-md md:px-4 md:pt-4 shadow-gray-100"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm font-light text-left">
            <thead class="top-0 left-0 z-10">
              <tr class="snap-x">
                <th
                  v-for="(item, index) in headers"
                  :key="index"
                  scope="col"
                  class="px-6 py-4 snap-mandatory snap-start whitespace-nowrap bg-gray-100"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white snap-x snap-mandatory">
              <tr
                v-for="(person, idx) in personsData"
                :key="idx"
                class="transition duration-150 delay-75 border border-gray-100 hover:rounded snap-start group hover:bg-gray-50"
              >
                <td class="top-0 z-0 -left-px">
                  <div
                    class="'relative px-6 py-4 -mx-px font-semibold transition duration-150 delay-75 whitespace-nowrap'"
                  >
                    {{ person.name }}
                  </div>
                </td>
                <td class="px-6 py-4 font-normal whitespace-nowrap">
                  {{ person.email }}
                </td>
                <td class="px-6 py-4 font-normal whitespace-nowrap">
                  {{ person.mobile }}
                </td>
                <td class="px-6 py-4 font-normal whitespace-nowrap">
                  {{ person.password }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-between w-full gap-2 py-2 md:flex-row md:py-3"
      >
        <div class="inline-flex items-center divide-x divide-gray-400 gap-x-1">
          <div
            class="pl-2 text-sm font-medium leading-none text-gray-400 whitespace-nowrap"
          >
            Total Count:
            <span class="font-semibold text-gray-900">{{ totalCount }} </span>
          </div>
        </div>
        <Pagination
          :total-count="totalCount"
          :limit="limit"
          :active-page="offset"
          @change-page="changePageFilter"
        />
      </div>
    </div>
  </div>

  <CreatePersonModal
    :is-modal-open="openCreateModal"
    @update:open-event="handleCreateModal"
  />
  <UpdatePersonModal
    :is-modal-open="openUpdateModal"
    :person-id="personId"
    @update:open-event="handleUpdateModal"
  />
</template>

<script setup lang="ts">
import { usePersonsRepo } from '~/repos/persons'
import Button from '../../components/form/button.vue'
import Pagination from '../../components/form/pagination.vue'

import { useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
const router = useRouter()

const personsData = ref<any>([])
const openCreateModal = ref(false)
const openUpdateModal = ref(false)
const personId = ref('')

const totalCount = ref<number>(10)
const limit = ref<number>(10)
const offset = ref<number>(0)

const { findAll } = usePersonsRepo()

const fetchAllPersons = async () => {
  const response = await findAll({})
  personsData.value = response.result?.data?.findManyPersons?.items as any
}

onMounted(() => {
  fetchAllPersons()
})

const handleUpdateUser = (id: string) => {
  personId.value = id
  openUpdateModal.value = true
}

const handleCreateUser = () => {
  openCreateModal.value = true
}

watch(user, (val) => {
  if (val?.email) {
    router.push('/admin/persons')
  } else if (!val?.email) {
    router.push('/login')
  }
})

const handleCreateModal = (event: boolean) => {
  openCreateModal.value = event
  fetchAllPersons()
}

const handleUpdateModal = (event: boolean) => {
  openUpdateModal.value = event
  fetchAllPersons()
}

const changePageFilter = async (page: number) => {
  offset.value = page
  await fetchAllPersons()
}

const headers = ['Name', 'Email', 'Mobile', 'Password']
</script>
