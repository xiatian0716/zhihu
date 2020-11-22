<template>

  <div class="validate-input-container pb-3">
    <input v-if="tag !== 'textarea'" class="form-control" :class="{'is-invalid': inputRef.error}" @blur="validateInput" v-model="inputRef.val" v-bind="$attrs">
    <textarea v-else class="form-control" :class="{'is-invalid': inputRef.error}" @blur="validateInput" v-model="inputRef.val" v-bind="$attrs"></textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, computed } from 'vue'
import { emitter } from './ValidateForm.vue'

// emailReg email验证逻辑
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// 抽象RuleProp通用组件
interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[]

export type TagType = 'input' | 'textarea'

export default defineComponent({
  // 定义props模型
  props: {
    rules: Array as PropType<RulesProp>,
    // 自定义组件支持双向绑定(v-mode)属性
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  // placeholder属性设置
  // 1.关闭属性(class-style)继承
  // 2.设置属性添加到input上面去$attrs"
  inheritAttrs: false,

  setup (props, context) {
    // 2.设置属性添加到input上面去$attrs"
    // console.log(context.attrs)

    // 定义 reactive 监听所有数据
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          // 自定义组件支持双向绑定(v-mode)方法
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })

    // 验证流程
    // @blur 是当元素失去焦点时所触发的事件
    const validateInput = () => {
      // 判断rules存不存在
      if (props.rules) {
        // 数组every方法->bool(所有都通过->true)
        const allPassed = props.rules.every(rule => {
          let passed = true

          // 设置rule消息
          inputRef.message = rule.message

          // 数据验证
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })

        // 显示错误信息
        inputRef.error = !allPassed

        // 为父组件ref="inputRefID"服务
        return allPassed
      }
      // 为父组件ref="inputRefID"服务
      // 没有规则直接返回验证通过
      return true
    }

    // 直接访问到父组件的实例
    // 在创建时候向父组件发送'form-item-created'事件，传递validateInput()方法
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    // 返回出去
    return {
      inputRef,
      validateInput
    }
  }
})
</script>
