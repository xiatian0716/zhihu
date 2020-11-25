<template>
  <teleport to="#message">
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject" v-if="isVisible">
      <span>{{message}}</span>
      <button type="button" class="close" aria-label="Close" @click.prevent="hide">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useDOMCreate from './useDOMCreate'

// Message组件的类型
export type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  // Message组件的属性
  props: {
    message: String, // 信息
    type: { // 类型
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },

  // 自定义事件，向生命周期发送事件
  emits: ['close-message'],

  setup (props, context) {
    // 把节点插入到DOM当中去
    useDOMCreate('message')
    // 状态信息是否显示
    const isVisible = ref(true)
    // 根据不同的props.type来定义选择的class
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    // 创建点击关闭方法hide方法
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      classObject,
      isVisible,
      hide
    }
  }
})

</script>
