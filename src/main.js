import '@/mock/index' // 必须在 main.js 顶部引入

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import pinia from '@/stores/index'
import 'element-plus/dist/index.css'
import '@/styles/theme.scss'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
