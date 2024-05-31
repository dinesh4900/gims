<template>
  <div :class="isUseCustomSelect ? 'isUseCustomSelect' : ''">
    <vSelect
      v-model="selected"
      :filter="isFussySeach ? fuseSearch : undefined"
      :options="items"
      :label="label"
      :name="name"
      :value="selected"
      :placeholder="showPlaceholder"
      :multiple="multiple"
      :taggable="taggable"
      :push-tags="pushtags"
      :deselect-from-dropdown="true"
      append-to-body
      :searchable="searchable"
      :calculate-position="withPopper"
      :loading="loading"
      :disabled="disabled"
      :class="[
        isUseCustomSelect
          ? 'customselect bg-white group relative min-h-[56px] w-fullcursor-pointer overflow-hidden'
          : 'bg-white group relative min-h-[56px] w-full rounded-md border border-gray-200 focus-within:border-purple-600 focus-within:ring-inset focus-within:ring-1 focus-within:ring-purple-600 cursor-pointer overflow-hidden',
        disabled ? 'opacity-25' : ''
      ]"
      :clearable="isUseCustomSelect ? clearable : undefined"
      :no-drop="nodropDown"
      :map-keydown="handlers"
      @search="search($event)"
      @option:selected="change($event)"
      @option:deselected="deselected($event)"
      @option:created="handleOptionCreate"
    >
      <template #header>
        <div
          :class="[
            inputValue
              ? 'top-3.5 text-xs text-gray-400 leading-none cursor-default'
              : 'top-1/2 text-sm w-full text-gray-700 cursor-pointer h-14 pt-5 pb-4 bg-transparent ring-0 ring-gray-200',
            disabled ? ' cursor-not-allowed' : '',
            required && `after:content-['*'] after:ml-0.5 after:text-red-500`
          ]"
          class="absolute font-medium inset-x-0 px-4 z-0 -translate-y-1/2 duration-200 group-focus-within:top-3.5 group-focus-within:text-xs group-focus-within:text-gray-400 rounded-md group-focus-within:bg-transparent group-focus-within:-translate-y-1/2 group-focus-within:ring-transparent group-focus-within:h-auto group-focus-within:py-0 capitalize"
        >
          {{ startCase(name) }}
        </div>
      </template>
      <template #selected-option="{ name: nameText, iconlink }">
        <div
          :class="
            isUseCustomSelect
              ? 'break-words flex items-start'
              : 'flex items-center'
          "
        >
          <img
            v-if="
              name == 'country' ? getFlag({ nameText, iconlink }) : iconlink
            "
            :class="isUseCustomSelect ? 'w-6 mr-1 flex-initial' : 'w-6 mr-2'"
            :src="
              name == 'country' ? getFlag({ nameText, iconlink }) : iconlink
            "
            :alt="nameText"
          />
          {{ isStartCaseText ? startCase(nameText) : nameText }}
        </div>
      </template>
      <template #option="{ name: nameText, iconlink }">
        <div class="flex items-center">
          <img
            v-if="iconlink"
            class="w-6 mr-2"
            :src="iconlink"
            :alt="nameText"
          />

          {{ isStartCaseText ? startCase(nameText) : nameText }}
        </div>
      </template>
      <template #spinner="{ loading: _loading }">
        <div
          v-if="loading || _loading"
          style="border-left-color: rgba(107, 30, 190, 0.71)"
          class="vs__spinner"
        />
      </template>
      <template v-if="isSelectAll" #list-header>
        <div v-if="items.length !== selected?.length">
          <button
            class="w-full px-6 py-2 text-sm font-medium text-gray-600 transition duration-75 hover:font-bold hover:text-gray-900 text-start"
            @click.prevent="selectAll"
          >
            Select All
          </button>
        </div>
      </template>
    </vSelect>
    <!-- <ErrorMessage :errors="errors" :name="name" class="mt-2" /> -->
  </div>
</template>

<script setup lang="ts">
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { createPopper } from '@popperjs/core'
import Fuse from 'fuse.js'
import _ from 'lodash'
import startCase from 'lodash/startCase'

type VirtualElement = {
  getBoundingClientRect: () => ClientRect | DOMRect
  contextElement?: Element
}

const showPlaceholder = computed(() => {
  const label = props.placeholder || `Select ${name}`
  const labelReq = props.required ? '*' : ''
  return `${label} ${labelReq}`
})

