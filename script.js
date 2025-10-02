document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.querySelector('.text-container');
    const textBlocks = document.querySelectorAll('.text-block');
    const middleBox = document.querySelector('.middle-box');
    const l1Box = document.querySelector('.l1');
    let currentIndex = 0;
    let isAnimating = false;
    let touchStartY = 0;
    let wheelTimeout;
    let isOnLastBlock = false;
    let isScrolling = false;
    let lastScrollY = window.scrollY;

    // Initialize the text blocks
    function initTextBlocks() {
        textBlocks.forEach((block, index) => {
            // Set initial state
            block.style.opacity = '0';
            block.style.transform = 'translateY(30px)';
            block.classList.remove('active', 'prev', 'next');
            
            // Set first block as active
            if (index === 0) {
                block.classList.add('active');
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }
        });
    }

    // Change to a specific text block
    function goToBlock(index) {
        if (isAnimating || index < 0 || index >= textBlocks.length || index === currentIndex) return;
        
        isAnimating = true;
        const currentBlock = textBlocks[currentIndex];
        const nextBlock = textBlocks[index];
        
        // Fade out current block
        currentBlock.style.opacity = '0';
        currentBlock.style.transform = index > currentIndex ? 'translateY(-30px)' : 'translateY(30px)';
        
        // Fade in next block
        nextBlock.style.opacity = '1';
        nextBlock.style.transform = 'translateY(0)';
        
        // Update current index
        currentIndex = index;
        
        // Set a timeout to reset animation flag
        setTimeout(() => {
            isAnimating = false;
            
            // If we've reached the last block, prepare for scroll
            if (currentIndex === textBlocks.length - 1) {
                isOnLastBlock = true;
            }
        }, 800); // Match this with your CSS transition duration
    }
    
    // Update prev/next classes for smooth transitions
    function updateAdjacentBlocks() {
        textBlocks.forEach((block, index) => {
            block.classList.remove('prev', 'next');
            
            if (index === currentIndex - 1) {
                block.classList.add('prev');
                block.style.opacity = '0.6';
            } else if (index === currentIndex + 1) {
                block.classList.add('next');
                block.style.opacity = '0.6';
            } else if (index !== currentIndex) {
                block.style.opacity = '0';
            } else {
                block.style.opacity = '1';
            }
        });
    }

    // Handle wheel events
    function handleWheel(e) {
        if (isAnimating || isScrolling) return;
        
        // Prevent default to avoid any page scrolling
        e.preventDefault();
        
        // Get scroll direction
        const delta = Math.sign(e.deltaY);
        
        // If we're on the last block and scrolling down
        if (isOnLastBlock && delta > 0) {
            // If we're already at the bottom, allow page to scroll
            if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 10) {
                return true;
            }
            
            // Otherwise, scroll down to the bottom
            isScrolling = true;
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
            
            // After scrolling, hide the middle box
            setTimeout(() => {
                middleBox.classList.add('scrolled-up');
                isScrolling = false;
            }, 500);
            
            return false;
        }
        
        // If we're at the top and scrolling up, show previous text
        if (window.scrollY === 0 && delta < 0 && currentIndex > 0) {
            goToBlock(currentIndex - 1);
            return false;
        }
        
        // If we're not at the bottom and scrolling down, show next text
        if (delta > 0 && currentIndex < textBlocks.length - 1) {
            goToBlock(currentIndex + 1);
            return false;
        }
        
        // If we're at the top and scrolling up, show previous text
        if (delta < 0 && currentIndex > 0) {
            goToBlock(currentIndex - 1);
            return false;
        }
        
        return false;
    }

    // Handle keyboard navigation
    function handleKeyDown(e) {
        if (isAnimating) return;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentIndex < textBlocks.length - 1) {
                goToBlock(currentIndex + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentIndex > 0) {
                goToBlock(currentIndex - 1);
            }
        }
    }

    // Handle touch events
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        if (isAnimating) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        if (Math.abs(deltaY) < 50) return; // Ignore small swipes
        
        // If we're on the last block, let the page handle scrolling
        if (currentIndex === textBlocks.length - 1) {
            isOnLastBlock = true;
            document.body.style.overflow = 'auto';
            return;
        }
        
        // Prevent default touch behavior for text blocks
        e.preventDefault();
        
        if (deltaY > 0 && currentIndex < textBlocks.length - 1) {
            // Swipe up - next block
            goToBlock(currentIndex + 1);
        } else if (deltaY < 0 && currentIndex > 0) {
            // Swipe down - previous block
            goToBlock(currentIndex - 1);
        }
        
        return false;
    }

    // Handle scroll events
    function handleScroll() {
        // If we're at the top, show the middle box
        if (window.scrollY === 0) {
            middleBox.classList.remove('scrolled-up');
            isOnLastBlock = false;
        }
    }

    // Initialize everything
    function init() {
        // Set up body styles
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.width = '100%';
        document.body.style.overflowX = 'hidden';
        
        // Set up smooth scrolling for the whole document
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Initialize text blocks
        initTextBlocks();
        
        // Add event listeners
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Set up intersection observer for the last text block
        const lastTextBlock = textBlocks[textBlocks.length - 1];
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target === lastTextBlock) {
                    // When last text block is in view, enable page scrolling
                    isOnLastBlock = true;
                } else if (entry.target === lastTextBlock) {
                    // When scrolling back up, re-enable fixed scrolling
                    document.body.style.overflow = 'hidden';
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -10% 0px'
        });
        
        observer.observe(lastTextBlock);
        
        // Make sure L1 is properly positioned
        const l1Box = document.querySelector('.l1');
        if (l1Box) {
            l1Box.style.position = 'relative';
            l1Box.style.minHeight = '100vh';
        }
        
        console.log('Text scroller initialized');
    }

    // Start the application
    init();
});
