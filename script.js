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
            title.textContent = '元旦快乐';
            title.style.cssText = 'margin:0 0 20px;font-size:36px;color:#4CAF50;margin-top:40px;'; // Moved to top with margin
            
            var content = document.createElement('div');
            content.style.cssText = 'text-align:center;width:100%;max-width:95vw;flex:1;display:flex;flex-direction:column;align-items:center;'; // Increased max-width to 95vw
            
            var prizes = [
                '特等奖：iPhone 15', '特等奖：MacBook Air', '特等奖：PS5', '特等奖：iPad Air',
                '一等奖：机械键盘', '一等奖：蓝牙耳机', '一等奖：智能手表', '一等奖：拍立得',
                '一等奖：电竞椅', '一等奖：显示器', '一等奖：投影仪', '一等奖：Switch',
                '二等奖：鼠标垫', '二等奖：U盘', '二等奖：移动电源', '二等奖：蓝牙音箱',
                '二等奖：台灯', '二等奖：抱枕', '二等奖：保温杯', '二等奖：双肩包',
                '二等奖：无线鼠标', '二等奖：加湿器', '二等奖：手办', '二等奖：京东卡',
                '三等奖：笔记本', '三等奖：签字笔', '三等奖：钥匙扣', '三等奖：手机支架',
                '三等奖：数据线', '三等奖：帆布袋', '三等奖：贴纸', '三等奖：零食礼包',
                '三等奖：饮料', '三等奖：纸巾', '三等奖：口罩', '三等奖：洗手液',
                '幸运奖：优惠券', '幸运奖：代金券', '幸运奖：体验卡', '幸运奖：会员月卡',
                '幸运奖：积分', '幸运奖：红包', '幸运奖：谢谢参与', '幸运奖：再接再厉',
                '幸运奖：明年再来', '幸运奖：笑口常开', '幸运奖：身体健康', '幸运奖：万事如意'
            ];
            
            // Prize List Display
            var prizeList = document.createElement('div');
            prizeList.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:20px;width:100%;max-height:40vh;overflow-y:auto;padding:15px;'; // Increased gap and padding
            
            prizes.forEach(function(prize) {
                var item = document.createElement('div');
                item.textContent = prize;
                item.style.cssText = 'background:#f0f0f0;padding:10px 20px;border-radius:20px;font-size:16px;color:#555;border:1px solid #ddd;white-space:nowrap;box-shadow:0 2px 5px rgba(0,0,0,0.05);'; // Increased padding and font-size
                prizeList.appendChild(item);
            });
            
            // Lottery System
            var lotteryContainer = document.createElement('div');
            lotteryContainer.style.cssText = 'background:#f9f9f9;padding:40px;border-radius:15px;box-shadow:0 5px 15px rgba(0,0,0,0.1);margin-top:auto;margin-bottom:auto;width:100%;box-sizing:border-box;';
            
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
            btnContainer.style.cssText = 'display:flex;gap:20px;justify-content:center;';
            btnContainer.appendChild(lotteryBtn);
            btnContainer.appendChild(resetBtn);
            
            var isRolling = false;
            
            lotteryBtn.addEventListener('click', function() {
                if (isRolling) return;
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
                
                function roll() {
                    // Remove highlight from previous item
                    if (currentIndex !== -1) {
                        prizeItems[currentIndex].style.background = '#f0f0f0';
                        prizeItems[currentIndex].style.color = '#555';
                        prizeItems[currentIndex].style.transform = 'scale(1)';
                        prizeItems[currentIndex].style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                    }
                    
                    // Move to next item (randomly)
                    currentIndex = Math.floor(Math.random() * prizeItems.length);
                    
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
