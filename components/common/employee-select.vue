<template>
  <Vselect
    v-model="selectedValue"
    :value="defaultValue"
    :items="selectOptions"
    :name="name"
    placeholder="Select employee"
    :multiple="multiple"
    :errors="errors"
    @change="emit('change', $event)"
    @deselected="emit('deselected', $event)"
  />
</template>

<script setup lang="ts">
import Vselect from '../../components/form/VSelect.vue'
import { startCase } from 'lodash'
import { PropType } from 'vue'
import { usePersonsRepo } from '~/repos/persons'

const props = defineProps({
  errors: { type: Object, required: false, default: () => {} },
  modelValue: {
    type: Object as PropType<any>,
    required: true,
    default: null
  },
  defaultValue: {
    type: Object as PropType<any>,
    required: true,
    default: null
  },
  name: {
    type: String,
    required: false,
    default: ''
  },
  selectionKey: {
    type: String,
    required: false,
    default: null
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false
  }
})

const { defaultValue, name, selectionKey, multiple } = toRefs(props)

const selectedValue = ref()

watch(selectedValue, (newValue) => {
  if (selectionKey?.value && selectedValue?.value) {
    emit('update:modelValue', selectedValue?.value[selectionKey?.value])
  } else {
    emit('update:modelValue', newValue)
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'deselected'])

const { findAll } = usePersonsRepo()
const { result } = await findAll({})

const selectOptions = computed(() => {
  console.log(result?.data?.findManyPersons, '## find all persons')
  return (
    result?.data?.findManyPersons?.items?.map((item: any) => {
      return {
        key: item?._id,
        name: item?.name,
        value: item?.email
      }
    }) || []
  )
})

onMounted(() => {
  selectedValue.value = props.defaultValue
})

onBeforeUnmount(() => {
  selectedValue.value = null
})
</script>
