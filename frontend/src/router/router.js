import { createRouter, createWebHistory } from 'vue-router';
import Leaderboard from '@/views/Leaderboard.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue';

const routes = [
  { path: '/', redirect: '/login' }, // homepage becomes leaderboard
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/leaderboard', component: Leaderboard, meta: { requiresAuth: true } },
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
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    // prevent going back to login/register if already logged in
    next('/leaderboard');
  } else {
    next();
  }
});


export default router;