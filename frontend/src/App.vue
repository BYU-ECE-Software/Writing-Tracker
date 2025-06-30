<template>
  <HeaderBar />

  <div class="min-h-screen bg-gray-100">
    <Navbar :menuItems="menuItems" @logout="logout" />
  
    <router-view class="container mx-auto p-4" />
  </div>

  <FooterBar />
</template>


<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';
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

<style scoped>
.p-menubar .p-menubar-label {
  white-space: nowrap;
}
</style>
