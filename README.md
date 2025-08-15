# my_macys_app - 我的傲娇女友服务中心 - 部署指南

## 移动端优化说明
本应用已针对移动设备进行全面优化，包括响应式布局、触摸友好的界面元素和适配小屏幕的设计。

## 部署步骤

### 1. 准备工作
确保您已安装Node.js和pnpm。

### 2. 构建项目
```bash
pnpm install
pnpm build
```

### 3. 部署选项

#### 选项1: Vercel (推荐)
1. 将代码推送到GitHub仓库
2. 在Vercel创建新项目并关联该仓库
3. 部署设置保持默认，点击"部署"

#### 选项2: Netlify
1. 将代码推送到GitHub仓库
2. 在Netlify导入项目
3. 构建命令设置为`pnpm build`
4. 发布目录设置为`dist/static`
5. 点击"部署网站"

#### 选项3: GitHub Pages
1. 修改package.json，添加部署脚本
2. 构建项目并推送dist目录到GitHub
3. 在仓库设置中启用GitHub Pages

## 分享链接
部署完成后，您将获得一个URL链接，如：`https://your-project-name.vercel.app`，可以直接分享给对方打开使用。
