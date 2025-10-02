document.addEventListener('DOMContentLoaded', () => {
    // Wait for the first phase (S1) to complete
    const checkForL1 = setInterval(() => {
        const l1Box = document.querySelector('.l1');
        if (!l1Box) return;
        
        clearInterval(checkForL1);
        initImageScroller();
    }, 500);
    
    function initImageScroller() {
        const l1Box = document.querySelector('.l1');
        const imageContainer = l1Box.querySelector('.image-container');
        
        // Jasmine images
        const imageUrls = [
            './jasmine png/jasmine1.png',
            './jasmine png/jasmine2.png',
            './jasmine png/jasmine3.png',
            './jasmine png/jasmine4.png',
            './jasmine png/jasmine5.png',
            './jasmine png/jasmine6.png',
            './jasmine png/jasmine7.png',
            './jasmine png/jasmine8.png'
        ];
        
        // Clear any existing images
        imageContainer.innerHTML = '';
        
        // Create image elements
        const images = [];
        let currentIndex = 0;
        let isAnimating = false;
        
        // Load and display images
        imageUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.alt = `Jasmine ${index + 1}`;
            img.className = 'scroll-image';
            
            // Add to DOM
            imageContainer.appendChild(img);
            images.push(img);
            
            // Show first image when loaded
            img.onload = () => {
                if (index === 0) {
                    img.classList.add('active');
                }
            };
        });
    
        // Function to change image
        function changeImage(direction) {
            if (isAnimating || images.length <= 1) return;
            
            isAnimating = true;
            
            // Fade out current image
            const currentImg = images[currentIndex];
            currentImg.classList.remove('active');
            
            // Update index based on direction
            if (direction === 'next') {
                currentIndex = (currentIndex + 1) % images.length;
            } else {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
            
            // Fade in new image
            setTimeout(() => {
                const nextImg = images[currentIndex];
                nextImg.classList.add('active');
                isAnimating = false;
            }, 300);
        }
    
    // Handle wheel events for image scrolling
    function handleWheel(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const delta = Math.sign(e.deltaY);
        
        if (delta > 0) {
            changeImage('next');
        } else if (delta < 0) {
            changeImage('prev');
        }
        
        return false;
    }
    
    // Handle keyboard navigation for images
    function handleKeyDown(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            changeImage('next');
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            changeImage('prev');
        }
    }
    
        // Set up wheel event for scrolling
        l1Box.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = Math.sign(e.deltaY);
            
            if (delta > 0) {
                changeImage('next');
            } else if (delta < 0) {
                changeImage('prev');
            }
        }, { passive: false });
        
        // Set up keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                changeImage('next');
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                changeImage('prev');
            }
        });
        
        // Set up touch events for mobile
        let touchStartY = 0;
        
        l1Box.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        l1Box.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 30) { // Minimum swipe distance
                if (diff > 0) {
                    changeImage('next');
                } else {
                    changeImage('prev');
                }
            }
        }, { passive: true });
    }
});
