/*
 * BM International (BMI) - Frontend JavaScript
 * Updated with Dynamic WebP Product Catalog, Tab Switching, Filtering, and Lightbox Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.querySelector('.navbar');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  // Catalog DOM Elements
  const tabBtns = document.querySelectorAll('.catalog-tab-btn');
  const categoryPillsContainer = document.getElementById('categoryPills');
  const searchInput = document.getElementById('catalogSearch');
  const catalogGrid = document.getElementById('catalogGrid');
  const catalogCount = document.getElementById('catalogCount');

  // Modal DOM Elements
  const modal = document.getElementById('catalogModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalThumbnails = document.getElementById('modalThumbnails');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  // State
  let currentTab = 'tab1';
  let currentCategory = 'ALL';
  let searchQuery = '';
  let activeModalProduct = null;
  let activeModalImageIdx = 0;

  // --- Mobile Menu Toggle ---
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const spans = mobileToggle.querySelectorAll('span');
      if (navLinksContainer.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- Scroll Effects ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // --- Active Nav Link Highlight ---
  const sections = document.querySelectorAll('section[id]');
  function highlightNavLink() {
    let scrollPosition = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavLink);

  // --- Contact Form Handling ---
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 10000);
      }
    });
  }

  // ===================== DYNAMIC PRODUCT CATALOG =====================
  const catalog = window.BMI_CATALOG || [];

  function renderCategoryPills() {
    if (!categoryPillsContainer) return;
    const tabProducts = catalog.filter(item => item.tabId === currentTab);
    const categories = ['ALL', ...new Set(tabProducts.map(item => item.category))];

    categoryPillsContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `pill-btn ${cat === currentCategory ? 'active' : ''}`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        currentCategory = cat;
        renderCategoryPills();
        renderCatalog();
      });
      categoryPillsContainer.appendChild(btn);
    });
  }

  function renderCatalog() {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = '';

    let filtered = catalog.filter(item => item.tabId === currentTab);
    if (currentCategory !== 'ALL') {
      filtered = filtered.filter(item => item.category === currentCategory);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q)
      );
    }

    if (catalogCount) {
      catalogCount.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `
        <div class="catalog-empty">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <p>No products found matching your search criteria.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'product-card';

      const mainImg = item.images[0] || 'images/placeholder.txt';
      const hoverImg = item.images[1] || mainImg;

      card.innerHTML = `
        <div class="product-card-img-wrapper">
          <img src="${mainImg}" alt="${item.name}" class="card-main-img" loading="lazy" />
          <span class="webp-badge">.WebP</span>
          ${item.images.length > 1 ? `<span class="gallery-badge">${item.images.length} views</span>` : ''}
          <button class="quick-view-btn">Quick View</button>
        </div>
        <div class="product-card-body">
          <span class="product-card-cat">${item.category}</span>
          <h4>${item.name}</h4>
          <div class="card-footer">
            <span class="badge-tag">Export Quality</span>
            <a href="#contact" class="inquire-link">Inquire &rarr;</a>
          </div>
        </div>
      `;

      // Image hover swap if multiple images
      if (item.images.length > 1) {
        const imgEl = card.querySelector('.card-main-img');
        card.addEventListener('mouseenter', () => { imgEl.src = hoverImg; });
        card.addEventListener('mouseleave', () => { imgEl.src = mainImg; });
      }

      // Open Modal on click
      card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          openModal(item);
        }
      });

      catalogGrid.appendChild(card);
    });
  }

  // Tab Switchers
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.getAttribute('data-tab');
      currentCategory = 'ALL';
      renderCategoryPills();
      renderCatalog();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // --- Modal Lightbox ---
  function openModal(item) {
    if (!modal) return;
    activeModalProduct = item;
    activeModalImageIdx = 0;
    updateModalContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateModalContent() {
    if (!activeModalProduct) return;
    const item = activeModalProduct;
    modalTitle.textContent = item.name;
    modalCategory.textContent = item.category;
    modalImg.src = item.images[activeModalImageIdx];

    // Build thumbnails
    modalThumbnails.innerHTML = '';
    item.images.forEach((imgSrc, idx) => {
      const thumb = document.createElement('img');
      thumb.src = imgSrc;
      thumb.className = `modal-thumb ${idx === activeModalImageIdx ? 'active' : ''}`;
      thumb.addEventListener('click', () => {
        activeModalImageIdx = idx;
        updateModalContent();
      });
      modalThumbnails.appendChild(thumb);
    });

    if (modalPrev && modalNext) {
      modalPrev.style.display = item.images.length > 1 ? 'flex' : 'none';
      modalNext.style.display = item.images.length > 1 ? 'flex' : 'none';
    }

    if (modalInquireBtn) {
      modalInquireBtn.onclick = () => {
        closeModal();
      };
    }
  }

  if (modalPrev) {
    modalPrev.addEventListener('click', () => {
      if (!activeModalProduct) return;
      activeModalImageIdx = (activeModalImageIdx - 1 + activeModalProduct.images.length) % activeModalProduct.images.length;
      updateModalContent();
    });
  }

  if (modalNext) {
    modalNext.addEventListener('click', () => {
      if (!activeModalProduct) return;
      activeModalImageIdx = (activeModalImageIdx + 1) % activeModalProduct.images.length;
      updateModalContent();
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Initial render
  renderCategoryPills();
  renderCatalog();
});
