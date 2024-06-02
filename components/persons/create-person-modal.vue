<template>
  <Dialog
    :open-event="props.isModalOpen"
    size="lg"
    @update:open-event="updateOpenEvent($event)"
  >
    <template #title>Create Person</template>

    <template #content>
      <div class="flex flex-wrap md:flex-nowrap gap-4">
        <Input
          v-model="form.name"
          label="Name"
          placeholder="Enter Name"
          class="w-full md:w-auto"
        />
        <Input
          v-model="form.mobile"
          label="Mobile"
          placeholder="Enter Mobile"
          class="w-full md:w-auto"
        />
      </div>
      <div class="flex flex-wrap md:flex-nowrap gap-4 mt-4">
        <Input
          v-model="form.email"
          label="Email"
          placeholder="Enter email"
          class="w-full md:w-auto"
        />
        <Input
          v-model="form.password"
          label="Password"
          placeholder="Enter Password"
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
import { usePersonsRepo } from '~/repos/persons'
import Dialog from '../../components/common/dialog.vue'
import Input from '../../components/form/input.vue'
import Button from '../../components/form/button.vue'
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
  mobile: '',
  email: '',
  password: ''
})

const emit = defineEmits(['update:openEvent'])

const updateOpenEvent = (e: boolean) => {
  emit('update:openEvent', e)
}

const { create } = usePersonsRepo()

const handleSave = async () => {
  const payload = {
    name: form.name,
    mobile: form.mobile,
    email: form.email,
    password: form.password
  }
  // todo
  const response = await create({ payload })
  emit('update:openEvent', false)
}

const handleEvent = (e: boolean) => {
  emit('update:openEvent', e)
}
</script>
