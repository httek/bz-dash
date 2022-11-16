<script setup lang="ts">
import { computed } from '@vue/reactivity';
import Main from './layouts/Main.vue';
import Auth from './layouts/Auth.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()
const component = computed(() => !!authStore.token ? Main : Auth)
</script>

<template>
  <RouterView>
    <component :is="component" />
  </RouterView>
</template>