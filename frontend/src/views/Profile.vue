<template>
  <div class="flex flex-col items-center p-6">
    <h1 v-if="userProfile" class="text-3xl font-bold mb-4 text-center text-gray-800">
      Welcome, {{ userProfile?.name || 'Guest' }}
    </h1>

    <!-- User Profile -->
    <div
      v-if="userProfile"
      class="p-6 border rounded-lg shadow-lg text-center bg-gradient-to-r from-gray-200 to-gray-300 max-w-md mx-auto hover:scale-105 transition-all duration-300"
    >
      <img class="w-32 h-32 rounded-full mx-auto mb-4" src="" alt="">

      <div class="text-sm mt-5 space-y-3">
        <p class="font-medium text-xl text-gray-900 hover:text-indigo-600 transition duration-300 ease-in-out">
          Username: <span class="font-normal text-gray-700">{{ userProfile.username }}</span>
        </p>
        <p class="text-gray-700">NetID: {{ userProfile.netId }}</p>
        <p class="text-gray-700">Lab: {{ userProfile.lab }}</p>
        <p class="text-gray-700">
          Email:
          <a :href="`mailto:${userProfile.email}`" class="text-indigo-500 hover:text-indigo-700">
            {{ userProfile.email }}
          </a>
        </p>
      </div>
    </div>

    <!-- Total Logged Hours -->
    <p v-if="logs.length" class="text-lg font-semibold mt-6 text-indigo-700">
      Total Logged Hours: {{ totalHours }}
    </p>

    <!-- Logging Time -->
    <section class="mb-8 mt-10 w-full max-w-4xl">
      <h2 class="text-xl font-semibold mb-3">Log Writing Time</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <InputText v-model="hours" type="number" placeholder="Hours" class="w-24" />
        <Calendar v-model="date" dateFormat="yy-mm-dd" class="min-w-[160px]" />
        <InputText v-model="lab" placeholder="Lab" class="w-40" />
        <InputText v-model="description" placeholder="Description" class="flex-1" />
        <Button label="Log" @click="logTime" />
      </div>
    </section>

    <!-- Tabs -->
    <Tabview>
      <TabPanel header="List View">
        <DataTable :value="logs" class="shadow rounded-lg border" @row-click="onRowClick" dataKey="_id">
          <Column field="date" header="Date" />
          <Column field="hours" header="Hours" />
          <Column field="lab" header="Lab" />
          <Column field="description" header="Description" />
        </DataTable>
      </TabPanel>

      <TabPanel header="Calendar View">
        <div class="calendar-grid border rounded p-2">
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
    </Tabview>

    <!-- Selected Log Detail -->
    <div v-if="selectedLog" class="mt-8 p-4 border rounded bg-gray-50 w-full max-w-xl">
      <h3 class="text-lg font-semibold mb-2">Log Details</h3>
      <p><strong>Date:</strong> {{ selectedLog.date }}</p>
      <p><strong>Hours:</strong> {{ selectedLog.hours }}</p>
      <p><strong>Lab:</strong> {{ selectedLog.lab }}</p>
      <p><strong>Description:</strong> {{ selectedLog.description }}</p>
      <Button label="Close" class="mt-4" @click="selectedLog = null" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tabview from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const API_BASE = 'http://localhost:5000/api';
const token = localStorage.getItem('token');
const AUTH_HEADER = { headers: { Authorization: `Bearer ${token}` } };

// User profile
const userProfile = ref(null);

// Form inputs
const hours = ref(0);
const date = ref(new Date());
const lab = ref('');
const description = ref('');

// Data
const logs = ref([]);
const calendarData = ref([]);
const selectedLog = ref(null);

// Total hours
const totalHours = computed(() => {
  return logs.value.reduce((sum, log) => sum + log.hours, 0);
});

// Fetch user profile
const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${API_BASE}/users/profile`, AUTH_HEADER);
    userProfile.value = res.data;
  } catch (err) {
    console.error('Failed to fetch user profile:', err);
  }
};

// Submit log
const logTime = async () => {
  try {
    const payload = {
      hours: hours.value,
      date: date.value.toISOString(),
      lab: lab.value,
      description: description.value,
    };

    await axios.post(`${API_BASE}/logs/log`, payload, AUTH_HEADER);

    hours.value = 0;
    lab.value = '';
    description.value = '';
    await fetchLogs();
  } catch (error) {
    console.error('Error logging time:', error);
  }
};

// Fetch all logs
const fetchLogs = async () => {
  try {
    const res = await axios.get(`${API_BASE}/logs`, AUTH_HEADER);
    logs.value = res.data;
    generateCalendarView();
  } catch (err) {
    console.error('Error fetching logs:', err);
  }
};

// Calendar generation
const generateCalendarView = () => {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);

  const days = [];
  for (let i = 0; i < 365; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    const isoDate = current.toISOString().split('T')[0];

    const log = logs.value.find(entry => entry.date?.startsWith(isoDate));
    const logHours = log?.hours || 0;

    const colorClass = logHours
      ? `bg-green-${getColorIntensity(logHours)}`
      : 'bg-gray-200';

    days.push({
      date: isoDate,
      hours: logHours,
      class: colorClass,
    });
  }

  calendarData.value = days;
};

// Color intensity for calendar cells
const getColorIntensity = (hours) => {
  if (hours >= 6) return 600;
  if (hours >= 4) return 400;
  if (hours >= 2) return 300;
  return 200;
};

// Row click handlers
const onRowClick = ({ data }) => {
  selectedLog.value = data;
};

const fetchLogByDate = (dateStr) => {
  const match = logs.value.find(log => log.date?.startsWith(dateStr));
  if (match) selectedLog.value = match;
};

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
