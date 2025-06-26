<template>
  <HeaderBar />

  <div class="min-h-screen bg-gray-100">
    <Menubar :model="menuItems">
    <template #start>
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
            <path d="..." fill="var(--p-primary-color)" />
            <path d="..." fill="var(--p-text-color)" />
        </svg>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
    </template>
    <template #end>
        <div class="flex items-center gap-2">
            <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
        </div>
    </template>
</Menubar>
    <router-view class="container mx-auto p-4" />
  </div>

  <FooterBar />
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

<style scoped>
.p-menubar .p-menubar-label {
  white-space: nowrap;
}
</style>
