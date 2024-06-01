<template>
  <Dialog
    :open-event="props.isModalOpen"
    size="md"
    @update:open-event="updateOpenEvent($event)"
  >
    <template #title>Update Task</template>

    <template #content>
      <div class="flex gap-4">
        <Input v-model="form.dueDate" label="Name" placeholder="Enter Name" />
        <Input
          v-model="form.description"
          label="Mobile"
          placeholder="Enter Mobile"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4 w-full justify-between flex-wrap">
        <Button
          color="white"
          :disabled="props.loading"
          :loading="props.loading"
          :class="props.loading ? 'cursor-wait' : ''"
        >
          Cancel
        </Button>
        <Button
          :disabled="props.loading"
          :loading="props.loading"
          :class="props.loading ? 'cursor-wait' : ''"
          @click="handleSave"
        >
          Save
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { usePersonsRepo } from '~/repos/persons'
import Dialog from '../../components/common/dialog.vue'
import Input from '../../components/form/input.vue'
import Button from '../../components/form/button.vue'
import { useTasksRepo } from '~/repos/tasks'

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  taskId: {
    type: String,
    default: ''
  }
})

const form = reactive({
  assignedTo: {},
  description: '',
  dueDate: ''
})

const { taskId } = toRefs(props)
const { update, findOne } = useTasksRepo()

const fetchOnePerson = async () => {
  const dataResp = await findOne(taskId.value)

  const findOneData = dataResp?.result?.data?.findTaskById
  form.assignedTo = findOneData.assignedTo
  form.description = findOneData.description
  form.dueDate = findOneData.dueDate
}

watch(
  taskId,
  (newVal) => {
    fetchOnePerson()
  },
  { immediate: true }
)

const emit = defineEmits(['update:openEvent'])

const updateOpenEvent = (e: boolean) => {
  emit('update:openEvent', e)
}

const handleSave = async () => {
  const payload = {
    _id: taskId.value,
    name: form.dueDate,
    mobile: form.description
  }
  await update({ payload })
  emit('update:openEvent', false)
}
</script>