const selected = ref()
const nodropDown = ref(false)
const props = defineProps({
  clearable: {
    type: Boolean,
    default: true
  },
  isUseCustomSelect: {
    type: Boolean,
    required: false,
    default: false
  },
  className: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => []
  },
  // errors: {
  //   type: Object as PropType<ValidationErrors>,
  //   required: false,
  //   default: () => {}
  // },
  items: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'name',
    required: false
  },
  name: {
    type: String,
    default: '',
    required: false
  },
  modelValue: {
    type: [Object, Array, String],
    required: true,
    default: () => {}
  },
  value: {
    type: [Object, Array, String],
    required: true,
    default: () => {}
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  isStartCaseText: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  isFussySeach: {
    type: Boolean,
    required: false,
    default: false
  },
  keys: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => ['e', 'label', 'value']
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  isSelectAll: {
    type: Boolean,
    required: false,
    default: false
  },
  taggable: {
    type: Boolean,
    required: false,
    default: false
  },
  pushtags: {
    type: Boolean,
    required: false,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  searchable: {
    type: Boolean,
    required: false,
    default: true
  }
})

const {
  clearable,
  isUseCustomSelect,
  items,
  keys,
  loading,
  multiple,
  isStartCaseText,
  isSelectAll,
  required
} = toRefs(props)
const emit = defineEmits([
  'update:modelValue',
  'update:searchString',
  'change',
  'deselected',
  'search',
  'tag',
  'selectedOption'
])

const selectAll = (e: Event) => {
  if (e.target) {
    selected.value = [{ _id: '6565d869eb1b7cf8745d6beb', name: 'All' }]
    nodropDown.value = true
  }
}

watch(selected, (newValue) => {
  emit('update:modelValue', newValue)
  if (newValue === null || !newValue) {
    emit('deselected', newValue)
  }
})

const change = (newValue: any) => {
  emit('change', newValue)
}

const deselected = (newValue: any) => {
  emit('deselected', newValue)
  if (newValue.name === 'All') {
    nodropDown.value = false
  }
}

watch(props, (newValue) => {
  selected.value = newValue?.modelValue
})

const search = (x: string) => {
  emit('update:searchString', x)
  emit('search', x)
}

const withPopper = (
  dropdownList: HTMLElement,
  component: { $refs: { toggle: Element | VirtualElement } },
  { width }: any
) => {
  const customWidth = isUseCustomSelect.value ? '494px' : width
  dropdownList.style.width = customWidth

  const offsetValues = isUseCustomSelect.value ? [123, -1] : [0, 3]

  const popper = createPopper(component.$refs.toggle, dropdownList, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: offsetValues
        }
      }
    ]
  })

  return () => popper.destroy()
}

const fuseSearch = (
  options: readonly unknown[],
  search: string | any[] | Fuse.Expression
) => {
  const fuse = new Fuse(options, {
    keys: keys.value,
    shouldSort: true
  })

  return search.length ? fuse.search(search).map(({ item }) => item) : fuse.list
}

onMounted(() => {
  selected.value = props.value
})

onBeforeUnmount(() => {
  selected.value = null
})

const slectedChipbg = computed(() => (props.multiple ? '#f3e8ff' : ''))
const slectedChiptextColor = computed(() => (props.multiple ? '#7e22ce' : ''))
const slectedChipHeight = computed(() => (props.multiple ? 'fit-content' : ''))

const dropDownIcon = computed(() => (props.clearable ? 'flex' : 'none'))

const selectBG = computed(() => {
  if (selected.value?.length === 0 || !!_.isEmpty(selected.value)) {
    return '#ffffff'
  }
  return 'transparent'
})
const selectHeight = computed(() => {
  if (selected.value?.length === 0 || _.isEmpty(selected.value)) {
    return '54px'
  }

  let heightValue

  if (props.multiple) {
    heightValue = '32px'
  } else if (isUseCustomSelect.value) {
    heightValue = 'fit-content'
  } else {
    heightValue = '54px'
  }

  return heightValue
})

const selectedMultiple = computed(() => {
  if (selected.value?.length === 0 || _.isEmpty(selected.value)) {
    return '0px'
  }

  let heightValue

  if (isUseCustomSelect.value || props.multiple) {
    heightValue = '24px'
  } else {
    heightValue = '2px'
  }

  return heightValue
})

const selectFocus = computed(() => (props.multiple ? '0px' : '8px'))

const selectRequited = computed(() =>
  props.required
    ? '-webkit-linear-gradient(left, #374151 0%, #374151 92%,red 8%,red 100%)'
    : '-webkit-linear-gradient(left, #374151 50%, #374151 50%)'
)

interface Iflag {
  nameText: string
  iconlink: string
}
interface IKeyValueRef {
  key: string
  value: string
}

const getFlag = computed(() => {
  return (x: Iflag) =>
    items.value?.find((item: any) => item.name === x.nameText)?.iconlink
})

const inputValue = computed(() => {
  return props.modelValue
})

const handleOptionCreate = (e: any) => {
  emit('selectedOption', e)
}

