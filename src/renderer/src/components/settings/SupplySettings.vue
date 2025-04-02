<template>
  <div>
    <el-form :model="supplySettings" label-width="120px">
      <el-form-item
        v-for="(supply, index) in supplySettings.supplies"
        :key="index"
        :label="'供应 ' + (index + 1)"
      >
        <el-input v-model="supply.name" placeholder="供应名称"></el-input>
        <el-input v-model="supply.baseUrl" placeholder="基础 URL"></el-input>
        <el-tag
          v-for="(model, idx) in supply.models"
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
const supplySettings = computed(() => settingsStore.settings?.supplySettings)

const newModel = ref('')
const addModel = (index: number): void => {
  if (newModel.value.trim()) {
    supplySettings[index].models.push(newModel.value.trim())
    newModel.value = ''
  }
}
const removeModel = (supplyIndex: number, modelIndex: number): void => {
  supplySettings[supplyIndex].models.splice(modelIndex, 1)
}
</script>
