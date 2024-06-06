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
      </div>
      <div class="flex flex-wrap md:flex-nowrap gap-4 mt-4">
        <div class="w-full md:w-[262px]">
          <EmployeeSelect
            :id="'assignedTo'"
            v-model="form.assignedTo"
            :name="'assignedTo'"
            :default-value="form.assignedTo"
            class="w-full"
          />
        </div>
        <div class="w-full md:w-[262px]">
          <ServicesSelect
            :id="'service'"
            v-model="form.serviceRequirement"
            :name="'Select service'"
            :default-value="form.serviceRequirement"
            class="w-full"
          />
        </div>
      </div>

      <div class="flex flex-wrap md:flex-nowrap gap-4 mt-4">
        <div class="w-full md:w-[262px]">
          <Input
            v-model="form.description"
            label="Description"
            placeholder="Enter description"
            class="w-full"
          />
        </div>

        <div class="w-full md:w-[262px]">
          <Vselect
            v-model="form.workCategory"
            :value="form.workCategory"
            :items="workCategoryOptions"
            :name="'Work category'"
            :placeholder="'Work category'"
            :is-start-case-text="true"
          />
        </div>
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
import EmployeeSelect from '../../components/common/employee-select.vue'
import Input from '../../components/form/input.vue'
import Button from '../../components/form/button.vue'
import Vselect from '../../components/form/VSelect.vue'
import { useTasksRepo } from '~/repos/tasks'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import ServicesSelect from '../../components/common/services-select.vue'
import { WorkCategoryEnum } from '~/utils/enum'

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
  serviceRequirement: null as any,
  description: '',
  dueDate: '',
  workCategory: null as any
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
    workCategory: form.workCategory,
    serviceRequirement: {
      _id: form?.serviceRequirement?.key,
      name: form?.serviceRequirement?.name,
      email: form?.serviceRequirement?.email,
      fieldOfService: form?.serviceRequirement?.fieldOfService,
      requirements: form?.serviceRequirement?.fieldOfService
    },
    assignedTo: {
      _id: form.assignedTo?.key,
      email: form.assignedTo?.email,
      name: form.assignedTo?.name
    }
  }
  const response = await create({ payload })
  emit('update:openEvent', false)
}

const handleEvent = (e: boolean) => {
  emit('update:openEvent', e)
}

const workCategoryOptions = Object.values(WorkCategoryEnum)
</script>
