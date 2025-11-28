// Modal functionality with dynamic content
window.addEventListener('load', function() {
    // Hide page loader when page is fully loaded
    var pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
    }
    
    // Get modal elements
    var modal = document.getElementById('software-modal');
    var closeBtn = document.querySelector('.close-btn');
    var modalImg = document.getElementById('modal-software-img');
    var modalTitle = document.getElementById('modal-software-title');
    
    // Get all "Learn More" buttons
    var moreInfoBtns = document.querySelectorAll('.btn-secondary');
    
    // Open modal when clicking "Learn More" buttons
    for (var i = 0; i < moreInfoBtns.length; i++) {
        moreInfoBtns[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get software ID
            var softwareId = this.getAttribute('data-software');
            
            // Update modal content based on software ID
            switch(softwareId) {
                case 'vscode':
                    modalImg.src = 'img/vscode.png';
                    modalImg.alt = 'Visual Studio Code';
                    modalTitle.textContent = 'Visual Studio Code';
                    break;
                case 'chrome':
                    modalImg.src = 'img/Chorm.webp';
                    modalImg.alt = 'Google Chrome';
                    modalTitle.textContent = 'Google Chrome';
                    break;
                case 'notion':
                    modalImg.src = 'https://placehold.co/300x200?text=Notion';
                    modalImg.alt = 'Notion';
                    modalTitle.textContent = 'Notion';
                    break;
                case 'obs':
                    modalImg.src = 'https://placehold.co/300x200?text=OBS';
                    modalImg.alt = 'OBS Studio';
                    modalTitle.textContent = 'OBS Studio';
                    break;
                case 'figma':
                    modalImg.src = 'https://placehold.co/300x200?text=Figma';
                    modalImg.alt = 'Figma';
                    modalTitle.textContent = 'Figma';
                    break;
                case 'spotify':
                    modalImg.src = 'https://placehold.co/300x200?text=Spotify';
                    modalImg.alt = 'Spotify';
                    modalTitle.textContent = 'Spotify';
                    break;
                default:
                    modalImg.src = 'https://placehold.co/300x200?text=Software';
                    modalImg.alt = 'Software';
                    modalTitle.textContent = 'Software';
            }
            
            // Show modal
            modal.classList.add('active');
        });
    }
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.classList.remove('active');
        }
    });
    
    // Scroll animation functionality
    function handleScrollAnimation() {
        var animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
        
        for (var i = 0; i < animatedElements.length; i++) {
            var element = animatedElements[i];
            var elementTop = element.getBoundingClientRect().top;
            var elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        }
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // 分类管理集成功能
    function initCategoryIntegration() {
        // 从localStorage获取分类数据
        function getCategories() {
            var categories = localStorage.getItem('categories');
            return categories ? JSON.parse(categories) : [];
        }
        
        // 获取分类树结构
        function getCategoryTree() {
            var categories = getCategories();
            var categoryMap = {};
            var rootCategories = [];
            
            // 创建分类映射
            categories.forEach(function(category) {
                category.children = [];
                categoryMap[category.id] = category;
            });
            
            // 构建分类树
            categories.forEach(function(category) {
                if (category.parentId === 0 && category.status === 1) {
                    rootCategories.push(category);
                } else if (categoryMap[category.parentId] && category.status === 1) {
                    categoryMap[category.parentId].children.push(category);
                }
            });
            
            // 按排序权重排序
            function sortCategories(categories) {
                categories.sort(function(a, b) {
                    return b.sort - a.sort;
                });
                categories.forEach(function(category) {
                    if (category.children && category.children.length > 0) {
                        sortCategories(category.children);
                    }
                });
            }
            
            sortCategories(rootCategories);
            return rootCategories;
        }
        
        // 生成分类筛选按钮
        function generateCategoryFilters() {
            var categoryTree = getCategoryTree();
            var filterContainer = document.querySelector('.category-filter');
            
            // 清空现有筛选按钮
            filterContainer.innerHTML = '';
            
            // 添加"全部"按钮
            var allBtn = document.createElement('button');
            allBtn.className = 'filter-btn active';
            allBtn.setAttribute('data-category', 'all');
            allBtn.textContent = '全部';
            filterContainer.appendChild(allBtn);
            
            // 递归添加分类按钮
            function addCategoryButtons(categories, level) {
                categories.forEach(function(category) {
                    var btn = document.createElement('button');
                    btn.className = 'filter-btn';
                    btn.setAttribute('data-category', category.name);
                    btn.textContent = ' '.repeat(level * 2) + category.name;
                    filterContainer.appendChild(btn);
                    
                    // 添加子分类按钮
                    if (category.children && category.children.length > 0) {
                        addCategoryButtons(category.children, level + 1);
                    }
                });
            }
            
            addCategoryButtons(categoryTree, 0);
            
            // 重新绑定筛选事件
            bindFilterEvents();
        }
        
        // 绑定筛选事件
        function bindFilterEvents() {
            var filterBtns = document.querySelectorAll('.filter-btn');
            var softwareCards = document.querySelectorAll('.software-card');
            
            filterBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    // 移除所有按钮的active类
                    filterBtns.forEach(function(b) {
                        b.classList.remove('active');
                    });
                    
                    // 添加当前按钮的active类
                    this.classList.add('active');
                    
                    // 获取筛选类别
                    var category = this.getAttribute('data-category');
                    
                    // 筛选软件卡片
                    softwareCards.forEach(function(card) {
                        var cardCategory = card.getAttribute('data-category');
                        if (category === 'all' || cardCategory === category) {
                            card.style.display = 'block';
                            // 添加动画类
                            setTimeout(function() {
                                card.classList.add('fade-in');
                            }, 100);
                        } else {
                            card.style.display = 'none';
                            // 移除动画类，以便下次显示时重新触发动画
                            card.classList.remove('fade-in', 'visible');
                        }
                    });
                });
            });
        }
        
        // 初始化分类集成
        generateCategoryFilters();
        
        // 监听分类变化（通过localStorage事件）
        window.addEventListener('storage', function(e) {
            if (e.key === 'categories') {
                generateCategoryFilters();
            }
        });
    }
    
    // 初始化分类集成
    initCategoryIntegration();
});