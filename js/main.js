document.addEventListener('DOMContentLoaded', () => {
  // 1. Search Bar Interaction
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchInput.setAttribute('placeholder', 'Type to search products...');
    });
    searchInput.addEventListener('blur', () => {
      searchInput.setAttribute('placeholder', 'Search...');
    });
  }

  // 2. Size Selection Logic (Product Details Page)
  const sizeButtons = document.querySelectorAll('.size-btn');
  if (sizeButtons.length > 0) {
    sizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove selected class from all
        sizeButtons.forEach(b => b.classList.remove('selected'));
        // Add to clicked
        btn.classList.add('selected');
      });
    });
  }

  // 3. Add to Cart Interaction
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  const cartCount = document.querySelector('.cart-count');
  const toastContainer = document.querySelector('.toast-container');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      // Basic button animation
      const originalText = addToCartBtn.innerHTML;
      addToCartBtn.innerHTML = 'Added!';
      addToCartBtn.style.background = '#10b981'; // Success green
      
      // Update cart count
      if (cartCount) {
        let currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
      }

      // Show toast
      showToast('Product added to your cart successfully!');

      // Reset button
      setTimeout(() => {
        addToCartBtn.innerHTML = originalText;
        addToCartBtn.style.background = '';
      }, 2000);
    });
  }

  // 4. Quantity Selector
  const qtyBtns = document.querySelectorAll('.qty-btn');
  const qtyInput = document.querySelector('.qty-input');
  
  if (qtyInput && qtyBtns.length === 2) {
    qtyBtns[0].addEventListener('click', () => {
      let val = parseInt(qtyInput.value);
      if (val > 1) qtyInput.value = val - 1;
    });
    qtyBtns[1].addEventListener('click', () => {
      let val = parseInt(qtyInput.value);
      qtyInput.value = val + 1;
    });
  }

  // 5. Image Gallery Selection
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-image img');
  
  if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Remove active class
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active class
        thumb.classList.add('active');
        // Update main image src
        const img = thumb.querySelector('img');
        if (img) {
          // Fade effect
          mainImage.style.opacity = 0;
          setTimeout(() => {
            mainImage.src = img.src;
            mainImage.style.opacity = 1;
          }, 200);
        }
      });
    });
  }

  // 6. Accordion functionality
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', function() {
      this.parentElement.classList.toggle('active');
      const icon = this.querySelector('span:last-child');
      if (icon) {
        icon.textContent = this.parentElement.classList.contains('active') ? '-' : '+';
      }
    });
  });

  // Helper function for toast
  function showToast(message) {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">✓</span>
      <span class="toast-message">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
});
