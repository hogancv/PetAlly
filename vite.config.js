import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// TDesign按需引入
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { TDesignResolver } from 'unplugin-vue-components/resolvers';

import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import imagemin from 'unplugin-imagemin/vite';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
import externalGlobals from 'rollup-plugin-external-globals'
import cdnModules from './cdn-config' // 引入 CDN 配置

export default defineConfig({
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: [TDesignResolver({ library: 'mobile-vue' })],
    // }),
    // Components({
    //   resolvers: [TDesignResolver({ library: 'mobile-vue' })],
    // }),
    importToCDN({
      modules:cdnModules,
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "index_visualizer.html",
    }),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240,
      deleteOriginFile: false,
      compressionOptions: { level: 9 },
      verbose: true,
      disable: false,
    }),
    // imagemin({
    //   mode: 'squoosh',
    //   beforeBundle: true,
    //   compress: {
    //     jpg: {
    //       quality: 10,
    //     },
    //     jpeg: {
    //       quality: 10,
    //     },
    //     png: {
    //       quality: 10,
    //     },
    //     webp: {
    //       quality: 10,
    //     },
    //   },
    //   conversion: [
    //     { from: 'jpeg', to: 'webp' },
    //     { from: 'png', to: 'webp' },
    //     { from: 'JPG', to: 'jpeg' },
    //   ],
    // })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001/api/demo',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/identify': {
        target: 'https://aip.baidubce.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/identify/, '')
      }
    }
  },
  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      external: ['vue','pinia','tdesign-mobile-vue','axios','vue-router','gsap'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          pinia: 'Pinia',
          axios: 'axios',
          'vue-router': 'VueRouter',
          gsap: 'gsap',
          'tdesign-mobile-vue': 'TDesign',
        }),
      ],
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().match(/\/node_modules\/(?!.npm)(?<moduleName>[^\/]*)\//).groups.moduleName ?? 'vender';
          }
        },
      }
    }
  }
})