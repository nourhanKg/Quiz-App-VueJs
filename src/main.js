import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./index.css";
import HomePage from "./components/pages/HomePage.vue";
import QuizPage from "./components/pages/QuizPage.vue";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/quiz/:id", component: QuizPage },
  ],
});
createApp(App).use(router).mount("#app");
