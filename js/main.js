// 返回顶部功能
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        // 监听滚动事件
        window.addEventListener('scroll', () => {
            this.toggleButton();
        });

        // 监听点击事件
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    // 切换按钮显示/隐藏
    toggleButton() {
        if (window.pageYOffset > 300) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    }

    // 滚动到顶部
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

class BlogApp {
    constructor() {
        this.articles = [];
        this.currentPage = 1;
        this.articlesPerPage = 5;
        this.currentArticle = null;
        this.filteredArticles = [];
        this.searchQuery = '';
        // 不在这里直接调用init，而是在DOMContentLoaded中调用
    }

    async init() {
        // 加载文章列表
        await this.loadArticles();

        // 初始化事件监听
        this.initEventListeners();

        // 渲染文章列表
        this.renderArticlesList();

        // 渲染分页
        this.renderPagination();

        // 初始化返回顶部功能
        new BackToTop();
    }

    // 解析Markdown文件的YAML前置元数据
    parseYAMLFrontMatter(content) {
        const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
        const match = content.match(yamlRegex);

        if (!match) {
            return {
                metadata: {},
                content: content
            };
        }

        const yamlContent = match[1];
        const remainingContent = content.replace(yamlRegex, '');
        const metadata = {};

        // 解析YAML
        yamlContent.split('\n').forEach(line => {
            if (line.trim() === '') return;

            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();

            if (key && value) {
                metadata[key.trim()] = value.replace(/^['"](.*)['"]$/, '$1'); // 移除引号
            }
        });

        return {
            metadata: metadata,
            content: remainingContent
        };
    }

    async loadArticles() {
        try {
            // 从JSON文件加载文章列表配置
            const response = await fetch('articles/articles.json');

            // 检查响应是否成功
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const articlesConfig = await response.json();

            // 确保articlesConfig是数组
            if (!Array.isArray(articlesConfig)) {
                throw new Error('文章列表格式不正确，应该是一个数组');
            }

            // 加载所有文章内容
            this.articles = await Promise.all(articlesConfig.map(async article => {
                try {
                    // 读取Markdown文件内容
                    const response = await fetch(`articles/${article.file}`);
                    const content = await response.text();

                    // 解析YAML前置元数据
                    const { metadata, content: remainingContent } = this.parseYAMLFrontMatter(content);

                    // 使用YAML元数据覆盖默认配置
                    return {
                        ...article,
                        title: metadata.title || article.title,
                        date: metadata.date || article.date,
                        author: metadata.author || article.author,
                        category: metadata.category || article.category,
                        content: remainingContent
                    };
                } catch (error) {
                    const title = article?.title || '未知文章';
                    console.error(`加载文章 ${title} 失败:`, error);
                    return {
                        ...(article || {}),
                        title: title,
                        content: `# ${title}\n\n文章加载失败: ${error.message}`
                    };
                }
            }));

            this.filteredArticles = [...this.articles];
        } catch (error) {
            console.error('加载文章列表失败:', error);

            // 如果加载失败，使用默认文章
            this.articles = [
                {
                    id: '1',
                    title: '前端开发的未来趋势',
                    date: '2025-01-15',
                    author: 'Tentacion',
                    category: '技术',
                    content: '# 前端开发的未来趋势\n\n## 1. 引言\n\n前端开发领域正在经历快速的变革...'
                }
            ];
            this.filteredArticles = [...this.articles];
        }
    }

    initEventListeners() {
        // 侧边栏切换
        this.setupSidebarToggle();
        
        // 重新设置搜索功能
        this.setupSearch();
        
        // 设置键盘快捷键
        this.setupKeyboardShortcuts();
    }

    setupSidebarToggle() {
        const toggleSidebar = document.getElementById('toggleSidebar');
        const sidebar = document.querySelector('.articles-sidebar');
        const articleContent = document.querySelector('.article-content');

        if (toggleSidebar && sidebar && articleContent) {
            // 移除可能存在的旧事件监听器
            toggleSidebar.replaceWith(toggleSidebar.cloneNode(true));
            const newToggleSidebar = document.getElementById('toggleSidebar');
            
            newToggleSidebar.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                sidebar.classList.toggle('collapsed');
                articleContent.classList.toggle('expanded');

                // 更新按钮图标
                const icon = newToggleSidebar.querySelector('i');
                if (sidebar.classList.contains('collapsed')) {
                    icon.classList.remove('fa-chevron-left');
                    icon.classList.add('fa-chevron-right');
                } else {
                    icon.classList.remove('fa-chevron-right');
                    icon.classList.add('fa-chevron-left');
                }
                
                console.log('侧边栏状态已切换');
            });
            
            console.log('侧边栏切换功能已初始化');
        } else {
            console.error('无法找到侧边栏相关元素:', { toggleSidebar, sidebar, articleContent });
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterArticles();
                this.currentPage = 1;
                this.renderArticlesList();
                this.renderPagination();
            });
        }
    }

    setupKeyboardShortcuts() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            document.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + / 聚焦搜索框
                if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                    e.preventDefault();
                    searchInput.focus();
                }

                // ESC 清除搜索
                if (e.key === 'Escape') {
                    searchInput.value = '';
                    this.searchQuery = '';
                    this.filterArticles();
                    this.currentPage = 1;
                    this.renderArticlesList();
                    this.renderPagination();
                }
            });
        }
    }

    filterArticles() {
        if (!this.searchQuery) {
            this.filteredArticles = [...this.articles];
            return;
        }

        this.filteredArticles = this.articles.filter(article =>
            article.title.toLowerCase().includes(this.searchQuery) ||
            article.content.toLowerCase().includes(this.searchQuery) ||
            article.category.toLowerCase().includes(this.searchQuery)
        );
    }

    renderArticlesList() {
        const articlesList = document.getElementById('articlesList');
        articlesList.innerHTML = '';

        if (this.filteredArticles.length === 0) {
            articlesList.innerHTML = `
                <div class="no-results">
                    <i class="fa fa-search"></i>
                    <p>没有找到相关文章</p>
                </div>
            `;
            return;
        }

        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const currentArticles = this.filteredArticles.slice(startIndex, endIndex);

        currentArticles.forEach(article => {
            const articleItem = document.createElement('div');
            articleItem.className = 'article-item';
            articleItem.dataset.id = article.id;

            // 如果是当前选中的文章，添加active类
            if (this.currentArticle && this.currentArticle.id === article.id) {
                articleItem.classList.add('active');
            }

            articleItem.innerHTML = `
                <h3 class="article-title-preview">${article.title}</h3>
                <div class="article-meta-preview">
                    <span class="article-date">${article.date}</span>
                    <span class="article-category">${article.category}</span>
                </div>
            `;

            // 点击文章项加载文章内容
            articleItem.addEventListener('click', () => {
                this.loadArticle(article);
                // 移除其他文章的active类
                document.querySelectorAll('.article-item').forEach(item => {
                    item.classList.remove('active');
                });
                // 添加active类
                articleItem.classList.add('active');
            });

            articlesList.appendChild(articleItem);
        });
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        if (this.filteredArticles.length <= this.articlesPerPage) {
            return;
        }

        const totalPages = Math.ceil(this.filteredArticles.length / this.articlesPerPage);

        // 上一页按钮
        const prevButton = document.createElement('button');
        prevButton.className = 'pagination-button';
        prevButton.innerHTML = '<i class="fa fa-chevron-left"></i>';
        prevButton.disabled = this.currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderArticlesList();
                this.renderPagination();
                this.scrollToTop();
            }
        });
        pagination.appendChild(prevButton);

        // 页码按钮
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = `pagination-button ${i === this.currentPage ? 'active' : ''}`;
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                this.currentPage = i;
                this.renderArticlesList();
                this.renderPagination();
                this.scrollToTop();
            });
            pagination.appendChild(pageButton);
        }

        // 下一页按钮
        const nextButton = document.createElement('button');
        nextButton.className = 'pagination-button';
        nextButton.innerHTML = '<i class="fa fa-chevron-right"></i>';
        nextButton.disabled = this.currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderArticlesList();
                this.renderPagination();
                this.scrollToTop();
            }
        });
        pagination.appendChild(nextButton);
    }

    async loadArticle(article) {
        this.currentArticle = article;

        const articleTitle = document.getElementById('articleTitle');
        const articleMeta = document.getElementById('articleMeta');
        const articleBody = document.getElementById('articleBody');
        const sidebar = document.querySelector('.articles-sidebar');
        const articleContent = document.querySelector('.article-content');
        const toggleSidebar = document.getElementById('toggleSidebar');

        if (toggleSidebar && sidebar && articleContent) {
            const icon = toggleSidebar.querySelector('i');

            // 自动折叠侧边栏
            if (!sidebar.classList.contains('collapsed')) {
                sidebar.classList.add('collapsed');
                articleContent.classList.add('expanded');
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            }
        }

        // 更新标题和元数据
        articleTitle.textContent = article.title;
        articleMeta.innerHTML = `
            <span><i class="fa fa-calendar"></i> ${article.date}</span>
            <span><i class="fa fa-folder"></i> ${article.category}</span>
            <span><i class="fa fa-pencil"></i> ${article.author}</span>
            <span><i class="fa fa-clock-o"></i> ${this.readingTime(article.content)}</span>
        `;

        // 解析Markdown内容
        try {
            const htmlContent = marked.parse(article.content);
            articleBody.innerHTML = htmlContent;

            // 平滑滚动到文章标题，而不是文章内容
            articleTitle.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // 添加代码高亮（如果需要）
            this.highlightCode();
        } catch (error) {
            console.error('解析Markdown失败:', error);
            articleBody.innerHTML = `
                <div class="error-content">
                    <i class="fa fa-exclamation-triangle"></i>
                    <p>文章内容加载失败</p>
                </div>
            `;
        }
    }

    readingTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} 分钟阅读`;
    }

    highlightCode() {
        // 这里可以添加代码高亮逻辑
        // 例如使用Prism.js或highlight.js
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            // 简单的代码高亮模拟
            block.classList.add('highlighted');
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// 初始化博客应用
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const blogApp = new BlogApp();
        await blogApp.init();
        console.log('博客应用初始化完成');
    } catch (error) {
        console.error('博客应用初始化失败:', error);
    }
});

// 添加一些全局工具函数
window.utils = {
    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};

