import { defineStore } from 'pinia'
import { watch, reactive } from 'vue'
import type { Settings } from '../../../common/types/settings'

export const useSettingsStore = defineStore('settings', () => {
  const settings = reactive<Settings>({
    providerSettings: { providers: [] },
    generalSettings: {
      language: '',
      userDataPath: ''
    },
    syncSettings: {
      syncEnabled: false,
      syncInterval: 5,
      syncLastTime: 0,
      syncLastSuccess: 0
    }
  })
  let isSettingsLoaded = false
  let firstLoad = true

  const loadSettings = async (): Promise<void> => {
    if (isSettingsLoaded) {
      return
    }
    isSettingsLoaded = true
    Object.assign(settings, await window.electron.ipcRenderer.invoke('get-settings'))
  }

  const saveSettings = async (): Promise<void> => {
    if (Object.keys(settings).length > 0) {
      const clonedSettings = JSON.parse(JSON.stringify(settings)) // 深拷贝对象
      await window.electron.ipcRenderer.invoke('save-settings', clonedSettings)
      console.log('设置已保存')
    }
  }

  watch(
    settings,
    async () => {
      if (firstLoad) {
        firstLoad = false
        return
      }
      await saveSettings()
    },
    { deep: true }
  )

  return {
    settings,
    loadSettings
  }
})
