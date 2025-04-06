export interface Provider {
  name: string
  baseUrl: string
  apiKey: string
  models: string[]
}

export interface ProviderSettings {
  providers: Provider[]
}

export interface GeneralSettings {
  language: string
  userDataPath: string
}

export interface SyncSettings {
  syncEnabled: boolean
  syncInterval: number
  syncLastTime: number
  syncLastSuccess: number
}

export interface Settings {
  generalSettings: GeneralSettings
  providerSettings: ProviderSettings
  syncSettings: SyncSettings
}

export const defaultSettings: Settings = {
  generalSettings: {
    language: 'zh-CN',
    userDataPath: '' // 用户数据路径，默认值为空字符串
  },
  providerSettings: {
    providers: [
      {
        name: 'OpenAI',
        baseUrl: 'https://api.openai.com/v1/chat/completions',
        apiKey: '',
        models: ['gpt-3.5-turbo', 'gpt-4']
      }
    ]
  },
  syncSettings: {
    syncEnabled: false,
    syncInterval: 0,
    syncLastTime: 0,
    syncLastSuccess: 0
  }
}