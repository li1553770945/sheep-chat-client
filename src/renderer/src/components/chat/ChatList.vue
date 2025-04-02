<template>
  <div class="chat-list">
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="selectChat">
      <el-menu-item v-for="chat in chats" :key="chat.id" :index="chat.id.toString()">
        {{ chat.title }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMenu, ElMenuItem } from 'element-plus'

const chats = ref([
  { id: 1, title: 'Chat 1' },
  { id: 2, title: 'Chat 2' }
])

const selectChat = (id: string): void => {
  console.log('Selected chat:', id)
}
</script>

<style scoped>
.chat-list {
  padding: 10px;
}
</style>
