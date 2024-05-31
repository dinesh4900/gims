<template>
  <div
    v-if="totalPages > 0"
    class="isolate inline-flex flex-row items-center divide-x divide-gray-100 border-spacing-1 border-gray-100 rounded-s-md rounded-e-md overflow-hidden shadow -space-x-0"
  >
    <div>
      <Button
        v-tooltip="currentPage === 1 ? '' : 'Previous'"
        color="white"
        size="sm"
        :class="['rounded-none !px-2.5', currentPage === 1 && '!bg-opacity-40']"
        :disabled="currentPage === 1 ? true : false"
        :icon="ArrowLongLeftIcon"
        icon-type="startIcon"
        @click="prev()"
      >
        <span class="hidden md:block">Prev</span>
      </Button>
    </div>
    <div v-for="i in displayedPages" :key="i">
      <Button
        color="white"
        size="sm"
        :class="[
          i == '…'
            ? 'select-none pointer-events-none'
            : currentPage == i
            ? '!bg-purple-100 text-purple-600 ring-1 ring-purple-600 ring-inset ring-current'
            : '',
          'rounded-none !px-2.5'
        ]"
        @click="changePage(i - 1)"
      >
        {{ i }}
      </Button>
    </div>
    <div>
      <Button
        v-tooltip="totalPages === currentPage ? '' : 'Next'"
        color="white"
        size="sm"
        :icon="ArrowLongRightIcon"
        icon-type="endIcon"
        :class="[
          'rounded-none !px-2.5',
          totalPages === currentPage && '!bg-opacity-40'
        ]"
        :disabled="totalPages === currentPage ? true : false"
        @click="next()"
      >
        <span class="hidden md:block">Next</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  totalCount: {
    type: Number,
    required: true,
    default: 0
  },
  limit: {
    type: Number,
    required: true,
    default: 0
  },
  activePage: {
    type: Number,
    required: true,
    default: 0
  },
  divider: {
    type: String,
    default: '…'
  },
  max: {
    type: Number,
    default: 7,
    validate(value) {
      return value >= 5 && value < Number.MAX_VALUE
    }
  }
})

const emit = defineEmits(['changePage'])

const totalPages = computed(() => {
  return Math.ceil(props.totalCount / props.limit)
})

const currentPage = computed(() => {
  return props.activePage + 1
})

const prev = () => {
  if (props.activePage > 0) {
    const prevPage = props.activePage - 1
    changePage(prevPage)
  }
}

const next = () => {
  if (
    props.activePage < totalPages.value &&
    props.activePage + 1 < totalPages.value
  ) {
    const nextPage = props.activePage + 1
    changePage(nextPage)
  }
}

const changePage = (page: Number) => {
  emit('changePage', page)
}

// new pagination count
const pages = computed(() =>
  Array.from(
    { length: Math.ceil(props.totalCount / props.limit) },
    (_, i) => i + 1
  )
)

const displayedPages = computed(() => {
  const totalPages = pages.value.length
  const current = currentPage.value
  const maxDisplayedPages = Math.max(props.max, 5)

  const r = Math.floor((Math.min(maxDisplayedPages, totalPages) - 5) / 2)
  const r1 = current - r
  const r2 = current + r

  const beforeWrapped = r1 - 1 > 1
  const afterWrapped = r2 + 1 < totalPages

  const items: Array<number | string> = []

  if (totalPages <= maxDisplayedPages) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i)
    }
    return items
  }

  items.push(1)

  if (beforeWrapped) {
    items.push(props.divider)
  }

  if (!afterWrapped) {
    const addedItems = current + r + 2 - totalPages
    for (let i = current - r - addedItems; i <= current - r - 1; i++) {
      items.push(i)
    }
  }

  for (let i = Math.max(2, r1); i <= Math.min(totalPages, r2); i++) {
    items.push(i)
  }

  if (!beforeWrapped) {
    const addedItems = 1 - (current - r - 2)
    for (let i = current + r + 1; i <= current + r + addedItems; i++) {
      items.push(i)
    }
  }

  if (afterWrapped) {
    items.push(props.divider)
  }

  if (r2 < totalPages) {
    items.push(totalPages)
  }

  // Replace divider by number on start edge case [1, '…', 3, ...]
  if (items.length >= 3 && items[1] === props.divider && items[2] === 3) {
    items[1] = 2
  }

  // Replace divider by number on end edge case [..., 48, '…', 50]
  if (
    items.length >= 3 &&
    items[items.length - 2] === props.divider &&
    items[items.length - 1] === items.length
  ) {
    items[items.length - 2] = items.length - 1
  }

  return items
})
</script>
