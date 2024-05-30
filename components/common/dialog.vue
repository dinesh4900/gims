<template>
  <TransitionRoot
    appear
    :show="openEvent"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog
      as="div"
      :open="openEvent"
      class="fixed z-50 inset-0 h-full transition ease-in-out duration-1000"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
          aria-hidden="true"
        />
      </TransitionChild>

      <div
        class="fixed inset-0 flex h-screen w-screen items-center justify-center p-4 transition ease-in-out duration-500"
      >
        <div
          class="flex min-h-full w-full items-center justify-center p-0 md:p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="scale-0 transition ease-in-out duration-300 transform"
            enter-from="translate-y-full opacity-0 scale-5"
            enter-to="translate-y-0 opacity-100 scale-100"
            leave="transition duration-700 ease-out"
            leave-from="transform scale-100 opacity-100 "
            leave-to="transform scale-95 opacity-0 "
          >
            <DialogPanel
              :class="[
                dialogSizeClass,
                'w-full transform  text-left align-middle shadow-xl transition-all',
                customDialog === true
                  ? 'rounded-2xl bg-gray-100'
                  : 'rounded-lg bg-white divide-y divide-gray-100'
              ]"
            >
              <template v-if="$slots.title">
                <DialogTitle
                  as="h3"
                  :class="[
                    customDialog === true
                      ? 'text-2xl font-bold px-6'
                      : 'text-lg font-semibold leading-6 px-4',
                    'text-gray-900 relative py-4'
                  ]"
                >
                  <slot name="title" />

                  <Button
                    size="sm"
                    color="white"
                    icon-type="icon"
                    :icon="XMarkIcon"
                    :class="[
                      closeable === false
                        ? '!hidden'
                        : '!rounded-full absolute top-3 right-3 z-50 focus:outline-none'
                    ]"
                    @click="closeModal"
                  />
                </DialogTitle>
              </template>

              <div
                :class="[
                  customDialog === true ? 'px-6' : 'px-4',
                  'py-4 max-h-[calc(100vh-200px)] scrollbar--thin'
                ]"
              >
                <slot name="content" />
              </div>

              <template v-if="$slots.footer">
                <div
                  :class="[
                    customDialog === true ? 'px-6' : 'px-4',
                    'py-4 w-full'
                  ]"
                >
                  <slot name="footer" />
                </div>
              </template>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { PropType, computed } from 'vue'

const props = defineProps({
  openEvent: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>,
    default: 'sm'
  },
  customDialog: {
    type: Boolean,
    default: false
  },
  closeable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:openEvent'])
const closeModal = () => {
  emit('update:openEvent', false)
}

const sizeClasses = {
  xs: 'md:max-w-xs',
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-4xl',
  xl: 'max-w-full'
}

const dialogSizeClass = computed(() => {
  return sizeClasses[props.size] || ''
})
</script>
