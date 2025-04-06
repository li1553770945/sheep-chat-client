<template>
  <div v-if="providerSettings" class="provider-settings">
    <el-form :model="providerSettings" label-width="120px">
      <el-form-item label="供应商设置">
        <el-button type="primary" @click="newProviderDialogFormVisible = true">添加供应</el-button>
        <el-button
          type="danger"
          :disabled="selectedProviderIndex === null"
          @click="deleteDialogVisible = true"
        >
          删除供应商</el-button
        >
      </el-form-item>
      <el-form-item label="选择供应商">
        <el-select v-model="selectedProviderIndex">
          <el-option
            v-for="(provider, index) in providerSettings.providers"
            :key="index"
            :label="provider.name"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <div v-if="currentProvider != null && selectedProviderIndex !== null">
        <el-form-item label="API地址">
          <el-input v-model="currentProvider.baseUrl"></el-input>
        </el-form-item>
        <el-form-item label="API密钥">
          <el-input v-model="currentProvider.apiKey"></el-input>
        </el-form-item>
        <el-form-item label="模型设置">
          <el-tag
            v-for="(model, idx) in currentProvider.models"
            :key="idx"
            closable
            @close="removeModel(selectedProviderIndex, idx)"
          >
            {{ model }}
          </el-tag>
          <br />
          <el-input
            v-model="newModel"
            placeholder="输入并按下回车添加模型"
            @keyup.enter="addModel(selectedProviderIndex)"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-dialog v-model="deleteDialogVisible" title="提示" width="500">
      <span>您确定要删除吗？（此操作不可恢复）</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="removeProvider()"> 确认 </el-button>
          <el-button @click="deleteDialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="newProviderDialogFormVisible" title="添加供应商" width="500">
      <el-form :model="newProvider" label-width="120px">
        <el-form-item label="供应商名称" label-width="120px">
          <el-input v-model="newProvider.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="addProvider()"> 添加 </el-button>
          <el-button @click="newProviderDialogFormVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  <div v-else>
    <p>加载中...</p>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '../../stores/settingsStore'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const settingsStore = useSettingsStore()
const providerSettings = computed(() => settingsStore.settings?.providerSettings)

const selectedProviderIndex = ref<number | null>(null)
const newModel = ref('')
const deleteDialogVisible = ref(false)

const currentProvider = computed(() => {
  return selectedProviderIndex.value !== null
    ? providerSettings.value.providers[selectedProviderIndex.value]
    : null
})

const addProvider = (): void => {
  if (newProvider.value.name.trim() === '') {
    ElMessage.error('供应商名称不能为空')
    return
  }
  if (
    providerSettings.value.providers.some((provider) => provider.name === newProvider.value.name)
  ) {
    ElMessage.error('供应商名称已存在')
    return
  }

  providerSettings.value.providers.push({
    name: newProvider.value.name,
    baseUrl: '',
    apiKey: '',
    models: []
  })
  selectedProviderIndex.value = providerSettings.value.providers.length - 1
  newProvider.value.name = ''
  newProviderDialogFormVisible.value = false
  ElMessage.success('添加成功')

}

const newProviderDialogFormVisible = ref(false)
const newProvider = ref({
  name: ''
})

const removeProvider = (): void => {
  if (selectedProviderIndex.value !== null) {
    providerSettings.value.providers.splice(selectedProviderIndex.value, 1)
    selectedProviderIndex.value = null
    deleteDialogVisible.value = false
    ElMessage.success('删除成功')
  }
}

const addModel = (index: number): void => {
  if (newModel.value.trim()) {
    providerSettings.value.providers[index].models.push(newModel.value.trim())
    newModel.value = ''
  }
}

const removeModel = (supplyIndex: number, modelIndex: number): void => {
  providerSettings.value.providers[supplyIndex].models.splice(modelIndex, 1)
}
</script>
