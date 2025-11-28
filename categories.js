// 分类管理功能模块
window.addEventListener('load', function() {
    // 隐藏页面加载动画
    var pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
    }

    // 分类数据结构：{id, name, parentId, sort, status, createdAt, updatedAt}
    
    // 初始化分类数据
    function initCategories() {
        var categories = localStorage.getItem('categories');
        if (!categories) {
            // 默认分类数据
            var defaultCategories = [
                { id: 1, name: '开发工具', parentId: 0, sort: 10, status: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                { id: 2, name: '浏览器', parentId: 0, sort: 9, status: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                { id: 3, name: '效率工具', parentId: 0, sort: 8, status: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                { id: 4, name: '多媒体', parentId: 0, sort: 7, status: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                { id: 5, name: '设计工具', parentId: 0, sort: 6, status: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                { id: 6, name: '娱乐', parentId: 0, sort: 5, status: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
            ];
            localStorage.setItem('categories', JSON.stringify(defaultCategories));
        }
    }

    // 获取所有分类
    function getCategories() {
        var categories = localStorage.getItem('categories');
        return categories ? JSON.parse(categories) : [];
    }

    // 保存分类
    function saveCategories(categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
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
            if (category.parentId === 0) {
                rootCategories.push(category);
            } else if (categoryMap[category.parentId]) {
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

    // 渲染分类树
    function renderCategoryTree() {
        var treeContainer = document.getElementById('category-tree-container');
        var categoryTree = getCategoryTree();

        function renderCategory(category, level) {
            var categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            
            var categoryNode = document.createElement('div');
            categoryNode.className = 'category-node';
            categoryNode.dataset.id = category.id;
            categoryNode.draggable = true;
            
            // 复选框
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'category-checkbox';
            checkbox.dataset.id = category.id;
            
            // 分类信息
            var categoryInfo = document.createElement('div');
            categoryInfo.className = 'category-info';
            
            // 缩进
            var indent = document.createElement('span');
            indent.style.marginLeft = (level * 20) + 'px';
            
            // 分类名称
            var categoryName = document.createElement('span');
            categoryName.className = 'category-name';
            categoryName.textContent = category.name;
            
            // 分类状态
            var categoryStatus = document.createElement('span');
            categoryStatus.className = 'category-status';
            categoryStatus.textContent = category.status ? '启用' : '禁用';
            categoryStatus.style.fontSize = '0.8rem';
            categoryStatus.style.color = category.status ? '#4CAF50' : '#f44336';
            categoryStatus.style.marginLeft = '10px';
            
            // 分类操作按钮
            var categoryActions = document.createElement('div');
            categoryActions.className = 'category-actions';
            
            // 编辑按钮
            var editBtn = document.createElement('button');
            editBtn.className = 'btn-edit';
            editBtn.textContent = '编辑';
            editBtn.addEventListener('click', function() {
                editCategory(category.id);
            });
            
            // 删除按钮
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = '删除';
            deleteBtn.addEventListener('click', function() {
                deleteCategory(category.id);
            });
            
            // 组装分类节点
            categoryInfo.appendChild(indent);
            categoryInfo.appendChild(categoryName);
            categoryInfo.appendChild(categoryStatus);
            
            categoryActions.appendChild(editBtn);
            categoryActions.appendChild(deleteBtn);
            
            categoryNode.appendChild(checkbox);
            categoryNode.appendChild(categoryInfo);
            categoryNode.appendChild(categoryActions);
            
            categoryItem.appendChild(categoryNode);
            
            // 渲染子分类
            if (category.children && category.children.length > 0) {
                var childrenContainer = document.createElement('div');
                childrenContainer.className = 'category-children';
                category.children.forEach(function(child) {
                    childrenContainer.appendChild(renderCategory(child, level + 1));
                });
                categoryItem.appendChild(childrenContainer);
            }
            
            return categoryItem;
        }

        // 清空容器
        treeContainer.innerHTML = '';
        
        // 渲染根分类
        categoryTree.forEach(function(category) {
            treeContainer.appendChild(renderCategory(category, 0));
        });

        // 添加拖拽事件监听
        addDragAndDropEvents();
        
        // 添加复选框事件监听
        addCheckboxEvents();
    }

    // 添加分类
    function addCategory() {
        resetForm();
        document.getElementById('form-title').textContent = '添加分类';
        updateParentCategorySelect();
    }

    // 编辑分类
    function editCategory(id) {
        var categories = getCategories();
        var category = categories.find(function(c) { return c.id === id; });
        if (category) {
            document.getElementById('form-title').textContent = '编辑分类';
            document.getElementById('category-id').value = category.id;
            document.getElementById('category-name').value = category.name;
            document.getElementById('parent-category').value = category.parentId;
            document.getElementById('category-sort').value = category.sort;
            document.getElementById('category-status').value = category.status;
            updateParentCategorySelect();
        }
    }

    // 删除分类
    function deleteCategory(id) {
        if (confirm('确定要删除这个分类吗？删除后无法恢复！')) {
            var categories = getCategories();
            var category = categories.find(function(c) { return c.id === id; });
            
            // 检查是否有子分类
            var hasChildren = categories.some(function(c) { return c.parentId === id; });
            if (hasChildren) {
                showMessage('该分类下有子分类，无法删除！', 'error');
                return;
            }
            
            // 删除分类
            categories = categories.filter(function(c) { return c.id !== id; });
            saveCategories(categories);
            renderCategoryTree();
            updateParentCategorySelect();
            showMessage('分类删除成功！', 'success');
        }
    }

    // 保存分类
    function saveCategory(e) {
        e.preventDefault();
        
        // 表单验证
        var name = document.getElementById('category-name').value.trim();
        if (!name) {
            showMessage('分类名称不能为空！', 'error');
            return;
        }
        
        var id = parseInt(document.getElementById('category-id').value) || 0;
        var parentId = parseInt(document.getElementById('parent-category').value) || 0;
        var sort = parseInt(document.getElementById('category-sort').value) || 0;
        var status = parseInt(document.getElementById('category-status').value) || 1;
        
        // 检查是否是自己的子分类
        if (id > 0 && parentId === id) {
            showMessage('不能将分类设置为自己的子分类！', 'error');
            return;
        }
        
        // 检查是否存在同名分类
        var categories = getCategories();
        var existingCategory = categories.find(function(c) {
            return c.name === name && c.id !== id;
        });
        if (existingCategory) {
            showMessage('分类名称已存在！', 'error');
            return;
        }
        
        var now = new Date().toISOString();
        
        if (id > 0) {
            // 更新分类
            var categoryIndex = categories.findIndex(function(c) { return c.id === id; });
            if (categoryIndex !== -1) {
                categories[categoryIndex] = {
                    ...categories[categoryIndex],
                    name: name,
                    parentId: parentId,
                    sort: sort,
                    status: status,
                    updatedAt: now
                };
                saveCategories(categories);
                showMessage('分类更新成功！', 'success');
            }
        } else {
            // 添加分类
            var maxId = Math.max(...categories.map(function(c) { return c.id; }), 0);
            var newCategory = {
                id: maxId + 1,
                name: name,
                parentId: parentId,
                sort: sort,
                status: status,
                createdAt: now,
                updatedAt: now
            };
            categories.push(newCategory);
            saveCategories(categories);
            showMessage('分类添加成功！', 'success');
        }
        
        // 重置表单
        resetForm();
        // 重新渲染分类树
        renderCategoryTree();
        // 更新父分类选择
        updateParentCategorySelect();
    }

    // 重置表单
    function resetForm() {
        document.getElementById('category-form').reset();
        document.getElementById('category-id').value = '';
        document.getElementById('form-title').textContent = '添加分类';
    }

    // 更新父分类选择
    function updateParentCategorySelect() {
        var select = document.getElementById('parent-category');
        var currentId = parseInt(document.getElementById('category-id').value) || 0;
        
        // 清空现有选项（保留第一个）
        select.innerHTML = '<option value="0">无父分类</option>';
        
        // 获取分类树
        var categoryTree = getCategoryTree();
        
        // 递归添加选项
        function addOptions(categories, level) {
            categories.forEach(function(category) {
                // 排除当前分类
                if (category.id !== currentId) {
                    var option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = ' '.repeat(level * 2) + category.name;
                    select.appendChild(option);
                    
                    // 添加子分类
                    if (category.children && category.children.length > 0) {
                        addOptions(category.children, level + 1);
                    }
                }
            });
        }
        
        addOptions(categoryTree, 1);
    }

    // 显示消息
    function showMessage(message, type) {
        var messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';
        
        // 3秒后自动隐藏
        setTimeout(function() {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    // 更新选中数量
    function updateSelectedCount() {
        var checkboxes = document.querySelectorAll('.category-checkbox:checked');
        var count = checkboxes.length;
        document.getElementById('selected-count').textContent = '已选择: ' + count;
        return checkboxes;
    }

    // 批量操作
    function applyBulkAction() {
        var action = document.getElementById('bulk-action').value;
        var checkboxes = updateSelectedCount();
        var selectedIds = Array.from(checkboxes).map(function(checkbox) { return parseInt(checkbox.dataset.id); });
        
        if (selectedIds.length === 0) {
            showMessage('请选择要操作的分类！', 'error');
            return;
        }
        
        switch (action) {
            case 'delete':
                bulkDelete(selectedIds);
                break;
            case 'move':
                bulkMove(selectedIds);
                break;
            case 'sort':
                bulkSort(selectedIds);
                break;
            default:
                showMessage('请选择操作类型！', 'error');
        }
    }

    // 批量删除
    function bulkDelete(ids) {
        if (confirm('确定要删除选中的 ' + ids.length + ' 个分类吗？删除后无法恢复！')) {
            var categories = getCategories();
            var successCount = 0;
            
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                // 检查是否有子分类
                var hasChildren = categories.some(function(c) { return c.parentId === id; });
                if (!hasChildren) {
                    categories = categories.filter(function(c) { return c.id !== id; });
                    successCount++;
                }
            }
            
            saveCategories(categories);
            renderCategoryTree();
            updateParentCategorySelect();
            showMessage('成功删除 ' + successCount + ' 个分类，' + (ids.length - successCount) + ' 个分类因有子分类无法删除！', 'success');
        }
    }

    // 批量移动
    function bulkMove(ids) {
        var newParentId = prompt('请输入新的父分类ID（0表示无父分类）：');
        if (newParentId === null) return;
        
        newParentId = parseInt(newParentId) || 0;
        var categories = getCategories();
        
        // 检查目标分类是否存在
        var targetCategory = categories.find(function(c) { return c.id === newParentId; });
        if (newParentId !== 0 && !targetCategory) {
            showMessage('目标分类不存在！', 'error');
            return;
        }
        
        // 移动分类
        categories.forEach(function(category) {
            if (ids.includes(category.id)) {
                category.parentId = newParentId;
                category.updatedAt = new Date().toISOString();
            }
        });
        
        saveCategories(categories);
        renderCategoryTree();
        updateParentCategorySelect();
        showMessage('成功移动 ' + ids.length + ' 个分类！', 'success');
    }

    // 批量排序
    function bulkSort(ids) {
        var startSort = prompt('请输入起始排序权重：');
        if (startSort === null) return;
        
        startSort = parseInt(startSort) || 0;
        var categories = getCategories();
        
        // 排序分类
        categories.forEach(function(category) {
            if (ids.includes(category.id)) {
                category.sort = startSort++;
                category.updatedAt = new Date().toISOString();
            }
        });
        
        saveCategories(categories);
        renderCategoryTree();
        showMessage('成功排序 ' + ids.length + ' 个分类！', 'success');
    }

    // 添加拖拽事件监听
    function addDragAndDropEvents() {
        var nodes = document.querySelectorAll('.category-node');
        
        nodes.forEach(function(node) {
            // 拖拽开始
            node.addEventListener('dragstart', function(e) {
                node.classList.add('dragging');
                e.dataTransfer.setData('text/plain', node.dataset.id);
            });
            
            // 拖拽结束
            node.addEventListener('dragend', function() {
                node.classList.remove('dragging');
                // 移除所有drag-over类
                nodes.forEach(function(n) {
                    n.classList.remove('drag-over');
                });
            });
            
            // 拖拽进入
            node.addEventListener('dragover', function(e) {
                e.preventDefault();
                nodes.forEach(function(n) {
                    n.classList.remove('drag-over');
                });
                node.classList.add('drag-over');
            });
            
            // 拖拽离开
            node.addEventListener('dragleave', function() {
                node.classList.remove('drag-over');
            });
            
            // 放置
            node.addEventListener('drop', function(e) {
                e.preventDefault();
                node.classList.remove('drag-over');
                
                var draggedId = parseInt(e.dataTransfer.getData('text/plain'));
                var targetId = parseInt(node.dataset.id);
                
                if (draggedId !== targetId) {
                    // 交换排序权重
                    var categories = getCategories();
                    var draggedCategory = categories.find(function(c) { return c.id === draggedId; });
                    var targetCategory = categories.find(function(c) { return c.id === targetId; });
                    
                    if (draggedCategory && targetCategory) {
                        // 交换排序权重
                        var tempSort = draggedCategory.sort;
                        draggedCategory.sort = targetCategory.sort;
                        targetCategory.sort = tempSort;
                        
                        // 更新时间
                        draggedCategory.updatedAt = new Date().toISOString();
                        targetCategory.updatedAt = new Date().toISOString();
                        
                        saveCategories(categories);
                        renderCategoryTree();
                        showMessage('分类排序已更新！', 'success');
                    }
                }
            });
        });
    }

    // 添加复选框事件监听
    function addCheckboxEvents() {
        var checkboxes = document.querySelectorAll('.category-checkbox');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                updateSelectedCount();
            });
        });
    }

    // 初始化
    initCategories();
    renderCategoryTree();
    updateParentCategorySelect();
    
    // 事件监听
    document.getElementById('btn-add-category').addEventListener('click', addCategory);
    document.getElementById('btn-refresh').addEventListener('click', function() {
        renderCategoryTree();
        showMessage('分类列表已刷新！', 'success');
    });
    document.getElementById('category-form').addEventListener('submit', saveCategory);
    document.getElementById('btn-cancel').addEventListener('click', resetForm);
    document.getElementById('btn-apply-bulk').addEventListener('click', applyBulkAction);
});