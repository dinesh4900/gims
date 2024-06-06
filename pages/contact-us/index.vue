<template>
  <div class="relative isolate bg-white">
    <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
      <div
        class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48"
      >
        <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">
            Get in touch
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Proin volutpat consequat porttitor cras nullam gravida at. Orci
            molestie a eu arcu. Sed ut tincidunt integer elementum id sem. Arcu
            sed malesuada et magna.
          </p>
          <dl class="mt-10 space-y-4 text-base leading-7 text-gray-600">
            <div class="flex gap-x-4">
              <dt class="flex-none">
                <span class="sr-only">Address</span>
                <BuildingOffice2Icon
                  class="h-7 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd>
                158, G Block, 1st Main Rood,<br />Anna Nagar, Chennai, Tamil
                Nadu,<br />600102
              </dd>
            </div>
            <div class="flex gap-x-4">
              <dt class="flex-none">
                <span class="sr-only">Telephone</span>
                <PhoneIcon class="h-7 w-6 text-gray-400" aria-hidden="true" />
              </dt>
              <dd>
                <a class="hover:text-gray-900" href="tel:044 26633516"
                  >044 26633516</a
                >
              </dd>
            </div>
            <div class="flex gap-x-4">
              <dt class="flex-none">
                <span class="sr-only">Email</span>
                <EnvelopeIcon
                  class="h-7 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd>
                <a class="hover:text-gray-900" href="mailto:support@guhan.in"
                  >support@guhan.in</a
                >
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <form
        action="#"
        method="POST"
        class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
      >
        <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <div class="mt-2.5">
                <Input
                  v-model="form.firstName"
                  label="First name"
                  placeholder="Enter your first name"
                />
              </div>
            </div>
            <div>
              <div class="mt-2.5">
                <Input
                  v-model="form.lastName"
                  label="Last name"
                  placeholder="Enter your first name"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <div class="mt-2.5">
                <Input
                  v-model="form.email"
                  label="Email"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <div class="mt-2.5">
                <Input
                  v-model="form.mobile"
                  label="Mobile number"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <div class="mt-2.5">
                <TextArea
                  v-model="form.description"
                  label="Description"
                  :rows="3"
                  :cols="20"
                  name="Description"
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
          <div class="mt-8 flex justify-end">
            <Button
              color="blue"
              size="sm"
              class="!font-medium items-start"
              @click="handleSubmitRequirements"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline'
import { useContactRepo } from '~/repos/contact'
import Button from '../../components/form/button.vue'
import Input from '../../components/form/input.vue'
import TextArea from '../../components/form/text-area.vue'

const form = reactive({
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  description: ''
})
const isFormSubmitted = ref(false)
const { createContact } = useContactRepo()

const handleSubmitRequirements = async () => {
  const payload = {
    firstName: form.firstName,
    lastName: form.lastName,
    mobile: form.mobile,
    email: form.email,
    description: form.description
  }
  await createContact({ payload })
  isFormSubmitted.value = true
}
</script>
