<template>
  <div>
    <label v-if="value" class="text-xs font-medium text-gray-400 capitalize">{{
      label
    }}</label>
    <textarea
      v-model="value"
      class="bg-gray-10 border border-gray-300 text-gray-900 text-sm rounded-md w-full block h-auto px-4 py-2 placeholder:text-gray-400 focus:outline-none font-medium appearance-none disabled:opacity-75 focus:border-blue-600 autofill:bg-white leading-6 focus-within:ring-1 focus-within:ring-blue-600 placeholder:capitalize"
      :rows="rows"
      :cols="cols"
      :placeholder="placeholder"
      @input="emitInput"
    />
  </div>
  <!-- <ErrorMessage :errors="errors" :name="name" /> -->
</template>
<script setup lang="ts">
const props = defineProps({
  // errors: {
  //   type: Object as PropType<ValidationErrors>,
  //   required: false,
  //   default: () => {}
  // },
  name: {
    type: String,
    required: false,
    default: ''
  },
  modelValue: {
    type: String as PropType<string>,
    required: true,
    default: ''
  },
  label: {
    type: String as PropType<string>,
    required: true,
    default: ''
  },
  rows: {
    type: Number as PropType<number>,
    required: true,
    default: 5
  },
  cols: {
    type: Number as PropType<number>,
    required: true,
    default: 0
  },
  placeholder: {
    type: String as PropType<string>,
    required: true,
    default: ''
  }
})

const { label, rows, cols, placeholder } = props
const value = ref<string>(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const emitInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

watch(props, (newValue) => {
  value.value = newValue.modelValue
})
</script>
