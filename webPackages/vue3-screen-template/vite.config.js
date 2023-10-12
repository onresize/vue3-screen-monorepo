import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import banner from 'vite-plugin-banner'
import { createHtmlPlugin } from 'vite-plugin-html'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import viteCompression from 'vite-plugin-compression'
import vitePluginCDN from 'vite-plugin-cdn-import'
import viteImagemin from 'vite-plugin-imagemin'
import { envDir, sourceDir, manualChunks } from './scripts/build'
import pkg from './package.json'
// SvgIcon插件
import { svgBuilder } from './src/plugins/svgBuilder'

// css原子化：https://cn.windicss.org/guide/
import WindiCSS from 'vite-plugin-windicss'

// 集成mock服务
import { viteMockServe } from 'vite-plugin-mock'

const resolve = (dir) => path.resolve(__dirname, dir)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir)

  console.log('环境:', env)
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
      minify: 'terser', // terser比esbuild（默认）慢20倍左右、可清除console、debugger
      // 清除console等多余代码
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
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
        // 确保外部化处理那些你不想打包进库的依赖
        // external: ['vue'],
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
        // "@": fileURLToPath(new URL("./src", import.meta.url)),
        '@img': resolve('src/assets/img'),
        '@cp': resolve('src/components'),
        // 兼容webpack的静态资源
        '~@': resolve('src'),
        '~@img': resolve('src/assets/img'),
        '~@cp': resolve('src/components'),
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
      vue(),
      // 配置CDN
      vitePluginCDN({
        modules: [
          {
            name: 'element-plus',
            var: 'ElementPlus',
            path: 'https://unpkg.zhimg.com/element-plus@2.3.6/dist/index.full.js',
          },
        ],
      }),
      svgBuilder('./src/assets/icons/svg/'), // 导入所有svg
      WindiCSS(),
      // 开启Gzip压缩
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用,相当于开关在这里
        threshold: 10240, // 体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
        algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz', //文件后缀
      }),
      // name 可以写在 script 标签上
      VueSetupExtend(),
      // 本地和后端调试注释下面配置、或更改配置
      viteMockServe({
        mockPath: './mock/source/', // 解析，路径可根据实际变动
        localEnabled: true, // 此处可以手动设置为true，也可以根据官方文档格式 开发环境
        prodEnabled: true, // 生产环境设为true，也可以根据官方文档格式
        injectCode: ` import { mockXHR } from './mock';
        mockXHR(); `,
        logger: true, //是否在控制台显示请求日志
        watchFiles: false, // 监听文件内容变更
        injectFile: resolve(__dirname, 'src/main.js'), // 在main.js注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
      }),
      // 图片压缩、更多配置： https://github.com/vbenjs/vite-plugin-imagemin
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      /**
       * 如果需要支持 `.jsx` 组件，请安装 `@vitejs/plugin-vue-jsx` 这个包
       * 并在这里添加一个插件导入 `import vueJsx from '@vitejs/plugin-vue-jsx'`
       */
      // vueJsx(),
      // 自动引入element相关
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      /**
       * src/components/AutoImportCom文件夹下的组件自动导入，不用每次都 import
       * @see https://github.com/antfu/unplugin-vue-components#configuration
       */
      components({
        dirs: ['src/components/AutoImportCom'],
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        globalNamespaces: [],
        extensions: ['vue', 'js', 'jsx'],
        deep: true,
        dts: false,
        resolvers: [ElementPlusResolver()],
      }),
      // 版权信息
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
