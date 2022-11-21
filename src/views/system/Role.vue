<template>
  <t-card header-bordered title="权限管理" subtitle="角色管理" :loading="loading"
    class="overflow-y-scroll border-none rounded-none">
    <template #actions>
      <t-button theme="primary" @click="onAdd()">
        <t-icon name="add" /> 新增
      </t-button>
    </template>
    <t-form :data="searchForm" :label-width="80" class="my-2" @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row>
            <t-col :span="4">
              <t-form-item label="名称" name="name">
                <t-input v-model="searchForm.name" type="search" placeholder="按名称搜索" :style="{ minWidth: '134px' }" />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="状态" name="type">
                <t-select v-model="searchForm.status" class="w-full" :options="RoleStatusOptions"
                  placeholder="请选择角色状态" />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>
        <t-col :span="2">
          <t-button theme="primary" type="submit" class="ml-2"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default" class="ml-2"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>
    <t-table ellipsis table-layout="fixed" :pagination="pagination" cell-empty-content="-" :columns="COLUMNS"
      :data="data" row-key="index" class="px-3 rounded mt-4">
      <template #name="{ row }">
        <t-link hover="color" @click="onEdit(row)" class="underline"> {{ row.name }} </t-link>
      </template>
      <template #status="{ row }">
        <t-tag v-if="row.status === 0" theme="danger" variant="light"> 禁用 </t-tag>
        <t-tag v-if="row.status === 1" theme="success" variant="light"> 正常 </t-tag>
      </template>
      <template #op-column>
        <p>操作</p>
      </template>
      <template #op="slotProps">
        <t-link hover="color" theme="primary" @click="onEdit(slotProps)" class="mx-1"> 权限 </t-link>
        <t-popconfirm theme="danger" content="确认删除吗" @confirm="onDelete(slotProps)">
          <t-link hover="color" theme="danger" class="mx-1"> 删除 </t-link>
        </t-popconfirm>
      </template>
    </t-table>
  </t-card>
  <t-drawer size="medium" destroyOnClose v-model:visible="showDrawer" :header="drawerHeader" show-in-attached-element
    width="500px">
    <t-form :data="form" :colon="true" @reset="onReset" @submit="onSubmit">
      <t-form-item label="名称" name="name">
        <t-input v-model="form.name" placeholder="名称"></t-input>
      </t-form-item>
      <t-form-item label="备注" name="remarks">
        <t-input v-model="form.remarks" placeholder="备注"></t-input>
      </t-form-item>
      <t-form-item label="状态" name="type">
        <t-select v-model="form.status" class="w-full" :options="RoleStatusOptions" placeholder="请选择状态" />
      </t-form-item>
      <t-form-item label="权限集" name="permissions">
        <t-tree v-model="permissionsChecked" :icon="false" line expand-all :data="permissions" checkable />
      </t-form-item>
    </t-form>
  </t-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { fetchRoles, RoleQuery } from '../../apis/role';
import { RoleStatusOptions, COLUMNS } from './role'
import { MessagePlugin as message } from 'tdesign-vue-next';
import { fetchPermissionsTree } from '../../apis/auth';
import { Menu } from '../../models/menu.model';

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showJumper: false,
  onChange: (pageInfo: any) => {
    pagination.pageSize = pageInfo.pageSize
    pagination.current = pageInfo.current
    fetchData()
  },
});

const data = ref([])
const permissions = ref([])
const permissionsChecked = ref([1, 13])
const showDrawer = ref(false)
const drawerHeader = ref('添加角色')
const loading = ref(false)
const searchForm = reactive({ name: '', status: 1 })
const onSubmit = () => fetchData()
const onReset = () => {
  searchForm.status = 1
  searchForm.name = ''
  pagination.pageSize = 10
  pagination.current = 1
  fetchData()
}


const form = reactive({
  name: '', status: 1, remarks: '', permissions: []
})


const onDelete = (props: any) => {
  console.log(props);
  message.success('操作成功')
}

const onAdd = async () => {
  Object.assign(form, { name: '', status: 1, remarks: '' })
  drawerHeader.value = '添加角色'
  showDrawer.value = true
  fetchPermissionsTrees()
}

const onEdit = async (props: any) => {
  drawerHeader.value = '编辑角色'
  fetchPermissionsTrees()
  showDrawer.value = true
  Object.assign(form, props)
}

const fetchPermissionsTrees = async () => {
  const pRes = await fetchPermissionsTree()
  const format = (items: Menu[]) => {
    return (items).map((ds: any) => {
      ds.label = ds.title
      ds.value = ds.id

      if (ds.children) {
        format(ds.children as Menu[])
      }

      return ds;
    })
  }

  permissions.value = format(pRes.data as Menu[]) as []
}
const fetchData = async () => {
  loading.value = true
  const params: RoleQuery = { ...form, size: pagination.pageSize, page: pagination.current }
  const res = await fetchRoles(params)
  data.value = res.data.data
  pagination.total = res.data.total
  pagination.current = res.data.current
  pagination.pageSize = res.data.size

  loading.value = false
}

onMounted(() => fetchData())
</script>