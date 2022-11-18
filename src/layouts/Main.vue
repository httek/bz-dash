<template>
  <t-layout class="h-full fixed w-full">
    <t-aside class="shadow-md w-auto">
      <t-loading showOverlay :loading="authStore.permissions.length <= 0">
        <t-menu width="210px" v-model="activeMenu" :collapsed="menuCollapsed" expandMutex>
          <template #logo>
            <RouterLink to="/">
              <img width="136" class="t-menu__logo--center items-center"
                src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
            </RouterLink>
          </template>
          <Menu :data="authStore.menus" />
        </t-menu>
      </t-loading>
    </t-aside>
    <t-layout>
      <t-header class="px-3">
        <t-head-menu>
          <div class="header-operate-left">
            <t-button theme="default" shape="square" variant="text" @click="menuCollapsed = !menuCollapsed">
              <t-icon :name="menuCollapsed ? 'chevron-right-double' : 'chevron-left-double'" />
            </t-button>
          </div>
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
                    <t-dropdown-item @click="louout" class="my-0.5">
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
      <t-content class="p-2.5 h-full overflow-y-scroll">
        <RouterView />
      </t-content>
      <!-- <t-footer class="flex justify-center flex-wrap content-center">
        <small class="antialiased font-light text-opacity-50">© {{ (new Date).getFullYear() }} HTek. All Rights
          Reserved.</small>
      </t-footer> -->
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
import Menu from './componets/Menu.vue';
import { ref } from '@vue/reactivity';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const activeMenu = ref<string>(route.path)

const menuCollapsed = ref<boolean>(false)
const louout = () => {
  authStore.reset()
}
</script>