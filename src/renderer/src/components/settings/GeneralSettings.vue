<template>
  <div v-if="generalSettings" class="general-settings">
    <label>数据文件夹路径:</label>
    <input v-model="generalSettings.userDataPath" readonly />
    <button @click="selectFolder">选择文件夹</button>
    <div>
      <label>语言设置:</label>
      <select v-model="generalSettings.language">
        <option value="zh-CN">中文</option>
        <option value="en-US">English</option>
      </select>
    </div>
  </div>
  <div v-else>
    <p>加载中...</p>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '../../stores/settingsStore'
import { computed } from 'vue'

const settingsStore = useSettingsStore()
const generalSettings = computed(() => settingsStore.settings?.generalSettings)

const selectFolder = async (): Promise<void> => {
  const result = await window.electron.ipcRenderer.invoke('select-folder')
  if (result && generalSettings.value) {
    generalSettings.value.userDataPath = result
  }
}
</script>
