<template>
  <div class="mb-3 px-1">
    <t-breadcrumb :max-item-width="'150'">
      <t-breadcrumbItem>权限管理</t-breadcrumbItem>
      <t-breadcrumbItem :max-width="'160'"> 角色管理 </t-breadcrumbItem>
    </t-breadcrumb>
  </div>
  <div class="header bg-white py-4 rounded">
    <t-form :data="form" :label-width="80" colon :style="{ marginBottom: '8px' }" @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[16, 24]">
            <t-col :span="4">
              <t-form-item label="名称" name="name">
                <t-input v-model="form.name" class="form-item-content" type="search" placeholder="请输入角色名称"
                  :style="{ minWidth: '134px' }" />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="状态" name="type">
                <t-select v-model="form.status" style="display: inline-block" class="form-item-content"
                  :options="RoleStatusOptions" placeholder="请选择角色状态" />
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
  </div>

  <t-table table-layout="fixed" :pagination="pagination" cell-empty-content="-" :columns="COLUMNS" :data="data"
    row-key="index" class="px-3 rounded mt-2 pb-4">
    <template #status="{ row }">
      <t-tag v-if="row.status === 0" theme="danger" variant="light"> 禁用 </t-tag>
      <t-tag v-if="row.status === 1" theme="success" variant="light"> 正常 </t-tag>
    </template>
    <template #op-column>
      <p>操作</p>
    </template>
    <template #op="slotProps">
      <t-link hover="color" theme="primary" @click="onEdit(slotProps)" class="mx-1"> 编辑 </t-link>
      <t-popconfirm theme="danger" content="确认删除吗" @onConfirm="onDelete(slotProps)">
        <t-link hover="color" theme="danger" class="mx-1"> 删除 </t-link>
      </t-popconfirm>

    </template>
  </t-table>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { fetchRoles, RoleQuery } from '../../apis/role';
import { RoleStatusOptions } from './role'

const data = ref([])
const COLUMNS = [
  {
    title: 'ID',
    fixed: 'left',
    width: 100,
    ellipsis: true,
    align: 'left',
    colKey: 'id',
  },
  {
    title: '名称',
    fixed: 'left',
    width: 200,
    ellipsis: true,
    align: 'left',
    colKey: 'name',
  },
  { title: '状态', colKey: 'status', width: 200, cell: { col: 'status' } },
  {
    colKey: 'op',
    width: 150,
    title: 'op-column',
    fixed: 'right',
    cell: 'op',
  },
]

const pagination = reactive({
  current: 1,
  pageSize: 10,
  // defaultCurrent: 1,
  // defaultPageSize: 10,
  total: 0,
  showJumper: false,
  onChange: (pageInfo: any) => {
    pagination.pageSize = pageInfo.pageSize
    pagination.current = pageInfo.current
    fetchData()
  },
});

const form = reactive({ name: '', status: 1 })
const onSubmit = () => fetchData()
const onReset = () => {
  form.status = 1
  form.name = ''
}

const onDelete = (props: any) => {
  console.log(props);
}

const onEdit = (props: any) => {
  console.log(props);

}
const fetchData = async () => {
  const params: RoleQuery = {
    ...form, size: pagination.pageSize, page: pagination.current
  }
  const res = await fetchRoles(params)
  data.value = res.data.data
  pagination.total = res.data.total
  pagination.current = res.data.current
  pagination.pageSize = res.data.size
}

onMounted(() => fetchData())
</script>