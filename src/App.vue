<template>
  <div class="container">

    <global-header :user="currentUser"></global-header>
    <hr class="style-two"/>

    <login-view></login-view>
    <hr class="style-two"/>

    <column-list :list="list"></column-list>
    <hr class="style-two"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store/index'
// bootstrap:npm install bootstrap@next --save
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/DropDown/index.vue'
import LoginView from './components/InputForm/index.vue'
import ColumnList from './components/ColumnList/index.vue'

const currentUser: UserProps = {
  isLogin: true
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    LoginView,
    ColumnList
  },
  setup () {
    // columnListStore
    const storeObj = useStore<GlobalDataProps>()
    onMounted(() => {
      storeObj.dispatch('fetchColumns')
    })
    // Vuex状态数据是响应式的 通过计算属性返回某个状态
    const list = computed(() => storeObj.state.columns)

    return {
      list,
      currentUser
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
