<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 px-4">

    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">BYU</h1>
        <h2 class="text-xl font-semibold text-gray-700 mt-2">ECE Writing Tracker</h2>
        <h3 class="text-lg font-medium text-gray-600 mt-1">Login</h3>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class=" py-2">
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Net ID"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div class=" py-2">
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-[#002e5d] text-white font-semibold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuth } from '@/composable/useAuth';
import { nextTick } from 'vue';

const { login } = useAuth();

const username = ref('');
const password = ref('');
const loading = ref(false);

const router = useRouter();

const handleLogin = async () => {
  if (!username.value || !password.value) {
    console.log({
      severity: 'warn',
      summary: 'Missing fields',
      detail: 'Please enter both Net ID and Password.',
      life: 3000,
    });
    return;
  }

  loading.value = true;

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URI}/auth/login`, {
      email: username.value, // or "netId" if your API expects that
      password: password.value,
    });

   login(response.data.token); // handles localStorage and reactivity

   console.log({
      severity: 'success',
      summary: 'Login Successful',
      detail: 'Redirecting...',
      life: 3000,
    });
    await nextTick();
    router.push('/leaderboard'); // or '/dashboard'
  } catch (error) {
    console.log(error)
    console.log({
      severity: 'error',
      summary: 'Login Failed',
      detail: error.response?.data?.message || 'Invalid Net ID or Password.',
      life: 4000,
    });
  } finally {
    loading.value = false;
  }
};
</script>
