<template>
  <t-layout v-if="!authStore.token" class="h-screen">
    <t-aside :style="{ width: '260px' }" class="border-no flex justify-center flex-wrap content-center shadow-md">
      Aside
    </t-aside>
    <t-layout>
      <t-content class="flex justify-center flex-wrap content-center">
        <RouterView />
      </t-content>
      <t-footer class="flex justify-center flex-wrap content-center">
        <small class="antialiased font-light text-opacity-50">© {{ (new Date).getFullYear() }} HTek. All Rights
          Reserved.</small>
      </t-footer>
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore()
</script>