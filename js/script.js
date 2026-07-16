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

    // Products Database containing all sub-products with hover image pairs
    const productsData = [
        // TAB 1: APPAREL - Flannel Shirts & Jackets
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Flannel Shirts', imageA: 'images/products/Mens Flannel Shirt 1.webp', imageB: 'images/products/Mens Flannel Shirt  2.webp', description: 'Premium cotton flannel shirts in customizable plaid patterns for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Flannel Shirts', imageA: 'images/products/Ladies Flannel Shirt (1).webp', imageB: 'images/products/Ladies Flannel Shirt (2).webp', description: 'Soft, tailored flannel shirts in elegant plaid patterns for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Line Jacket', imageA: 'images/products/Mens Line Jacket 1.webp', imageB: 'images/products/Mens Line Jacket 2.webp', description: 'Lightweight lined plaid flannel jackets for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Line Jacket', imageA: 'images/products/Ladies Line Jacket 1.webp', imageB: 'images/products/Ladies Line Jacket 2.webp', description: 'Comfortable and stylish lined flannel jackets for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Padded Lined Flannel Jackets', imageA: 'images/products/Mens Padded Lined Flannel Jacket 1.webp', imageB: 'images/products/Mens Padded Lined Flannel Jacket 2.webp', description: 'Quilted padded lining providing extra warmth for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Padded Lined Flannel Jackets', imageA: 'images/products/Ladies Padded Lined Flannel Jacket 1.webp', imageB: 'images/products/Ladies Padded Lined Flannel Jacket 2.webp', description: 'Quilted padded lining flannel jackets tailored for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Sherpa Lined Flannel Jackets', imageA: 'images/products/Mens Sherpa Lined Flannel Jacket 1.webp', imageB: 'images/products/Mens Sherpa Lined Flannel Jacket 2.webp', description: 'Warm sherpa fleece lining for maximum cold weather protection for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Sherpa Lined Flannel Jackets', imageA: 'images/products/Ladies Sherpa Lined Flannel Jacket 1.webp', imageB: 'images/products/Ladies Sherpa Lined Flannel Jacket 2.webp', description: 'Cozy sherpa fleece lining flannel jackets designed for women.' },

        // TAB 1: APPAREL - Fleece & Knitwear
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Pullover Hoodie', imageA: 'images/products/Fleece Pullover Hoodie 1.webp', imageB: 'images/products/Fleece Pullover Hoodie 2.webp', description: 'Cozy and warm pullover hoodies made from premium fleece.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Mock Neck Zipper Jacket', imageA: 'images/products/Fleece Mock Neck Zipper Jacket 1.webp', imageB: 'images/products/Fleece Mock Neck Zipper Jacket 2.webp', description: 'Premium fleece jackets featuring a stylish mock neck and full zipper.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Sweatshirt', imageA: 'images/products/Fleece Sweatshirt 1.webp', imageB: 'images/products/Fleece Sweatshirt 2.webp', description: 'Classic crewneck sweatshirts in soft fleece fabrics.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Pajamas', imageA: 'images/products/Fleece Pajamas 1.webp', imageB: 'images/products/Fleece Pajamas 2.webp', description: 'Comfortable fleece pajama bottoms for loungewear.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Joggers', imageA: 'images/products/Fleece Joggers 1.webp', imageB: 'images/products/Fleece Joggers 2.webp', description: 'Athletic-cut fleece joggers with drawstring waist.' },

        // TAB 1: APPAREL - Denim & Jeans
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Skinny Jeans', imageA: 'images/products/Skinny Jeans 1.webp', imageB: 'images/products/Skinny Jeans 2.webp', description: 'Snug-fit stretch denim jeans in various washes.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Slim Fit Jeans', imageA: 'images/products/Slim Fit Jeans 1.webp', imageB: 'images/products/Slim Fit Jeans 2.webp', description: 'Modern slim-cut jeans balancing style and comfort.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Straight Cut Jeans', imageA: 'images/products/Straight Cut Jeans 1.webp', imageB: 'images/products/Straight Cut Jeans 2.webp', description: 'Classic straight-leg denim jeans for everyday wear.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Bootcut Jeans', imageA: 'images/products/Bootcut Jeans 1.webp', imageB: 'images/products/Bootcut Jeans 2.webp', description: 'Slightly flared hems designed to fit comfortably over boots.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Flapper Jeans', imageA: 'images/products/Flapper Jeans 1.webp', imageB: 'images/products/Flapper Jeans 2.webp', description: 'Trendy wide-leg cropped denim pants.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Cargo Jeans', imageA: 'images/products/Cargo Jeans 1.webp', imageB: 'images/products/Cargo Jeans 2.webp', description: 'Utility-focused denim featuring multiple cargo pockets.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Carpenter Jeans', imageA: 'images/products/Carpenter Jeans 1.webp', imageB: 'images/products/Carpenter Jeans 2.webp', description: 'Durable utility jeans with tool pockets and hammer loops.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Regular Denim', imageA: 'images/products/Regular Denim 1.webp', imageB: 'images/products/Regular Denim 2.webp', description: 'Standard fit durable denim trousers.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Short Body Denim Jacket', imageA: 'images/products/Short Body Denim Jacket 1.webp', imageB: 'images/products/Short Body Denim Jacket 2.webp', description: 'Cropped-style denim jackets in premium washes.' },

        // TAB 1: APPAREL - Hoodies & Sweatshirts
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Pullover Hoodie', imageA: 'images/products/pullover-hoodie-a.webp', imageB: 'images/products/pullover-hoodie-b.webp', description: 'Comfortable pullover hoodies in custom weights.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Zipper Hoodie', imageA: 'images/products/zipper-hoodie-a.webp', imageB: 'images/products/zipper-hoodie-b.webp', description: 'Full-zip hoodies, perfect for layering.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Crewneck Sweatshirt', imageA: 'images/products/crewneck-sweatshirt-a.webp', imageB: 'images/products/crewneck-sweatshirt-b.webp', description: 'Classic crewneck sweatshirts in soft cotton fleece.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Oversized Hoodie', imageA: 'images/products/oversized-hoodie-a.webp', imageB: 'images/products/oversized-hoodie-b.webp', description: 'Trendy oversized baggy hoodies in heavy fabrics.' },

        // TAB 1: APPAREL - Trousers & Bottoms
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Mens Cotton Twill Pants', imageA: 'images/products/mens-cotton-twill-pants-a.webp', imageB: 'images/products/mens-cotton-twill-pants-b.webp', description: 'Durable and breathable cotton twill trousers for men.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Ladies Cotton Twill Pants', imageA: 'images/products/ladies-cotton-twill-pants-a.webp', imageB: 'images/products/ladies-cotton-twill-pants-b.webp', description: 'Comfortable and stylish cotton twill trousers for women.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Mens Stretch Comfort Twill Pants', imageA: 'images/products/mens-stretch-twill-pants-a.webp', imageB: 'images/products/mens-stretch-twill-pants-b.webp', description: 'Flexible stretch twill pants for men.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Ladies Stretch Comfort Twill Pants', imageA: 'images/products/ladies-stretch-twill-pants-a.webp', imageB: 'images/products/ladies-stretch-twill-pants-b.webp', description: 'Flexible stretch twill pants designed for women.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Cotton Lounge Pants', imageA: 'images/products/cotton-lounge-pants-a.webp', imageB: 'images/products/cotton-lounge-pants-b.webp', description: 'Lightweight, breathable cotton loungewear pants.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Flannel Lounge Pants', imageA: 'images/products/flannel-lounge-pants-a.webp', imageB: 'images/products/flannel-lounge-pants-b.webp', description: 'Warm and cozy flannel loungewear pants.' },

        // TAB 1: APPAREL - Sportswear & Sleepwear
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Cotton Sleep Suit', imageA: 'images/products/mens-cotton-sleep-suit-a.webp', imageB: 'images/products/mens-cotton-sleep-suit-b.webp', description: 'Two-piece breathable cotton sleepwear set for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Womens Cotton Sleep Suit', imageA: 'images/products/womens-cotton-sleep-suit-a.webp', imageB: 'images/products/womens-cotton-sleep-suit-b.webp', description: 'Soft and comfortable cotton sleepwear set for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Flannel Sleep Suit', imageA: 'images/products/mens-flannel-sleep-suit-a.webp', imageB: 'images/products/mens-flannel-sleep-suit-b.webp', description: 'Warm two-piece flannel sleepwear set for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Womens Flannel Sleep Suit', image: 'images/products/womens-flannel-sleep-suit-a.webp', imageB: 'images/products/womens-flannel-sleep-suit-b.webp', description: 'Cozy two-piece flannel sleepwear set for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Sweat Absorbent Tops', imageA: 'images/products/mens-sweat-tops-a.webp', imageB: 'images/products/mens-sweat-tops-b.webp', description: 'Moisture-wicking athletic tops for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Ladies Sweat Absorbent Tops', imageA: 'images/products/ladies-sweat-tops-a.webp', imageB: 'images/products/ladies-sweat-tops-b.webp', description: 'Moisture-wicking athletic tops for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Sweat Absorbent Bottoms', imageA: 'images/products/mens-sweat-bottoms-a.webp', imageB: 'images/products/mens-sweat-bottoms-b.webp', description: 'Moisture-wicking athletic pants and shorts for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Ladies Sweat Absorbent Bottoms', imageA: 'images/products/ladies-sweat-bottoms-a.webp', imageB: 'images/products/ladies-sweat-bottoms-b.webp', description: 'Moisture-wicking athletic pants and shorts for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Sweat Absorbent Jackets', imageA: 'images/products/mens-sweat-jackets-a.webp', imageB: 'images/products/mens-sweat-jackets-b.webp', description: 'Lightweight performance jackets for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Ladies Sweat Absorbent Jackets', imageA: 'images/products/ladies-sweat-jackets-a.webp', imageB: 'images/products/ladies-sweat-jackets-b.webp', description: 'Lightweight performance jackets designed for women.' },

        // TAB 1: APPAREL - Kids Wear
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Infant Rompers', imageA: 'images/products/kids-infant-rompers-a.webp', imageB: 'images/products/kids-infant-rompers-b.webp', description: 'Ultra-soft and safe cotton rompers for babies.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Shorts', imageA: 'images/products/kids-shorts-a.webp', imageB: 'images/products/kids-shorts-b.webp', description: 'Comfortable and durable shorts for active children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids T-Shirt', imageA: 'images/products/kids-tshirt-a.webp', imageB: 'images/products/kids-tshirt-b.webp', description: 'Soft, breathable cotton tees with kid-friendly dyes.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Pajamas', imageA: 'images/products/kids-pajamas-a.webp', imageB: 'images/products/kids-pajamas-b.webp', description: 'Cozy sleepwear bottoms for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Pajama Suits', imageA: 'images/products/kids-pajama-suits-a.webp', imageB: 'images/products/kids-pajama-suits-b.webp', description: 'Two-piece matching pajama sets for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Shorts Suits', imageA: 'images/products/kids-shorts-suits-a.webp', imageB: 'images/products/kids-shorts-suits-b.webp', description: 'Matching t-shirt and shorts sets for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Jeans', imageA: 'images/products/kids-jeans-a.webp', imageB: 'images/products/kids-jeans-b.webp', description: 'Durable stretch denim jeans for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Denim Shorts', imageA: 'images/products/kids-denim-shorts-a.jpg', imageB: 'images/products/kids-denim-shorts-b.jpg', description: 'Sturdy and stylish denim shorts for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Denim Jackets', imageA: 'images/products/kids-denim-jacket-a.jpg', imageB: 'images/products/kids-denim-jacket-b.jpg', description: 'Classic denim jackets scaled for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Hoodie', imageA: 'images/products/kids-hoodie-a.jpg', imageB: 'images/products/kids-hoodie-b.jpg', description: 'Warm and cozy fleece hoodies for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Sweatshirt', imageA: 'images/products/kids-sweatshirt-a.jpg', imageB: 'images/products/kids-sweatshirt-b.jpg', description: 'Soft crewneck sweatshirts for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Fleece Pajamas', imageA: 'images/products/kids-fleece-pajamas-a.jpg', imageB: 'images/products/kids-fleece-pajamas-b.jpg', description: 'Warm fleece sleepwear bottoms for kids.' },

        // TAB 2: ACCESSORIES - Caps & Headwear
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Baseball Caps', imageA: 'images/products/baseball-caps-a.jpg', imageB: 'images/products/baseball-caps-b.jpg', description: 'Custom baseball caps for brands and promotions.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Snapbacks', imageA: 'images/products/snapbacks-a.jpg', imageB: 'images/products/snapbacks-b.jpg', description: 'Flat-brim snapback caps with customizable embroidery.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Beanies', imageA: 'images/products/beanies-a.jpg', imageB: 'images/products/beanies-b.jpg', description: 'Warm knitted beanies for winter wear.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Bucket Hats', imageA: 'images/products/bucket-hats-a.jpg', imageB: 'images/products/bucket-hats-b.jpg', description: 'Trendy cotton bucket hats for sun protection.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Visors', imageA: 'images/products/visors-a.jpg', imageB: 'images/products/visors-b.jpg', description: 'Sporty sun visors with adjustable straps.' },

        // TAB 2: ACCESSORIES - Face Masks
        { category: 'accessories', subcategory: 'face-masks', name: 'Reusable Fabric Masks', imageA: 'images/products/reusable-masks-a.jpg', imageB: 'images/products/reusable-masks-b.jpg', description: 'Washable and breathable multi-layer cotton face masks.' },
        { category: 'accessories', subcategory: 'face-masks', name: 'Disposable Masks', imageA: 'images/products/disposable-masks-a.jpg', imageB: 'images/products/disposable-masks-b.jpg', description: 'Lightweight protective disposable face masks.' },
        { category: 'accessories', subcategory: 'face-masks', name: 'Kids Masks', imageA: 'images/products/kids-masks-a.jpg', imageB: 'images/products/kids-masks-b.jpg', description: 'Soft fabric masks scaled and designed for children.' },

        // TAB 3: HOME TEXTILES - Kitchen & Bath Textiles
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Kitchen Towels', imageA: 'images/products/kitchen-towels-a.jpg', imageB: 'images/products/kitchen-towels-b.jpg', description: 'Highly absorbent cotton towels for kitchen use.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Wash Towels', imageA: 'images/products/wash-towels-a.jpg', imageB: 'images/products/wash-towels-b.jpg', description: 'Soft and durable washcloths for daily cleansing.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Bath Towels', imageA: 'images/products/bath-towels-a.jpg', imageB: 'images/products/bath-towels-b.jpg', description: 'Plush, high-pile cotton towels for bath use.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Bath Mats', imageA: 'images/products/bath-mats-a.jpg', imageB: 'images/products/bath-mats-b.jpg', description: 'Thick, slip-resistant woven cotton bath mats.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Hand Towels', imageA: 'images/products/hand-towels-a.jpg', imageB: 'images/products/hand-towels-b.jpg', description: 'Soft hand towels in custom weaves and border designs.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Aprons', imageA: 'images/products/aprons-a.jpg', imageB: 'images/products/aprons-b.jpg', description: 'Protective kitchen aprons in durable twill or canvas.' },

        // TAB 3: HOME TEXTILES - Bedding & Linen
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Bed Sheet Sets', imageA: 'images/products/bed-sheet-sets-a.jpg', imageB: 'images/products/bed-sheet-sets-b.jpg', description: 'Flat sheets, fitted sheets, and pillowcase sets in premium thread counts.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Fitted Sheets', imageA: 'images/products/fitted-sheets-a.jpg', imageB: 'images/products/fitted-sheets-b.jpg', description: 'Deep-pocket elasticized fitted sheets.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Duvet Covers', imageA: 'images/products/duvet-covers-a.jpg', imageB: 'images/products/duvet-covers-b.jpg', description: 'Elegant duvet covers with button or zipper closures.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Pillow Cases & Comforter Sets', imageA: 'images/products/pillowcases-comforter-a.jpg', imageB: 'images/products/pillowcases-comforter-b.jpg', description: 'Matching comforters and decorative pillow shams.' },

        // TAB 3: HOME TEXTILES - Rags
        { category: 'home-textiles', subcategory: 'rags', name: 'White Cotton Rags', imageA: 'images/products/white-cotton-rags-a.jpg', imageB: 'images/products/white-cotton-rags-b.jpg', description: 'Premium metal-free white cotton cleaning rags for industrial use.' },
        { category: 'home-textiles', subcategory: 'rags', name: 'Multi Color Cotton Rags', imageA: 'images/products/multi-color-rags-a.jpg', imageB: 'images/products/multi-color-rags-b.jpg', description: 'Eco-friendly colored cotton rags for general cleaning.' },
        { category: 'home-textiles', subcategory: 'rags', name: 'Assorted Rags', imageA: 'images/products/assorted-rags-a.jpg', imageB: 'images/products/assorted-rags-b.jpg', description: 'Absorbent mixed fabric rags for industrial spills.' }
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

            // Fixed: Use imageA and imageB inside a wrapper for hover swap effect
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img class="img-default" src="${product.imageA || product.image}" alt="${product.name}" loading="lazy" width="300" height="225">
                    <img class="img-hover" src="${product.imageB || product.image}" alt="${product.name} folded" loading="lazy" width="300" height="225">
                    ${product.imageB ? '<button class="mobile-toggle-btn" aria-label="Toggle image"><i class="fas fa-chevron-right"></i></button>' : ''}
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
        btn.addEventListener('click', (e) => {
            e.preventDefault();
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

            // Scroll slightly above the products content area to prevent layout shift jumping
            const productsContainer = document.querySelector('.products-container');
            if (productsContainer) {
                const headerOffset = 90; // lands 90px above the container
                const elementPosition = productsContainer.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'auto'
                });
            }
        });
    });

    // Sub-category click navigation (using event delegation on sidebar)
    const sidebar = document.getElementById('products-sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            const btn = e.target.closest('.sub-btn');
            if (!btn) return;
            
            e.preventDefault();
            
            const parentGroup = btn.closest('.subcategory-group');
            if (parentGroup) {
                parentGroup.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
            }
            btn.classList.add('active');
            filterProducts();

            // Scroll slightly above the products content area to prevent layout shift jumping
            const productsContainer = document.querySelector('.products-container');
            if (productsContainer) {
                const headerOffset = 90; // lands 90px above the container
                const elementPosition = productsContainer.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'auto'
                });
            }
        });
    }

    // Event delegation for mobile image toggle button
    const grid = document.getElementById('products-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('.mobile-toggle-btn');
            if (!toggleBtn) return;
            
            e.stopPropagation();
            
            const wrapper = toggleBtn.closest('.product-image-wrapper');
            if (wrapper) {
                wrapper.classList.toggle('show-hover');
            }
        });
    }

    // Run on initial load
    filterProducts();
});


