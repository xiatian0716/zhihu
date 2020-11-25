<template>
  <div class="container">

    <global-header :user="currentUser"></global-header>
    <hr class="style-two"/>

    <button type="submit" @click="onCreateMessage" class="btn btn-primary btn-block btn-large">Message组件</button>
    <hr class="style-two"/>

    <login-view></login-view>
    <hr class="style-two"/>

    <column-list :list="list"></column-list>
    <hr class="style-two"/>

    <uploader action="/api/upload" :beforeUpload="beforeUpload" @file-uploaded="onFileUploaded" :uploaded={}
    class="d-flex flex-column justify-content-center align-items-center bg-light text-secondary w-100 my-4">
      <template #uploaded="dataProps">
        <!-- 父组件：上传完成后一般会展示上传完成后自定义的数据(父组件中直接拿到子组件的数据) -->
        <div><img :src="dataProps.uploadedData" class="img-responsive center-block"></div>
        <div class="uploaded-area"><h3>Uploader组件</h3></div>
      </template>
    </uploader>
    <hr class="style-two"/>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store/index'
// bootstrap:npm install bootstrap@next --save
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/DropDown/index.vue'
import LoginView from './components/InputForm/index.vue'
import ColumnList from './components/ColumnList/index.vue'
import createMessage from './components/Message/index'
import Uploader from './components/Uploader/index.vue'

const currentUser: UserProps = {
  isLogin: true
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    LoginView,
    ColumnList,
    Uploader
  },
  setup () {
    // columnListStore
    const storeObj = useStore<GlobalDataProps>()
    onMounted(() => {
      storeObj.dispatch('fetchColumns')
    })
    // Vuex状态数据是响应式的 通过计算属性返回某个状态
    const list = computed(() => storeObj.state.columns)

    // Message组件相关
    const onCreateMessage = () => {
      createMessage('Message组件测试', 'success')
    }

    // Upload组件相关
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('上传图片只能是 JPG 格式！', 'error')
      }
      return isJPG
    }
    interface ImageProps {
      _id?: string;
      url?: string;
      createdAt?: string;
      fitUrl?: string;
    }
    interface ResponseType<P = {}> {
      code: number;
      msg: string;
      data: P;
    }
    // @file-uploaded(子组件直接向父组件发送数据)
    const onFileUploaded = (rawData: string) => {
      createMessage('上传图片成功', 'success')
      console.log(rawData)
    }
    const uploadedData = ref()

    return {
      list,
      currentUser,
      onCreateMessage,
      beforeUpload,
      onFileUploaded,
      uploadedData
    }
  }
})
</script>

<style>
/* 透明渐变水平线 */
hr.style-two {
  width: 80%;
  margin: 0 auto;
  padding:10px;
  border: 0;
  height: 1px;
  margin-top:10px;
  margin-bottom:10px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(248, 9, 9, 0.75),
    rgba(0, 0, 0, 0)
  );
}
</style>
