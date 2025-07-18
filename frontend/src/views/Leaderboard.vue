<template>
  <div class="flex flex-col p-3 w-2xl mx-6 items-center justify-center bg-white shadow-md rounded-lg gap-2">
    <h1 class="text-3xl font-bold text-center mb-10 p-3 text-[#002e5d]">🏆 Writing Leaderboard</h1>

    <!-- Podium Top 3 -->
    <div class="flex justify-center items-end p-3 gap-4 mb-10 mx-20">
      <!-- Podium #2 -->
      <div v-if="users[1]" class="flex flex-col rounded-2xl p-3 items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-gray-200">
        <img :src="users[1].image" class="w-20 h-20 rounded-full border-4 border-gray-300" />
        <div class="bg-gray-300 text-center px-4 py-2 rounded-md mt-2 font-semibold text-[#002e5d]">🥈 {{ users[1].name
          }}</div>
        <div class="text-sm text-gray-600 font-extrabold">{{ users[1].points }} pts</div>
      </div>
      <!-- Podium #1 -->
      <div v-if="users[0]"
        class="flex flex-col rounded-2xl p-3 items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-yellow-100">
        <img :src="users[0].image" class="w-24 h-24 rounded-full border-4 border-yellow-400" />
        <div class="bg-yellow-400 text-center px-4 py-2 rounded-md mt-2 font-bold text-[var(--byu-navy)]">
          🥇 {{ users[0].name }}
        </div>
        <div class="text-sm text-yellow-600 font-extrabold">
          {{ users[0].points }} pts
        </div>
      </div>

      <!-- Podium #3 -->
      <div v-if="users[2]"  class="flex flex-col rounded-2xl p-3 items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-orange-100">
        <img :src="users[2].image" class="w-20 h-20 rounded-full border-4 border-orange-400" />
        <div class="bg-orange-400 text-center px-4 py-2 rounded-md mt-2 font-semibold text-[#002e5d]">🥉 {{
          users[2].name }}</div>
        <div class="text-sm text-orange-500 font-extrabold">{{ users[2].points }} pts</div>
      </div>
    </div>

    <!-- Remaining Leaderboard -->
    <table class="w-full md:w-[800px]  table-auto p-4 bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-[#002e5d] text-white ">
        <tr>
          <th class="py-2 px-4 text-left">#</th>
          <th class="py-2 px-4 text-left">User</th>
          <th class="py-2 px-4 text-left">Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users.slice(3)" :key="user.id" class=" h-20 hover:bg-gray-200 transition items-center justify-between">
          <td class="py-2 px-4 text-[#002e5d]">{{ index + 4 }}</td>
          <td class="py-2 px-4 flex items-center gap-2 text-[#002e5d]">
            <img :src="user.image" class="w-8 h-8 rounded-full" />
            {{ user.name }}
          </td>
          <td class="py-2 px-4 text-[#002e5d]">{{ user.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import avatar from '@/assets/avatar.png';
import { useAuth } from '../composable/useAuth';

const { isAuthenticated, logout } = useAuth();

const users = ref([]);

// Fetch leaderboard data from backend
onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}/leaderboard`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // or hardcoded token for testing
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch leaderboard data');

    const data = await response.json();

    // Map backend data to match leaderboard UI expectations
    users.value = data.map((user, index) => ({
      id: index + 1,
      name: user.username,
      points: user.totalHours,
      image: avatar,
    })).sort((a, b) => b.points - a.points); // Sort descending by points

  } catch (err) {
    console.error('Error fetching leaderboard:', err);
  }
});

watch(isAuthenticated, (newVal) => {
  console.log("isAuthenticated changed:", newVal);
});
</script>


<style scoped>
table {
  border-collapse: collapse;
}
</style>


<style scoped>
table {
  border-collapse: collapse;
}
</style>
