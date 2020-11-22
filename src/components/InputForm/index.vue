<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">InputForm组件</h5>

    <!-- validate-form -->
    <validate-form @form-submit="onFormSubmit">

      <!-- validate-input -->
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <!-- ref="inputRefID"可以拿到子组件引用(inputRefID.value.validateInput()) -->
        <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text" />
        <!-- <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text" ref="inputRefID" /> -->
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal" />
      </div>

      <!-- #submit具名插槽 -->
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>

    </validate-form>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from './ValidateInput.vue'
import ValidateForm from './ValidateForm.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    ValidateInput,
    ValidateForm
  },

  setup () {
    // 目标：1.可以添加验证规则；2.可以实现双向绑定
    // 创建emailRules-passwordRules
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]

    const emailVal = ref('')
    const passwordVal = ref('')

    // 监听submitForm
    // form-submit事件的结果
    // @form-submit="onFormSubmit"
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        console.log(payload)
      }
    }

    //
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>
