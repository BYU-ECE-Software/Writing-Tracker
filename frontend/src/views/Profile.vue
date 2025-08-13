<template>
  <div class="flex flex-col md:flex-row md:items-start p-6 gap-6 md:mx-36">

    <!-- User Profile -->
    <section
      v-if="userProfile"
      class="flex flex-col items-center p-6 gap-4 border rounded-lg shadow-lg text-center 
             bg-gradient-to-r from-gray-100 to-gray-200 max-w-md w-full mx-auto 
             hover:scale-105 transition-transform duration-300"
    >
      <h1 class="text-3xl font-bold text-gray-800">{{ greeting }}</h1>
      <img :src="avatar" alt="User Avatar" class="w-20 h-20 rounded-full border-4 border-green-500" />

      <div class="space-y-2 text-sm mt-4">
        <p class="text-xl font-medium text-gray-900">{{ userProfile.name }}</p>
        <p class="text-gray-700">NetID: {{ userProfile.netId }}</p>
        <p class="text-gray-700">Lab: {{ userProfile.lab }}</p>
        <p class="text-gray-700">
          Email:
          <a :href="`mailto:${userProfile.email}`" class="text-indigo-500 hover:text-indigo-700">
            {{ userProfile.email }}
          </a>
        </p>
      </div>

      <p v-if="logs.length" class="text-lg font-semibold mt-4 text-indigo-700">
        Total Logged Hours: {{ totalHours }}
      </p>
    </section>

    <!-- Main Content -->
    <div class="flex flex-col gap-8 w-full">

      <!-- Logging Time -->
      <section class="w-full max-w-4xl">
        <h2 class="text-xl font-semibold mb-4">Log Writing Time</h2>
        <div class="flex flex-wrap gap-4 items-center">
          <InputText v-model="hours" type="number" placeholder="Hours" class="w-24" />
          <Calendar v-model="date" dateFormat="yy-mm-dd" class="min-w-[160px]" />
          <InputText v-model="lab" placeholder="Lab" class="w-40" />
          <InputText v-model="description" placeholder="Description" class="flex-1" />
          <Button label="Log" @click="logTime" />
        </div>
      </section>

      <!-- Tabs -->
      <TabView>
        <TabPanel header="List View">
          <DataTable :value="logs" class="shadow rounded-lg border" @row-click="onRowClick" dataKey="_id">
            <Column field="date" header="Date" />
            <Column field="hours" header="Hours" />
            <Column field="lab" header="Lab" />
            <Column field="description" header="Description" />
          </DataTable>
        </TabPanel>

        <TabPanel header="Calendar View">
          <div class="calendar-grid border rounded p-2 bg-white">
            <div
              v-for="day in calendarData"
              :key="day.date"
              :class="['h-6 w-6 text-xs text-center rounded cursor-pointer', day.class]"
              :title="`${day.date}: ${day.hours || 0}h`"
              @click="fetchLogByDate(day.date)"
            >
              {{ day.hours ? `${day.hours}h` : '' }}
            </div>
          </div>
        </TabPanel>
      </TabView>

      <!-- Selected Log Detail -->
      <section
        v-if="selectedLog"
        class="p-4 border rounded bg-gray-50 w-full max-w-xl"
      >
        <h3 class="text-lg font-semibold mb-2">Log Details</h3>
        <p><strong>Date:</strong> {{ selectedLog.date }}</p>
        <p><strong>Hours:</strong> {{ selectedLog.hours }}</p>
        <p><strong>Lab:</strong> {{ selectedLog.lab }}</p>
        <p><strong>Description:</strong> {{ selectedLog.description }}</p>
        <Button label="Close" class="mt-4" @click="selectedLog = null" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import avatar from '@/assets/avatar.png';

import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

// Auth header helper
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found — please log in.');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// State
const userProfile = ref(null);
const hours = ref(0);
const date = ref(new Date());
const lab = ref('');
const description = ref('');
const logs = ref([]);
const calendarData = ref([]);
const selectedLog = ref(null);

// Computed
const greeting = computed(() => {
  const hour = new Date().getHours();
  return hour < 12
    ? 'Good morning'
    : hour < 18
    ? 'Good afternoon'
    : 'Good evening';
});

const totalHours = computed(() =>
  logs.value.reduce((sum, log) => sum + Number(log.hours || 0), 0)
);

// API calls
const fetchUserProfile = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URI}/users/profile`, getAuthHeader());
    userProfile.value = data;
  } catch (err) {
    console.error('Failed to fetch user profile:', err);
  }
};

const fetchLogs = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URI}/logs/`, getAuthHeader());
    logs.value = Array.isArray(data) ? data : [];
    generateCalendarView();
  } catch (err) {
    console.error('Error fetching logs:', err);
  }
};

const logTime = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/logs/log`,
      {
        hours: Number(hours.value),
        date: date.value.toISOString(),
        lab: lab.value,
        description: description.value,
      },
      getAuthHeader()
    );
    hours.value = 0;
    lab.value = '';
    description.value = '';
    await fetchLogs();
  } catch (error) {
    console.error('Error logging time:', error);
  }
};

// Calendar
const generateCalendarView = () => {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);

  const days = [];
  for (let i = 0; i < 365; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);

    const isoDate = formatDate(current);
    const log = logs.value.find(entry => formatDate(new Date(entry.date)) === isoDate);

    const logHours = log?.hours || 0;
    const colorClass = logHours ? colorMap[getColorIntensity(logHours)] : 'bg-gray-200';

    days.push({ date: isoDate, hours: logHours, class: colorClass });
  }
  calendarData.value = days;
};

const getColorIntensity = hours => {
  if (hours >= 6) return 600;
  if (hours >= 4) return 400;
  if (hours >= 2) return 300;
  return 200;
};

const colorMap = {
  200: 'bg-green-200',
  300: 'bg-green-300',
  400: 'bg-green-400',
  600: 'bg-green-600',
};

const formatDate = date => date.toISOString().split('T')[0];

// UI handlers
const onRowClick = ({ data }) => (selectedLog.value = data);

const fetchLogByDate = dateStr => {
  const match = logs.value.find(log => formatDate(new Date(log.date)) === dateStr);
  if (match) selectedLog.value = match;
};

// Lifecycle
onMounted(() => {
  fetchUserProfile();
  fetchLogs();
});
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  grid-auto-rows: 1.5rem;
  gap: 2px;
}
</style>
