<template>
  <div class="chat-input">
    <el-input
      v-model="input"
      type="textarea"
      placeholder="输入消息..."
      :rows="3"
      @keydown.enter.prevent="sendMessage"
    />
    <div class="options">
      <el-checkbox v-model="enableSearch">开启联网搜索</el-checkbox>
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { OpenAI } from 'openai'
import { ElInput, ElCheckbox, ElButton } from 'element-plus'
import { LLMService } from './LLM'

const input = ref('')
const enableSearch = ref(false)
const messages = ref<{ role: string; content: string; name?: string }[]>([])
const llmService = new LLMService()

const sendMessage = async (): Promise<void> => {
  if (input.value.trim()) {
    console.log('发送消息:', input.value, '联网搜索:', enableSearch.value)
    messages.value.push({ role: 'user', content: input.value })

    let reasoningContent = ''
    let content = ''

    await llmService.sendMessageWithStream(
      messages.value as unknown as OpenAI.Chat.Completions.ChatCompletionMessageParam[], // 使用双重类型断言
      (data) => {
        reasoningContent = data
        console.log('思考内容:', reasoningContent)
      },
      (data) => {
        content = data
        console.log('回复内容:', content)
      },
      (error) => {
        console.error('SSE 请求失败:', error)
      }
    )

    messages.value.push({ role: 'assistant', content })
    input.value = ''
  }
}
</script>

<style scoped>
.chat-input {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>
