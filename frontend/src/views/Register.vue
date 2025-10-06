<template>
  <div class="flex items-center justify-center min-h-80 bg-gray-100 p-4 gap-10">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center transform ">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">REGISTER</h1>
      <p class="text-gray-600 mb-6">
        To register, please speak with your professor for further instructions.
      </p>
      <div class="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationNotice'
}
</script>
