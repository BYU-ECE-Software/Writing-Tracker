<template>
  <HeaderBar />
  <div class="min-h-screen bg-gray-100">
    <!-- Only show navbar if authenticated -->
    <Navbar
     v-if="isAuthenticated.value"
      :menuItems="menuItems"
      @logout="logout"
    />
    
    <router-view class="container mx-auto p-4" />
  </div>
  <FooterBar />
</template>


<script setup>
import { useAuth } from '@/composable/useAuth';
import Navbar from './components/Navbar.vue';
import FooterBar from './components/FooterBar.vue';
import HeaderBar from './components/HeaderBar.vue';

const { isAuthenticated, logout } = useAuth(); // Destructure inside setup

const menuItems = [
  { label: 'Leaderboard', to: '/leaderboard', visible: () => isAuthenticated.value },
  { label: 'Profile', to: '/profile', visible: () => isAuthenticated.value },
  { label: 'Login', to: '/login', visible: () => !isAuthenticated.value },
  { label: 'Register', to: '/register', visible: () => !isAuthenticated.value },
];
</script>



<style scoped>
.p-menubar .p-menubar-label {
  white-space: nowrap;
}
</style>
