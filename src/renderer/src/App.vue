<template>
  <div class="app-container">
    <aside class="sidebar">
      <SideBar />
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

.sidebar {
  width: 150px; /* 设置侧边栏宽度 */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.main-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
  background: #f5f6fa;
}
</style>
