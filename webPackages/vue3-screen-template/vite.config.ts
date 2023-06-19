import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import banner from 'vite-plugin-banner'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { envDir, sourceDir, manualChunks } from './scripts/build'
import pkg from './package.json'

// 集成mock服务
import { viteMockServe } from 'vite-plugin-mock'

const resolve = (dir: string): string => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir)

  return {
    envDir, // 管理环境变量的配置文件存放目录
    base: env.VITE_DEPLOY_BASE_URL,
    server: {
      port: 3079,
      proxy: {
        '/baseApi': {
          target: env.VITE_APP_BASE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/baseApi/, ''),
        },
      },
    },

    build: {
      rollupOptions: {
        output: {
          /**
           * 如果要加密打包后的文件名，可以启用该项目
           *
           * @example
           *  1. 先安装 md5 依赖 `npm i -D @withtypes/md5`
           *  2. 导入本文件 `import md5 from '@withtypes/md5'`
           *  3. 将函数里的 `${name}` 修改为 `${md5(name)}`
           */
          // chunkFileNames: ({ name }) => {
          //   return `assets/${name}-[hash].js`
          // },
          // entryFileNames: ({ name }) => {
          //   return `assets/${name}-[hash].js`
          // },
          // assetFileNames: ({ name }) => {
          //   return `assets/${name}-[hash].[ext]`
          // },

          /**
           * 打包优化，避免全部打包到一个很大的 Chunk 里
           * @description 根据包名生成不同的 Chunk 文件，方便按需加载
           */
          manualChunks,
        },
      },
    },

    resolve: {
      /**
       * 配置目录别名
       * @example
       *  想从 `src/libs/foo` 文件里导入功能：
       *  配置 alias 前： `import foo from '../../../libs/foo'`
       *  配置 alias 后： `import foo from '@/libs/foo'`
       */
      alias: {
        '@': sourceDir,
      },
    },

    css: {
      /**
       * 包括 `vw` / `rem` 单位转换等
       * @see https://cn.vitejs.dev/config/shared-options.html#css-postcss
       *
       * @example
       *  以使用 `vw` 作为移动端适配为例：
       *  1. 先安装 postcss 依赖 `npm i -D postcss-px-to-viewport`
       *  2. 导入本文件 `import px2vw from 'postcss-px-to-viewport'`
       *  3. 取消下面函数的注释即可生效
       */
      // postcss: {
      //   plugins: [
      //     // 使用 postcss-pxtorem
      //     // px2rem({
      //     //   propList: ['*'],
      //     // }),
      //     // 使用 postcss-px-to-viewport
      //     // px2vw({
      //     //   viewportWidth: 375,
      //     //   minPixelValue: 1,
      //     // }),
      //   ],
      // },
    },

    plugins: [
      /**
       * 支持 `.vue` 文件的解析
       */
      vue(),
      VueSetupExtend(), // * name 可以写在 script 标签上
      // 本地和后端调试注释下面配置、或更改配置
      viteMockServe({
        mockPath: './mock/source/', // 解析，路径可根据实际变动
        localEnabled: true, // 此处可以手动设置为true，也可以根据官方文档格式 开发环境
        prodEnabled: true, // 生产环境设为true，也可以根据官方文档格式
        injectCode: ` import { mockXHR } from './mock';
        mockXHR(); `,
        logger: true, //是否在控制台显示请求日志
        watchFiles: false, // 监听文件内容变更
        injectFile: resolve(__dirname, 'src/main.ts'), // 在main.ts注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      /**
       * 自动导入组件，不用每次都 import
       * @see https://github.com/antfu/unplugin-vue-components#configuration
       */
      components({
        dirs: [resolve('src/components')],
        extensions: ['vue', 'ts'],
        deep: true,
        dts: false,
        resolvers: [ElementPlusResolver()],
      }),

      /**
       * 如果需要支持 `.tsx` 组件，请安装 `@vitejs/plugin-vue-jsx` 这个包
       * 并在这里添加一个插件导入 `import vueJsx from '@vitejs/plugin-vue-jsx'`
       */
      // vueJsx(),

      /**
       * 自动导入组件，不用每次都 import
       * @see https://github.com/antfu/unplugin-vue-components#configuration
       */
      components({
        dirs: ['src/components'],
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        globalNamespaces: [],
        extensions: ['vue', 'ts', 'tsx'],
        deep: true,
        dts: 'src/types/declaration-files/components.d.ts',
      }),
      banner(
        [
          `/**`,
          ` * name: ${pkg.name}`,
          ` * version: v${pkg.version}`,
          ` * description: ${pkg.description}`,
          ` * author: ${pkg.author}`,
          ` */`,
        ].join('\n')
      ),

      /**
       * 为入口文件增加 EJS 模版能力 | 注入变量到html文件
       * @see https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
       */
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            appTitle: env.VITE_APP_TITLE,
            appDesc: env.VITE_APP_DESC,
            appKeywords: env.VITE_APP_KEYWORDS,
          },
        },
      }),
    ],
  }
})
