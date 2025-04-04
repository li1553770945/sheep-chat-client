<template>
  <div class="model-setting">
    <!-- <el-form label-position="top" label-width="100px">
      <el-form-item label="供应商">
        <el-select v-model="selectedProvider" placeholder="选择供应商">
          <el-option
            v-for="provider in providers"
            :key="provider"
            :label="provider"
            :value="provider"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模型选择">
        <el-select v-model="selectedModel" placeholder="选择模型">
          <el-option v-for="model in models" :key="model" :label="model" :value="model" />
        </el-select>
      </el-form-item>
      <el-form-item label="温度">
        <el-input-number v-model="temperature" :min="0" :max="1" :step="0.1" />
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useSettingsStore } from '../../stores/settingsStore'

const settingsStore = useSettingsStore()
const providers = computed(() =>
  settingsStore.settings.providerSettings.providers.map((p) => p.name)
)
const models = ref<string[]>([])
const selectedProvider = ref<string | null>(null)
const selectedModel = ref<string | null>(null)
const temperature = ref<number>(0.7)

watch(selectedProvider, (newProvider) => {
  const provider = settingsStore.settings.providerSettings.providers.find(
    (p) => p.name === newProvider
  )
  models.value = provider ? provider.models : []
})
</script>

<style scoped>
.model-setting {
  padding: 10px;
}
</style>
