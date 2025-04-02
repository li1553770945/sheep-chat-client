<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="普通设置" name="general">
      <GeneralSettings />
    </el-tab-pane>
    <el-tab-pane label="供应商与模型设置" name="supply">
      <SupplySettings />
    </el-tab-pane>
    <el-tab-pane label="同步设置" name="sync">
      <SyncSettings />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@renderer/stores/settingsStore'
import GeneralSettings from '@renderer/components/settings/GeneralSettings.vue'
import SupplySettings from '@renderer/components/settings/SupplySettings.vue'
import SyncSettings from '@renderer/components/settings/SyncSettings.vue'

const settingsStore = useSettingsStore()
const { loadSettings } = settingsStore // 从 store 中获取 isSettingsLoaded
const activeTab = ref('general')

onMounted(async () => {
  await loadSettings()
})
</script>

<style scoped>
.settings {
  padding: 20px;
}
</style>
