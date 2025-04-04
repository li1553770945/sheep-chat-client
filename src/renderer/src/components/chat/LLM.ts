import { OpenAI } from 'openai'
import { useSelectModelStore } from '@renderer/stores/selectModelStore'
const selectModelStore = useSelectModelStore()
const selectedModel = selectModelStore.selectedModel

export class LLMService {
  private client: OpenAI
  constructor() {
    this.client = new OpenAI({
      baseURL: selectedModel.baseUrl,
      apiKey: selectedModel.apiKey,
      dangerouslyAllowBrowser: true
    })
  }

  async sendMessageWithStream(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    onReasoningContent: (data: string) => void,
    onContent: (data: string) => void,
    onError?: (error: any) => void
  ): Promise<void> {
    try {
      const response = await this.client.chat.completions.create({
        model: selectedModel.modelName, // 替换为实际模型名称
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
