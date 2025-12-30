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
            dialog.style.cssText = 'background:#fafafa;color:#333;width:100%;height:100%;border-radius:0;overflow:auto;padding:1.5rem;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;animation:fadeIn 0.5s ease-out;';
            
            // Add custom keyframe animations
            var styleSheet = document.createElement("style");
            styleSheet.innerText = `
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                @keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; } }
                @keyframes firework {
                    0% { transform: translate(var(--x), var(--initialY)); width: var(--initialSize); opacity: 1; }
                    50% { width: 0.5rem; opacity: 1; }
                    100% { width: var(--finalSize); opacity: 0; }
                }
                .firework, .firework::before, .firework::after {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 1rem;
                    aspect-ratio: 1;
                    background: radial-gradient(circle, #ff0 0.5rem, #0000 0) 50% 0% / 50% 50%, 
                                radial-gradient(circle, #ff5722 0.5rem, #0000 0) 0% 50% / 50% 50%, 
                                radial-gradient(circle, #ff0 0.5rem, #0000 0) 50% 100% / 50% 50%, 
                                radial-gradient(circle, #ff5722 0.5rem, #0000 0) 100% 50% / 50% 50%, 
                                radial-gradient(circle, #ff0 0.5rem, #0000 0) 50% 50% / 50% 50%,
                                radial-gradient(circle, #2196f3 0.3rem, #0000 0) 20% 20% / 50% 50%,
                                radial-gradient(circle, #4caf50 0.3rem, #0000 0) 80% 80% / 50% 50%;
                    background-repeat: no-repeat;
                    transform: translate(-50%, -50%);
                    z-index: 998;
                    animation: firework 1.5s infinite;
                    transition: opacity 0.5s ease-out; /* Add fade out transition */
                }
                .firework::before {
                    content: "";
                    transform: translate(-50%, -50%) rotate(45deg);
                }
                .firework::after {
                    content: "";
                    transform: translate(-50%, -50%) rotate(-45deg);
                }
                .prize-item { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
                .prize-item:hover { transform: translateY(-0.1875rem) scale(1.01) !important; box-shadow: 0 0.3125rem 0.9375rem rgba(0,0,0,0.1) !important; }
                
                @media (max-width: 768px) {
                    #newyear-modal h1 { font-size: 1.75rem !important; margin-bottom: 1.25rem !important; }
                    .prize-item { padding: 0.75rem 1.5rem !important; font-size: 1.125rem !important; }
                    #lottery-result { font-size: 1.25rem !important; min-height: 2.5rem !important; }
                    #lottery-stats { font-size: 0.875rem !important; }
                    .btn { padding: 0.75rem 1.875rem !important; font-size: 1.125rem !important; }
                }
            `;
            document.head.appendChild(styleSheet);
            
            // Initial Fireworks Effect
            var leftFirework = document.createElement('div');
            leftFirework.className = 'firework';
            leftFirework.style.cssText = 'position:absolute;left:10%;top:20%;--x:-50%;--initialY:100%;--initialSize:0.5rem;--finalSize:20rem;animation-delay:0.2s;';
            
            var rightFirework = document.createElement('div');
            rightFirework.className = 'firework';
            rightFirework.style.cssText = 'position:absolute;right:10%;top:20%;--x:50%;--initialY:100%;--initialSize:0.5rem;--finalSize:20rem;animation-delay:0.5s;';
            
            // Add more random fireworks
            var fireworkTimeouts = [];
            for(var i=0; i<15; i++) { // Increased count to 15 for more randomness
                var timeout = setTimeout(function() {
                    var fw = document.createElement('div');
                    fw.className = 'firework';
                    fw.style.left = (Math.random() * 90 + 5) + '%'; // Full width random
                    fw.style.top = (Math.random() * 60 + 10) + '%'; // Random height
                    fw.style.setProperty('--x', (Math.random() > 0.5 ? '-' : '') + '50%');
                    fw.style.setProperty('--initialY', '60%');
                    fw.style.setProperty('--initialSize', (0.3 + Math.random() * 0.5) + 'rem'); // Random size
                    fw.style.setProperty('--finalSize', (10 + Math.random() * 25) + 'rem'); // Random burst size
                    fw.style.animationDuration = (1 + Math.random() * 1.5) + 's'; // Random speed
                    dialog.appendChild(fw);
                    
                    // Remove firework element after animation
                    setTimeout(function() {
                        if (fw.parentNode) fw.parentNode.removeChild(fw);
                    }, 2500);
                }, Math.random() * 2000); // Random delay within 2 seconds
                fireworkTimeouts.push(timeout);
            }
            
            // dialog.appendChild(leftFirework); // Remove fixed fireworks
            // dialog.appendChild(rightFirework);
            
            var closeBtn = document.createElement('button');
            closeBtn.id = 'close-newyear';
            closeBtn.textContent = '×';
            closeBtn.style.cssText = 'position:absolute;top:1.875rem;right:1.875rem;background:transparent;border:none;font-size:2.5rem;color:#999;cursor:pointer;width:3.125rem;height:3.125rem;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;z-index:100;';
            closeBtn.onmouseover = function() { this.style.transform = 'rotate(90deg)'; this.style.color = '#333'; };
            closeBtn.onmouseout = function() { this.style.transform = 'rotate(0deg)'; this.style.color = '#999'; };
            
            closeBtn.addEventListener('click', function() {
                if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                // Clear any pending firework timeouts
                fireworkTimeouts.forEach(function(t) { clearTimeout(t); });
            });
            
            var title = document.createElement('h1');
            title.textContent = '23数媒2班元旦快乐';
            title.style.cssText = 'margin:0 0 2.5rem;font-size:2.625rem;color:#2c3e50;margin-top:1.25rem;font-weight:300;letter-spacing:0.25rem;animation:bounceIn 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000);';
            
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
            
            // Shuffle prizes
            for (var i = prizes.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = prizes[i];
                prizes[i] = prizes[j];
                prizes[j] = temp;
            }
            
            // Prize List Display
            var prizeList = document.createElement('div');
            prizeList.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:1.25rem;margin-bottom:1.25rem;width:100%;max-height:55vh;overflow-y:auto;padding:1.875rem;'; // Increased gap and padding
            
            prizes.forEach(function(prize) {
                var item = document.createElement('div');
                item.className = 'prize-item'; // Add class for hover effects
                item.textContent = prize;
                item.style.cssText = 'background:white;padding:1.5rem 3rem;border-radius:0.5rem;font-size:1.5rem;color:#333;border:0.0625rem solid #eee;white-space:nowrap;box-shadow:0 0.125rem 0.5rem rgba(0,0,0,0.05);cursor:default;'; // Minimalist item style
                prizeList.appendChild(item);
            });
            
            // Lottery System
            var lotteryContainer = document.createElement('div');
            lotteryContainer.style.cssText = 'padding:2.5rem;margin-top:auto;margin-bottom:auto;width:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;'; 
            
            var lotteryResult = document.createElement('div');
            lotteryResult.id = 'lottery-result';
            lotteryResult.textContent = '点击下方按钮开始抽奖';
            lotteryResult.style.cssText = 'font-size:1.75rem;margin-bottom:2.5rem;min-height:3.75rem;color:#333;font-weight:300;transition:all 0.3s ease;';
            
            var lotteryBtn = document.createElement('button');
            lotteryBtn.className = 'btn';
            lotteryBtn.textContent = '开始抽奖';
            lotteryBtn.style.cssText = 'padding:1.125rem 3.125rem;font-size:1.25rem;background:#333;color:white;border:none;border-radius:0.25rem;cursor:pointer;transition:all 0.3s ease;box-shadow:none;font-weight:500;letter-spacing:0.0625rem;';
            lotteryBtn.onmouseover = function() { this.style.background = '#000'; this.style.transform = 'translateY(-0.125rem)'; };
            lotteryBtn.onmouseout = function() { this.style.background = '#333'; this.style.transform = 'translateY(0)'; };
            
            var resetBtn = document.createElement('button');
            resetBtn.className = 'btn';
            resetBtn.textContent = '重置';
            resetBtn.style.cssText = 'padding:1.125rem 3.125rem;font-size:1.25rem;background:transparent;color:#666;border:0.0625rem solid #ddd;border-radius:0.25rem;cursor:pointer;transition:all 0.3s ease;box-shadow:none;font-weight:500;letter-spacing:0.0625rem;';
            resetBtn.onmouseover = function() { this.style.borderColor = '#999'; this.style.color = '#333'; };
            resetBtn.onmouseout = function() { this.style.borderColor = '#ddd'; this.style.color = '#666'; };
            // TODO: Add reset functionality
            
            var btnContainer = document.createElement('div');
            btnContainer.style.cssText = 'display:flex;gap:1.25rem;justify-content:center;margin-bottom:0.9375rem;';
            btnContainer.appendChild(lotteryBtn);
            btnContainer.appendChild(resetBtn);
            
            var isRolling = false;
            // Track drawn prizes
            var drawnIndices = new Set();
            
            // Stats Display
            var statsDisplay = document.createElement('div');
            statsDisplay.id = 'lottery-stats';
            statsDisplay.style.cssText = 'font-size:1.125rem;color:#666;margin-top:0.625rem;font-weight:bold;line-height:1.6;';
            
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
                statsHtml += '<div style="font-size:0.875rem;margin-top:0.625rem;display:flex;flex-wrap:wrap;justify-content:center;gap:0.625rem;">';
                
                for (var type in remainingByType) {
                    statsHtml += '<span style="background:#e0e0e0;padding:0.125rem 0.5rem;border-radius:0.625rem;">' + type + ': ' + remainingByType[type] + '</span>';
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
                    items[i].style.background = 'white';
                    items[i].style.color = '#333';
                    items[i].style.transform = 'scale(1)';
                    items[i].style.boxShadow = '0 0.125rem 0.5rem rgba(0,0,0,0.05)';
                    items[i].style.opacity = '1';
                    items[i].style.textDecoration = 'none';
                    items[i].style.borderColor = '#eee';
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
                
                // Mark previously drawn items as gray (in case the last winner is still highlighted)
                drawnIndices.forEach(function(index) {
                    var item = prizeList.children[index];
                    item.style.background = '#f9f9f9';
                    item.style.color = '#ccc';
                    item.style.borderColor = '#eee';
                    item.style.textDecoration = 'none';
                    item.style.opacity = '0.6';
                    item.style.transform = 'scale(1)';
                    item.style.boxShadow = 'none';
                    item.style.zIndex = 'auto';
                });
                
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
                        prizeItems[currentIndex].style.background = 'white';
                        prizeItems[currentIndex].style.color = '#333';
                        prizeItems[currentIndex].style.transform = 'scale(1)';
                        prizeItems[currentIndex].style.boxShadow = '0 0.125rem 0.5rem rgba(0,0,0,0.05)';
                        prizeItems[currentIndex].style.borderColor = '#eee';
                    }
                    
                    // Move to next item (randomly from available)
                    var randomAvailableIndex = Math.floor(Math.random() * availableIndices.length);
                    currentIndex = availableIndices[randomAvailableIndex];
                    
                    // Highlight current item
                    prizeItems[currentIndex].style.background = '#333';
                    prizeItems[currentIndex].style.color = '#fff';
                    prizeItems[currentIndex].style.transform = 'scale(1.1)';
                    prizeItems[currentIndex].style.boxShadow = '0 0.625rem 1.875rem rgba(0,0,0,0.15)';
                    prizeItems[currentIndex].style.zIndex = '10';
                    prizeItems[currentIndex].style.borderColor = '#333';
                    prizeItems[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                    
                    lotteryResult.textContent = prizes[currentIndex];
                    lotteryResult.style.transform = 'scale(1.05)';
                    
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
                        
                        // Keep the winner highlighted (Modern Minimalist Style)
                        prizeItems[currentIndex].style.background = '#333';
                        prizeItems[currentIndex].style.color = '#fff';
                        prizeItems[currentIndex].style.borderColor = '#333';
                        prizeItems[currentIndex].style.textDecoration = 'none';
                        prizeItems[currentIndex].style.opacity = '1';
                        prizeItems[currentIndex].style.transform = 'scale(1.15)';
                        prizeItems[currentIndex].style.boxShadow = '0 0.9375rem 1.875rem rgba(0,0,0,0.2)';
                        prizeItems[currentIndex].style.zIndex = '20';
                        
                        // Final highlight effect
                        lotteryResult.style.color = '#333';
                        lotteryResult.style.textShadow = 'none';
                        lotteryResult.style.fontWeight = '500';
                        lotteryResult.style.animation = 'bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        
                        // Confetti effect (simple simulation)
                        // Add random fireworks effect for winning
                        for(var i=0; i<8; i++) {
                            setTimeout(function() {
                                var fw = document.createElement('div');
                                fw.className = 'firework';
                                fw.style.left = (Math.random() * 90 + 5) + '%';
                                fw.style.top = (Math.random() * 60 + 10) + '%';
                                fw.style.setProperty('--x', (Math.random() > 0.5 ? '-' : '') + '50%');
                                fw.style.setProperty('--initialY', '60%');
                                fw.style.setProperty('--initialSize', (0.3 + Math.random() * 0.5) + 'rem');
                                fw.style.setProperty('--finalSize', (15 + Math.random() * 20) + 'rem');
                                fw.style.animationDuration = (1 + Math.random() * 1) + 's';
                                
                                // Append to dialog instead of overlay to be contained
                                dialog.appendChild(fw);
                                
                                // Fade out before removing
                                setTimeout(function() {
                                    fw.style.opacity = '0';
                                    setTimeout(function() {
                                        if(fw.parentNode) fw.parentNode.removeChild(fw);
                                    }, 500);
                                }, 1500);
                            }, i * 300);
                        }
                        
                        setTimeout(function() {
                            lotteryResult.style.animation = '';
                            lotteryResult.style.transform = 'scale(1)';
                        }, 500);
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
                    // Clear any pending firework timeouts
                    fireworkTimeouts.forEach(function(t) { clearTimeout(t); });
                }
            });
        } catch (err) {
            console.error('打开元旦窗口失败:', err);
        }
    });
})();
