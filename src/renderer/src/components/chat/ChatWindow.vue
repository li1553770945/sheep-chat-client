<template>
  <div class="chat-window">
    <el-card v-for="message in messages" :key="message.id" class="message">
      <strong>{{ message.sender }}:</strong> {{ message.text }}
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElCard } from 'element-plus'

const messages = ref([
  { id: 1, sender: 'User', text: 'Hello!' },
  { id: 2, sender: 'AI', text: 'Hi there!' }
])
</script>

<style scoped>
.chat-window {
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}
</style>
