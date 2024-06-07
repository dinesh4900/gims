<template>
  <div class="bg-gray-50 p-4 sm:p-6 h-[calc(100vh-64px)] scrollbar-hide">
    <div class="w-full max-w-6xl mx-auto">
      <div class="flex space-x-1 bg-transparent border-b border-gray-200"></div>
      <div
        class="p-2 pb-0 bg-white rounded-md shadow-md md:px-4 md:pt-4 shadow-gray-100"
      >
        <div class="overflow-x-auto">
          <div
            class="min-w-full overflow-x-auto overflow-y-auto bg-gray-100 rounded-md scrollbar--thin h-screen max-h-[calc(100vh-320px)] md:max-h-[calc(100vh-280px)] border border-gray-200"
          >
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
                    {{ person.isAcknowledged ? 'Yes' : 'No' }}
                  </td>
                  <td class="px-6 py-4 font-normal whitespace-nowrap">
                    {{ person.companyName }}
                  </td>
                  <td class="px-6 py-4 font-normal whitespace-nowrap">
                    {{ person.designation }}
                  </td>
                  <td class="px-6 py-4 font-normal whitespace-nowrap">
                    {{ person.mobile }}
                  </td>
                  <td class="px-6 py-4 font-normal whitespace-nowrap">
                    {{ person.address }}
                  </td>
                  <td class="px-6 py-4 font-normal whitespace-nowrap">
                    {{ person.fieldOfService }}
                  </td>
                  <td class="px-6 py-4 font-normal whitespace-nowrap">
                    {{ person.requirements }}
                  </td>
                  <td class="px-6 py-4 font-normal whitespace-nowrap">
                    <Button
                      color="blue"
                      size="md"
                      @click="handleAcknowledge(person._id)"
                    >
                      Save
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-between w-full gap-2 py-2 md:flex-row md:py-3"
        >
          <div
            class="inline-flex items-center divide-x divide-gray-400 gap-x-1"
          >
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
  </div>
</template>

<script setup lang="ts">
import { useServicesRepo } from '~/repos/service'
import Pagination from '../../components/form/pagination.vue'
import Button from '../../components/form/button.vue'

import { useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
const router = useRouter()

const personsData = ref<any>([])

const totalCount = ref<number>(10)
const limit = ref<number>(10)
const offset = ref<number>(0)

const { findAll, update } = useServicesRepo()

const fetchAllPersons = async () => {
  const response = await findAll({})
  personsData.value = response.result?.data?.findManyServiceRequirements
    ?.items as any
}

const handleAcknowledge = (id: string) => {
  const payload = {
    _id: id,
    isAcknowledged: true
  }
  update({ payload })
  fetchAllPersons()
}

const changePageFilter = async (page: number) => {
  offset.value = page
  await fetchAllPersons()
}

onMounted(() => {
  fetchAllPersons()
})

watch(user, (val) => {
  if (val?.email) {
    router.push('/admin/service-requirements')
  } else if (!val?.email) {
    router.push('/login')
  }
})

const headers = [
  'Name',
  'Email',
  'Is Acknowledged',
  'Company name',
  'Designation',
  'Mobile number',
  'Address',
  'Fields of service',
  'Requirements',
  'Dowcument',
  'Action'
]
</script>
