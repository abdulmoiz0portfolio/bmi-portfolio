document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for sticky navbar
                const headerOffset = 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Submission (Vanilla JS with FormSubmit AJAX)
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            formSuccess.style.display = 'none';
            if (formError) formError.style.display = 'none';
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Post via AJAX to FormSubmit
            fetch(contactForm.action, {
                method: "POST",
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success || data.ok || response.ok) {
                    contactForm.reset();
                    formSuccess.style.display = 'block';
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 8000);
                } else {
                    if (formError) formError.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                if (formError) formError.style.display = 'block';
            })
            .finally(() => {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // Products Database containing all sub-products
    const productsData = [
        // Apparel - Flannel Shirts & Jackets
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Flannel Shirts', image: 'images/category_flannel.png', description: 'Premium cotton flannel shirts in customizable plaid patterns.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Line Jacket', image: 'images/category_flannel.png', description: 'Lightweight lined jackets for casual outdoor wear.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Gentle', image: 'images/category_flannel.png', description: 'Soft, tailored flannel shirts designed for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Padded Lined Flannel Jackets', image: 'images/category_flannel.png', description: 'Quilted padded lining providing extra warmth.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Shirpa Lined Flannel Jackets', image: 'images/category_flannel.png', description: 'Faux sherpa lining for maximum cold weather protection.' },

        // Apparel - Fleece & Knitwear
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Pullover Hoodie', image: 'images/category_fleece.png', description: 'Cozy and warm pullover hoodies made from premium fleece.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Zipper Jackets', image: 'images/category_fleece.png', description: 'Full-zip fleece jackets, perfect for layering.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Sweet Shirts', image: 'images/category_fleece.png', description: 'Classic crewneck sweatshirts in soft fleece fabrics.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Pajamas', image: 'images/category_fleece.png', description: 'Comfortable fleece pajama bottoms for loungewear.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Joggers', image: 'images/category_fleece.png', description: 'Athletic-cut fleece joggers with drawstring waist.' },

        // Apparel - Denim & Jeans
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Skinny Jeans', image: 'images/category_denim.png', description: 'Snug-fit stretch denim jeans in various washes.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Slim Fit Jeans', image: 'images/category_denim.png', description: 'Modern slim-cut jeans balancing style and comfort.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Straight Cut Jeans', image: 'images/category_denim.png', description: 'Classic straight-leg denim jeans for everyday wear.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Bootcut Jeans', image: 'images/category_denim.png', description: 'Slightly flared hems designed to fit comfortably over boots.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Flapper Jeans', image: 'images/category_denim.png', description: 'Trendy wide-leg cropped denim pants.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Cargo Jeans', image: 'images/category_denim.png', description: 'Utility-focused denim featuring multiple cargo pockets.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Carpenter Jeans', image: 'images/category_denim.png', description: 'Durable utility jeans with tool pockets and hammer loops.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Regular Denim', image: 'images/category_denim.png', description: 'Standard fit durable denim trousers.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Short Body Denim Jacket', image: 'images/category_denim.png', description: 'Cropped-style denim jackets in premium washes.' },

        // Apparel - Hoodies & Sweatshirts
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Hoodies & Sweatshirts', image: 'images/category_hoodies.png', description: 'Premium quality hoodies and sweatshirts in custom weights and colors.' },

        // Apparel - Trousers & Bottoms
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Mens & Ladies Cotton Twill Pants', image: 'images/category_trousers.png', description: 'Durable and breathable cotton twill trousers.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Mens & Ladies Stretch Comfort Twill Pants', image: 'images/category_trousers.png', description: 'Flexible stretch twill pants for daily active wear.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Cotton Launch Pants', image: 'images/category_trousers.png', description: 'Lightweight, breathable cotton loungewear pants.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Flannel Launch Pants', image: 'images/category_trousers.png', description: 'Warm and cozy flannel loungewear pants.' },

        // Apparel - Sportswear & Sleepwear
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Cotton Sleep Suit', image: 'images/category_sportswear.png', description: 'Two-piece breathable cotton sleepwear set for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Womens Cotton Sleep Suit', image: 'images/category_sportswear.png', description: 'Soft and comfortable cotton sleepwear set for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Flannel Sleep Suit', image: 'images/category_sportswear.png', description: 'Warm two-piece flannel sleepwear set for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Womens Flannel Sleep Suit', image: 'images/category_sportswear.png', description: 'Cozy two-piece flannel sleepwear set for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Sweat Absorbent Tops', image: 'images/category_sportswear.png', description: 'Moisture-wicking athletic tops for workouts.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Sweat Absorbent Bottoms', image: 'images/category_sportswear.png', description: 'Moisture-wicking athletic pants and shorts.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Sweat Absorbent Jackets', image: 'images/category_sportswear.png', description: 'Lightweight performance jackets for active training.' },

        // Apparel - Kids Wear
        { category: 'apparel', subcategory: 'kids-wear', name: 'Infant Rompers', image: 'images/category_kids.png', description: 'Ultra-soft and safe cotton rompers for babies.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Shorts', image: 'images/category_kids.png', description: 'Comfortable and durable shorts for active children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids T-Shirt', image: 'images/category_kids.png', description: 'Soft, breathable cotton tees with kid-friendly dyes.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Pajamas', image: 'images/category_kids.png', description: 'Cozy sleepwear bottoms for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Pajama Suits', image: 'images/category_kids.png', description: 'Two-piece matching pajama sets for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Shorts Suits', image: 'images/category_kids.png', description: 'Matching t-shirt and shorts sets for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Jeans', image: 'images/category_kids.png', description: 'Durable stretch denim jeans for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Denim Shorts', image: 'images/category_kids.png', description: 'Sturdy and stylish denim shorts for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Denim Jackets', image: 'images/category_kids.png', description: 'Classic denim jackets scaled for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Hoodie', image: 'images/category_kids.png', description: 'Warm and cozy fleece hoodies for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Sweatshirt', image: 'images/category_kids.png', description: 'Soft crewneck sweatshirts for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Fleece Pajamas', image: 'images/category_kids.png', description: 'Warm fleece sleepwear bottoms for kids.' },

        // Home Textiles - Kitchen & Bath
        { category: 'home-textiles', subcategory: 'kitchen-bath', name: 'Kitchen Towels', image: 'images/category_kitchen_bath.png', description: 'Highly absorbent cotton towels for kitchen use.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath', name: 'Wash Towels', image: 'images/category_kitchen_bath.png', description: 'Soft and durable washcloths for daily cleansing.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath', name: 'Bath Towels', image: 'images/category_kitchen_bath.png', description: 'Plush, high-pile cotton towels for bath use.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath', name: 'Bath Mats', image: 'images/category_kitchen_bath.png', description: 'Thick, slip-resistant woven cotton bath mats.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath', name: 'Hand Towels', image: 'images/category_kitchen_bath.png', description: 'Soft hand towels in custom weaves and border designs.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath', name: 'Aprons', image: 'images/category_kitchen_bath.png', description: 'Protective kitchen aprons in durable twill or canvas.' },

        // Home Textiles - Bedding & Linens
        { category: 'home-textiles', subcategory: 'bedding-linens', name: 'Bed Sheet Sets', image: 'images/category_bedding.png', description: 'Flat sheets, fitted sheets, and pillowcase sets in premium thread counts.' },
        { category: 'home-textiles', subcategory: 'bedding-linens', name: 'Fitted Sheet', image: 'images/category_bedding.png', description: 'Deep-pocket elasticized fitted sheets.' },
        { category: 'home-textiles', subcategory: 'bedding-linens', name: 'Duvet Covers', image: 'images/category_bedding.png', description: 'Elegant duvet covers with button or zipper closures.' },
        { category: 'home-textiles', subcategory: 'bedding-linens', name: 'Pillow Cases & Comforter Sets', image: 'images/category_bedding.png', description: 'Matching comforters and decorative pillow shams.' },

        // Rags - Rags
        { category: 'rags', subcategory: 'rags', name: 'White Cotton Rags', image: 'images/category_rags.png', description: 'Premium metal-free white cotton cleaning rags for industrial use.' },
        { category: 'rags', subcategory: 'rags', name: 'Multi Color Cotton Rags', image: 'images/category_rags.png', description: 'Eco-friendly colored cotton rags for general cleaning.' },
        { category: 'rags', subcategory: 'rags', name: 'Multi Fabric Rags', image: 'images/category_rags.png', description: 'Absorbent mixed fabric rags for industrial spills.' }
    ];

    // Selectors
    const tabBtns = document.querySelectorAll('#products-tabs .tab-btn');
    const subGroups = document.querySelectorAll('#products-sidebar .subcategory-group');
    const productsGrid = document.getElementById('products-grid');

    // Dynamic rendering of cards
    function renderProducts(category, subcategory) {
        if (!productsGrid) return;
        productsGrid.innerHTML = ''; // Clear existing cards

        const filtered = productsData.filter(p => p.category === category && p.subcategory === subcategory);

        if (filtered.length === 0) {
            productsGrid.innerHTML = '<div class="no-products"><p>No products found in this category.</p></div>';
            return;
        }

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card show';

            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" width="300" height="225">
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    }

    function filterProducts() {
        const activeTab = document.querySelector('#products-tabs .tab-btn.active');
        if (!activeTab) return;
        const category = activeTab.getAttribute('data-category');

        // Toggle active sub-category groups in sidebar
        subGroups.forEach(group => {
            if (group.getAttribute('data-group-category') === category) {
                group.classList.add('active');
            } else {
                group.classList.remove('active');
            }
        });

        // Get active subcategory inside the active group
        const activeSubGroup = document.querySelector(`#products-sidebar .subcategory-group[data-group-category="${category}"]`);
        if (!activeSubGroup) return;
        
        let activeSubBtn = activeSubGroup.querySelector('.sub-btn.active');
        if (!activeSubBtn) {
            activeSubBtn = activeSubGroup.querySelector('.sub-btn');
            if (activeSubBtn) activeSubBtn.classList.add('active');
        }
        
        const subcategory = activeSubBtn ? activeSubBtn.getAttribute('data-subcategory') : '';

        // Render matching product cards
        renderProducts(category, subcategory);
    }

    // Category Tabs click navigation
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Activate the first sub-category in the selected category
            const category = btn.getAttribute('data-category');
            const targetGroup = document.querySelector(`#products-sidebar .subcategory-group[data-group-category="${category}"]`);
            if (targetGroup) {
                targetGroup.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
                const firstSubBtn = targetGroup.querySelector('.sub-btn');
                if (firstSubBtn) firstSubBtn.classList.add('active');
            }
            
            filterProducts();
        });
    });

    // Sub-category click navigation (using event delegation on sidebar)
    const sidebar = document.getElementById('products-sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            const btn = e.target.closest('.sub-btn');
            if (!btn) return;
            
            const parentGroup = btn.closest('.subcategory-group');
            if (parentGroup) {
                parentGroup.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
            }
            btn.classList.add('active');
            filterProducts();
        });
    }

    // Run on initial load
    filterProducts();
});
