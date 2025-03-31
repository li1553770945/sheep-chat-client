<template>
  <div class="sidebar">
    <!-- 头像区域 -->
    <div class="avatar-container">
      <input ref="avatarInput" type="file" accept="image/*" hidden @change="handleAvatarChange" />
      <img :src="avatarUrl" class="avatar" @click="(avatarInput as HTMLInputElement).click()" />
    </div>

    <!-- 菜单区域 -->
    <div class="menu">
      <div
        class="menu-item"
        :class="{ active: activeMenu === 'chat' }"
        @click="navigateTo('/chat')"
      >
        聊天
      </div>
      <div
        class="menu-item"
        :class="{ active: activeMenu === 'assistant' }"
        @click="navigateTo('/assistant')"
      >
        助手
      </div>
    </div>

    <!-- 设置按钮 -->
    <div class="settings" @click="navigateTo('/settings')">设置</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const avatarUrl = ref('/default-avatar.png')
const activeMenu = ref('chat')

const handleAvatarChange = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input.files?.[0]) {
    const file = input.files[0]
    avatarUrl.value = URL.createObjectURL(file)
  }
}

const navigateTo = (path: string): void => {
  router.push(path)
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.avatar-container {
  margin-bottom: 40px;
  cursor: pointer;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
}

.menu {
  flex: 1;
  width: 100%;
}

.menu-item {
  padding: 12px 24px;
  color: #ecf0f1;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:hover {
  background: #34495e;
}

.menu-item.active {
  background: #3498db;
}

.settings {
  color: #bdc3c7;
  cursor: pointer;
  padding: 12px;
  transition: color 0.3s;
}

.settings:hover {
  color: #ecf0f1;
}
</style>
