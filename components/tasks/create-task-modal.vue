<template>
  <Dialog
    :open-event="props.isModalOpen"
    size="md"
    @update:open-event="updateOpenEvent($event)"
  >
    <template #title>Create Task</template>

    <template #content>
      <div class="flex flex-wrap md:flex-nowrap gap-4">
        <div class="w-full md:w-[262px] h-[56px]">
          <Input
            v-model="form.title"
            label="Title"
            placeholder="Enter title"
            class="w-full"
          />
        </div>
        <div class="w-full md:w-[262px]">
          <VueDatePicker
            v-model="form.dueDate"
            :value="form.dueDate"
            placeholder="Due Date"
            :enable-time-picker="false"
            format="dd/MM/yyyy"
            :max-date="new Date()"
            utc
            auto-apply
            :teleport="true"
          />
        </div>
        <div class="w-full md:w-[262px]">
          <EmployeeSelect
            :id="'assignedTo'"
            v-model="form.assignedTo"
            :name="'assignedTo'"
            :default-value="form.assignedTo"
            class="w-full"
          />
        </div>
      </div>
      <div class="flex flex-wrap md:flex-nowrap gap-4 mt-4">
        <!-- TODO - title -->
        <Input
          v-model="form.description"
          label="Description"
          placeholder="Enter description"
          class="w-full"
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
import EmployeeSelect from '../../components/common/employee-select.vue'
import Input from '../../components/form/input.vue'
import Button from '../../components/form/button.vue'
import { useTasksRepo } from '~/repos/tasks'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const form = reactive({
  title: '',
  assignedTo: null as any,
  description: '',
  dueDate: ''
})

const emit = defineEmits(['update:openEvent'])

const updateOpenEvent = (e: boolean) => {
  emit('update:openEvent', e)
}

const { create } = useTasksRepo()

const handleSave = async () => {
  const payload = {
    title: form.title,
    description: form.description,
    dueDate: form.dueDate,
    status: TaskStatusEnum.Assigned,
    assignedTo: {
      _id: form.assignedTo?.key,
      email: form.assignedTo?.email,
      name: form.assignedTo?.name
    }
  }
  const response = await create({ payload })
  emit('update:openEvent', false)
}
</script>
