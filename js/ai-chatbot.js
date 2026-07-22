/**
 * BM International - Live Floating AI Chatbot Engine
 * Professional Enterprise Sourcing Concierge & Intelligent B2B FAQ Engine
 */

(function () {
  'use strict';

  // --- KNOWLEDGE BASE & INTENT MATCHER ---
  const BMI_KNOWLEDGE = {
    greetings: {
      keywords: ['hello', 'hi', 'hey', 'assalam', 'greetings', 'start', 'help', 'good morning', 'good afternoon'],
      response: `👋 **Welcome to BM International (BMI) Sourcing Intelligence.**\n\nI am your dedicated **AI Textile Concierge**. I can assist you with:\n\n• 🧶 **Product Specifications** (Apparel, Denim, Towels, Bedding, Workwear)\n• 📦 **MOQs & Flexible Quantities**\n• ⏱️ **Sampling & Production Lead Times**\n• 🛡️ **Quality Control & AQL Standards**\n• ✈️ **Export Shipping & Custom Branding**\n\nHow can I help your apparel or home textile business today?`,
      actions: [
        { label: '👕 Garments & Products', payload: 'products' },
        { label: '📊 MOQs & Pricing', payload: 'moq' },
        { label: '⏱️ Lead Times & Shipping', payload: 'leadtimes' },
        { label: '📝 Request Free Quote', payload: 'rfq' }
      ]
    },

    products: {
      keywords: ['product', 'item', 'garment', 'apparel', 'catalog', 'denim', 'jeans', 'hoodie', 'tshirt', 'shirt', 'towel', 'bedding', 'workwear', 'jacket', 'pants', 'trousers', 'fabric', 'fleece'],
      response: `🧵 **BM International Product Capabilities**\n\nWe source & manufacture across 4 primary textile categories:\n\n1. **Apparel & Garments**: Denim (Jeans, Jackets, Shorts), Knitwear (Hoodies, Sweatshirts, Tees, Joggers), Woven (Shirts, Trousers, Cargo Pants), Activewear.\n2. **Home Textiles & Bedding**: Sheet sets, Duvet covers, Pillowcases, Hotel linen (200 TC - 1000 TC).\n3. **Bath & Terry Towels**: Bath towels, Hand towels, Face towels, Velour & Jacquard beach towels (350-700 GSM).\n4. **Workwear & Uniforms**: Coveralls, Hi-Vis jackets, Scrubs, Industrial uniform pants.\n\n*All items are customizable with your tech packs, embroidery, screen printing, custom labels, and branded packaging.*`,
      actions: [
        { label: '🔍 View Full Catalog', action: 'scrollToCatalog' },
        { label: '📦 Check MOQs', payload: 'moq' },
        { label: '📑 Request Custom Sample', payload: 'samples' }
      ]
    },

    moq: {
      keywords: ['moq', 'minimum order', 'minimum quantity', 'small order', 'how many pieces', 'trial order', 'order size'],
      response: `📦 **Minimum Order Quantities (MOQ)**\n\nWe offer competitive & flexible MOQs tailored for established brands and growing retailers:\n\n• **Knitwear & Garments**: 300 to 500 pcs per style / colorway (flexible size breakdown).\n• **Denim & Jeans**: 500 pcs per style (includes wash variants).\n• **Home Textiles & Bedding**: 500 sets per design.\n• **Terry Towels**: 1,000 pcs per color/size.\n• **Custom Prototypes / Samples**: 1 to 5 pcs during development phase.\n\n*Need a trial order for a new launch? We can negotiate flexible terms based on fabric availability.*`,
      actions: [
        { label: '📝 Get Quote for My Order', payload: 'rfq' },
        { label: '⏱️ Check Lead Times', payload: 'leadtimes' }
      ]
    },

    leadtimes: {
      keywords: ['lead time', 'leadtime', 'delivery time', 'production time', 'how long', 'shipping duration', 'transit time', 'air freight', 'sea freight', 'turnaround'],
      response: `⏱️ **Lead Times & Delivery Timeline**\n\nOur end-to-end timeline ensures zero delays:\n\n• **Proto & Fit Samples**: 5 – 7 business days\n• **Salesman / Lab Dips / PPS**: 7 – 10 business days\n• **Bulk Production**: 30 – 45 days (post Pre-Production Sample approval)\n• **Air Freight**: 5 – 7 days to USA/EU/GCC\n• **Sea Freight**: 20 – 30 days to major international ports (FOB Karachi)\n\nWe provide weekly production progress reports with inline inspection photos.`,
      actions: [
        { label: '✈️ Express Sampling Info', payload: 'samples' },
        { label: '📞 Request Call Back', payload: 'callback' }
      ]
    },

    samples: {
      keywords: ['sample', 'sampling', 'proto', 'prototype', 'lab dip', 'strike off', 'swatch', 'fabric swatch', 'tech pack'],
      response: `🧪 **Sampling & Development Process**\n\nBefore bulk production starts, we provide complete physical verification:\n\n1. **Fabric Swatches & Lab Dips**: Pantone color matching & GSM verification.\n2. **Proto / Fit Sample**: Constructed using your tech pack or reference sample.\n3. **Pre-Production Sample (PPS)**: 100% accurate sample with tags, trims, and prints for final buyer sign-off.\n\n*Sample lead time is 7-10 days. Sample charges are fully credited back upon bulk order placement.*`,
      actions: [
        { label: '📩 Order Samples Now', payload: 'rfq' },
        { label: '🛡️ View Quality Standards', payload: 'quality' }
      ]
    },

    quality: {
      keywords: ['quality', 'inspection', 'aql', 'audit', 'defect', 'testing', 'gsm', 'oeko-tex', 'bsci', 'iso', 'gots', 'compliance', 'certifications'],
      response: `🛡️ **Quality Assurance & Compliance**\n\nBM International enforces rigid quality benchmarks to protect your brand:\n\n• **AQL 2.5 Inspection Standard**: Strict international Acceptable Quality Limit.\n• **4-Point Fabric Inspection**: Raw fabric checking before cutting.\n• **Inline & Final Inspection**: Full garment checking (stitching, seam strength, measurements, color fastness).\n• **Certified Mills**: Partner mills hold **OEKO-TEX Standard 100, BSCI, GOTS (Organic), ISO 9001, and WRAP** certifications.\n• **Detailed Audit Reports**: Comprehensive pre-shipment inspection PDF provided before container loading.`,
      actions: [
        { label: '📋 Request Sample Audit Report', payload: 'rfq' },
        { label: '🏢 About BM International', payload: 'about' }
      ]
    },

    payment: {
      keywords: ['payment', 'pay', 'price', 'pricing', 'fob', 'cif', 'lc', 'letter of credit', 'tt', 'deposit', 'cost', 'terms', 'incoterms'],
      response: `💳 **Pricing & Payment Terms**\n\nWe provide transparent, factory-direct pricing with flexible B2B terms:\n\n• **Price Terms**: FOB (Karachi Port/Airport), CIF, CFR, or DDP (Delivered Duty Paid).\n• **Standard Payment**: 30% T/T advance deposit, 70% balance against Bill of Lading (B/L) copy.\n• **Letter of Credit**: Irrevocable L/C at sight accepted for container-load bulk orders.\n• **Currencies**: USD ($), EUR (€), GBP (£), AED.\n\n*Get an itemized FOB quote tailored to your fabric GSM, quantity, and packaging specs.*`,
      actions: [
        { label: '📝 Request Instant FOB Quote', payload: 'rfq' },
        { label: '💬 Chat on WhatsApp', action: 'openWhatsApp' }
      ]
    },

    customization: {
      keywords: ['custom', 'oem', 'odm', 'brand', 'logo', 'embroidery', 'print', 'label', 'tag', 'packaging', 'polybag', 'hangtag', 'screen print', 'dtg', 'puff print'],
      response: `🏷️ **Custom OEM/ODM Branding Options**\n\nMake your apparel collection 100% custom:\n\n• **Branding**: Woven neck labels, care labels, hangtags, barcodes, custom polybags.\n• **Prints & Embellishments**: Screen printing, Puff print, Rubber print, DTG, Heat transfer, High-density embroidery, Appliqué.\n• **Custom Trims**: Customized metal buttons, zippers (YKK/custom), drawstrings, aglets.\n• **Packaging**: Individual folded polybags, branded master cartons, barcoded for Amazon/3PL fulfillment.`,
      actions: [
        { label: '📝 Send Tech Pack / Specifications', payload: 'rfq' }
      ]
    },

    shipping: {
      keywords: ['shipping', 'ship', 'export', 'port', 'karachi', 'destination', 'country', 'customs', 'duty', 'documentation', 'container', 'fcl', 'lcl'],
      response: `✈️ **Global Export & Shipping Coverage**\n\nBM International ships worldwide with full export clearance:\n\n• **Primary Destinations**: USA, United Kingdom, EU (Germany, France, Netherlands), UAE, Canada, Australia.\n• **Sea Freight**: FCL (Full Container Load) & LCL (Less than Container Load) via Karachi Port.\n• **Air Freight**: Door-to-door courier (DHL/FedEx) or Airport Cargo for urgent consignments.\n• **Export Documentation**: Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, GSP Form A (duty concessions where applicable).`,
      actions: [
        { label: '📝 Check Shipping Rates', payload: 'rfq' }
      ]
    },

    about: {
      keywords: ['about', 'company', 'who are you', 'bm international', 'bmi', 'location', 'pakistan', 'founder', 'history', 'experience'],
      response: `🏢 **About BM International (BMI)**\n\nBM International is a premier Pakistan-based garments and textile sourcing, export, and buying agent company serving global apparel brands, wholesalers, and importers.\n\n• **10+ Years** Industry Experience in Textile Hubs (Karachi, Faisalabad, Lahore)\n• **500+** Orders Delivered Globally\n• **50+** Active Global Corporate Clients\n• Dedicated Merchandising, Factory Audit, and QA team on the ground.`,
      actions: [
        { label: '🔍 Learn More', action: 'scrollToAbout' },
        { label: '📞 Contact Sourcing Team', action: 'scrollToContact' }
      ]
    },

    rfq: {
      keywords: ['quote', 'rfq', 'inquiry', 'inquire', 'contact', 'email', 'phone', 'whatsapp', 'order now', 'buy', 'price list', 'cost estimate'],
      type: 'rfq_form',
      response: `📋 **Instant Request for Quote (RFQ)**\n\nFill in your specifications below and our Senior Merchandiser will respond within **2 to 4 business hours** with factory pricing & lead times:`
    },

    callback: {
      keywords: ['callback', 'call me', 'phone call', 'speak to human', 'talk to person', 'representative'],
      type: 'callback_form',
      response: `📞 **Schedule a Direct Sourcing Consultation**\n\nPlease enter your contact details below to have our Textile Specialist reach out to you via WhatsApp or Email:`
    }
  };

  // --- CHATBOT UI SYSTEM ---
  let chatState = {
    isOpen: false,
    soundEnabled: true,
    messages: []
  };

  // DOM Cache
  let launcherBtn, chatWindow, closeBtn, minimizeBtn, resetBtn, soundBtn, messagesContainer, chatInput, sendBtn, teaserTooltip;

  function initChatbot() {
    createDOMStructure();
    bindEvents();
    loadSession();

    // Show initial teaser tooltip after 2.5s if not opened
    setTimeout(() => {
      if (!chatState.isOpen && teaserTooltip) {
        teaserTooltip.classList.add('visible');
      }
    }, 2500);
  }

  function createDOMStructure() {
    // 1. Floating Launcher Button
    launcherBtn = document.createElement('button');
    launcherBtn.id = 'ai-chat-launcher';
    launcherBtn.setAttribute('aria-label', 'Open AI Sourcing Assistant');
    launcherBtn.innerHTML = `
      <div class="launcher-pulse"></div>
      <div class="launcher-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
          <path d="M4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7z"/>
          <path d="M9 16h6"/>
          <circle cx="9" cy="13" r="1"/>
          <circle cx="15" cy="13" r="1"/>
        </svg>
      </div>
      <span class="launcher-badge">1</span>
    `;

    // 2. Teaser Tooltip
    teaserTooltip = document.createElement('div');
    teaserTooltip.id = 'ai-chat-teaser';
    teaserTooltip.innerHTML = `
      <button class="teaser-close" aria-label="Dismiss">&times;</button>
      <div class="teaser-content">
        <span class="teaser-tag">⚡ BMI AI Concierge</span>
        <p>Need MOQ, Fabric Specs, or Instant Quotes? Ask our AI assistant!</p>
      </div>
    `;

    // 3. Main Chat Window
    chatWindow = document.createElement('div');
    chatWindow.id = 'ai-chat-window';
    chatWindow.setAttribute('role', 'dialog');
    chatWindow.setAttribute('aria-label', 'BM International AI Assistant');
    chatWindow.innerHTML = `
      <div class="chat-header">
        <div class="header-brand">
          <div class="brand-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="online-indicator"></span>
          </div>
          <div class="brand-text">
            <div class="brand-title-row">
              <h3>BMI Sourcing AI</h3>
              <span class="verified-badge">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Verified
              </span>
            </div>
            <p class="status-text">
              <span class="status-dot"></span>
              Instant Textile Concierge
            </p>
          </div>
        </div>
        <div class="header-controls">
          <button id="ai-chat-sound" title="Toggle Sound" aria-label="Toggle Sound">
            <svg class="sound-on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            <svg class="sound-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          </button>
          <button id="ai-chat-reset" title="Reset Chat" aria-label="Reset Conversation">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </button>
          <button id="ai-chat-close" title="Close" aria-label="Close Chat Window">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="chat-quick-chips" id="ai-quick-chips">
        <button data-payload="products">👕 Products</button>
        <button data-payload="moq">📦 MOQ & Rates</button>
        <button data-payload="leadtimes">⏱️ Lead Times</button>
        <button data-payload="quality">🛡️ Quality & AQL</button>
        <button data-payload="rfq">📝 Request Quote</button>
      </div>

      <div class="chat-messages" id="ai-messages-container">
        <!-- Messages rendered dynamically -->
      </div>

      <div class="chat-typing" id="ai-typing-indicator" style="display:none;">
        <span class="avatar-dot">BMI</span>
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
        <span class="typing-label">Analyzing sourcing parameters...</span>
      </div>

      <div class="chat-input-bar">
        <form id="ai-chat-form" onsubmit="return false;">
          <input type="text" id="ai-chat-input" placeholder="Ask about fabric GSM, MOQ, shipping, custom branding..." autocomplete="off" />
          <button type="submit" id="ai-chat-send" aria-label="Send Message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
        <div class="chat-footer-note">
          <span>BM International Sourcing Engine • Official Assistant</span>
        </div>
      </div>
    `;

    document.body.appendChild(launcherBtn);
    document.body.appendChild(teaserTooltip);
    document.body.appendChild(chatWindow);

    // Cache elements
    closeBtn = document.getElementById('ai-chat-close');
    resetBtn = document.getElementById('ai-chat-reset');
    soundBtn = document.getElementById('ai-chat-sound');
    messagesContainer = document.getElementById('ai-messages-container');
    chatInput = document.getElementById('ai-chat-input');
    sendBtn = document.getElementById('ai-chat-send');
  }

  function bindEvents() {
    // Launcher toggle
    launcherBtn.addEventListener('click', toggleChat);

    // Teaser click
    teaserTooltip.addEventListener('click', (e) => {
      if (e.target.classList.contains('teaser-close')) {
        teaserTooltip.classList.remove('visible');
        e.stopPropagation();
      } else {
        teaserTooltip.classList.remove('visible');
        openChat();
      }
    });

    // Header buttons
    closeBtn.addEventListener('click', closeChat);
    resetBtn.addEventListener('click', resetChat);
    soundBtn.addEventListener('click', toggleSound);

    // Form submission
    const form = document.getElementById('ai-chat-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit();
    });

    // Quick chips delegation
    const quickChips = document.getElementById('ai-quick-chips');
    quickChips.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const payload = btn.getAttribute('data-payload');
      if (payload) {
        processIntent(payload);
      }
    });

    // Message container clicks (for dynamic action buttons inside bot responses)
    messagesContainer.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('.chat-action-btn');
      if (!actionBtn) return;

      const payload = actionBtn.getAttribute('data-payload');
      const action = actionBtn.getAttribute('data-action');

      if (payload) {
        processIntent(payload);
      } else if (action) {
        handleCustomAction(action);
      }
    });
  }

  function toggleChat() {
    if (chatState.isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  function openChat() {
    chatState.isOpen = true;
    chatWindow.classList.add('active');
    launcherBtn.classList.add('active');

    if (teaserTooltip) {
      teaserTooltip.classList.remove('visible');
    }

    const badge = launcherBtn.querySelector('.launcher-badge');
    if (badge) badge.style.display = 'none';

    // If empty conversation, initialize with welcome greeting
    if (chatState.messages.length === 0) {
      triggerBotResponse(BMI_KNOWLEDGE.greetings);
    } else {
      scrollToBottom();
    }

    setTimeout(() => chatInput.focus(), 300);
  }

  function closeChat() {
    chatState.isOpen = false;
    chatWindow.classList.remove('active');
    launcherBtn.classList.remove('active');
  }

  function resetChat() {
    chatState.messages = [];
    messagesContainer.innerHTML = '';
    localStorage.removeItem('bmi_chat_history');
    triggerBotResponse(BMI_KNOWLEDGE.greetings);
  }

  function toggleSound() {
    chatState.soundEnabled = !chatState.soundEnabled;
    const soundOn = soundBtn.querySelector('.sound-on');
    const soundOff = soundBtn.querySelector('.sound-off');
    if (chatState.soundEnabled) {
      soundOn.style.display = 'block';
      soundOff.style.display = 'none';
      playSound(600, 0.1);
    } else {
      soundOn.style.display = 'none';
      soundOff.style.display = 'block';
    }
  }

  function playSound(freq = 520, duration = 0.08) {
    if (!chatState.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      // Audio fallback silent
    }
  }

  function handleUserSubmit() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Render User Message
    appendMessage({
      sender: 'user',
      text: text,
      time: getCurrentTime()
    });

    chatInput.value = '';
    playSound(400, 0.06);

    // Process Query
    setTimeout(() => {
      matchAndRespond(text);
    }, 400);
  }

  function processIntent(key) {
    const data = BMI_KNOWLEDGE[key];
    if (!data) return;

    playSound(480, 0.06);
    triggerBotResponse(data);
  }

  function matchAndRespond(queryText) {
    const cleanQuery = queryText.toLowerCase().replace(/[^\w\s]/gi, '');
    let matchedKey = null;
    let highestScore = 0;

    // Search knowledge base
    for (const [key, item] of Object.entries(BMI_KNOWLEDGE)) {
      if (!item.keywords) continue;
      let score = 0;
      for (const word of item.keywords) {
        if (cleanQuery.includes(word)) {
          score += word.length > 4 ? 3 : 2;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        matchedKey = key;
      }
    }

    if (matchedKey && highestScore > 0) {
      triggerBotResponse(BMI_KNOWLEDGE[matchedKey]);
    } else {
      // Intelligent Fallback
      triggerBotResponse({
        response: `Thank you for your query regarding: **"${escapeHTML(queryText)}"**.\n\nTo give you an accurate factory price and technical specification, would you like to request an instant RFQ or speak directly with our Lead Merchandiser on WhatsApp?`,
        actions: [
          { label: '📝 Request Instant RFQ', payload: 'rfq' },
          { label: '💬 Chat on WhatsApp', action: 'openWhatsApp' },
          { label: '👕 Browse Products', payload: 'products' }
        ]
      });
    }
  }

  function triggerBotResponse(itemData) {
    showTypingIndicator(true);

    const delay = Math.min(1000, 400 + itemData.response.length * 4);

    setTimeout(() => {
      showTypingIndicator(false);

      if (itemData.type === 'rfq_form') {
        appendRFQFormMessage(itemData.response);
      } else if (itemData.type === 'callback_form') {
        appendCallbackFormMessage(itemData.response);
      } else {
        appendMessage({
          sender: 'bot',
          text: itemData.response,
          actions: itemData.actions,
          time: getCurrentTime()
        });
      }

      playSound(700, 0.1);
    }, delay);
  }

  function showTypingIndicator(show) {
    const typing = document.getElementById('ai-typing-indicator');
    if (typing) {
      typing.style.display = show ? 'flex' : 'none';
      if (show) scrollToBottom();
    }
  }

  function appendMessage(msg) {
    chatState.messages.push(msg);
    saveSession();

    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg msg-${msg.sender}`;

    let actionsHTML = '';
    if (msg.actions && msg.actions.length > 0) {
      actionsHTML = `<div class="msg-actions">` +
        msg.actions.map(act => {
          if (act.payload) {
            return `<button class="chat-action-btn" data-payload="${act.payload}">${act.label}</button>`;
          } else if (act.action) {
            return `<button class="chat-action-btn primary" data-action="${act.action}">${act.label}</button>`;
          }
          return '';
        }).join('') +
        `</div>`;
    }

    const formattedText = formatMarkdownText(msg.text);

    msgEl.innerHTML = `
      <div class="msg-bubble">
        <div class="msg-content">${formattedText}</div>
        ${actionsHTML}
        <span class="msg-time">${msg.time}</span>
      </div>
    `;

    messagesContainer.appendChild(msgEl);
    scrollToBottom();
  }

  function appendRFQFormMessage(introText) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg msg-bot msg-form';

    const formId = 'rfq-form-' + Date.now();

    msgEl.innerHTML = `
      <div class="msg-bubble">
        <div class="msg-content">${formatMarkdownText(introText)}</div>
        <form class="inline-chat-form" id="${formId}">
          <div class="form-group">
            <label>Product Category</label>
            <select name="category" required>
              <option value="Denim & Jeans">Denim & Jeans</option>
              <option value="Knitwear & Hoodies">Knitwear & Hoodies</option>
              <option value="T-Shirts & Polos">T-Shirts & Polos</option>
              <option value="Towels & Bath Textiles">Towels & Bath Textiles</option>
              <option value="Bedding & Sheets">Bedding & Sheets</option>
              <option value="Workwear & Uniforms">Workwear & Uniforms</option>
              <option value="Custom Fabric">Custom Fabric / Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Estimated Quantity (pcs/sets)</label>
            <input type="text" name="quantity" placeholder="e.g. 500 pcs" required />
          </div>
          <div class="form-group">
            <label>Your Name & Company</label>
            <input type="text" name="name" placeholder="John Doe (Brand Inc.)" required />
          </div>
          <div class="form-group">
            <label>Email or WhatsApp Number</label>
            <input type="text" name="contact" placeholder="buyer@company.com / +1 234..." required />
          </div>
          <button type="submit" class="btn-chat-submit">Submit Sourcing Inquiry 🚀</button>
        </form>
        <span class="msg-time">${getCurrentTime()}</span>
      </div>
    `;

    messagesContainer.appendChild(msgEl);
    scrollToBottom();

    setTimeout(() => {
      const renderedForm = document.getElementById(formId);
      if (renderedForm) {
        renderedForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const formData = new FormData(renderedForm);
          const category = formData.get('category');
          const qty = formData.get('quantity');
          const name = formData.get('name');
          const contact = formData.get('contact');

          renderedForm.innerHTML = `
            <div class="form-success-box">
              <div class="success-icon">✓</div>
              <h4>RFQ Submitted Successfully!</h4>
              <p>Thank you <strong>${escapeHTML(name)}</strong>. Our senior merchandiser is compiling pricing for <strong>${qty} of ${category}</strong>.</p>
              <p class="subtext">Direct notification sent to <code>bmi.imp.exp@gmail.com</code>.</p>
            </div>
          `;

          playSound(800, 0.15);

          // Add follow-up bot response
          setTimeout(() => {
            appendMessage({
              sender: 'bot',
              text: `Would you like to connect directly on WhatsApp to send tech packs or fabric swatches right now?`,
              actions: [
                { label: '💬 Open Direct WhatsApp Chat', action: 'openWhatsApp' },
                { label: '👕 Explore Catalog', action: 'scrollToCatalog' }
              ],
              time: getCurrentTime()
            });
          }, 1000);
        });
      }
    }, 100);
  }

  function appendCallbackFormMessage(introText) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg msg-bot msg-form';
    const formId = 'cb-form-' + Date.now();

    msgEl.innerHTML = `
      <div class="msg-bubble">
        <div class="msg-content">${formatMarkdownText(introText)}</div>
        <form class="inline-chat-form" id="${formId}">
          <div class="form-group">
            <label>Your Phone / WhatsApp Number</label>
            <input type="text" name="phone" placeholder="+1 (555) 000-0000" required />
          </div>
          <div class="form-group">
            <label>Preferred Contact Time</label>
            <select name="time">
              <option value="ASAP (Within 1 Hour)">ASAP (Within 1 Hour)</option>
              <option value="Morning (9 AM - 12 PM PKT)">Morning (9 AM - 12 PM PKT)</option>
              <option value="Evening (5 PM - 9 PM PKT)">Evening (5 PM - 9 PM PKT)</option>
            </select>
          </div>
          <button type="submit" class="btn-chat-submit">Request Call Back 📞</button>
        </form>
        <span class="msg-time">${getCurrentTime()}</span>
      </div>
    `;

    messagesContainer.appendChild(msgEl);
    scrollToBottom();

    setTimeout(() => {
      const renderedForm = document.getElementById(formId);
      if (renderedForm) {
        renderedForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const formData = new FormData(renderedForm);
          const phone = formData.get('phone');
          const time = formData.get('time');

          renderedForm.innerHTML = `
            <div class="form-success-box">
              <div class="success-icon">✓</div>
              <h4>Call Scheduled!</h4>
              <p>We will contact <strong>${escapeHTML(phone)}</strong> during <strong>${time}</strong>.</p>
            </div>
          `;
          playSound(800, 0.15);
        });
      }
    }, 100);
  }

  function handleCustomAction(actionKey) {
    switch (actionKey) {
      case 'scrollToCatalog':
        closeChat();
        const catalogEl = document.getElementById('products');
        if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'scrollToAbout':
        closeChat();
        const aboutEl = document.getElementById('about');
        if (aboutEl) aboutEl.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'scrollToContact':
        closeChat();
        const contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'openWhatsApp':
        window.open('https://wa.me/923312859323', '_blank');
        break;
      default:
        break;
    }
  }

  function formatMarkdownText(text) {
    if (!text) return '';
    let formatted = text;
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italics
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Bullet lists
    formatted = formatted.replace(/• (.*?)(?=\n|$)/g, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');
    // Code / tags
    formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
    // Linebreaks
    formatted = formatted.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');
    return formatted;
  }

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  function scrollToBottom() {
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 50);
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function saveSession() {
    try {
      const recent = chatState.messages.slice(-20);
      localStorage.setItem('bmi_chat_history', JSON.stringify(recent));
    } catch (e) { }
  }

  function loadSession() {
    try {
      const saved = localStorage.getItem('bmi_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          chatState.messages = parsed;
          parsed.forEach(msg => {
            const msgEl = document.createElement('div');
            msgEl.className = `chat-msg msg-${msg.sender}`;
            msgEl.innerHTML = `
              <div class="msg-bubble">
                <div class="msg-content">${formatMarkdownText(msg.text)}</div>
                <span class="msg-time">${msg.time}</span>
              </div>
            `;
            messagesContainer.appendChild(msgEl);
          });
        }
      }
    } catch (e) { }
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
