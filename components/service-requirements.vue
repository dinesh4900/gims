<template>
  <Dialog
    :open-event="props.isModalOpen"
    size="xl"
    @update:open-event="updateOpenEvent($event)"
  >
    <template #title> Update Accommodation Status </template>

    <template #content>
      <div class="flex flex-wrap md:flex-nowrap gap-4">
        <Input
          v-model="form.name"
          label="Name"
          placeholder="Enter your Name"
          class="w-full md:w-auto"
        />
        <Input
          v-model="form.companyName"
          label="Company name"
          placeholder="Enter your company name"
          class="w-full md:w-auto"
        />
      </div>
      <div class="flex flex-wrap md:flex-nowrap gap-4">
        <Input
          v-model="form.designation"
          label="Designation"
          placeholder="Enter your designation"
          class="w-full md:w-auto"
        />
        <Input
          v-model="form.email"
          label="Email"
          placeholder="Enter your email"
          class="w-full md:w-auto"
        />
      </div>
      <div class="flex flex-wrap md:flex-nowrap gap-4">
        <Input
          v-model="form.mobile"
          label="Mobile number"
          placeholder="Enter your mobile number"
          class="w-full md:w-auto"
        />
        <Input
          v-model="form.address"
          label="Address"
          placeholder="Enter your address"
          class="w-full md:w-auto"
        />
      </div>
      <div class="flex flex-wrap md:flex-nowrap gap-4">
        <Input
          v-model="form.fieldOfService"
          label="Field of service"
          placeholder="Enter your field of service"
          class="w-full md:w-auto"
        />
        <Input
          v-model="form.requirements"
          label="Requirements"
          placeholder="Enter your requirements"
          class="w-full md:w-auto"
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
import { useServicesRepo } from '~/repos/service'
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
  name: '',
  companyName: '',
  designation: '',
  mobile: '',
  address: '',
  email: '',
  fieldOfService: '',
  requirements: ''
})

const emit = defineEmits(['update:openEvent'])

const updateOpenEvent = (e: boolean) => {
  emit('update:openEvent', e)
}

const { createServiceReq } = useServicesRepo()

const handleSave = async () => {
  const payload = {
    name: form.name,
    companyName: form.companyName,
    designation: form.designation,
    mobile: form.mobile,
    address: form.address,
    email: form.email,
    fieldOfService: form.fieldOfService,
    requirements: form.requirements
  }
  await createServiceReq({ payload })
  emit('update:openEvent', false)
}
</script>
