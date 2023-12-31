import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import "./index.css";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Grades from "./views/Grades.vue";
import GradesUpdate from "./views/GradesUpdate.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/grades", component: Grades, name: "Grades" },
  {
    path: "/grades/update/:gradeId",
    component: GradesUpdate,
    name: "GradesUpdate",
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
