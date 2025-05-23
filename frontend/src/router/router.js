import { createRouter, createWebHistory } from 'vue-router';
import Leaderboard from '@/views/Leaderboard.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue';

const routes = [
  { path: '/', component: Leaderboard },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;