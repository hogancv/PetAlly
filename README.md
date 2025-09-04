# 宠物社区平台

## 项目介绍

宠物社区平台是一个基于 Vue 3 和 Vite 构建的综合性宠物服务应用，旨在为宠物爱好者提供全方位的宠物相关服务。平台集宠物信息查询、AI 识别、社区交流、爱心援助等功能于一体，打造一个温馨、专业的宠物生态系统。

## 视频预览

[点击预览](https://oss.moocollege.com/18072/works/10660964/ShEMmR2r_1695522439795.mp4)

## 功能模块

### 首页

-   **顶部轮播**：定期更新训宠技巧和信息，为用户提供最新的宠物养护知识
-   **搜索宠物**：支持关键词搜索宠物信息，快速找到感兴趣的宠物品种
-   **图片识别**：上传照片识别宠物品种，利用 AI 技术为用户提供准确的宠物品种信息
-   **AI 推荐**：个性化宠物推荐题库，根据用户喜好推荐合适的宠物
-   **请求援助**：上传流浪宠物信息求援，为流浪宠物提供帮助渠道
-   **我的爱宠**：查看管理个人宠物信息，方便用户管理自己的宠物
-   **热门宠物**：展示热门宠物信息，了解当前受欢迎的宠物品种
-   **爱宠分类**：横向滑动浏览宠物分类，快速找到不同类型的宠物
-   **宠物资讯**：推荐宠物相关资讯，获取最新的宠物行业动态

### 援助

-   **本期援助**：展示当前援助活动，了解最新的流浪宠物援助项目
-   **我的援助**：捐赠旧物兑换粮食，参与爱心捐赠活动
-   **往期回顾**：回顾成功援助活动，了解平台过往的援助成果
-   **云养宠物**：云喂养虚拟宠物，体验线上养宠乐趣

### 宠物识别

-   **宠物识别**：图像识别宠物种类，通过 AI 技术准确识别宠物品种

### 宠圈

-   **明星宠物**：展示热门宠物信息，发现社区中的明星宠物
-   **百科知识**：推荐动物科普知识，学习专业的宠物养护知识
-   **宠友分享**：宠物爱好者交流社区，分享养宠经验和心得

### 我的

-   **个人信息**：编辑管理个人信息，维护个人账户资料
-   **会员中心**：会员服务和权益，享受会员专属特权
-   **积分中心**：积分余额和规则，查看和管理个人积分
-   **我的宠物**：查看管理个人宠物信息，记录宠物成长历程
-   **AI 推荐历史**：查看 AI 推荐历史，回顾系统推荐的宠物信息
-   **识别历史**：查看图片识别历史，管理过往的宠物识别记录

## 技术栈

-   **前端框架**：Vue 3
-   **构建工具**：Vite
-   **路由管理**：Vue Router 4
-   **状态管理**：Pinia
-   **UI 组件库**：TDesign Mobile Vue
-   **HTTP 请求**：Axios
-   **动画效果**：GSAP、Animate.css
-   **工具库**：@vueuse/core
-   **样式预处理**：Less、Sass
-   **图片优化**：unplugin-imagemin
-   **代码压缩**：terser
-   **构建优化**：vite-plugin-compression、rollup-plugin-visualizer

## 开发环境要求

-   Node.js >= 16
-   npm >= 8

## 安装与运行

1. 克隆项目

```bash
git clone [项目地址]
cd vite-project
```

2. 安装依赖

```bash
npm install
```

3. 开发环境运行

```bash
npm run dev
```

4. 生产环境运行

```bash
npm run pro
```

5. 构建生产版本

```bash
npm run build
```

6. 预览生产版本

```bash
npm run preview
```

## 项目结构

```
vite-project/
├── .env.development         # 开发环境配置
├── .env.production          # 生产环境配置
├── .gitignore              # Git忽略文件
├── .hintrc                 # HTML提示配置
├── .prettierrc             # Prettier代码格式化配置
├── cdn-config.js           # CDN配置
├── index.html              # 入口HTML文件
├── key-config.js           # 密钥配置
├── package.json            # 项目依赖配置
├── package-lock.json       # 依赖锁定文件
├── README.md               # 项目说明文档
├── public/                 # 公共静态资源
│   └── vite.svg            # Vite图标
└── src/                    # 源代码目录
    ├── App.vue             # 根组件
    ├── api/                # API接口
    │   ├── community.js    # 社区相关API
    │   ├── help.js         # 援助相关API
    │   ├── home.js         # 首页相关API
    │   ├── identify.js     # 识别相关API
    │   ├── index.js        # API入口文件
    │   └── user.js         # 用户相关API
    ├── assets/             # 静态资源
    │   ├── font/           # 字体文件
    │   │   ├── abc.ttf
    │   │   └── AlimamaFangYuanTiVF-Thin.ttf
    │   ├── images/         # 图片资源
    │   │   ├── community/  # 社区相关图片
    │   │   ├── empty/      # 空状态图片
    │   │   ├── help/       # 援助相关图片
    │   │   ├── home/       # 首页相关图片
    │   │   ├── login/      # 登录相关图片
    │   │   ├── message/    # 消息相关图片
    │   │   └── user/       # 用户相关图片
    │   └── style/          # 全局样式
    ├── components/         # 公共组件
    │   ├── BackFab.vue     # 返回按钮组件
    │   ├── DonationCard.vue # 援助卡片组件
    │   ├── Empty.vue       # 空状态组件
    │   ├── HelpCard.vue    # 援助卡片组件
    │   ├── Loading.vue     # 加载组件
    │   ├── MyLab.vue       # 标签组件
    │   ├── MyMask.vue      # 遮罩组件
    │   ├── MyWaterfall.vue # 瀑布流组件
    │   ├── Setting.vue     # 设置组件
    │   ├── TopFab.vue      # 顶部按钮组件
    │   ├── AddressSet/     # 地址设置组件
    │   └── Message/        # 消息组件
    ├── directive/          # 自定义指令
    │   └── index.js
    ├── layout/             # 布局组件
    │   ├── NavBar.vue      # 导航栏组件
    │   └── TabBar.vue      # 标签栏组件
    ├── pages/              # 页面组件
    │   ├── community/      # 社区页面
    │   ├── help/           # 援助页面
    │   ├── home/           # 首面
    │   ├── login/          # 登录页面
    │   ├── pet/            # 宠物页面
    │   ├── user/           # 用户页面
    │   └── test.vue        # 测试页面
    ├── router/             # 路由配置
    │   ├── index.js        # 路由入口文件
    │   └── routes.js       # 路由配置文件
    ├── store/              # 状态管理
    │   ├── index.js        # 状态管理入口
    │   └── user.js         # 用户状态管理
    └── utils/              # 工具函数
        ├── area.js         # 地区工具
        ├── getAssetsFile.js # 获取资源文件工具
        ├── getDate.js      # 日期工具
        └── getImageUrl.js  # 获取图片URL工具
```

## 推荐 IDE 设置

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用 Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)。

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

[MIT](LICENSE)
