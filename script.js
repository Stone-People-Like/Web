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
});
