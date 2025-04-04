<template>
  <div>
    <el-form :model="providerSettings" label-width="120px">
      <el-form-item
        v-for="(provider, index) in providerSettings.providers"
        :key="index"
        :label="'供应 ' + (index + 1)"
      >
        <el-input v-model="provider.name" placeholder="供应名称"></el-input>
        <el-input v-model="provider.baseUrl" placeholder="基础 URL"></el-input>
        <el-tag
          v-for="(model, idx) in provider.models"
          :key="idx"
          closable
          @close="removeModel(index, idx)"
        >
          {{ model }}
        </el-tag>
        <el-input
          v-model="newModel"
          placeholder="添加模型"
          @keyup.enter="addModel(index)"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '../../stores/settingsStore'
import { ref, computed } from 'vue'

const settingsStore = useSettingsStore()
const providerSettings = computed(() => settingsStore.settings?.providerSettings)

const newModel = ref('')
const addModel = (index: number): void => {
  if (newModel.value.trim()) {
    providerSettings[index].models.push(newModel.value.trim())
    newModel.value = ''
  }
}
const removeModel = (supplyIndex: number, modelIndex: number): void => {
  providerSettings[supplyIndex].models.splice(modelIndex, 1)
}
</script>
