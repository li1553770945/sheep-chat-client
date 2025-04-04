<template>
  <el-container class="chat-container">
    <el-aside width="25%" class="chat-list">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="聊天列表" name="chat-list">
          <ChatList />
        </el-tab-pane>
        <el-tab-pane label="模型设置" name="model-setting">
          <ModelSetting />
        </el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-main class="chat-main">
      <ChatWindow />
      <ChatInput />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatList from '../components/chat/ChatList.vue'
import ChatWindow from '../components/chat/ChatWindow.vue'
import ChatInput from '../components/chat/ChatInput.vue'
import ModelSetting from '../components/chat/ModelSetting.vue'

const activeTab = ref('chat-list')
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
