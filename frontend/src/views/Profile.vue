<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Your Writing Stats</h1>
    <div class="mb-6">
      <h2 class="text-xl mb-2">Log Writing Time</h2>
      <div class="flex gap-4">
        <InputText v-model="hours" type="number" placeholder="Hours" class="w-24" />
        <Calendar v-model="date" dateFormat="yy-mm-dd" />
        <Button label="Log" @click="logTime" />
      </div>
    </div>
    <Tabview>
      <TabPanel header="List View">
        <DataTable :value="logs" class="shadow rounded">
          <Column field="date" header="Date"></Column>
          <Column field="hours" header="Hours"></Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="Calendar View">
        <div class="calendar-grid">
          <div v-for="day in calendarData" :key="day.date" :class="day.class">
            {{ day.hours ? `${day.hours}h` : '' }}
          </div>
        </div>
      </TabPanel>
    </Tabview>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Tabview from 'primevue/tabview';

import Column from 'primevue/column';
import axios from 'axios';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import TabPanel from 'primevue/tabpanel';

const hours = ref(0);
const date = ref(new Date());
const logs = ref([]);
const calendarData = ref([]);

const logTime = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/logs`,
      { hours: hours.value, date: date.value.toISOString().split('T')[0] },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    fetchLogs();
    hours.value = 0;
  } catch (error) {
    console.error('Error logging time:', error);
  }
};

const fetchLogs = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URI}/logs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    logs.value = response.data;
    updateCalendar();
  } catch (error) {
    console.error('Error fetching logs:', error);
  }
};

const updateCalendar = () => {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);
  const days = [];
  for (let i = 0; i < 365; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const log = logs.value.find(s => s.date === dateStr);
    const hours = log ? log.hours : 0;
    days.push({
      date: dateStr,
      hours,
      class: `p-2 border ${hours ? `bg-green-${Math.min(hours * 100, 500)}` : 'bg-gray-200'}`,
    });
  }
  calendarData.value = days;
};

onMounted(fetchLogs);
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 2px;
}
</style>