const handlers = (e: Event) => {
  e.preventDefault()
}
</script>
<style lang="scss">
.vs__search:focus {
  padding-top: v-bind(selectFocus);
}
.vs--single.vs--open .vs__selected,
.vs--single.vs--loading .vs__selected {
  @apply opacity-0;
}
.vs__dropdown {
  &-toggle {
    @apply px-1 py-0 border-transparent;
    &[aria-expanded='true'] {
      @apply bg-transparent;
    }
  }
  &-option {
    @apply py-2 text-sm font-medium;
    &--selected {
      @apply bg-purple-100 text-purple-700;
    }
    &--highlight {
      @apply bg-gray-200 text-black font-bold;
    }
  }
  &-menu {
    @apply max-h-64 py-0;
  }
}
.vs__no-options {
  @apply py-3 font-medium text-base;
}

.vs__selected-options {
  @apply group-focus:bg-transparent focus-within:bg-transparent border-transparent;
  background-color: v-bind(selectBG);
  min-height: v-bind(selectHeight);
  margin-top: v-bind(selectedMultiple);
  span.vs__selected {
    background: v-bind(slectedChipbg) !important;
    color: v-bind(slectedChiptextColor) !important;
    height: v-bind(slectedChipHeight) !important;
    @apply rounded-sm pl-2 text-sm font-medium bg-gray-200 border-transparent;

    button.vs__deselect {
      @apply p-1;
    }
    &:hover button.vs__deselect svg {
      @apply fill-current text-red-600;
    }
  }
}

.v-select.vs--multiple {
  .vs__selected-options {
    margin-top: v-bind(selectedMultiple);
  }
}

.vs {
  &__search {
    @apply placeholder-gray-700 placeholder:text-sm placeholder:font-medium;
  }
  &__selected {
    @apply text-sm font-medium;
  }
}

.v-select.drop-up.vs--open .vs__dropdown-toggle {
  border-radius: 0 0 4px 4px;
  border-top-color: transparent;
  border-bottom-color: rgba(60, 60, 60, 0.26);
}

[data-popper-placement='top'] {
  border-radius: 4px 4px 0 0;
  border-top-style: solid;
  border-bottom-style: none;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
}

:root {
  --vs-dropdown-option--active-bg: #7e22ce;
  --vs-dropdown-option--active-color: #eeeeee;
}

.v-select input::-webkit-input-placeholder {
  width: fit-content;
  background: v-bind(selectRequited);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.isUseCustomSelect {
  .v-select.customselect {
    .vs__search:focus {
      padding-top: v-bind(selectFocus);
    }
    .vs--single.vs--open .vs__selected,
    .vs--single.vs--loading .vs__selected {
      @apply opacity-0;
    }
    .vs__dropdown {
      &-toggle {
        @apply px-1 py-0 border-transparent;
        &[aria-expanded='true'] {
          @apply bg-transparent;
        }
      }
      &-option {
        @apply py-2 text-sm font-medium;
        &--selected {
          @apply bg-purple-100 text-purple-700;
        }
        &--highlight {
          @apply bg-gray-200 text-black font-bold;
        }
      }
      &-menu {
        @apply max-h-64 py-0;
      }
    }
    .vs__no-options {
      @apply py-3 font-medium text-base;
    }

    .vs__selected-options {
      @apply group-focus:bg-transparent focus-within:bg-transparent border-transparent;
      background-color: v-bind(selectBG);
      min-height: v-bind(selectHeight);
      margin-top: v-bind(selectedMultiple);
      max-height: 54px;
      span.vs__selected {
        background: v-bind(slectedChipbg) !important;
        color: v-bind(slectedChiptextColor) !important;
        height: v-bind(slectedChipHeight) !important;
        @apply rounded p-0.5 pl-1  text-xs font-medium bg-gray-200 border-transparent;

        button.vs__deselect {
          @apply p-0.5;
        }
        &:hover button.vs__deselect svg {
          @apply fill-current text-red-600;
        }
      }
    }

    .vs {
      &__search {
        @apply placeholder-gray-700 placeholder:text-sm placeholder:font-medium;
      }
      &__selected {
        @apply text-sm font-medium;
      }
    }
  }

  .v-select.customselect.vs--multiple {
    .vs__selected-options {
      margin-top: v-bind(selectedMultiple);
    }
  }

  .v-select.customselect.drop-up.vs--open .vs__dropdown-toggle {
    border-radius: 0 0 4px 4px;
    border-top-color: transparent;
    border-bottom-color: rgba(60, 60, 60, 0.26);
  }

  .v-select.customselect .vs__dropdown-toggle .vs__actions {
    display: v-bind(dropDownIcon);
  }

  :root {
    --vs-dropdown-option--active-bg: #7e22ce;
    --vs-dropdown-option--active-color: #eeeeee;
  }

  .v-select.customselect input::-webkit-input-placeholder {
    width: fit-content;
    background: v-bind(selectRequited);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
