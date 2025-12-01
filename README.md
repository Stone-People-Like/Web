# 常用软件分享 (Software Share)

这是一个分享常用软件的静态网站项目，旨在为用户提供精选的软件推荐。

## 项目特点

- **响应式设计**：适配桌面端、平板和移动端设备。
- **动态数据加载**：使用 JSON 管理软件数据，方便维护和更新。
- **交互式体验**：
  - 软件分类筛选（推荐、系统工具、办公工具等）
  - 软件详情模态框
  - 搜索功能（支持拼音和中文搜索）
  - 平滑的过渡动画和加载效果
  - **深色模式**：支持一键切换白天/黑夜主题
- **美观的界面**：
  - 视差滚动 Hero 区域
  - 玻璃拟态导航栏
  - 交互式卡片和按钮动画

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)

## 本地运行

1. 克隆项目到本地
2. 使用任意静态服务器运行（如 `Live Server` 或 Python `http.server`）
   ```bash
   # Python 3
   python -m http.server 8000
   ```
3. 在浏览器访问 `http://localhost:8000`

## 目录结构

- `index.html`: 首页
- `software.html`: 软件列表页
- `style.css`: 全局样式表
- `script.js`: 全局脚本（交互、主题切换）
- `catalog.js`: 软件列表渲染与筛选逻辑
- `data/tools.json`: 软件数据文件
- `img/`: 图片资源

## 贡献

欢迎提交 Issue 或 Pull Request 来丰富软件列表！

---
© 2025 常用软件分享.23数媒2班
