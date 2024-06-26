<template>
  <Dialog
    :open-event="props.isModalOpen"
    size="lg"
    @update:open-event="updateOpenEvent($event)"
  >
    <template #title>Service Requirements</template>

    <template #content>
      <div class="flex flex-wrap gap-4">
        <div class="w-full">
          <Input
            v-model="form.name"
            label="Name"
            placeholder="Enter your Name"
            class="w-full"
          />
        </div>
        <div class="w-full">
          <Input
            v-model="form.companyName"
            label="Company name"
            placeholder="Enter your company name"
            class="w-full"
          />
        </div>
      </div>
      <div class="flex flex-wrap gap-4">
        <div class="w-full">
          <Input
            v-model="form.designation"
            label="Designation"
            placeholder="Enter your designation"
            class="w-full"
          />
        </div>
        <div class="w-full">
          <Input
            v-model="form.email"
            label="Email"
            placeholder="Enter your email"
            class="w-full"
          />
        </div>
      </div>
      <div class="flex flex-wrap gap-4">
        <div class="w-full">
          <Input
            v-model="form.mobile"
            label="Mobile number"
            placeholder="Enter your mobile number"
            class="w-full"
          />
        </div>
        <div class="w-full">
          <Input
            v-model="form.address"
            label="Address"
            placeholder="Enter your address"
            class="w-full"
          />
        </div>
      </div>
      <div class="flex flex-wrap gap-4">
        <div class="w-full">
          <Input
            v-model="form.fieldOfService"
            label="Field of service"
            placeholder="Enter your field of service"
            class="w-full"
          />
        </div>
        <div class="w-full">
          <Input
            v-model="form.requirements"
            label="Requirements"
            placeholder="Enter your requirements"
            class="w-full"
          />
        </div>
        <input type="file" @change="handleUpload" />
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
import { useServicesRepo } from '~/repos/service'
import Dialog from './common/dialog.vue'
import Button from './form/button.vue'
import Input from './form/input.vue'
import { useRouter } from 'vue-router'

import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  selectedService: {
    type: String,
    default: ''
  }
})

const { selectedService } = toRefs(props)

const form = reactive({
  name: '',
  companyName: '',
  designation: '',
  mobile: '',
  address: '',
  email: '',
  fieldOfService: '',
  requirements: '',
  documentUrl: ''
})

const storage = useFirebaseStorage()

const handleUpload = async (e: any) => {
  try {
    const file = e.target.files[0]

    const fileRef = storageRef(storage, file.name)

    const { url, upload } = useStorageFile(fileRef)

    await upload(file)
    form.documentUrl = url.value as string
  } catch (error) {
    console.error('Error uploading file', error)
  }
}

const emit = defineEmits(['update:openEvent'])

const updateOpenEvent = (e: boolean) => {
  emit('update:openEvent', e)
}

const { createServiceReq } = useServicesRepo()

watch(
  selectedService,
  (newVal) => {
    form.fieldOfService = newVal
  },
  { immediate: true }
)

const handleSave = async () => {
  const payload = {
    name: form.name,
    companyName: form.companyName,
    designation: form.designation,
    mobile: form.mobile,
    address: form.address,
    email: form.email,
    fieldOfService: form.fieldOfService,
    requirements: form.requirements,
    documentUrl: form.documentUrl
  }
  await createServiceReq({ payload })
  emit('update:openEvent', false)
}

const handleEvent = (e: boolean) => {
  emit('update:openEvent', e)
}
</script>
