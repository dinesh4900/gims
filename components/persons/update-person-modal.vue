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
  },
  personId: {
    type: String,
    default: ''
  }
})

let form = reactive({
  name: '',
  mobile: '',
  email: '',
  password: ''
})

const { personId } = toRefs(props)
const { update, findOne } = usePersonsRepo()

const fetchOnePerson = async () => {
  const dataResp = await findOne(personId.value)

  const findOneData = dataResp?.result?.data?.findPersonById
  form.name = findOneData.name
  form.mobile = findOneData.mobile
  form.email = findOneData.email
}

watch(
  personId,
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
    _id: personId.value,
    name: form.name,
    mobile: form.mobile
  }
  await update({ payload })
  emit('update:openEvent', false)
}
</script>
