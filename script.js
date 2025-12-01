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
                    modalImg.src = 'img/chrome.png';
                    modalImg.alt = 'Google Chrome';
                    modalTitle.textContent = 'Google Chrome';
                    break;
                case 'wps':
                    modalImg.src = 'img/wps.png';
                    modalImg.alt = 'WPS Office';
                    modalTitle.textContent = 'WPS Office';
                    break;
                case 'pycharm':
                    modalImg.src = 'img/pycharm.jpg';
                    modalImg.alt = 'PyCharm';
                    modalTitle.textContent = 'PyCharm';
                    break;
                case 'webstorm':
                    modalImg.src = 'img/webstrom.jpg';
                    modalImg.alt = 'WebStorm';
                    modalTitle.textContent = 'WebStorm';
                    break;
                case 'typora':
                    modalImg.src = 'img/typora.jpg';
                    modalImg.alt = 'Typora';
                    modalTitle.textContent = 'Typora';
                    break;
                case 'hbuilder':
                    modalImg.src = 'img/hbuilder.png';
                    modalImg.alt = 'HBuilderX';
                    modalTitle.textContent = 'HBuilderX';
                    break;
                case 'dism':
                    modalImg.src = 'img/dism.webp';
                    modalImg.alt = 'Dism++';
                    modalTitle.textContent = 'Dism++';
                    break;
                case 'windows-super':
                    modalImg.src = 'img/Windowssuper.png';
                    modalImg.alt = 'Windows超级管理器';
                    modalTitle.textContent = 'Windows超级管理器';
                    break;
                case 'context-menu':
                    modalImg.src = 'img/ContextMenuManager.png';
                    modalImg.alt = 'Context Menu Manager';
                    modalTitle.textContent = 'Context Menu Manager';
                    break;
                case 'idm':
                    modalImg.src = 'img/IDM.jpg';
                    modalImg.alt = 'Internet Download Manager';
                    modalTitle.textContent = 'Internet Download Manager';
                    break;
                case 'geek':
                    modalImg.src = 'img/GEEK.jpg';
                    modalImg.alt = 'Geek Uninstaller';
                    modalTitle.textContent = 'Geek Uninstaller';
                    break;
                case 'clash-verge':
                    modalImg.src = 'img/ClashVerge.jpg';
                    modalImg.alt = 'Clash Verge';
                    modalTitle.textContent = 'Clash Verge';
                    break;
                case 'winrar':
                    modalImg.src = 'img/winrar.jpg';
                    modalImg.alt = 'WinRAR';
                    modalTitle.textContent = 'WinRAR';
                    break;
                case 'steam':
                    modalImg.src = 'img/steam.jpg';
                    modalImg.alt = 'Steam';
                    modalTitle.textContent = 'Steam';
                    break;
                case 'wechat':
                    modalImg.src = 'img/wechat.png';
                    modalImg.alt = '微信';
                    modalTitle.textContent = '微信';
                    break;
                case 'qq':
                    modalImg.src = 'img/QQ.png';
                    modalImg.alt = 'QQ';
                    modalTitle.textContent = 'QQ';
                    break;
                case 'netease-music':
                    modalImg.src = 'img/music.jpg';
                    modalImg.alt = '网易云音乐';
                    modalTitle.textContent = '网易云音乐';
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
    
});
