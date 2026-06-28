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
        // TAB 1: APPAREL - Flannel Shirts & Jackets
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Flannel Shirts', image: 'images/prod_flannel_shirts.png', description: 'Premium cotton flannel shirts in customizable plaid patterns for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Flannel Shirts', image: 'images/prod_ladies_gentle.png', description: 'Soft, tailored flannel shirts in elegant plaid patterns for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Line Jacket', image: 'images/prod_line_jacket.png', description: 'Lightweight lined plaid flannel jackets for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Line Jacket', image: 'images/prod_line_jacket.png', description: 'Comfortable and stylish lined flannel jackets for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Padded Lined Flannel Jackets', image: 'images/prod_padded_flannel.png', description: 'Quilted padded lining providing extra warmth for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Padded Lined Flannel Jackets', image: 'images/prod_padded_flannel.png', description: 'Quilted padded lining flannel jackets tailored for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Sherpa Lined Flannel Jackets', image: 'images/prod_sherpa_flannel.png', description: 'Warm sherpa fleece lining for maximum cold weather protection for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Sherpa Lined Flannel Jackets', image: 'images/prod_sherpa_flannel.png', description: 'Cozy sherpa fleece lining flannel jackets designed for women.' },

        // TAB 1: APPAREL - Fleece & Knitwear
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Pullover Hoodie', image: 'images/prod_fleece_pullover.png', description: 'Cozy and warm pullover hoodies made from premium fleece.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Mock Neck Zipper Jacket', image: 'images/prod_fleece_zipper.png', description: 'Premium fleece jackets featuring a stylish mock neck and full zipper.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Sweat Shirts', image: 'images/prod_fleece_sweatshirt.png', description: 'Classic crewneck sweatshirts in soft fleece fabrics.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Pajamas', image: 'images/prod_fleece_pajamas.png', description: 'Comfortable fleece pajama bottoms for loungewear.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Joggers', image: 'images/prod_fleece_joggers.png', description: 'Athletic-cut fleece joggers with drawstring waist.' },

        // TAB 1: APPAREL - Denim & Jeans
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Skinny Jeans', image: 'images/prod_skinny_jeans.png', description: 'Snug-fit stretch denim jeans in various washes.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Slim Fit Jeans', image: 'images/prod_slim_jeans.png', description: 'Modern slim-cut jeans balancing style and comfort.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Straight Cut Jeans', image: 'images/prod_straight_jeans.png', description: 'Classic straight-leg denim jeans for everyday wear.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Bootcut Jeans', image: 'images/prod_bootcut_jeans.png', description: 'Slightly flared hems designed to fit comfortably over boots.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Flapper Jeans', image: 'images/prod_flapper_jeans.png', description: 'Trendy wide-leg cropped denim pants.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Cargo Jeans', image: 'images/prod_cargo_jeans.png', description: 'Utility-focused denim featuring multiple cargo pockets.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Carpenter Jeans', image: 'images/prod_carpenter_jeans.png', description: 'Durable utility jeans with tool pockets and hammer loops.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Regular Denim', image: 'images/category_denim.png', description: 'Standard fit durable denim trousers.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Short Body Denim Jacket', image: 'images/apparel_denim_1781974189225.png', description: 'Cropped-style denim jackets in premium washes.' },

        // TAB 1: APPAREL - Hoodies & Sweatshirts
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Pullover Hoodie', image: 'images/media__1781983884455.png', description: 'Comfortable pullover hoodies in custom weights.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Zipper Hoodie', image: 'images/media__1781984060075.png', description: 'Full-zip hoodies, perfect for layering.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Crewneck Sweatshirt', image: 'images/media__1781984212849.png', description: 'Classic crewneck sweatshirts in soft cotton fleece.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Oversized Hoodie', image: 'images/category_hoodies.png', description: 'Trendy oversized baggy hoodies in heavy fabrics.' },

        // TAB 1: APPAREL - Trousers & Bottoms
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Mens Cotton Twill Pants', image: 'images/category_trousers.png', description: 'Durable and breathable cotton twill trousers for men.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Ladies Cotton Twill Pants', image: 'images/category_trousers.png', description: 'Comfortable and stylish cotton twill trousers for women.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Mens Stretch Comfort Twill Pants', image: 'images/media__1781984424941.png', description: 'Flexible stretch twill pants for men.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Ladies Stretch Comfort Twill Pants', image: 'images/media__1781984424941.png', description: 'Flexible stretch twill pants designed for women.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Cotton Lounge Pants', image: 'images/media__1781984480943.png', description: 'Lightweight, breathable cotton loungewear pants.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Flannel Lounge Pants', image: 'images/media__1782085393405.png', description: 'Warm and cozy flannel loungewear pants.' },

        // TAB 1: APPAREL - Sportswear & Sleepwear
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Cotton Sleep Suit', image: 'images/media__1782086259595.png', description: 'Two-piece breathable cotton sleepwear set for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Womens Cotton Sleep Suit', image: 'images/media__1782086561558.png', description: 'Soft and comfortable cotton sleepwear set for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Flannel Sleep Suit', image: 'images/media__1782086574402.png', description: 'Warm two-piece flannel sleepwear set for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Womens Flannel Sleep Suit', image: 'images/media__1782086582771.png', description: 'Cozy two-piece flannel sleepwear set for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Sweat Absorbent Tops', image: 'images/category_sportswear.png', description: 'Moisture-wicking athletic tops for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Ladies Sweat Absorbent Tops', image: 'images/category_sportswear.png', description: 'Moisture-wicking athletic tops for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Sweat Absorbent Bottoms', image: 'images/apparel_tshirts_1781974139253.png', description: 'Moisture-wicking athletic pants and shorts for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Ladies Sweat Absorbent Bottoms', image: 'images/apparel_tshirts_1781974139253.png', description: 'Moisture-wicking athletic pants and shorts for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Sweat Absorbent Jackets', image: 'images/media__1782435302120.png', description: 'Lightweight performance jackets for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Ladies Sweat Absorbent Jackets', image: 'images/media__1782435302120.png', description: 'Lightweight performance jackets designed for women.' },

        // TAB 1: APPAREL - Kids Wear
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Infant Rompers', image: 'images/category_kids.png', description: 'Ultra-soft and safe cotton rompers for babies.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Shorts', image: 'images/media__1781975146655.jpg', description: 'Comfortable and durable shorts for active children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids T-Shirt', image: 'images/media__1781974055940.png', description: 'Soft, breathable cotton tees with kid-friendly dyes.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Pajamas', image: 'images/media__1781974043840.jpg', description: 'Cozy sleepwear bottoms for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Pajama Suits', image: 'images/media__1781974043836.jpg', description: 'Two-piece matching pajama sets for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Shorts Suits', image: 'images/media__1781973768137.jpg', description: 'Matching t-shirt and shorts sets for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Jeans', image: 'images/media__1781973767944.jpg', description: 'Durable stretch denim jeans for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Denim Shorts', image: 'images/media__1782437098398.png', description: 'Sturdy and stylish denim shorts for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Denim Jackets', image: 'images/apparel_fleece_1781974178339.png', description: 'Classic denim jackets scaled for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Hoodie', image: 'images/prod_fleece_pullover.png', description: 'Warm and cozy fleece hoodies for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Sweatshirt', image: 'images/prod_fleece_sweatshirt.png', description: 'Soft crewneck sweatshirts for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Fleece Pajamas', image: 'images/prod_fleece_pajamas.png', description: 'Warm fleece sleepwear bottoms for kids.' },

        // TAB 2: ACCESSORIES - Caps & Headwear
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Baseball Caps', image: 'images/apparel_tshirts_1781974139253.png', description: 'Custom baseball caps for brands and promotions.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Snapbacks', image: 'images/apparel_tshirts_1781974139253.png', description: 'Flat-brim snapback caps with customizable embroidery.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Beanies', image: 'images/apparel_tshirts_1781974139253.png', description: 'Warm knitted beanies for winter wear.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Bucket Hats', image: 'images/apparel_tshirts_1781974139253.png', description: 'Trendy cotton bucket hats for sun protection.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Visors', image: 'images/apparel_tshirts_1781974139253.png', description: 'Sporty sun visors with adjustable straps.' },

        // TAB 2: ACCESSORIES - Face Masks
        { category: 'accessories', subcategory: 'face-masks', name: 'Reusable Fabric Masks', image: 'images/apparel_tshirts_1781974139253.png', description: 'Washable and breathable multi-layer cotton face masks.' },
        { category: 'accessories', subcategory: 'face-masks', name: 'Disposable Masks', image: 'images/apparel_tshirts_1781974139253.png', description: 'Lightweight protective disposable face masks.' },
        { category: 'accessories', subcategory: 'face-masks', name: 'Kids Masks', image: 'images/apparel_tshirts_1781974139253.png', description: 'Soft fabric masks scaled and designed for children.' },

        // TAB 3: HOME TEXTILES - Kitchen & Bath Textiles
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Kitchen Towels', image: 'images/category_kitchen_bath.png', description: 'Highly absorbent cotton towels for kitchen use.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Wash Towels', image: 'images/about_bg_1781974126615.png', description: 'Soft and durable washcloths for daily cleansing.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Bath Towels', image: 'images/category_kitchen_bath.png', description: 'Plush, high-pile cotton towels for bath use.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Bath Mats', image: 'images/category_kitchen_bath.png', description: 'Thick, slip-resistant woven cotton bath mats.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Hand Towels', image: 'images/category_kitchen_bath.png', description: 'Soft hand towels in custom weaves and border designs.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Aprons', image: 'images/category_kitchen_bath.png', description: 'Protective kitchen aprons in durable twill or canvas.' },

        // TAB 3: HOME TEXTILES - Bedding & Linen
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Bed Sheet Sets', image: 'images/category_bedding.png', description: 'Flat sheets, fitted sheets, and pillowcase sets in premium thread counts.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Fitted Sheets', image: 'images/category_bedding.png', description: 'Deep-pocket elasticized fitted sheets.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Duvet Covers', image: 'images/category_bedding.png', description: 'Elegant duvet covers with button or zipper closures.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Pillow Cases & Comforter Sets', image: 'images/category_bedding.png', description: 'Matching comforters and decorative pillow shams.' },

        // TAB 3: HOME TEXTILES - Rags
        { category: 'home-textiles', subcategory: 'rags', name: 'White Cotton Rags', image: 'images/category_rags.png', description: 'Premium metal-free white cotton cleaning rags for industrial use.' },
        { category: 'home-textiles', subcategory: 'rags', name: 'Multi Color Cotton Rags', image: 'images/category_rags.png', description: 'Eco-friendly colored cotton rags for general cleaning.' },
        { category: 'home-textiles', subcategory: 'rags', name: 'Assorted Rags', image: 'images/category_rags.png', description: 'Absorbent mixed fabric rags for industrial spills.' }
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
