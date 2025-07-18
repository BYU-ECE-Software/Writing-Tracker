// useAuth.js
import { ref, computed } from 'vue';

const token = ref(localStorage.getItem('token') || '');

const isAuthenticated = computed(() => !!token.value);

const login = (newToken) => {
  token.value = newToken;
  localStorage.setItem('token', newToken);
};

const logout = () => {
  token.value = '';
  localStorage.removeItem('token');
};

export const useAuth = () => {
  return { token, isAuthenticated, login, logout };
};