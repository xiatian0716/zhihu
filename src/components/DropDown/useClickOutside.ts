import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  // 声明
  const isClickOutside = ref(false)

  // 判断是否点击节点外面
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }

  // before-data-changes时监听
  onMounted(() => {
    document.addEventListener('click', handler)
  })

  // after-data-changes时移除
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutside
}

export default useClickOutside
