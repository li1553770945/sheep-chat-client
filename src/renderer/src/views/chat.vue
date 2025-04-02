<template>
  <el-container class="chat-container">
    <el-aside width="25%" class="chat-list">
      <ChatList />
    </el-aside>
    <el-main class="chat-main">
      <ChatWindow />
      <ChatInput />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import ChatList from '../components/chat/ChatList.vue'
import ChatWindow from '../components/chat/ChatWindow.vue'
import ChatInput from '../components/chat/ChatInput.vue'
</script>

<style scoped>
.chat-container {
  height: 100%;
}

.chat-main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
}

.chat-input {
  border-top: 1px solid #ddd;
}
</style>
