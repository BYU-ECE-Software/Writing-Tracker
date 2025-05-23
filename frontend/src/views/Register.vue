<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <Toast />
    <Card class="w-full max-w-md shadow-lg rounded-2xl">
      <template #title>
        <div class="text-center text-2xl font-semibold text-gray-800">Register</div>
      </template>

      <template #content>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <Inputtext
              v-model="username"
              placeholder="Choose a username"
              class="w-full"
            >
              <template #prepend>
                <i class="pi pi-user text-gray-500"></i>
              </template>
            </Inputtext>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <Inputtext
              v-model="email"
              placeholder="Enter your email"
              class="w-full"
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
              placeholder="Create a password"
              class="w-full"
            >
              <template #prepend>
                <i class="pi pi-lock text-gray-500"></i>
              </template>
            </Inputtext>
          </div>

          <Button
            label="Register"
            class="w-full mt-2"
            :loading="loading"
            @click="register"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import Card from 'primevue/card';
import Inputtext from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

import axios from 'axios';

const username = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();
const toast = useToast();

const register = async () => {
  loading.value = true;
  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URI}/auth/register`, {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    toast.add({ severity: 'success', summary: 'Registration Successful', life: 3000 });
    router.push('/login');
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Registration Failed',
      detail: error.response?.data?.message || 'Please try again.',
      life: 4000,
    });
  } finally {
    loading.value = false;
  }
};
</script>
