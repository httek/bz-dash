<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useAuthStore } from './stores/auth';
import Main from './layouts/Main.vue'
import Auth from './layouts/Auth.vue'
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const isLogin = computed(() => !!authStore.token)

watch(isLogin, (isLogin) => router.push(isLogin ? '/' : '/auth/login?redirect=' + route.path))
onMounted(() => document.title = import.meta.env.VITE_APP_NAME || 'HTek technology')
</script>

<template>
  <Main v-if="isLogin" />
  <Auth v-else />
</template>