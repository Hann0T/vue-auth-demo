<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import sessionStorage from "../utils/sessionStorage.js";

const [token, saveToken] = sessionStorage("personal-access-token", "");

const route = useRoute();
let gradeValue = ref("");
let gradeId = ref("");

onMounted(() => {
  gradeId.value = route.params.gradeId;
});

const handleUpdate = () => {
  var data = new FormData();
  data.append("value", gradeValue.value);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios
    .post(
      `http://localhost/api/personal/grades/update/${gradeId.value}`,
      data,
      config
    )
    .then((response) => {
      console.log(response.data);
      window.location.href = "/grades";
    })
    .catch((err) => {
      errMessage.message = err.message;
    });
};
</script>

<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Update Grade
          </h3>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="handleUpdate">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="value"
                    class="block text-sm font-medium text-gray-700"
                    >Grade Value</label
                  >
                  <input
                    v-model="gradeValue"
                    name="value"
                    type="number"
                    autocomplete="number"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
