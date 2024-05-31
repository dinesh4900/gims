<template>
  <div class="flex flex-col items-center justify-between w-full h-screen">
    <header class="flex-initial w-full h-16 py-4">
      <img
        src="~/assets/logo.svg"
        class="block h-auto max-w-full mx-auto text-white"
        alt=""
      />
    </header>
    <div class="flex-1 h-full min-w-full bg-white">
      <slot />
    </div>
    <footer class="flex-initial py-4 h-14">
      <div class="text-xs font-medium text-gray-500">
        &copy; {{ new Date().getFullYear() }} Edvoy<sup><small>TM</small></sup>
        &nbsp; Limited. All Rights Reserved.
      </div>
    </footer>
  </div>
</template>
