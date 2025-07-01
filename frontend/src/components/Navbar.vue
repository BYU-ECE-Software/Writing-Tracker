<template>
  <nav class="bg-white border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- Search Toggle Button (Mobile) -->
      <div class="flex md:order-2">
        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false"
          class="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span class="sr-only">Search</span>
        </button>

        <!-- Search Input (Desktop Only) -->
        <div class="relative hidden md:block">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span class="sr-only">Search icon</span>
          </div>
          <input type="text" id="search-navbar"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0047ba] focus:border-[#0047ba]"
            placeholder="Search...">
        </div>

        <!-- Menu Toggle Button (Mobile) -->
        <button data-collapse-toggle="navbar-search" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-search" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      <!-- Nav Links Section -->
      <div class="items-center justify-between hidden md:flex md:order-1" id="navbar-search">
        <!-- Search Input (Mobile Only) -->
        <div class="relative mt-3 md:hidden flex flex-row justify-between items-center">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="search-navbar"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0047ba] focus:border-[#0047ba]"
            placeholder="Search...">
        </div>

        <!-- Menu Items -->
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:justify-between md:items-center md:gap-8 md:bg-white">
          <li v-for="(item, index) in filteredMenuItems" :key="index">
            <a :href="item.to" class="block py-2 px-3 rounded-sm md:p-2 transition-colors duration-200" :class="[
              item.to === router.currentRoute.value.path
                ? 'text-white bg-[#002e5d] hover:text-[#002e5d] hover:shadow-lg'
                : 'text-gray-900 hover:bg-[#0047ba] hover:text-[#002e5d] hover:shadow-lg',
            ]">
              {{ item.label }}
            </a>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = computed(() => !!localStorage.getItem('token'));

const menuItems = [
  { label: 'Leaderboard', to: '/' },
  { label: 'Profile', to: '/profile', visible: () => isAuthenticated.value },
  { label: 'Login', to: '/login', visible: () => !isAuthenticated.value },
  { label: 'Register', to: '/register', visible: () => !isAuthenticated.value },

]
const filteredMenuItems = computed(() =>
  menuItems.filter(item => (typeof item.visible === 'function' ? item.visible() : true))
);

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>
