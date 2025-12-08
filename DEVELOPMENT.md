# 本地调试与发布方案

本项目提供了成熟的本地调试和自动化发布方案，让您能够高效开发和部署日志可视化工具。

## 目录

- [本地调试方案](#本地调试方案)
  - [安装依赖](#安装依赖)
  - [启动本地服务器](#启动本地服务器)
  - [浏览器调试](#浏览器调试)
  - [实时编辑](#实时编辑)
- [发布方案](#发布方案)
  - [手动构建](#手动构建)
  - [自动化部署（GitHub Actions）](#自动化部署github-actions)
  - [手动部署到GitHub Pages](#手动部署到github-pages)
- [其他开发工具推荐](#其他开发工具推荐)

## 本地调试方案

### 安装依赖

首先确保您已经安装了Node.js（推荐使用v14或更高版本），然后执行以下命令安装项目依赖：

```bash
npm install
```

### 启动本地服务器

项目使用`http-server`作为本地开发服务器，运行以下命令启动服务器：

```bash
npm run dev
```

服务器将在`http://127.0.0.1:3000`启动，并自动打开浏览器访问项目。

### 浏览器调试

项目支持现代浏览器的开发者工具进行调试：

1. **Chrome/Edge开发者工具**：按`F12`或`Ctrl+Shift+I`打开
2. **Firefox开发者工具**：按`F12`或`Ctrl+Shift+I`打开

使用开发者工具可以：
- 检查HTML结构和CSS样式
- 调试JavaScript代码（断点、控制台输出等）
- 监控网络请求
- 查看本地存储

### 实时编辑

项目支持实时编辑，当您修改以下文件时，只需在浏览器中刷新页面即可看到更新：
- `index.html`：页面结构
- `style.css`：样式文件
- `script.js`：JavaScript逻辑

## 发布方案

### 手动构建

执行以下命令可以构建项目：

```bash
npm run build
```

构建产物将生成在`build/`目录中，包含所有必要的静态文件。

### 自动化部署（GitHub Actions）

项目已配置GitHub Actions工作流，实现自动化部署到GitHub Pages：

1. **配置步骤**：
   - 将项目推送到GitHub仓库
   - 在仓库设置中启用GitHub Pages（Settings > Pages）
   - 选择`gh-pages`分支作为发布源

2. **自动部署触发条件**：
   - 当推送到`main`分支时自动触发
   - 支持手动触发（通过GitHub Actions页面）

3. **工作流内容**：
   - 检出代码
   - 设置Node.js环境
   - 安装依赖
   - 构建项目
   - 部署到GitHub Pages

### 手动部署到GitHub Pages

如果需要手动部署，可以使用以下步骤：

1. 构建项目：
   ```bash
   npm run build
   ```

2. 安装`gh-pages`工具：
   ```bash
   npm install -g gh-pages
   ```

3. 部署到GitHub Pages：
   ```bash
   gh-pages -d build
   ```

## 其他开发工具推荐

### VS Code插件

- **Live Server**：提供更强大的本地服务器功能，支持实时重载
- **Prettier**：代码格式化工具，保持代码风格一致
- **ESLint**：JavaScript代码检查工具，提高代码质量
- **Debugger for Chrome**：在VS Code中调试Chrome浏览器中的代码

### 浏览器扩展

- **JSON Formatter**：在浏览器中格式化JSON数据
- **React Developer Tools**：如果未来扩展使用React，可以使用此工具调试
- **Redux DevTools**：如果未来使用Redux管理状态，可以使用此工具调试

## 常见问题

### Q: 本地服务器启动失败怎么办？

A: 请检查以下几点：
- 确保端口3000未被占用
- 确保已安装Node.js和项目依赖
- 查看控制台输出的错误信息

### Q: 自动化部署失败怎么办？

A: 请检查以下几点：
- 确保GitHub仓库已启用GitHub Pages
- 检查GitHub Actions工作流日志
- 确保GITHUB_TOKEN有正确的权限

### Q: 如何添加新功能？

A: 按照以下步骤添加新功能：
1. 在本地开发环境中实现新功能
2. 使用浏览器开发者工具调试
3. 测试通过后提交代码到GitHub
4. 自动部署到GitHub Pages

## 总结

本项目提供了完整的本地调试和发布方案，包括：
- 本地开发服务器
- 浏览器调试工具
- 自动化构建脚本
- GitHub Actions自动化部署

使用这些工具和流程，可以大大提高开发效率和部署可靠性。