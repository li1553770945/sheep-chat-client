import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/chat",
    name: "Chat",
    component: (): Promise<typeof import("../views/Chat.vue")> =>
      import("../views/Chat.vue"), // 懒加载 Chat 视图
  },
  {
    path: "/agent",
    name: "Agent",
    component: (): Promise<typeof import("../views/Agent.vue")> =>
      import("../views/Agent.vue"), // 懒加载 Agent 视图
  },
  {
    path: "/settings",
    name: "Settings",
    component: (): Promise<typeof import("../views/Settings.vue")> =>
      import("../views/Settings.vue"), // 懒加载 Settings 视图
  },
  {
    path: "/",
    redirect: "/chat", // 默认重定向到 /chat
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
