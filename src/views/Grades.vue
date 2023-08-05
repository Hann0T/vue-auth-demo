<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import sessionStorage from "../utils/sessionStorage.js";

const [token, saveToken] = sessionStorage("personal-access-token", "");

let grades = ref([]);

const tableHeader = [
  "Student",
  "",
  "",
  "Grade_ID",
  "Grade_value",
  "Grade_updated_at",
  "update",
];

onMounted(() => {
  if (!token) {
    return;
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .get("http://localhost/api/personal/grades", config)
    .then((response) => {
      console.log(response.data);
      grades.value = response.data;
    })
    .catch((err) => {
      console.error(err);
      window.location.href = "/login";
    });
});
</script>

<template>
  <div v-if="grades.length > 0">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in tableHeader"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="grade in grades" :key="grade.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                <img
                  class="h-8 w-8 rounded-full"
                  :src="grade.user.profile_photo_url"
                  :alt="grade.user.id"
                />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ grade.user.name }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ grade.user.email }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ grade.id }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ grade.value }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ grade.updated_at }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                <a
                  :href="'/grades/update/' + grade.id"
                  class="bg-orange-400 hover:bg-orange-700 text-white py-2 px-4 rounded"
                >
                  Update
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <p>No Users</p>
  </div>
</template>
