<template>
  <button
    :type="type"
    :size="size"
    :color="color"
    :iconType="iconType"
    v-bind="$attrs"
    class="rounded-md capitalize box-border border-none inline-flex flex-row gap-x-2 items-center active:scale-[.97] active:shadow-md transition duration-150 ease-in-out active:translate-y-0.5"
    :class="[btnClass]"
    :disabled="disabled"
    :loading="loading"
    :icon="icon"
    @click="handleClick()"
  >
    <component
      :is="icon"
      v-if="iconType === 'icon' || iconType === 'startIcon'"
      :class="[iconWidth]"
    />
    <slot />
    <component :is="icon" v-if="iconType === 'endIcon'" :class="[iconWidth]" />

    <svg
      v-if="loading"
      class="animate-spin"
      :class="[iconWidth]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])
const handleClick = () => [emit('click')]

const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md'
  },
  color: {
    type: String as PropType<'danger' | 'success' | 'black' | 'white' | 'blue'>,
    default: 'blue'
  },
  iconType: {
    type: String as PropType<'startIcon' | 'endIcon' | 'icon'>,
    default: ''
  },
  icon: {
    type: [String, Object, Function],
    default: ''
  },
  loading: Boolean,
  disabled: Boolean
})

const sizeClasses = reactive({
  sm: 'text-sm font-medium', // 32
  md: 'text-base font-semibold', // 40
  lg: 'text-base font-bold' // 52
})

const btnClass = computed(() => {
  const btnDisabled = props.disabled
  const btnColor = {
    black: btnDisabled
      ? 'bg-opacity-60 cursor-not-allowed text-gray-200 bg-gray-800'
      : 'text-white bg-gray-900 hover:bg-gray-800 active:bg-black cursor-pointer active:shadow-black/50',
    white: btnDisabled
      ? 'bg-opacity-80 cursor-not-allowed text-gray-400 bg-gray-200'
      : 'bg-white hover:bg-gray-100 active:bg-gray-50 text-black cursor-pointer active:shadow-white/50 active:bg-transparent',
    danger: btnDisabled
      ? 'bg-opacity-60 cursor-not-allowed text-gray-200 bg-red-500'
      : 'bg-red-500 hover:bg-red-600 active:bg-red-500 text-white cursor-pointer active:shadow-red-500/50',
    success: btnDisabled
      ? 'bg-opacity-60 cursor-not-allowed text-gray-200 bg-green-600'
      : 'bg-green-600 hover:bg-green-700 active:bg-green-600 text-white cursor-pointer active:shadow-green-500/50',
    blue: btnDisabled
      ? 'bg-opacity-60 cursor-not-allowed text-gray-200 bg-blue-500'
      : 'bg-blue-700 hover:bg-blue-800 active:bg-blue-700 text-white cursor-pointer active:shadow-blue-500/50'
  }

  const iconClasses = {
    lg: props.iconType === 'icon' ? 'p-3.5' : 'px-6 py-3.5',
    md: props.iconType === 'icon' ? 'p-2' : 'px-4 py-2',
    sm: props.iconType === 'icon' ? 'p-1.5' : 'px-4 py-1.5'
  }

  const colorClass = btnColor[props.color] || ''
  const sizeClass = sizeClasses[props.size] || ''
  const typeClass = iconClasses[props.size] || ''
  const disabledClass =
    props.disabled === true
      ? 'active:!translate-y-0 active:!scale-100 active:!shadow-none'
      : ''
  return `${colorClass} ${sizeClass} ${typeClass} ${disabledClass}`
})

const iconWidthClasses = reactive({
  sm: 'w-5 h-5 text-current',
  md: 'w-6 h-6 text-current',
  lg: 'w-6 h-6 text-current'
})

const iconWidth = computed(() => {
  const iconClass = iconWidthClasses[props.size] || ''
  return iconClass
})
</script>
