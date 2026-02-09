# Tentacion Space - 个人博客网站

这是一个炫彩风格的个人博客网站，具有现代感的设计和丰富的交互效果。

## 功能特点

- 炫彩渐变背景和现代UI设计
- 响应式布局，适配各种设备
- 文章列表和内容区域的动态交互
- 文章搜索功能
- 分页显示文章
- Markdown文章支持
- 键盘快捷键支持

## 技术栈

- HTML5 + CSS3 + JavaScript
- Tailwind CSS v3
- Font Awesome
- Marked.js (Markdown解析)

## 项目结构

```
tentacion-space/
├── index.html           # 主页
├── css/
│   └── style.css        # 样式文件
├── js/
│   └── main.js         # 主要JavaScript文件
├── articles/           # Markdown文章目录
│   ├── article1.md
│   ├── article2.md
│   └── ...
└── README.md           # 本说明文件
```

## 如何使用

### 1. 本地开发

1. 克隆或下载本项目
2. 打开`index.html`文件即可在浏览器中查看效果
3. 你可以修改`articles`目录下的Markdown文章，或者添加新的文章

### 2. 添加新文章

1. 在`articles`目录下创建新的Markdown文件
2. 在`js/main.js`文件中，找到`loadArticles`方法，添加新文章的信息：

```javascript
const sampleArticles = [
    {
        id: '1',
        title: '文章标题',
        date: '2025-01-15',
        author: 'Tentacion',
        category: '技术',
        content: '# 文章内容\n\n这里是文章的Markdown内容...'
    },
    // 添加更多文章...
];
```

### 3. 自定义配置

- 修改`css/style.css`中的CSS变量可以改变整体配色方案
- 修改`index.html`中的个人信息和社交链接
- 替换`header-section`中的背景图和头像

## 部署到GitHub Pages

### 方法一：直接部署

1. 登录你的GitHub账号
2. 创建一个新的仓库，命名为`username.github.io`（username是你的GitHub用户名）
3. 将本项目的所有文件上传到该仓库的`main`分支
4. 等待几分钟后，访问`https://username.github.io`即可查看你的博客

### 方法二：使用GitHub Actions部署

1. 创建一个新的GitHub仓库
2. 将项目推送到仓库
3. 启用GitHub Pages：
   - 进入仓库的Settings页面
   - 找到"Pages"选项
   - 在"Source"部分选择"Deploy from a branch"
   - 选择`main`分支和`/root`目录
   - 点击"Save"
4. 等待部署完成，访问`https://username.github.io/repository-name`

### 方法三：使用静态网站托管

你也可以将本项目部署到其他静态网站托管服务，如：
- Vercel
- Netlify
- Cloudflare Pages
- Firebase Hosting

## 键盘快捷键

- `Ctrl/Cmd + /`：聚焦搜索框
- `Escape`：清除搜索内容

## 自定义样式

你可以通过修改`css/style.css`中的CSS来自定义网站样式：

```css
:root {
    --primary-color: #6366f1;      /* 主色调 */
    --secondary-color: #8b5cf6;    /* 辅助色 */
    --accent-color: #ec4899;       /* 强调色 */
    --background-color: #0f172a;   /* 背景色 */
    --text-primary: #f8fafc;       /* 主要文本色 */
    --text-secondary: #94a3b8;     /* 次要文本色 */
}
```

## 贡献

如果你有任何建议或改进，欢迎提交Pull Request或创建Issue。

## 许可证

本项目采用MIT许可证，详情请见LICENSE文件。