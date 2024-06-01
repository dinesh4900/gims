<template>
  <Dialog
    :open-event="props.isModalOpen"
    size="md"
    @update:open-event="updateOpenEvent($event)"
  >
    <template #title>Create Task</template>

    <template #content>
      <div class="flex gap-4">
        <!-- TODO -- Date picker and assigned to -->
        <div class="w-[262px] h-[56px]">
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
        <EmployeeSelect
          :id="'assignedTo'"
          v-model="form.assignedTo"
          :name="'assignedTo'"
          :default-value="form.assignedTo"
          class="w-[262px]"
        />
      </div>
      <div class="flex gap-4">
        <!-- TODO - title -->
        <Input
          v-model="form.description"
          label="Description"
          placeholder="Enter description"
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
  // todo
  const payload = {
    assignedTo: {
      _id: form.assignedTo?.key,
      email: form.assignedTo?.email,
      name: form.assignedTo?.name
    },
    description: form.description,
    dueDate: form.dueDate
  }
  const response = await create({ payload })
  emit('update:openEvent', false)
}
</script>
