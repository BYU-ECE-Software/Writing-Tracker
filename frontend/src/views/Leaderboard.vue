<template>
  <div class="p-6 relative">
    <h1 class="text-2xl font-bold mb-4">Writing Leaderboard</h1>
    
    <Select v-model="period" :options="periods" optionLabel="label" optionValue="value" class="mb-4" />
    
    <Datatable :value="leaderboard" :loading="loading" class="p-datatable-sm shadow rounded stripedRows" responsiveLayout="scroll">
      <Column field="username" header="User"></Column>
      <Column field="totalHours" header="Total Hours"></Column>
    </Datatable>

    <!-- Add Log Button -->
    <Button
      icon="pi pi-plus"
      class="fixed bottom-6 right-6 z-50"
      rounded
      severity="primary"
      @click="showDialog = true"
      label="Add Log"
    />

    <!-- Add Log Dialog -->
    <Dialog v-model:visible="showDialog" header="Add Writing Log" :modal="true" class="w-[25rem]">
      <div class="flex flex-col gap-4">
        <Dropdown v-model="logForm.user" :options="users" optionLabel="name" optionValue="id" placeholder="Select User" />
        <Calendar v-model="logForm.date" showIcon dateFormat="yy-mm-dd" />
        <InputNumber v-model="logForm.hours" placeholder="Hours" mode="decimal" :min="0" :max="24" showButtons />

        <div class="flex justify-end gap-2">
          <Button label="Cancel" severity="secondary" @click="showDialog = false" />
          <Button label="Submit" severity="primary" @click="submitLog" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

import Datatable from 'primevue/datatable';
import Column from 'primevue/column';
import Select from 'primevue/select';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';

const period = ref('week');
const periods = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
];

const leaderboard = ref([]);
const loading = ref(false);
const showDialog = ref(false);

// Mock user list - replace with API call
const users = ref([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);

const logForm = ref({
  user: null,
  date: null,
  hours: null,
});

const fetchLeaderboard = async () => {
  loading.value = true;
  try {
    // Replace with actual API call
    // const response = await axios.get(`/api/leaderboard?period=${period.value}`, {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    // });
    const response = { data: [{ username: 'Alice', totalHours: 12 }, { username: 'Bob', totalHours: 9 }] };
    leaderboard.value = response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  } finally {
    loading.value = false;
  }
};

const submitLog = async () => {
  try {
    // Replace with actual API call
    // await axios.post('/api/logs', logForm.value, {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    // });

    console.log('Log submitted:', logForm.value);
    showDialog.value = false;
    fetchLeaderboard(); // refresh leaderboard
    logForm.value = { user: null, date: null, hours: null }; // reset
  } catch (error) {
    console.error('Error submitting log:', error);
  }
};

onMounted(fetchLeaderboard);
watch(period, fetchLeaderboard);
</script>

<style scoped>
/* Optional: style the floating button nicely */
.fixed {
  position: fixed;
}
</style>
