import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const useSelectModelStore = defineStore('settings', () => {
  const selectedModel = reactive({
    modelName: '',
    baseUrl: '',
    apiKey: ''
  })
  return { selectedModel }
})
