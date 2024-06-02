<template>
  <Vselect
    v-model="selectedValue"
    :value="defaultValue"
    :items="selectOptions"
    :name="name"
    placeholder="Select service"
    :multiple="multiple"
    :errors="errors"
    @change="emit('change', $event)"
    @deselected="emit('deselected', $event)"
  />
</template>

<script setup lang="ts">
import Vselect from '../../components/form/VSelect.vue'
import { PropType } from 'vue'
import { useServicesRepo } from '~/repos/service'

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

const { findAll } = useServicesRepo()
const { result } = await findAll({})

const selectOptions = computed(() => {
  return (
    result?.data?.findManyServiceRequirements?.items?.map((item: any) => {
      return {
        key: item?._id,
        name: item?.name,
        email: item?.email,
        fieldOfService: item?.fieldOfService,
        requirement: item?.requirement
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
