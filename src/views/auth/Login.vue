<template>
  <div v-if="!authStore.token" :style="{ width: '320px' }" class="px-8">
    <h1 class="text-xl mb-5">登录</h1>
    <t-form class="mb-20" :data="formModel" :rules="rules" :colon="true" :label-width="0" @submit="onSubmit">
      <t-form-item name="mobile">
        <t-input autofocus v-model="formModel.mobile" clearable placeholder="手机号码: 138xxxx8888">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input v-model="formModel.password" type="password" clearable placeholder="8~16位, 包含大小写字母、数字、特殊字符">
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button :loading="loading" theme="primary" type="submit" block>登 录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MessagePlugin as message } from 'tdesign-vue-next'
import { login } from '../../apis/auth'
import { useAuthStore } from '../../stores/auth';
import { Admin } from '../../models/admin.model';

const authStore = useAuthStore()
const loading = ref<boolean>(false)
const formModel = reactive({
  mobile: '18101333901', password: '123456'
})
const rules = {
  mobile: [
    { required: true, message: "请输入手机号" },
    { len: 11, message: "请输入正确的手机号码" },
  ],
  password: [
    { required: true, message: "请输入账号密码" },
    { min: 6, message: "密码至少6位" },
    // { pattern: /[A-Z]+/, message: "密码必须包含大写字母" },
  ],
}


const onSubmit = async ({ validateResult, firstError }: any) => {
  loading.value = true
  if (validateResult === true) {
    const response = await login(formModel)
    if (response.code != 2000) {
      loading.value = false
      return message.error(response.msg)
    }

    message.success('登录成功');
    const { token, profile } = (response.data as { token: string, profile: Admin })
    setTimeout(() => {
      authStore.setToken(token, profile)
      loading.value = false
    }, 800)
  } else {
    console.log('Validate Errors: ', firstError, validateResult)
    message.warning(firstError)
    loading.value = false
  }
};
</script>