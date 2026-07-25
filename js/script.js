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
            
            // Check Turnstile Verification
            const turnstileResponse = formData.get('cf-turnstile-response');
            if (!turnstileResponse) {
                if (formError) {
                    formError.textContent = "Please complete the 'Verify you are human' challenge first.";
                    formError.style.display = 'block';
                }
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }
            
            // Post via AJAX to FormSubmit
            fetch(contactForm.action, {
                method: "POST",
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                if (data.success === "true" || data.success === true || data.ok) {
                    contactForm.reset();
                    if (window.turnstile) {
                        window.turnstile.reset();
                    }
                    formSuccess.style.display = 'block';
                    if (formError) formError.style.display = 'none';
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 8000);
                } else {
                    if (formError) {
                        formError.textContent = "Oops! Something went wrong. Please try again.";
                        formError.style.display = 'block';
                    }
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
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Flannel Shirts', imageA: '', imageA: 'images/products/flannel-shirts-jackets-mens-flannel-shirt-1.webp', imageB: '', imageB: 'images/products/flannel-shirts-jackets-mens-flannel-shirt-2.webp', description: 'Premium cotton flannel shirts in customizable plaid patterns for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Flannel Shirts', imageA: '', imageA: 'images/products/flannel-shirts-jackets-ladies-flannel-shirt-1-1.webp', imageB: '', imageB: 'images/products/flannel-shirts-jackets-ladies-flannel-shirt-2-1.webp', description: 'Soft, tailored flannel shirts in elegant plaid patterns for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Line Jacket', imageA: 'images/products/flannel-shirts-jackets-mens-line-jacket-1.webp', imageB: 'images/products/flannel-shirts-jackets-mens-line-jacket-2.webp', description: 'Lightweight lined plaid flannel jackets for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Line Jacket', imageA: 'images/products/flannel-shirts-jackets-ladies-line-jacket-1.webp', imageB: 'images/products/flannel-shirts-jackets-ladies-line-jacket-2.webp', description: 'Comfortable and stylish lined flannel jackets for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Padded Lined Flannel Jackets', imageA: '', imageA: 'images/products/flannel-shirts-jackets-mens-padded-lined-flannel-jacket-1.webp', imageB: '', imageB: 'images/products/flannel-shirts-jackets-mens-padded-lined-flannel-jacket-2.webp', description: 'Quilted padded lining providing extra warmth for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Padded Lined Flannel Jackets', imageA: '', imageA: 'images/products/flannel-shirts-jackets-ladies-padded-lined-flannel-jacket-1.webp', imageB: '', imageB: 'images/products/flannel-shirts-jackets-ladies-padded-lined-flannel-jacket-2.webp', description: 'Quilted padded lining flannel jackets tailored for women.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Mens Sherpa Lined Flannel Jackets', imageA: '', imageA: 'images/products/flannel-shirts-jackets-mens-sherpa-lined-flannel-jacket-1.webp', imageB: '', imageB: 'images/products/flannel-shirts-jackets-mens-sherpa-lined-flannel-jacket-2.webp', description: 'Warm sherpa fleece lining for maximum cold weather protection for men.' },
        { category: 'apparel', subcategory: 'flannel-shirts-jackets', name: 'Ladies Sherpa Lined Flannel Jackets', imageA: '', imageA: 'images/products/flannel-shirts-jackets-ladies-sherpa-lined-flannel-jacket-1.webp', imageB: '', imageB: 'images/products/flannel-shirts-jackets-ladies-sherpa-lined-flannel-jacket-2.webp', description: 'Cozy sherpa fleece lining flannel jackets designed for women.' },

        // TAB 1: APPAREL - Fleece & Knitwear
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Pullover Hoodie', imageA: 'images/products/fleece-knitwear-fleece-pullover-hoodie-1.webp', imageB: 'images/products/fleece-knitwear-fleece-pullover-hoodie-2.webp', description: 'Cozy and warm pullover hoodies made from premium fleece.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Mock Neck Zipper Jacket', imageA: 'images/products/fleece-knitwear-fleece-mock-neck-zipper-jacket-1.webp', imageB: 'images/products/fleece-knitwear-fleece-mock-neck-zipper-jacket-2.webp', description: 'Premium fleece jackets featuring a stylish mock neck and full zipper.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Sweatshirt', imageA: 'images/products/fleece-knitwear-fleece-sweatshirt-1.webp', imageB: 'images/products/fleece-knitwear-fleece-sweatshirt-2.webp', description: 'Classic crewneck sweatshirts in soft fleece fabrics.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Pajamas', imageA: 'images/products/fleece-knitwear-fleece-pajamas-1.webp', imageB: 'images/products/fleece-knitwear-fleece-pajamas-2.webp', description: 'Comfortable fleece pajama bottoms for loungewear.' },
        { category: 'apparel', subcategory: 'fleece-knitwear', name: 'Fleece Joggers', imageA: 'images/products/fleece-knitwear-fleece-joggers-1.webp', imageB: 'images/products/fleece-knitwear-fleece-joggers-2.webp', description: 'Athletic-cut fleece joggers with drawstring waist.' },

        // TAB 1: APPAREL - Denim & Jeans
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Skinny Jeans', imageA: 'images/products/denim-jeans-skinny-jeans-1.webp', imageB: 'images/products/denim-jeans-skinny-jeans-2.webp', description: 'Snug-fit stretch denim jeans in various washes.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Slim Fit Jeans', imageA: 'images/products/denim-jeans-slim-fit-jeans-1.webp', imageB: 'images/products/denim-jeans-slim-fit-jeans-2.webp', description: 'Modern slim-cut jeans balancing style and comfort.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Straight Cut Jeans', imageA: 'images/products/denim-jeans-straight-cut-jeans-1.webp', imageB: 'images/products/denim-jeans-straight-cut-jeans-2.webp', description: 'Classic straight-leg denim jeans for everyday wear.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Bootcut Jeans', imageA: 'images/products/denim-jeans-bootcut-jeans-1.webp', imageB: 'images/products/denim-jeans-bootcut-jeans-2.webp', description: 'Slightly flared hems designed to fit comfortably over boots.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Flapper Jeans', imageA: 'images/products/denim-jeans-flapper-jeans-1.webp', imageB: 'images/products/denim-jeans-flapper-jeans-2.webp', description: 'Trendy wide-leg cropped denim pants.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Cargo Jeans', imageA: 'images/products/denim-jeans-cargo-jeans-1.webp', imageB: 'images/products/denim-jeans-cargo-jeans-2.webp', description: 'Utility-focused denim featuring multiple cargo pockets.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Carpenter Jeans', imageA: 'images/products/denim-jeans-carpenter-jeans-1.webp', imageB: 'images/products/denim-jeans-carpenter-jeans-2.webp', description: 'Durable utility jeans with tool pockets and hammer loops.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Regular Denim', imageA: 'images/products/denim-jeans-regular-denim-1.webp', imageB: 'images/products/denim-jeans-regular-denim-2.webp', description: 'Standard fit durable denim trousers.' },
        { category: 'apparel', subcategory: 'denim-jeans', name: 'Short Body Denim Jacket', imageA: 'images/products/denim-jeans-short-body-denim-jacket-1.webp', imageB: 'images/products/denim-jeans-short-body-denim-jacket-2.webp', description: 'Cropped-style denim jackets in premium washes.' },

        // TAB 1: APPAREL - Hoodies & Sweatshirts
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Pullover Hoodie', imageA: 'images/products/hoodies-sweatshirts-pullover-hoodie-1.webp', imageB: 'images/products/hoodies-sweatshirts-pullover-hoodie-2.webp', description: 'Comfortable pullover hoodies in custom weights.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Zipper Hoodie', imageA: 'images/products/hoodies-sweatshirts-zipper-hoodie-1.webp', imageB: 'images/products/hoodies-sweatshirts-zipper-hoodie-2.webp', description: 'Full-zip hoodies, perfect for layering.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Crewneck Sweatshirt', imageA: 'images/products/hoodies-sweatshirts-crewneck-sweatshirt-1.webp', imageB: 'images/products/hoodies-sweatshirts-crewneck-sweatshirt-2.webp', description: 'Classic crewneck sweatshirts in soft cotton fleece.' },
        { category: 'apparel', subcategory: 'hoodies-sweatshirts', name: 'Oversized Hoodie', imageA: 'images/products/hoodies-sweatshirts-oversized-hoodie-1.webp', imageB: 'images/products/hoodies-sweatshirts-oversized-hoodie-2.webp', description: 'Trendy oversized baggy hoodies in heavy fabrics.' },

        // TAB 1: APPAREL - Trousers & Bottoms
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Mens Cotton Twill Pants', imageA: 'images/products/hoodies-sweatshirts-mens-cotton-twill-pants-1.webp', imageB: 'images/products/hoodies-sweatshirts-mens-cotton-twill-pants-2.webp', description: 'Durable and breathable cotton twill trousers for men.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Ladies Cotton Twill Pants', imageA: 'images/products/hoodies-sweatshirts-ladies-cotton-twill-pants-1.webp', imageB: 'images/products/hoodies-sweatshirts-ladies-cotton-twill-pants-2.webp', description: 'Comfortable and stylish cotton twill trousers for women.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Mens Stretch Comfort Twill Pants', imageA: 'images/products/hoodies-sweatshirts-mens-stretch-comfort-twill-pants-1.webp', imageB: 'images/products/hoodies-sweatshirts-mens-stretch-comfort-twill-pants-2.webp', description: 'Flexible stretch twill pants for men.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Ladies Stretch Comfort Twill Pants', imageA: 'images/products/hoodies-sweatshirts-ladies-stretch-comfort-twill-pants-1.webp', imageB: 'images/products/hoodies-sweatshirts-ladies-stretch-comfort-twill-pants-2.webp', description: 'Flexible stretch twill pants designed for women.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Cotton Lounge Pants', imageA: 'images/products/hoodies-sweatshirts-cotton-lounge-pants-1.webp', imageB: 'images/products/hoodies-sweatshirts-cotton-lounge-pants-2.webp', description: 'Lightweight, breathable cotton loungewear pants.' },
        { category: 'apparel', subcategory: 'trousers-bottoms', name: 'Flannel Lounge Pants', imageA: 'images/products/hoodies-sweatshirts-flannel-lounge-pants-1.webp', imageB: 'images/products/hoodies-sweatshirts-flannel-lounge-pants-2.webp', description: 'Warm and cozy flannel loungewear pants.' },

        // TAB 1: APPAREL - Sportswear & Sleepwear
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Cotton Sleep Suit', imageA: 'images/products/sportswear-sleepwear-mens-cotton-sleep-suit-1.webp', imageB: 'images/products/sportswear-sleepwear-mens-cotton-sleep-suit-2.webp', description: 'Two-piece breathable cotton sleepwear set for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Womens Cotton Sleep Suit', imageA: 'images/products/sportswear-sleepwear-womens-cotton-sleep-suit-1.webp', imageB: 'images/products/sportswear-sleepwear-womens-cotton-sleep-suit-2.webp', description: 'Soft and comfortable cotton sleepwear set for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Flannel Sleep Suit', imageA: 'images/products/sportswear-sleepwear-mens-flannel-sleep-suit-1.webp', imageB: 'images/products/sportswear-sleepwear-mens-flannel-sleep-suit-2.webp', description: 'Warm two-piece flannel sleepwear set for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Womens Flannel Sleep Suit', imageA: 'images/products/sportswear-sleepwear-womens-flannel-sleep-suit-1.webp', imageB: 'images/products/sportswear-sleepwear-womens-flannel-sleep-suit-2.webp', description: 'Cozy two-piece flannel sleepwear set for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Sweat Absorbent Tops', imageA: 'images/products/sportswear-sleepwear-mens-sweat-absorbent-tops-1.webp', imageB: 'images/products/sportswear-sleepwear-mens-sweat-absorbent-tops-2.webp', description: 'Moisture-wicking athletic tops for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Ladies Sweat Absorbent Tops', imageA: 'images/products/sportswear-sleepwear-ladies-sweat-absorbent-tops-1.webp', imageB: 'images/products/sportswear-sleepwear-ladies-sweat-absorbent-tops-2.webp', description: 'Moisture-wicking athletic tops for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Sweat Absorbent Bottoms', imageA: 'images/products/sportswear-sleepwear-mens-sweat-absorbent-bottoms-1.webp', imageB: 'images/products/sportswear-sleepwear-mens-sweat-absorbent-bottoms-2.webp', description: 'Moisture-wicking athletic pants and shorts for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Ladies Sweat Absorbent Bottoms', imageA: 'images/products/sportswear-sleepwear-ladies-sweat-absorbent-bottoms-1.webp', imageB: 'images/products/sportswear-sleepwear-ladies-sweat-absorbent-bottoms-2.webp', description: 'Moisture-wicking athletic pants and shorts for women.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Mens Sweat Absorbent Jackets', imageA: 'images/products/sportswear-sleepwear-mens-sweat-absorbent-jackets-1.webp', imageB: 'images/products/sportswear-sleepwear-mens-sweat-absorbent-jackets-2.webp', description: 'Lightweight performance jackets for men.' },
        { category: 'apparel', subcategory: 'sportswear-sleepwear', name: 'Ladies Sweat Absorbent Jackets', imageA: 'images/products/sportswear-sleepwear-ladies-sweat-absorbent-jackets-1.webp', imageB: 'images/products/sportswear-sleepwear-ladies-sweat-absorbent-jackets-2.webp', description: 'Lightweight performance jackets designed for women.' },

        // TAB 1: APPAREL - Kids Wear
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Infant Rompers', imageA: 'images/products/kids-wear-kids-infant-rompers-1.webp', imageB: 'images/products/kids-wear-kids-infant-rompers-2.webp', description: 'Ultra-soft and safe cotton rompers for babies.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Shorts', imageA: 'images/products/kids-wear-kids-shorts-1.webp', imageB: 'images/products/kids-wear-kids-shorts-2.webp', description: 'Comfortable and durable shorts for active children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids T-Shirt', imageA: 'images/products/kids-wear-kids-t-shirt-1.webp', imageB: 'images/products/kids-wear-kids-t-shirt-2.webp', description: 'Soft, breathable cotton tees with kid-friendly dyes.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Pajamas', imageA: 'images/products/kids-wear-kids-pajamas-1.webp', imageB: 'images/products/kids-wear-kids-pajamas-2.webp', description: 'Cozy sleepwear bottoms for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Pajama Suits', imageA: 'images/products/kids-wear-kids-pajama-suits-1.webp', imageB: 'images/products/kids-wear-kids-pajama-suits-2.webp', description: 'Two-piece matching pajama sets for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Shorts Suits', imageA: 'images/products/kids-wear-kids-shorts-suits-1.webp', imageB: 'images/products/kids-wear-kids-shorts-suits-2.webp', description: 'Matching t-shirt and shorts sets for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Jeans', imageA: 'images/products/kids-wear-kids-jeans-1.webp', imageB: 'images/products/kids-wear-kids-jeans-2.webp', description: 'Durable stretch denim jeans for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Denim Shorts', imageA: 'images/products/kids-wear-kids-denim-shorts-1.webp', imageB: 'images/products/kids-wear-kids-denim-shorts-2.webp', description: 'Sturdy and stylish denim shorts for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Denim Jackets', imageA: 'images/products/kids-wear-kids-denim-jackets-1.webp', imageB: 'images/products/kids-wear-kids-denim-jackets-2.webp', description: 'Classic denim jackets scaled for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Hoodie', imageA: 'images/products/kids-wear-kids-hoodie-1.webp', imageB: 'images/products/kids-wear-kids-hoodie-2.webp', description: 'Warm and cozy fleece hoodies for kids.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Sweatshirt', imageA: 'images/products/kids-wear-kids-sweatshirt-1.webp', imageB: 'images/products/kids-wear-kids-sweatshirt-2.webp', description: 'Soft crewneck sweatshirts for children.' },
        { category: 'apparel', subcategory: 'kids-wear', name: 'Kids Fleece Pajamas', imageA: 'images/products/kids-wear-kids-fleece-pajamas-1.webp', imageB: 'images/products/kids-wear-kids-fleece-pajamas-2.webp', description: 'Warm fleece sleepwear bottoms for kids.' },

        // TAB 2: ACCESSORIES - Caps & Headwear
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Baseball Caps', imageA: 'images/products/1-caps-headwear-baseball-caps-1.webp', imageB: 'images/products/1-caps-headwear-baseball-caps-2.webp', description: 'Custom baseball caps for brands and promotions.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Snapbacks', imageA: 'images/products/1-caps-headwear-snapbacks-1.webp', imageB: 'images/products/1-caps-headwear-snapbacks-2.webp', description: 'Flat-brim snapback caps with customizable embroidery.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Beanies', imageA: 'images/products/1-caps-headwear-beanies-1.webp', imageB: 'images/products/1-caps-headwear-beanies-2.webp', description: 'Warm knitted beanies for winter wear.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Bucket Hats', imageA: 'images/products/1-caps-headwear-bucket-hats-1.webp', imageB: 'images/products/1-caps-headwear-bucket-hats-2.webp', description: 'Trendy cotton bucket hats for sun protection.' },
        { category: 'accessories', subcategory: 'caps-headwear', name: 'Visors', imageA: 'images/products/1-caps-headwear-visors-1.webp', imageB: 'images/products/1-caps-headwear-visors-2.webp', description: 'Sporty sun visors with adjustable straps.' },

        // TAB 2: ACCESSORIES - Face Masks
        { category: 'accessories', subcategory: 'face-masks', name: 'Reusable Fabric Masks', imageA: 'images/products/2-face-masks-reusable-fabric-masks-1.webp', imageB: 'images/products/2-face-masks-reusable-fabric-masks-2.webp', description: 'Washable and breathable multi-layer cotton face masks.' },
        { category: 'accessories', subcategory: 'face-masks', name: 'Disposable Masks', imageA: 'images/products/2-face-masks-disposable-masks-1.webp', imageB: 'images/products/2-face-masks-disposable-masks-2.webp', description: 'Lightweight protective disposable face masks.' },
        { category: 'accessories', subcategory: 'face-masks', name: 'Kids Masks', imageA: 'images/products/2-face-masks-kids-masks-1.webp', imageB: 'images/products/2-face-masks-kids-masks-2.webp', description: 'Soft fabric masks scaled and designed for children.' },

        // TAB 3: HOME TEXTILES - Kitchen & Bath Textiles
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Kitchen Towels', imageA: 'images/products/3-kitchen-bath-bedding-textiles-kitchen-towels-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-kitchen-towels-2.webp', description: 'Highly absorbent cotton towels for kitchen use.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Wash Towels', imageA: 'images/products/3-kitchen-bath-bedding-textiles-wash-towels-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-wash-towels-2.webp', description: 'Soft and durable washcloths for daily cleansing.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Bath Towels', imageA: 'images/products/3-kitchen-bath-bedding-textiles-bath-towels-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-bath-towels-2.webp', description: 'Plush, high-pile cotton towels for bath use.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Bath Mats', imageA: 'images/products/3-kitchen-bath-bedding-textiles-bath-mats-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-bath-mats-2.webp', description: 'Thick, slip-resistant woven cotton bath mats.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Hand Towels', imageA: 'images/products/3-kitchen-bath-bedding-textiles-hand-towels-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-hand-towels-2.webp', description: 'Soft hand towels in custom weaves and border designs.' },
        { category: 'home-textiles', subcategory: 'kitchen-bath-textiles', name: 'Aprons', imageA: 'images/products/3-kitchen-bath-bedding-textiles-aprons-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-aprons-2.webp', description: 'Protective kitchen aprons in durable twill or canvas.' },

        // TAB 3: HOME TEXTILES - Bedding & Linen
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Bed Sheet Sets', imageA: 'images/products/3-kitchen-bath-bedding-textiles-bed-sheet-sets-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-bed-sheet-sets-2.webp', description: 'Flat sheets, fitted sheets, and pillowcase sets in premium thread counts.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Fitted Sheets', imageA: 'images/products/3-kitchen-bath-bedding-textiles-fitted-sheets-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-fitted-sheets-2.webp', description: 'Deep-pocket elasticized fitted sheets.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Duvet Covers', imageA: 'images/products/3-kitchen-bath-bedding-textiles-duvet-covers-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-duvet-covers-2.webp', description: 'Elegant duvet covers with button or zipper closures.' },
        { category: 'home-textiles', subcategory: 'bedding-linen', name: 'Pillow Cases & Comforter Sets', imageA: 'images/products/3-kitchen-bath-bedding-textiles-pillow-cases-comforter-sets-1.webp', imageB: 'images/products/3-kitchen-bath-bedding-textiles-pillow-cases-comforter-sets-2.webp', description: 'Matching comforters and decorative pillow shams.' },

        // TAB 3: HOME TEXTILES - Rags
        { category: 'home-textiles', subcategory: 'rags', name: 'White Cotton Rags', imageA: 'images/products/4-rags-white-cotton-rags-1.webp', imageB: 'images/products/4-rags-white-cotton-rags-2.webp', description: 'Premium metal-free white cotton cleaning rags for industrial use.' },
        { category: 'home-textiles', subcategory: 'rags', name: 'Multi Color Cotton Rags', imageA: 'images/products/4-rags-multi-color-cotton-rags-1.webp', imageB: 'images/products/4-rags-multi-color-cotton-rags-2.webp', description: 'Eco-friendly colored cotton rags for general cleaning.' },
        { category: 'home-textiles', subcategory: 'rags', name: 'Assorted Rags', imageA: 'images/products/4-rags-assorted-rags-1.webp', imageB: 'images/products/4-rags-assorted-rags-2.webp', description: 'Absorbent mixed fabric rags for industrial spills.' }
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
            // Optimized: Use data-src for hover image to defer load until hover/tap, cutting page weight by 50%
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img class="img-default" src="${product.imageA || product.image}" alt="${product.name}" loading="lazy" width="300" height="225">
                    <img class="img-hover" data-src="${product.imageB || product.image}" alt="${product.name} folded" loading="lazy" width="300" height="225">
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

    // Event delegation for mobile image toggle button and mouseover hover preloading
    const grid = document.getElementById('products-grid');
    if (grid) {
        // 1. Mouseover (Desktop): Load hover image on hover
        grid.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            const hoverImg = card.querySelector('.img-hover');
            if (hoverImg && !hoverImg.src) {
                hoverImg.src = hoverImg.getAttribute('data-src');
            }
        });

        // 2. Click (Mobile): Toggle image view on mobile tap
        grid.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('.mobile-toggle-btn');
            if (!toggleBtn) return;
            
            e.stopPropagation();
            
            const wrapper = toggleBtn.closest('.product-image-wrapper');
            if (wrapper) {
                const hoverImg = wrapper.querySelector('.img-hover');
                if (hoverImg && !hoverImg.src) {
                    hoverImg.src = hoverImg.getAttribute('data-src');
                }
                wrapper.classList.toggle('show-hover');
            }
        });
    }

    // Run on initial load
    filterProducts();
});
