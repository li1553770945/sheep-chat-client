<template>
  <div class="model-setting">
    <div v-if="selectModelStore.selectedModel != null">
      <el-form label-position="top" label-width="100px">
        <el-form-item label="供应商">
          <el-select v-model="selectModelStore.selectedModel.providerName" placeholder="选择供应商">
            <el-option
              v-for="provider in providers"
              :key="provider.name"
              :label="provider.name"
              :value="provider.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="模型选择">
          <el-select v-model="selectModelStore.selectedModel.modelName" placeholder="选择模型">
            <el-option v-for="model in models" :key="model" :label="model" :value="model" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useSettingsStore } from '../../stores/settingsStore'

const settingsStore = useSettingsStore()
const providers = computed(() => settingsStore.settings?.providerSettings.providers)
const models = ref<string[]>([])

import { useSelectModelStore } from '@renderer/stores/selectModelStore'
const selectModelStore = useSelectModelStore()

watch(
  () => selectModelStore.selectedModel.providerName,
  (newProviderName: string) => {
    const provider = settingsStore.settings.providerSettings.providers.find(
      (p) => p.name === newProviderName
    )
    if (!provider) {
      models.value = []
      return
    }
    models.value = provider ? provider.models : []

    // 如果没有选择模型，则默认选择第一个模型
    selectModelStore.selectedModel.modelName = models.value[0] || ''
    selectModelStore.selectedModel.providerName = newProviderName
    selectModelStore.selectedModel.apiKey = provider.apiKey
    selectModelStore.selectedModel.baseUrl = provider.baseUrl
  }
)
</script>

<style scoped>
.model-setting {
  padding: 10px;
}
</style>
