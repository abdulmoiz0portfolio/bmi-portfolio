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
        // Apparel - T-Shirts & Polo Shirts
        { category: 'apparel', subcategory: 't-shirts-polo-shirts', name: 'Crew neck', image: 'images/apparel_tshirts_1781974139253.png', description: 'High-quality knits in custom colors and fits.' },
        { category: 'apparel', subcategory: 't-shirts-polo-shirts', name: 'V-neck', image: 'images/apparel_tshirts_1781974139253.png', description: 'High-quality knits in custom colors and fits.' },
        { category: 'apparel', subcategory: 't-shirts-polo-shirts', name: 'Henley', image: 'images/apparel_tshirts_1781974139253.png', description: 'High-quality knits in custom colors and fits.' },
        { category: 'apparel', subcategory: 't-shirts-polo-shirts', name: 'Polo shirt', image: 'images/apparel_tshirts_1781974139253.png', description: 'High-quality knits in custom colors and fits.', badge: 'Best Seller' },
        { category: 'apparel', subcategory: 't-shirts-polo-shirts', name: 'Drop shoulder', image: 'images/apparel_tshirts_1781974139253.png', description: 'High-quality knits in custom colors and fits.' },
        { category: 'apparel', subcategory: 't-shirts-polo-shirts', name: 'Oversized/Boxy fit', image: 'images/apparel_tshirts_1781974139253.png', description: 'High-quality knits in custom colors and fits.' },
        { category: 'apparel', subcategory: 't-shirts-polo-shirts', name: 'Tank top', image: 'images/apparel_tshirts_1781974139253.png', description: 'High-quality knits in custom colors and fits.' },
        { category: 'apparel', subcategory: 't-shirts-polo-shirts', name: 'Long sleeve tee', image: 'images/apparel_tshirts_1781974139253.png', description: 'High-quality knits in custom colors and fits.' },
        { category: 'apparel', subcategory: 't-shirts-polo-shirts', name: 'Raglan sleeve', image: 'images/apparel_tshirts_1781974139253.png', description: 'High-quality knits in custom colors and fits.' },

        // Apparel - Dress Shirts & Casual Shirts
        { category: 'apparel', subcategory: 'dress-shirts-casual-shirts', name: 'Oxford button-down (OCBD)', image: 'images/apparel_dress_1781974157772.png', description: 'Premium wovens for formal and casual wear.' },
        { category: 'apparel', subcategory: 'dress-shirts-casual-shirts', name: 'Flannel shirt', image: 'images/apparel_dress_1781974157772.png', description: 'Premium wovens for formal and casual wear.', badge: 'Popular' },
        { category: 'apparel', subcategory: 'dress-shirts-casual-shirts', name: 'Camp collar', image: 'images/apparel_dress_1781974157772.png', description: 'Premium wovens for formal and casual wear.' },
        { category: 'apparel', subcategory: 'dress-shirts-casual-shirts', name: 'Overshirt (Shacket)', image: 'images/apparel_dress_1781974157772.png', description: 'Premium wovens for formal and casual wear.' },
        { category: 'apparel', subcategory: 'dress-shirts-casual-shirts', name: 'Western shirt', image: 'images/apparel_dress_1781974157772.png', description: 'Premium wovens for formal and casual wear.' },
        { category: 'apparel', subcategory: 'dress-shirts-casual-shirts', name: 'Tunic', image: 'images/apparel_dress_1781974157772.png', description: 'Premium wovens for formal and casual wear.' },

        // Apparel - Fleece & Knitwear
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Cardigan', image: 'images/apparel_fleece_1781974178339.png', description: 'Warm and comfortable fleece garments.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Turtleneck', image: 'images/apparel_fleece_1781974178339.png', description: 'Warm and comfortable fleece garments.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Mock neck', image: 'images/apparel_fleece_1781974178339.png', description: 'Warm and comfortable fleece garments.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Cable knit sweater', image: 'images/apparel_fleece_1781974178339.png', description: 'Warm and comfortable fleece garments.', badge: 'Premium' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'V-neck sweater', image: 'images/apparel_fleece_1781974178339.png', description: 'Warm and comfortable fleece garments.' },

        // Apparel - Denim & Jeans
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Skinny', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Slim', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Straight', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Bootcut', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Flare', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Wide-leg', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Baggy/Loose', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Mom jeans', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Cargo jeans', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.', badge: 'Trending' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Carpenter jeans', image: 'images/apparel_denim_1781974189225.png', description: 'Durable denim with various washes and fits.' },

        // Apparel - Hoodies & Sweatshirts
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Pullover hoodie', image: 'images/apparel_fleece_1781974178339.png', description: 'Comfortable everyday essentials.', badge: 'Best Seller' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Zip-up hoodie', image: 'images/apparel_fleece_1781974178339.png', description: 'Comfortable everyday essentials.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Crewneck sweatshirt', image: 'images/apparel_fleece_1781974178339.png', description: 'Comfortable everyday essentials.' },

        // Apparel - Jackets & Outerwear
        { category: 'apparel', subcategory: 'jackets-outerwear', name: 'Denim jacket', image: 'images/apparel_denim_1781974189225.png', description: 'Reliable and stylish outerwear collections.' },
        { category: 'apparel', subcategory: 'jackets-outerwear', name: 'Bomber jacket', image: 'images/apparel_denim_1781974189225.png', description: 'Reliable and stylish outerwear collections.', badge: 'Classic' },
        { category: 'apparel', subcategory: 'jackets-outerwear', name: 'Trench coat', image: 'images/apparel_denim_1781974189225.png', description: 'Reliable and stylish outerwear collections.' },
        { category: 'apparel', subcategory: 'jackets-outerwear', name: 'Blazer', image: 'images/apparel_denim_1781974189225.png', description: 'Reliable and stylish outerwear collections.' },
        { category: 'apparel', subcategory: 'jackets-outerwear', name: 'Suit jacket', image: 'images/apparel_denim_1781974189225.png', description: 'Reliable and stylish outerwear collections.' },
        { category: 'apparel', subcategory: 'jackets-outerwear', name: 'Puffer jacket', image: 'images/apparel_denim_1781974189225.png', description: 'Reliable and stylish outerwear collections.' },
        { category: 'apparel', subcategory: 'jackets-outerwear', name: 'Parka', image: 'images/apparel_denim_1781974189225.png', description: 'Reliable and stylish outerwear collections.' },
        { category: 'apparel', subcategory: 'jackets-outerwear', name: 'Windbreaker', image: 'images/apparel_denim_1781974189225.png', description: 'Reliable and stylish outerwear collections.' },
        { category: 'apparel', subcategory: 'jackets-outerwear', name: 'Harrington jacket', image: 'images/apparel_denim_1781974189225.png', description: 'Reliable and stylish outerwear collections.' },

        // Apparel - Trousers & Bottoms
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Chinos', image: 'images/apparel_denim_1781974189225.png', description: 'Versatile bottoms for all occasions.', badge: 'Popular' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Cargo pants', image: 'images/apparel_denim_1781974189225.png', description: 'Versatile bottoms for all occasions.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Pleated trousers', image: 'images/apparel_denim_1781974189225.png', description: 'Versatile bottoms for all occasions.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Flat-front slacks', image: 'images/apparel_denim_1781974189225.png', description: 'Versatile bottoms for all occasions.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Corduroy pants', image: 'images/apparel_denim_1781974189225.png', description: 'Versatile bottoms for all occasions.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Linen trousers', image: 'images/apparel_denim_1781974189225.png', description: 'Versatile bottoms for all occasions.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Utility pants', image: 'images/apparel_denim_1781974189225.png', description: 'Versatile bottoms for all occasions.' },

        // Apparel - Sportswear & Activewear
        { category: 'apparel', subcategory: 'sportswear-activewear', name: 'Joggers', image: 'images/apparel_tshirts_1781974139253.png', description: 'Performance-driven athletic wear.', badge: 'Comfort Fit' },
        { category: 'apparel', subcategory: 'sportswear-activewear', name: 'Sweatpants', image: 'images/apparel_tshirts_1781974139253.png', description: 'Performance-driven athletic wear.' },
        { category: 'apparel', subcategory: 'sportswear-activewear', name: 'Track pants', image: 'images/apparel_tshirts_1781974139253.png', description: 'Performance-driven athletic wear.' },
        { category: 'apparel', subcategory: 'sportswear-activewear', name: 'Leggings', image: 'images/apparel_tshirts_1781974139253.png', description: 'Performance-driven athletic wear.' },
        { category: 'apparel', subcategory: 'sportswear-activewear', name: 'Biker shorts', image: 'images/apparel_tshirts_1781974139253.png', description: 'Performance-driven athletic wear.' },
        { category: 'apparel', subcategory: 'sportswear-activewear', name: 'Mesh athletic shorts', image: 'images/apparel_tshirts_1781974139253.png', description: 'Performance-driven athletic wear.' },

        // Apparel - Kids Wear
        { category: 'apparel', subcategory: 'kids-wear', name: 'Graphic tees', image: 'images/apparel_tshirts_1781974139253.png', description: 'Safe, comfortable apparel for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Rompers', image: 'images/apparel_tshirts_1781974139253.png', description: 'Safe, comfortable apparel for children.', badge: 'Cute Styles' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'School uniforms', image: 'images/apparel_tshirts_1781974139253.png', description: 'Safe, comfortable apparel for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Mini denim', image: 'images/apparel_tshirts_1781974139253.png', description: 'Safe, comfortable apparel for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids activewear', image: 'images/apparel_tshirts_1781974139253.png', description: 'Safe, comfortable apparel for children.' },

        // Accessories - Caps & Headwear
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Baseball caps', image: 'images/apparel_tshirts_1781974139253.png', description: 'Custom headwear for brands and promotions.', badge: 'Top Sourced' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Snapbacks', image: 'images/apparel_tshirts_1781974139253.png', description: 'Custom headwear for brands and promotions.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Beanies', image: 'images/apparel_tshirts_1781974139253.png', description: 'Custom headwear for brands and promotions.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Bucket hats', image: 'images/apparel_tshirts_1781974139253.png', description: 'Custom headwear for brands and promotions.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Visors', image: 'images/apparel_tshirts_1781974139253.png', description: 'Custom headwear for brands and promotions.' },

        // Accessories - Face Masks
        { category: 'accessories', subcategory: 'face-masks', name: 'Reusable cotton masks', image: 'images/apparel_tshirts_1781974139253.png', description: 'Protective and breathable fabric masks.', badge: 'Washable' },
        { category: 'accessories', subcategory: 'face-masks', name: '3-ply fabric masks', image: 'images/apparel_tshirts_1781974139253.png', description: 'Protective and breathable fabric masks.' },
        { category: 'accessories', subcategory: 'face-masks', name: 'Printed fashion masks', image: 'images/apparel_tshirts_1781974139253.png', description: 'Protective and breathable fabric masks.' },

        // Home Textiles - Kitchen & Bath Textiles
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Bath towels', image: 'images/about_bg_1781974126615.png', description: 'Towels, aprons, and oven mitts.', badge: '100% Cotton' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Hand towels', image: 'images/about_bg_1781974126615.png', description: 'Towels, aprons, and oven mitts.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Washcloths', image: 'images/about_bg_1781974126615.png', description: 'Towels, aprons, and oven mitts.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Aprons', image: 'images/about_bg_1781974126615.png', description: 'Towels, aprons, and oven mitts.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Oven mitts', image: 'images/about_bg_1781974126615.png', description: 'Towels, aprons, and oven mitts.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Dish towels', image: 'images/about_bg_1781974126615.png', description: 'Towels, aprons, and oven mitts.' },

        // Home Textiles - Bedding & Linen
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Bed sheets', image: 'images/about_bg_1781974126615.png', description: 'Premium bedding sets and comfortable linens.', badge: 'Luxury Sourcing' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Duvet covers', image: 'images/about_bg_1781974126615.png', description: 'Premium bedding sets and comfortable linens.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Pillowcases', image: 'images/about_bg_1781974126615.png', description: 'Premium bedding sets and comfortable linens.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Blankets', image: 'images/about_bg_1781974126615.png', description: 'Premium bedding sets and comfortable linens.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Comforters', image: 'images/about_bg_1781974126615.png', description: 'Premium bedding sets and comfortable linens.' }
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

            const badgeHTML = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';

            card.innerHTML = `
                <div class="product-image-container">
                    ${badgeHTML}
                    <img src="${product.image}" alt="${product.name}">
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
