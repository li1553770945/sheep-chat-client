import { OpenAI } from 'openai'
import { useSelectModelStore } from '@renderer/stores/selectModelStore'
import { watch, computed } from 'vue'

const selectModelStore = useSelectModelStore()
const selectedModel = computed(() => selectModelStore.selectedModel)

export class LLMService {
  private client: OpenAI | null
  constructor() {
    // this.client = new OpenAI({
    //   baseURL: selectedModel?.baseUrl,
    //   apiKey: selectedModel?.apiKey,
    //   dangerouslyAllowBrowser: true
    // })
    this.client = null
    watch(selectedModel, (newSelectedModel) => {
      if (!newSelectedModel) return
      this.client = new OpenAI({
        baseURL: newSelectedModel.baseUrl,
        apiKey: newSelectedModel.apiKey,
        dangerouslyAllowBrowser: true
      })
    })
  }

  async sendMessageWithStream(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    onReasoningContent: (data: string) => void,
    onContent: (data: string) => void,
    onError?: (error: any) => void
  ): Promise<void> {
    if (!this.client) {
      console.error('LLM client is not initialized.')
      return
    }
    try {
      const response = await this.client.chat.completions.create({
        model: selectedModel.value.modelName, // 替换为实际模型名称
        messages: messages,
        stream: true
      })

      let reasoningContent = ''
      let content = ''

      for await (const chunk of response as any) {
        const delta = chunk.choices[0].delta
        if (delta.reasoning_content) {
          reasoningContent += delta.reasoning_content
          onReasoningContent(reasoningContent)
        } else if (delta.content) {
          content += delta.content
          onContent(content)
        }
      }
    } catch (error) {
      console.error('Error communicating with LLM:', error)
      if (onError) onError(error)
    }
  }
}
