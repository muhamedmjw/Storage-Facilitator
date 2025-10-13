import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Comment out the ESLint plugin for now
    // eslintPlugin({
    //   cache: false,
    //   include: ['src/**/*.vue', 'src/**/*.ts']
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})