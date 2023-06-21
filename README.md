## vue3-screen-monorepo（大屏共用前端web模版）

###  项目集成特点🔨

- 使用 vue3 +vite4 开发，单文件组件
- 使用 Windi CSS原子化构建样式
- 集成本地 mock 接口调试
- 函数式编程使用图片预览
- gzip压缩、cdn加速、图片压缩、dependencies下的依赖打包单独拆分
- 集成 pnpm monorepo 思想、共用私有组件、私有工具函数
- 使用 husky、lint-staged、commitlint、git-hooks 规范提交信息（提交预检测debugger、代码冲突、暂存区代码统一格式）

####  注意：

```js
// 开启gzip后、上线ngnix需要配置如下才能生效：
详情参考：https://juejin.cn/post/7114540697276907551
http {
    gzip_static on;
    gzip_proxied any;
}

// 默认使用的路由history模式、需配置ngnix如下(防止上线刷新404问题)、或使用hash模式
 server {
      listen 80;
      location / {
        try_files $uri $uri/ /index.html;
      }
 }
```

### 项目文件目录说明

- components: 公共的、可单独抽离的(不需要依赖状态的)、所有项目使用的公共的组件
- utils: 公共的函数工具方法
- webPackages: 所有前端项目存储在该文件夹下
- 项目中 components/AutoImportCom 文件夹下定义的组件会自动引入、ElemPlus相关也会自动引入

```js
# 推荐使用pnpm包管理器
node >= 16.x.x

pnpm i  // 统一安装依赖(根目录、webPackages下的项目、私有组件components)
pnpm dev // 根目录下运行webPackages下的vite项目 ( pnpm -F <项目名> <脚本> )
pnpm build // 打包webPackages下的vite项目 
pnpm commit // 约定式规范提交代码

# git-hooks、无需手动执行脚本、提交代码时yorkie自动执行
format-code // 统一格式化暂存区代码风格
check-keyword // 提交代码预检测是否有debugger
check-conflict // 提交代码预检测是否有多人开发代码冲突
```

yarn commit 运行后，会有如下 6 个步骤

### 1.选择提交类型(必填)

Select the type of change that you're committing: (Use arrow keys)

| 类型     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增特性或功能                                               |
| fix      | 修复问题                                                     |
| docs     | 修改文档                                                     |
| style    | 修改样式，格式化风格等                                       |
| refactor | 代码重构，不引入新功能和修复问                               |
| perf     | 代码优化，性能优化                                           |
| test     | 新增、修改测试用例                                           |
| build    | 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交 |
| ci       | 与 CI(持续集成服务)有关的改动                                |
| chore    | 构建过程或者辅助工具的变动                                   |
| revert   | 回滚某个更早之前的提交，代码回退                             |

### 2.选择 scope 模块名(选填)

What is the scope of this change (e.g. component or file name): (press enter to skip) 

### 3.填写精炼的提交信息(必填)

Write a short, imperative tense description of the change (max 86 chars):

### 4.填写补充信息(选填)

Provide a longer description of the change: (press enter to skip) 

### 5.选择是否有破坏性更新(默认no)

Are there any breaking changes?

### 6.是否关联是 open 状态的 issue(默认no)

Does this change affect any open issues?

#### 如果 vite-plugin-imagemin (图片压缩) 依赖安装不上、根目录package.json添加如下配置

```js
"resolutions": {
    "bin-wrapper": "npm:bin-wrapper-china"
}
```

```js
// 忽略警告
pnpm config set ignore-workspace-root-check true
```

