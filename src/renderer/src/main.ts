import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { useSettingsStore } from './stores/settingsStore'

const app = createApp(App)
const pinia = createPinia()

app.use(router) // 使用路由
app.use(ElementPlus)
app.use(pinia) // 使用pinia

const settingsStore = useSettingsStore()
// 在应用启动时加载设置
settingsStore.loadSettings()

app.mount('#app')
