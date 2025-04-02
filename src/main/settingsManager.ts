import fs from 'fs'
import { join } from 'path'
import { Settings, defaultSettings } from '../common/types/settings' // 从 common/types.ts 导入

// 读取配置文件
export const readSettings = (userDataPath: string): Settings => {
  const settingsFilePath = join(userDataPath, 'settings.json')
  if (!fs.existsSync(settingsFilePath)) {
    defaultSettings.generalSettings.userDataPath = userDataPath // 设置默认的用户数据路径
    saveSettings(userDataPath, defaultSettings) // 如果配置文件不存在，创建默认配置
  }
  const configData = fs.readFileSync(settingsFilePath, 'utf-8')
  return JSON.parse(configData) as Settings
}

// 保存配置文件
export const saveSettings = (userDataPath: string, config: Settings): void => {
  const settingsFilePath = join(userDataPath, 'settings.json')
  fs.writeFileSync(settingsFilePath, JSON.stringify(config, null, 2), 'utf-8')
}
