import { values } from 'lodash';
<template>
  <Dialog
    :open-event="props.isModalOpen"
    size="md"
    @update:open-event="updateOpenEvent($event)"
  >
    <template #title>Update Task</template>

    <template #content>
      <div class="flex flex-wrap md:flex-nowrap gap-4">
        <div class="w-full md:w-[262px] h-[56px]">
          <Vselect
            v-model="form.status"
            :value="form.status"
            :items="statusOptions"
            :name="'status'"
            :placeholder="'Status'"
            :is-start-case-text="true"
            class="w-full"
          />
        </div>
        <TextArea
          v-model="form.employeeNotes"
          label="Employee notes"
          :rows="3"
          :cols="20"
          name="Employee notes"
          placeholder="Description"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-wrap gap-4 w-full justify-between mt-4">
        <Button
          color="white"
          :disabled="props.loading"
          :loading="props.loading"
          :class="props.loading ? 'cursor-wait' : ''"
          @click="handleEvent(false)"
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
import Dialog from '../../components/common/dialog.vue'
import Vselect from '../../components/form/VSelect.vue'
import Button from '../../components/form/button.vue'
import { useTasksRepo } from '~/repos/tasks'
import '@vuepic/vue-datepicker/dist/main.css'
import TextArea from '../../components/form/text-area.vue'

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
  status: null as any,
  employeeNotes: ''
})

const { taskId } = toRefs(props)
const { update, findOne } = useTasksRepo()

const fetchOneTask = async () => {
  const dataResp = await findOne(taskId.value)
  const findOneData = dataResp?.result?.data?.findTaskById
  form.status = findOneData.status
}

watch(
  taskId,
  () => {
    fetchOneTask()
  },
  { immediate: true }
)

const statusOptions = Object.values(TaskStatusEnum)

const emit = defineEmits(['update:openEvent'])

const updateOpenEvent = (e: boolean) => {
  emit('update:openEvent', e)
}

const handleSave = async () => {
  const input = {
    _id: taskId.value,
    status: form.status,
    employeeNotes: form.employeeNotes
  }
  await update(input)
  emit('update:openEvent', false)
}
const handleEvent = (e: boolean) => {
  emit('update:openEvent', e)
}
</script>
