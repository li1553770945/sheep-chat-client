<template>
  <div class="settings">
    <h2>数据配置管理</h2>
    <div>
      <label>数据文件夹路径:</label>
      <input v-model="dataFolderPath" readonly />
      <button @click="selectFolder">选择文件夹</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const dataFolderPath = ref("");

onMounted(async () => {
  const config = await window.electron.ipcRenderer.invoke("get-config");
  dataFolderPath.value = config.dataFolderPath;
});

const selectFolder = async (): Promise<void> => {
  const result = await window.electron.ipcRenderer.invoke("select-folder");
  if (result) {
    dataFolderPath.value = result;
    await window.electron.ipcRenderer.invoke(
      "set-data-folder",
      dataFolderPath.value,
    );
  }
};
</script>

<style scoped>
.settings {
  padding: 20px;
}
</style>
