## vue3-screen-monorepo（大屏共用前端web模版）

###  项目集成特点🔨

- 使用 vue3 +vite4 开发，单文件组件
- 使用 Windi CSS原子化构建样式
- 集成本地 mock 接口调试
- 集成 pnpm monorepo 思想、共用私有组件、私有工具函数
- 使用 husky、lint-staged、commitlint、git-hooks 规范提交信息（提交预检测debugger、代码冲突、暂存区代码统一格式）

### 项目文件目录说明
- components: 公共的、所有项目使用的公共的组件
- utils: 公共的函数工具方法
- webPackages: 所有前端项目存储在该文件夹下

```js
进入components、utils、webPackages这三个文件夹下安装对应依赖
进入webPackages文件夹下对应的前端项目、pnpm dev运行项目
```

```js
pnpm i
pnpm dev
node >= 16.x.x
```

```js
pnpm config set ignore-workspace-root-check true
```

