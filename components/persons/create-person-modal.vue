<template>
  <Dialog
    :open-event="props.isModalOpen"
    size="xl"
    @update:open-event="updateOpenEvent($event)"
  >
    <template #title>Create Person</template>

    <template #content>
      <div class="flex gap-4">
        <Input v-model="form.name" label="Name" placeholder="Enter Name" />
        <Input
          v-model="form.mobile"
          label="Mobile"
          placeholder="Enter Mobile"
        />
      </div>
      <div class="flex gap-4">
        <Input v-model="form.email" label="Email" placeholder="Enter email" />
        <Input
          v-model="form.password"
          label="Password"
          placeholder="Enter Password"
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
</script>
