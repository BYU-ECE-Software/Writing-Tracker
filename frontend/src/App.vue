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
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import FooterBar from './components/FooterBar.vue';
import HeaderBar from './components/HeaderBar.vue';

const router = useRouter();

const token = ref(localStorage.getItem('token'));
const isAuthenticated = computed(() => !!token.value);

const baseMenuItems = [
  { label: 'Leaderboard', command: () => router.push('/'), authOnly: true  },
  { label: 'Profile', command: () => router.push('/profile'), authOnly: true },
  { label: 'Login', command: () => router.push('/login'), guestOnly: true },
  { label: 'Register', command: () => router.push('/register'), guestOnly: true },
];

const menuItems = computed(() =>
  baseMenuItems.filter(item => {
    if (item.authOnly) return isAuthenticated.value;
    if (item.guestOnly) return !isAuthenticated.value;
    return true;
  })
);

const logout = () => {
  localStorage.removeItem('token');
  token.value = null; 
  router.push('/login');
};
</script>
