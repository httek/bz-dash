<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useAuthStore } from "./stores/auth";
import Layout from "./layouts/Layout.vue";
import MainLayout from "./layouts/Main.vue";
import AuthLayout from "./layouts/Auth.vue";
import { ref } from "vue";

const authStore = useAuthStore()
const isLogin = computed(() => !!authStore.token)

</script>

<template>
  <Layout>
    <MainLayout v-if="isLogin" />
    <AuthLayout v-else />  
  </Layout>
</template>