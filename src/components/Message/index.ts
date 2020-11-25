import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  // 创建messageInstance(对象组件，组件的属性)
  const messageInstance = createApp(Message, {
    message,
    type
  })
  // 新建一个DOM节点
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  // 将messageInstance挂载到DOM节点上，就可以显示到界面上
  messageInstance.mount(mountNode)
  // 设置一个延时卸载DOM节点
  // 卸载DOM节点后记得删除节点
  setTimeout(() => {
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
