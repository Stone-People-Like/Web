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
    
    // Fetch tools data
    var toolsData = [];
    fetch('data/tools.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            toolsData = data;
        })
        .catch(function(error) {
            console.error('Error loading tools data:', error);
        });

    // Get modal additional elements
    var modalTags = document.getElementById('modal-software-tags');
    var modalDesc = document.querySelector('#modal-software-description p');
    var modalFeatures = document.querySelector('#modal-software-features ul');
    var modalLink = document.querySelector('#modal-software-link a');
    
    // Use Event Delegation for "Learn More" buttons to handle both static and dynamic elements
    document.addEventListener('click', function(e) {
        var target = e.target;
        var btn = target.closest('.btn-secondary');
        
        if (btn) {
            e.preventDefault();
            
            // Get software ID
            var softwareId = btn.getAttribute('data-software');
            
            // Find software item in data
            var item = toolsData.find(function(t) { return t.id === softwareId; });
            
            if (item) {
                // Update modal content from data
                if (modalImg) {
                    modalImg.src = item.image;
                    modalImg.alt = item.name;
                }
                if (modalTitle) modalTitle.textContent = item.name;
                
                // Update Tags
                if (modalTags) {
                    modalTags.innerHTML = '';
                    var tags = [item.category, item.payment].concat(item.tags || []);
                    tags.forEach(function(t) {
                        var span = document.createElement('span');
                        span.className = 'tag';
                        span.textContent = t;
                        modalTags.appendChild(span);
                    });
                }
                
                // Update Description
                if (modalDesc) {
                    modalDesc.textContent = item.desc;
                }
                
                // Update Features
                if (modalFeatures) {
                    modalFeatures.innerHTML = '';
                    (item.features || []).forEach(function(f) {
                        var li = document.createElement('li');
                        li.textContent = f;
                        modalFeatures.appendChild(li);
                    });
                }
                
                // Update Link
                if (modalLink) {
                    modalLink.href = item.link || '#';
                }
            } else {
                // Fallback if data not loaded or not found
                if (modalImg) {
                    modalImg.src = 'https://placehold.co/300x200?text=Software';
                    modalImg.alt = 'Software';
                }
                if (modalTitle) modalTitle.textContent = 'Software';
            }
            
            // Show modal
            if (modal) modal.classList.add('active');
        }
    });
    
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
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    
    // If the user has a saved preference, apply it
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }
    
    // Add event listener to the toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Update button text and save preference
            if (body.classList.contains('dark-mode')) {
                themeToggleBtn.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggleBtn.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Ripple Effect for Buttons
    document.addEventListener('click', function(e) {
        // Check if the clicked element is a button with ripple effect support
        if (e.target.classList.contains('btn') || e.target.classList.contains('filter-btn') || e.target.closest('.btn') || e.target.closest('.filter-btn')) {
            const button = e.target.classList.contains('btn') || e.target.classList.contains('filter-btn') ? e.target : e.target.closest('.btn') || e.target.closest('.filter-btn');
            
            // Create ripple element
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            const rect = button.getBoundingClientRect();
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');

            // Remove existing ripple to avoid stacking too many
            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            button.appendChild(circle);
        }
    });
});

