<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useAuthStore } from './stores/auth';
import Main from './layouts/Main.vue'
import Auth from './layouts/Auth.vue'
import { Menu } from './models/menu.model';
import { onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchMeta } from './apis/auth';

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const isLogin = computed(() => !!authStore.token)

watch(isLogin, (isLogin) => {
  console.log('reset');

  router.push(isLogin ? '/' : '/auth/login?redirect=' + route.path)
})

</script>

<template>
  <Main v-if="isLogin" />
  <Auth v-else />
</template>