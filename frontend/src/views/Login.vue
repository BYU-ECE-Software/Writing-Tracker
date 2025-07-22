<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <Card class="w-full max-w-md shadow-lg rounded-2xl">
      <template #title>
        <div class="text-center text-2xl font-semibold text-gray-800">Login</div>
      </template>

      <template #content>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <Inputtext
              v-model="email"
              placeholder="Enter your email"
              class="w-full"
              :pt="{ root: 'w-full' }"
            >
              <template #prepend>
                <i class="pi pi-envelope text-gray-500"></i>
              </template>
            </Inputtext>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <Inputtext
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full"
              :pt="{ root: 'w-full' }"
            >
              <template #prepend>
                <i class="pi pi-lock text-gray-500"></i>
              </template>
            </Inputtext>
          </div>

          <Button
            label="Login"
            class="w-full mt-2"
            :loading="loading"
            @click="login"
          />

          <div class="text-right mt-2">
            <a href="#" class="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';;

import Card from 'primevue/card';
import Inputtext from 'primevue/inputtext';
import Button from 'primevue/button';

import axios from 'axios';

const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();


const login = async () => {
  loading.value = true;
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URI}/auth/login`, {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', response.data.token);
    console.log({ severity: 'success', summary: 'Login Successful', life: 3000 });
    router.push('/leaderboard');
  } catch (error) {
    console.log({
      severity: 'error',
      summary: 'Login Failed',
      detail: error.response?.data?.message || 'Please check your credentials.',
      life: 4000,
    });
  } finally {
    loading.value = false;
  }
};
</script>