<template>
  <div class="flex flex-col p-3 w-2xl mx-6 items-center justify-center bg-white shadow-md rounded-lg gap-2">
    <h1 class="text-3xl font-bold text-center mb-10 p-3 text-indigo-800">🏆 Writing Leaderboard</h1>

    <!-- Podium Top 3 -->
    <div class="flex justify-center items-end p-3 gap-4 mb-10 mx-20">
      <div v-if="users[1]" class="flex flex-col rounded-2xl p-3 items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-gray-150">
        <img :src="users[1].image" class="w-20 h-20 rounded-full border-4 border-gray-300" />
        <div class="bg-gray-300 text-center px-4 py-2 rounded-md mt-2 font-semibold text-[#002e5d]">🥈 {{ users[1].name
          }}</div>
        <div class="text-sm text-gray-500">{{ users[1].points }} pts</div>
      </div>

      <div v-if="users[0]"
        class="flex flex-col rounded-2xl p-3 items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-yellow-100">
        <img :src="users[0].image" class="w-24 h-24 rounded-full border-4 border-yellow-400" />
        <div class="bg-yellow-400 text-center px-4 py-2 rounded-md mt-2 font-bold text-[var(--byu-navy)]">
          🥇 {{ users[0].name }}
        </div>
        <div class="text-sm text-gray-700">
          {{ users[0].points }} pts
        </div>
      </div>


      <div v-if="users[2]"  class="flex flex-col rounded-2xl p-3 items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-orange-100">
        <img :src="users[2].image" class="w-20 h-20 rounded-full border-4 border-orange-400" />
        <div class="bg-orange-400 text-center px-4 py-2 rounded-md mt-2 font-semibold text-[#002e5d]">🥉 {{
          users[2].name }}</div>
        <div class="text-sm text-gray-500">{{ users[2].points }} pts</div>
      </div>
    </div>

    <!-- Remaining Leaderboard -->
    <table class="w-full md:w-[800px]  table-auto p-4 bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-[#002e5d] text-white">
        <tr>
          <th class="py-2 px-4 text-left">#</th>
          <th class="py-2 px-4 text-left">User</th>
          <th class="py-2 px-4 text-left">Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users.slice(3)" :key="user.id" class="hover:bg-gray-200 transition">
          <td class="py-2 px-4 text-[#002e5d]">{{ index + 4 }}</td>
          <td class="py-2 px-4 flex items-center gap-2 text-[#002e5d]">
            <img :src="user.image" class="w-8 h-8 rounded-full" />
            {{ user.name }}
          </td>
          <td class="py-2 px-4">{{ user.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import avatar from '@/assets/avatar.png'; // Make sure this file exists

const users = ref([
  {
    id: 1,
    name: 'Alice',
    points: 120,
    image: avatar,
  },
  {
    id: 2,
    name: 'Bob',
    points: 110,
    image: avatar,
  },
  {
    id: 3,
    name: 'Charlie',
    points: 100,
    image: avatar,
  },
  {
    id: 4,
    name: 'Diana',
    points: 85,
    image: avatar,
  },
  {
    id: 5,
    name: 'Ethan',
    points: 75,
    image: avatar,
  },
  {
    id: 6,
    name: 'Fiona',
    points: 60,
    image: avatar,
  },
  {
    id: 7,
    name: 'George',
    points: 50,
    image: avatar,
  },
  {
    id: 8,
    name: 'Hannah',
    points: 45,
    image: avatar,
  },
  {
    id: 9,
    name: 'Ian',
    points: 30,
    image: avatar,
  },
  {
    id: 10,
    name: 'Julia',
    points: 20,
    image: avatar,
  },
  {
    id: 11,
    name: 'Kevin',
    points: 15,
    image: avatar,
  },
  {
    id: 12,
    name: 'Laura',
    points: 10,
    image: avatar,
  },
  {
    id: 13,
    name: 'Mike',
    points: 5,
    image: avatar,
  },
  {
    id: 14,
    name: 'Nina',
    points: 3,
    image: avatar,
  },
  {
    id: 15,
    name: 'Oscar',
    points: 1,
    image: avatar,
  },
  {
    id: 16,
    name: 'Paula',
    points: 0,
    image: avatar,
  },
  {
    id: 17,
    name: 'Quentin',
    points: 0,
    image: avatar,
  },
  {
    id: 18,
    name: 'Rachel',
    points: 0,
    image: avatar,
  },
  {
    id: 19,
    name: 'Sam',
    points: 0,
    image: avatar,
  },
  {
    id: 20,
    name: 'Tina',
    points: 0,
    image: avatar,
  },
  {
    id: 21,
    name: 'Ursula',
    points: 0,
    image: avatar,
  },
  {
    id: 22,
    name: 'Victor',
    points: 0,
    image: avatar,
  },
  {
    id: 23,
    name: 'Wendy',
    points: 0,
    image: avatar,
  },
  {
    id: 24,
    name: 'Xander',
    points: 0,
    image: avatar,
  },
  {
    id: 25,
    name: 'Yara',
    points: 0,
    image: avatar,
  },
  {
    id: 26,
    name: 'Zane',
    points: 0,
    image: avatar,
  },
]);
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
