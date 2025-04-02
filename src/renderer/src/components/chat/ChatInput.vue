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
import { ElInput, ElCheckbox, ElButton } from 'element-plus'

const input = ref('')
const enableSearch = ref(false)

const sendMessage = (): void => {
  if (input.value.trim()) {
    console.log('发送消息:', input.value, '联网搜索:', enableSearch.value)
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
