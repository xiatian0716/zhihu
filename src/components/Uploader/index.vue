<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">

      <slot name="loading" v-if="fileStatus === 'loading'">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>

      <!-- 父组件dataProps.uploadedData -->
      <!-- 目的：使父组件能够通过 uploaded 拿到 :uploadedData 属性-->
      <slot name="uploaded" v-else-if="fileStatus === 'success'" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>

      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>

    </div>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange">
  </div>
</template>
<script lang="ts">

import { defineComponent, ref, PropType, watch } from 'vue'
import axios from 'axios'

// 上传过程：根据不同的上传阶段展示不同的元素
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean; // 用户自己来写的

export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    uploaded: {
      type: Object
    }
  },

  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],

  setup (props, context) {
    // 点击上传的triggerUpload方法
    // fileInput.value.click()呼出上传窗口
    const fileInput = ref<null | HTMLInputElement>(null) // 到input的DOM节点
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    console.log(props.uploaded)

    // 创建一个响应式对象来显示当前上传的状态
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    // 创建 uploadedData 存储数据
    const uploadedData = ref(props.uploaded)

    const handleFileChange = (e: Event) => {
      // 首先我们要拿到里面的文件
      // e.target as HTMLInputElement是为了currentTarget拿到files属性
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) { // 已经选择了文件了
        const files = Array.from(currentTarget.files) // 转换成Array

        // 上传前对文件进行检查
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]) // 用户自定义
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading' // 设置状态为：loading

        // 创建FormData->在里面添加数据
        const formData = new FormData()
        formData.append('file', files[0]) // k-v

        // axios发请求上传文件
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(resp => {
          fileStatus.value = 'success' // 设置状态
          // console.log(resp)
          uploadedData.value = resp.data.avatar
          // console.log(uploadedData.value)
          // 为Uploader组件提供了一系列生命周期相关的事件
          // 触发一个成功的事件file-uploaded把 resp.data 传过去
          // 现在用户可以使用特定的事件名称对流程进行监控
          context.emit('file-uploaded', resp.data.avatar)
        }).catch((error) => {
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', { error })
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = '' // 上传完毕后后fileInput复原
          }
        })
      }
    }
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      uploadedData,
      handleFileChange
    }
  }
})
</script>
