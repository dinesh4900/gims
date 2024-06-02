<template>
  <div class="w-full">
    <div
      :class="disabled ? 'pointer-events-none cursor-not-allowed' : ''"
      class="relative w-full mb-2 overflow-hidden border border-gray-100 rounded-md cursor-pointer group h-14 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <label
        :for="`${name}-${id}`"
        :class="[
          getIconClass(),
          inputValue
            ? 'top-3.5 text-xs text-gray-400 leading-none cursor-default'
            : 'top-1/2 text-sm w-full text-gray-700 cursor-pointer h-14 pt-5 pb-4 bg-white ring-1 ring-gray-200',
          disabled ? ' cursor-not-allowed' : '',
          required && `after:content-['*'] after:ml-0.5 after:text-red-500`
        ]"
        class="absolute font-medium left-0 px-4 z-0 -translate-y-1/2 duration-200 group-focus-within:top-3.5 group-focus-within:text-xs group-focus-within:text-gray-400 rounded-md group-focus-within:bg-transparent group-focus-within:-translate-y-1/2 group-focus-within:ring-transparent group-focus-within:h-auto group-focus-within:py-0"
      >
        {{ label }}
      </label>
      <div
        v-if="icon && iconType"
        class="absolute inset-y-0 flex items-center pointer-events-none"
        :class="[
          iconType === 'startIcon' ? 'left-0 pl-3' : 'right-0 pr-3',
          disabled ? 'cursor-not-allowed' : ''
        ]"
      >
        <component
          :is="icon"
          class="w-6 h-6 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        :id="`${name}-${id}`"
        ref="input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :name="name"
        class="z-10 block w-full h-full pt-6 pb-3 text-sm font-medium leading-6 rounded-md appearance-none placeholder:text-gray-400 focus:outline-none disabled:opacity-75 focus:border-blue-600 autofill:bg-white"
        :class="[getIconClass(), disabled ? 'cursor-not-allowed' : '']"
        :required="required"
        :disabled="disabled"
        autocomplete="off"
        @input="emitInput"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      />
    </div>
    <ErrorMessage :errors="errors" :name="name" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  errors: { type: Object, required: false, default: () => {} },
  type: {
    type: String as PropType<
      'text' | 'number' | 'email' | 'password' | 'search' | 'date'
    >,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  initialFocused: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  name: {
    type: String,
    required: false,
    default: ''
  },
  label: {
    type: String,
    required: true,
    default: ''
  },
  isToFocus: {
    type: Boolean,
    required: false,
    default: false
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  iconType: {
    type: String as PropType<'startIcon' | 'endIcon'>,
    default: ''
  },
  icon: {
    type: [Object, String],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const hasFocus = ref(false)
const input = ref<HTMLInputElement>()

const id = generateUID()

const emit = defineEmits(['update:modelValue'])

const emitInput = (event: Event) => {
  const newValue = (event?.target as HTMLInputElement)?.value
  if (newValue !== undefined) {
    emit('update:modelValue', newValue)
  }
}

const inputValue = computed(() => {
  return props.modelValue === 0 ? true : !!props.modelValue
})

const getIconClass = () => {
  switch (props.iconType) {
    case 'startIcon':
      return 'pl-12 pr-4'
    case 'endIcon':
      return 'pr-12 pl-4'
    default:
      return 'px-4'
  }
}

onMounted(() => {
  if (props?.isToFocus) {
    input?.value?.focus()
  }
})
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