// TEMPORARY: 元旦按钮 - 计划于2024年1月15日前删除
// TODO: 删除计划：在2024-01-15之后移除此代码块及其相关按钮。该功能独立实现，不与其他功能耦合。
(function() {
    document.addEventListener('click', function(e) {
        var target = e.target;
        var btn = target.closest('#newyear-btn');
        if (!btn) return;
        e.preventDefault();
        try {
            var overlay = document.createElement('div');
            overlay.id = 'newyear-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
            
            var dialog = document.createElement('div');
            dialog.id = 'newyear-modal';
            dialog.setAttribute('role', 'dialog');
            dialog.setAttribute('aria-modal', 'true');
            // Modified for full screen display
            dialog.style.cssText = 'background:#fff;color:#333;width:100%;height:100%;border-radius:0;overflow:auto;padding:24px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;';
            
            var closeBtn = document.createElement('button');
            closeBtn.id = 'close-newyear';
            closeBtn.textContent = '×';
            closeBtn.style.cssText = 'position:absolute;top:20px;right:20px;background:none;border:none;font-size:36px;color:#333;cursor:pointer;padding:10px;line-height:1;';
            closeBtn.addEventListener('click', function() {
                if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
            });
            
            var title = document.createElement('h1');
            title.textContent = '23数媒2班元旦快乐';
            title.style.cssText = 'margin:0 0 20px;font-size:36px;color:#4CAF50;margin-top:40px;'; // Moved to top with margin
            
            var content = document.createElement('div');
            content.style.cssText = 'text-align:center;width:100%;max-width:95vw;flex:1;display:flex;flex-direction:column;align-items:center;'; // Increased max-width to 95vw
            
            var prizes = [];
            // Generate prizes based on counts
            function addPrizes(name, count) {
                for(var i=0; i<count; i++) prizes.push(name);
            }
            
            addPrizes('笔记本', 6);
            addPrizes('修正带', 10);
            addPrizes('红黑笔套装', 10);
            addPrizes('2B涂卡笔', 10);
            addPrizes('餐巾纸', 10);
            addPrizes('红包', 1);
            addPrizes('送花给花姐(赠红包)', 1);
            
            // Shuffle prizes
            prizes.sort(function() { return 0.5 - Math.random(); });
            
            // Prize List Display
            var prizeList = document.createElement('div');
            prizeList.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-bottom:20px;width:100%;max-height:55vh;overflow-y:auto;padding:30px;'; // Increased gap and padding
            
            prizes.forEach(function(prize) {
                var item = document.createElement('div');
                item.textContent = prize;
                item.style.cssText = 'background:#f0f0f0;padding:18px 36px;border-radius:35px;font-size:26px;color:#555;border:1px solid #ddd;white-space:nowrap;box-shadow:0 5px 12px rgba(0,0,0,0.12);'; // Further increased padding and font-size
                prizeList.appendChild(item);
            });
            
            // Lottery System
            var lotteryContainer = document.createElement('div');
            lotteryContainer.style.cssText = 'padding:40px;margin-top:auto;margin-bottom:auto;width:100%;box-sizing:border-box;'; // Removed background and shadow
            
            var lotteryResult = document.createElement('div');
            lotteryResult.id = 'lottery-result';
            lotteryResult.textContent = '点击下方按钮开始抽奖';
            lotteryResult.style.cssText = 'font-size:28px;margin-bottom:30px;min-height:50px;color:#333;font-weight:bold;';
            
            var lotteryBtn = document.createElement('button');
            lotteryBtn.className = 'btn';
            lotteryBtn.textContent = '开始抽奖';
            lotteryBtn.style.cssText = 'padding:20px 60px;font-size:24px;background:#4CAF50;color:white;border:none;border-radius:40px;cursor:pointer;transition:transform 0.2s;box-shadow:0 5px 15px rgba(76, 175, 80, 0.3);';
            
            var resetBtn = document.createElement('button');
            resetBtn.className = 'btn';
            resetBtn.textContent = '重置';
            resetBtn.style.cssText = 'padding:20px 60px;font-size:24px;background:#9E9E9E;color:white;border:none;border-radius:40px;cursor:pointer;transition:transform 0.2s;box-shadow:0 5px 15px rgba(158, 158, 158, 0.3);';
            // TODO: Add reset functionality
            
            var btnContainer = document.createElement('div');
            btnContainer.style.cssText = 'display:flex;gap:20px;justify-content:center;margin-bottom:15px;';
            btnContainer.appendChild(lotteryBtn);
            btnContainer.appendChild(resetBtn);
            
            var isRolling = false;
            // Track drawn prizes
            var drawnIndices = new Set();
            
            // Stats Display
            var statsDisplay = document.createElement('div');
            statsDisplay.id = 'lottery-stats';
            statsDisplay.style.cssText = 'font-size:18px;color:#666;margin-top:10px;font-weight:bold;line-height:1.6;';
            
            function updateStats() {
                var drawnCount = drawnIndices.size;
                var remainingCount = prizes.length - drawnCount;
                
                // Count remaining prizes by type
                var remainingByType = {};
                for (var i = 0; i < prizes.length; i++) {
                    if (!drawnIndices.has(i)) {
                        var type = prizes[i];
                        remainingByType[type] = (remainingByType[type] || 0) + 1;
                    }
                }
                
                var statsHtml = '<div>已抽次数：' + drawnCount + ' / 剩余总数：' + remainingCount + '</div>';
                statsHtml += '<div style="font-size:14px;margin-top:10px;display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">';
                
                for (var type in remainingByType) {
                    statsHtml += '<span style="background:#e0e0e0;padding:2px 8px;border-radius:10px;">' + type + ': ' + remainingByType[type] + '</span>';
                }
                statsHtml += '</div>';
                
                statsDisplay.innerHTML = statsHtml;
            }
            
            // Initialize stats
            updateStats();
            
            // Reset functionality
            resetBtn.addEventListener('click', function() {
                if (isRolling) return;
                
                if (!confirm('确定要重置所有抽奖记录吗？这将开始新的一轮游戏。')) {
                    return;
                }
                
                drawnIndices.clear();
                
                // Reset all prize items styles
                var items = prizeList.children;
                for (var i = 0; i < items.length; i++) {
                    items[i].style.background = '#f0f0f0';
                    items[i].style.color = '#555';
                    items[i].style.transform = 'scale(1)';
                    items[i].style.boxShadow = '0 3px 8px rgba(0,0,0,0.08)';
                    items[i].style.opacity = '1';
                    items[i].style.textDecoration = 'none';
                }
                
                lotteryResult.textContent = '点击下方按钮开始抽奖';
                lotteryResult.style.color = '#333';
                lotteryResult.style.transform = 'scale(1)';
                
                lotteryBtn.textContent = '开始抽奖';
                lotteryBtn.disabled = false;
                lotteryBtn.style.opacity = '1';
                
                // Reset stats
                updateStats();
            });
            
            lotteryBtn.addEventListener('click', function() {
                if (isRolling) return;
                
                // Check if all prizes drawn
                if (drawnIndices.size >= prizes.length) {
                    lotteryResult.textContent = '所有奖品已抽完！请点击重置';
                    lotteryResult.style.color = '#ff4444';
                    return;
                }
                
                isRolling = true;
                lotteryBtn.disabled = true;
                lotteryBtn.style.opacity = '0.7';
                resetBtn.disabled = true;
                resetBtn.style.opacity = '0.7';
                
                var prizeItems = prizeList.children;
                var currentIndex = -1;
                var speed = 50; // Initial speed (fast)
                var steps = 0;
                var maxSteps = 50 + Math.floor(Math.random() * 20); // Total steps (random)
                var timer;
                
                // Get available indices
                var availableIndices = [];
                for (var i = 0; i < prizes.length; i++) {
                    if (!drawnIndices.has(i)) {
                        availableIndices.push(i);
                    }
                }
                
                function roll() {
                    // Remove highlight from previous item (unless it's already drawn)
                    if (currentIndex !== -1 && !drawnIndices.has(currentIndex)) {
                        prizeItems[currentIndex].style.background = '#f0f0f0';
                        prizeItems[currentIndex].style.color = '#555';
                        prizeItems[currentIndex].style.transform = 'scale(1)';
                        prizeItems[currentIndex].style.boxShadow = '0 3px 8px rgba(0,0,0,0.08)';
                    }
                    
                    // Move to next item (randomly from available)
                    var randomAvailableIndex = Math.floor(Math.random() * availableIndices.length);
                    currentIndex = availableIndices[randomAvailableIndex];
                    
                    // Highlight current item
                    prizeItems[currentIndex].style.background = '#4CAF50';
                    prizeItems[currentIndex].style.color = '#fff';
                    prizeItems[currentIndex].style.transform = 'scale(1.1)';
                    prizeItems[currentIndex].style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.4)';
                    prizeItems[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                    
                    lotteryResult.textContent = prizes[currentIndex];
                    
                    steps++;
                    
                    // Speed control logic
                    if (steps < maxSteps) {
                        if (steps > maxSteps - 10) {
                            speed += 30; // Slow down significantly at the end
                        } else if (steps > maxSteps - 20) {
                            speed += 10; // Start slowing down
                        }
                        timer = setTimeout(roll, speed);
                    } else {
                        // Finished
                        isRolling = false;
                        lotteryBtn.disabled = false;
                        lotteryBtn.style.opacity = '1';
                        lotteryBtn.textContent = '再次抽奖';
                        resetBtn.disabled = false;
                        resetBtn.style.opacity = '1';
                        
                        // Add to drawn set
                        drawnIndices.add(currentIndex);
                        
                        // Update stats
                        updateStats();
                        
                        // Mark item as drawn
                        prizeItems[currentIndex].style.background = '#ddd';
                        prizeItems[currentIndex].style.color = '#999';
                        prizeItems[currentIndex].style.textDecoration = 'line-through';
                        prizeItems[currentIndex].style.transform = 'scale(0.95)';
                        prizeItems[currentIndex].style.boxShadow = 'none';
                        
                        // Final highlight effect
                        lotteryResult.style.color = '#ff4444';
                        lotteryResult.style.transform = 'scale(1.2)';
                        setTimeout(function() {
                            lotteryResult.style.transform = 'scale(1)';
                        }, 200);
                    }
                }
                
                roll();
            });
            
            lotteryContainer.appendChild(lotteryResult);
            lotteryContainer.appendChild(btnContainer);
            lotteryContainer.appendChild(statsDisplay);
            
            content.appendChild(prizeList);
            content.appendChild(lotteryContainer);
            
            dialog.appendChild(closeBtn);
            dialog.appendChild(title);
            dialog.appendChild(content);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', function(ev) {
                if (ev.target === overlay) {
                    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                }
            });
        } catch (err) {
            console.error('打开元旦窗口失败:', err);
        }
    });
})();
