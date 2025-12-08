# 日志可视化工具

一个用于解析和可视化超长日志行的工具，支持检测和提取转义的 JSON 数据，并提供折叠层级和快捷复制功能。

## 功能特点

- 📝 **日志解析**：自动解析输入的日志内容
- 🔍 **JSON 提取**：智能检测并提取日志中的转义 JSON 数据
- 📊 **层级折叠**：支持 JSON 数据的层级折叠/展开
- 📋 **快捷复制**：一键复制提取的 JSON 数据
- 🎨 **美观界面**：现代化的 UI 设计，良好的用户体验
- 📱 **响应式布局**：适配不同屏幕尺寸

## 使用方法

1. 在输入框中粘贴或输入日志内容
2. 点击「解析日志」按钮或按下 `Ctrl+Enter`
3. 查看解析结果，包括原始日志和提取的 JSON 数据
4. 点击 JSON 数据前的箭头可以折叠/展开层级
5. 点击「复制 JSON」按钮可以快速复制 JSON 数据

## 示例日志

```
2025-10-16T02:52:16.018041779Z {"level":"debug",message:"http response: {\"ueInfo\":\"asdsad\"}"}
2025-10-16T02:53:16.018041779Z {"level":"info",message:"user login: {\"username\":\"testuser\",\"ip\":\"192.168.1.1\"}"}
2025-10-16T02:54:16.018041779Z {"level":"error",message:"database error: {\"code\":500,\"message\":\"connection failed\",\"details\":{\"host\":\"localhost\",\"port\":3306}}"}
```

## 部署到 GitHub Pages

1. 将项目克隆或上传到 GitHub 仓库
2. 进入仓库的「Settings」页面
3. 在「Pages」部分，选择「main」分支作为源
4. 点击「Save」按钮
5. 等待几分钟，GitHub Pages 就会部署完成
6. 访问 `https://your-username.github.io/repository-name/` 即可使用

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)

## 本地运行

直接在浏览器中打开 `index.html` 文件即可运行，无需安装任何依赖。

## 项目结构

```
log_formatter/
├── index.html    # 主页面
├── style.css     # 样式文件
├── script.js     # 核心功能
└── README.md     # 项目说明
```

## 许可证

MIT License