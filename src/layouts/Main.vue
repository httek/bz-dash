<template>
  <t-layout class="h-screen">
    <t-aside class="shadow-md w-auto">
      <t-loading showOverlay :loading="authStore.permissions.length <= 0">
        <t-menu width="220px" v-model="activeMenu" :collapsed="menuCollapsed" expandMutex>
          <template #logo>
            <img width="120" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
          </template>
          <Menu :data="authStore.menus" />
          <template #operations>
            <t-icon :name="menuCollapsed ? 'chevron-right-double' : 'chevron-left-double'"
              @click="menuCollapsed = !menuCollapsed" />
          </template>
        </t-menu>
      </t-loading>
    </t-aside>
    <t-layout>
      <t-header class="px-3">

        <t-head-menu>
          <template #operations>
            <div class="operations-container">
              <t-tooltip placement="bottom" content="代码仓库">
                <t-button theme="default" shape="square" variant="text">
                  <t-icon name="logo-github" />
                </t-button>
              </t-tooltip>
              <t-tooltip placement="bottom" content="帮助文档">
                <t-button theme="default" shape="square" variant="text">
                  <t-icon name="help-circle" />
                </t-button>
              </t-tooltip>
              <t-dropdown :min-column-width="135" trigger="click">
                <template #dropdown>
                  <t-dropdown-menu>
                    <t-dropdown-item class="my-0.5">
                      <t-icon name="user-circle" class="mr-2"></t-icon>个人中心
                    </t-dropdown-item>
                    <t-dropdown-item class="my-0.5">
                      <t-icon name="poweroff" class="mr-2"></t-icon>退出登录
                    </t-dropdown-item>
                  </t-dropdown-menu>
                </template>
                <t-button class="header-user-btn" theme="default" variant="text">
                  <template #icon>
                    <t-icon class="header-user-avatar" name="user-circle" />
                  </template>
                  <div class="header-user-account">
                    {{ authStore.admin?.name }}
                    <t-icon name="chevron-down" />
                  </div>
                </t-button>
              </t-dropdown>
            </div>
          </template>
        </t-head-menu>
      </t-header>
      <t-content class="px-3">
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
import Menu from './componets/Menu.vue';
import { ref } from '@vue/reactivity';
import { RouterView, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const route = useRoute()
const authStore = useAuthStore()
const activeMenu = ref<string>(route.path)

const menuCollapsed = ref<boolean>(false)
</script>