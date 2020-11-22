<template>
<div class="dropdown" ref="dropdownRef">
  <a href="#" @click.prevent="toggleOpen" class="btn btn-outline-light my-2 dropdown-toggle">
    {{title}}
  </a>
  <ul v-if="isOpen" class="dropdown-menu" :style="{display: 'block'}">
    <slot></slot>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from './useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    // 点击{{title}}打开
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    // 判断点击节点外部
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutside = useClickOutside(dropdownRef)

    // 点击节点外部关闭
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })

    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
