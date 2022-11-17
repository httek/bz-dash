<template>
  <template v-for="item of items" :key="item.path">
    <template v-if="!item.child || !item.child.length">
      <t-menu-item v-if="item.type == 0" :name="item.path" :value="item.path">
        <template v-if="item.icon" #icon>
          <t-icon :name="item.icon" />
        </template>
        {{ item.title }}
      </t-menu-item>
      <t-menu-item v-else :name="item.path" :value="item.path" :to="item.path">
        <template v-if="item.icon" #icon>
          <t-icon :name="item.icon" />
        </template>
        {{ item.title }}
      </t-menu-item>
    </template>
    <t-submenu v-else :name="item.path" :value="item.path" :title="item.title">
      <template v-if="item.icon" #icon>
        <t-icon :name="item.icon" />
      </template>
      <Menu v-if="item.child" :data="item.child" />
    </t-submenu>
  </template>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { Menu as MenuModel } from '../../models/menu.model';

const props = defineProps({
  data: {
    type: Array as PropType<MenuModel[]>,
    default: () => [],
  },
});

const items = computed<MenuModel[]>(() => {
  return props.data
})
</script>