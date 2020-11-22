<template>
  <form class="validate-form-container">

    <!-- validate-input插槽 -->
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <!-- submit插槽 -->
      <slot name="submit"><button type="submit" class="btn btn-primary">提交</button></slot>
    </div>

  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

// 父子组件通讯方式(mitt监听器)
// mitt:npm install --save mitt
import mitt from 'mitt'
export const emitter = mitt()
type ValidateFunc = () => boolean

export default defineComponent({
  // 使用数组定义事件(obj-针对需要验证的事件)
  emits: ['form-submit'],

  setup (props, context) {
    // 收集validateInput方法
    let funcArr: ValidateFunc[] = []
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }

    // 在父组件里面创建一个事件监听
    // 监听emitter.emit('form-item-created', validateInput)
    // 子组件每一次创建就会把validateInput方法给发送一次给父组件
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })

    const submitForm = () => {
      // 依次执行每个validateInput验证函数
      const result = funcArr.map(func => func()).every(result => result)

      // 创建函数触发form-submit事件
      // 停止默认行为@click.prevent="submitForm"
      context.emit('form-submit', result)
    }

    return {
      submitForm
    }
  }
})
</script>
