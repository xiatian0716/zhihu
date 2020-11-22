import { createApp } from 'vue'

import App from './App.vue'
import store from './store/index'

// 使 Mock 生效
// mock文件放哪里都可以
// 在main.js记得import就好
import './mock'

const app = createApp(App)
app.use(store)
app.mount('#app')
