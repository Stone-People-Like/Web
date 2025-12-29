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
            var win = window.open('', 'newyearWindow', 'width=800,height=600,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes');
            if (!win) return;
            win.document.write(
                '<!DOCTYPE html>' +
                '<html lang="zh-CN"><head>' +
                '<meta charset="UTF-8">' +
                '<title>元旦快乐</title>' +
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                '<style>' +
                'body{font-family:Microsoft YaHei,Arial,sans-serif;margin:0;padding:20px;background:#f5f5f5;color:#333;}' +
                '.container{max-width:760px;margin:0 auto;background:#fff;border-radius:8px;box-shadow:0 5px 15px rgba(0,0,0,0.1);padding:24px;}' +
                'h1{margin:0 0 16px;font-size:24px;color:#4CAF50;}' +
                'p{margin:12px 0 24px;font-size:16px;color:#666;}' +
                '.btn{display:inline-block;background:#4CAF50;color:#fff;text-decoration:none;border:none;border-radius:6px;padding:10px 16px;cursor:pointer;transition:all .3s;}' +
                '.btn:hover{background:#45a049;transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.15);}' +
                '.btn:active{transform:translateY(0);box-shadow:0 4px 10px rgba(0,0,0,0.1);}' +
                '</style>' +
                '</head><body>' +
                '<div class="container">' +
                '<h1>元旦快乐</h1>' +
                '<p>此处为元旦活动内容</p>' +
                '<button class="btn" id="close-newyear">关闭窗口</button>' +
                '</div>' +
                '<script>' +
                'document.addEventListener(\"click\",function(e){if(e.target && e.target.id===\"close-newyear\"){window.close();}});' +
                '</script>' +
                '</body></html>'
            );
            win.document.close();
        } catch (err) {
            console.error('打开元旦窗口失败:', err);
        }
    });
})();
