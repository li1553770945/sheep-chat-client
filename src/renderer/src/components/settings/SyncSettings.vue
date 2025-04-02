<template>
  <div v-if="syncSettings" class="sync-settings">
    <el-form label-width="120px">
      <el-form-item label="启用同步">
        <el-switch v-model="syncSettings.syncEnabled"></el-switch>
      </el-form-item>
      <el-form-item label="同步间隔 (分钟)">
        <el-input-number v-model="syncSettings.syncInterval" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="上次同步时间">
        <el-input v-model="syncSettings.syncLastTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="上次成功同步时间">
        <el-input v-model="syncSettings.syncLastSuccess" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div v-else>
    <p>加载中...</p>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '../../stores/settingsStore'
import { computed } from 'vue'
const settingsStore = useSettingsStore()
const syncSettings = computed(() => settingsStore.settings?.syncSettings)
</script>
