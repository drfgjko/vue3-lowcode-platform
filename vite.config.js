import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

const srcPath = path.resolve(__dirname, 'src')
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: path.resolve(__dirname, 'src/mock'), //不能使用别名
      localEnable: true,
    }),
  ],
  css: {
    preprocessorOptions: {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json', '.vue'],
  },
})
