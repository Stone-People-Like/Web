// Modal functionality with dynamic content
window.addEventListener('load', function() {
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
});