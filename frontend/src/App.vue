<template>
    <HeaderBar/>
    <div class="min-h-screen bg-gray-100">

      <Menubar :model="menuItems" class="bg-white shadow">
        <template #end>
          <Button v-if="isAuthenticated" label="Logout" @click="logout" />
        </template>
      </Menubar>
      <router-view class="container mx-auto p-4" />
    </div>
    <FooterBar/>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import Button from 'primevue/button';
  import Menubar from 'primevue/menubar';
  import FooterBar from './components/FooterBar.vue';
  import HeaderBar from './components/HeaderBar.vue';

  const router = useRouter();
  const isAuthenticated = computed(() => !!localStorage.getItem('token'));
  
  const menuItems = [
    { label: 'Leaderboard', to: '/' },
    { label: 'Profile', to: '/profile', visible: () => isAuthenticated.value },
    { label: 'Login', to: '/login', visible: () => !isAuthenticated.value },
    { label: 'Register', to: '/register', visible: () => !isAuthenticated.value },
  ];
  
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  </script>