document.addEventListener('DOMContentLoaded', () => {
  // Determine current language from page structure
  const lang = document.documentElement.lang || 'es';

  // Localized Strings for Interactive Map and Calculations
  const translations = {
    es: {
      mexico: {
        title: "🇲🇽 México (Hub Central)",
        desc: "Hub de importación y distribución a gran escala. Equipado con almacenes frigoríficos de última generación en Monterrey y Ciudad de México."
      },
      costarica: {
        title: "🇨🇷 Costa Rica (Centroamérica)",
        desc: "Distribución estratégica y control de calidad. Operamos en los puertos de Caldera (Pacífico) y Limón (Caribe) garantizando cobertura logística regional."
      },
      colombia: {
        title: "🇨🇴 Colombia (Cobertura Bioceánica)",
        desc: "Infraestructura logística ágil con acceso directo al Pacífico (Buenaventura) y Caribe (Cartagena), asegurando distribución capilar rápida."
      },
      peru: {
        title: "🇵🇪 Perú (Origen Directo)",
        desc: "Origen clave de extracción del Calamar Gigante (Dosidicus gigas) y especies de agua fría. Plantas certificadas por HACCP en Paita, Lima y Chimbote."
      },
      china: {
        title: "🇨🇳 China (Origen de Suministro)",
        desc: "Origen principal de abastecimiento de tilapia entera y en filetes. Plantas procesadoras con certificación internacional en Hainan y Guangdong."
      },
      vietnam: {
        title: "🇻🇳 Vietnam (Origen de Suministro)",
        desc: "Origen principal de importación de filete de basa. Directamente desde plantas asociadas en el Delta del Mekong, garantizando calidad e inocuidad."
      },
      calcAlert: "⚠️ Capacidad de contenedor máxima es de 24 Toneladas (24,000 kg).",
      toastSuccess: "✓ Solicitud de cotización enviada correctamente.",
      modalTitle: "¡Solicitud Recibida!",
      modalDesc: "Muchas gracias por contactar a Golden Seafood. Un ejecutivo especializado en logística de importación marina evaluará su requerimiento y se comunicará con usted en un plazo máximo de 24 horas hábiles.",
      modalClose: "Cerrar Ventana",
      partialContainer: "contenedor completo y {partial}% de carga parcial",
      fullContainer: "contenedor completo",
      containers: "Contenedores Reefer de 40 pies"
    },
    en: {
      mexico: {
        title: "🇲🇽 Mexico (Central Hub)",
        desc: "Large-scale import and distribution hub. State-of-the-art cold storage facilities in Monterrey and Mexico City."
      },
      costarica: {
        title: "🇨🇷 Costa Rica (Central America)",
        desc: "Strategic distribution node and quality control. Operating from Caldera (Pacific) and Limón (Caribbean) ports to secure regional supply."
      },
      colombia: {
        title: "🇨🇴 Colombia (Dual-Ocean Logistics)",
        desc: "Agile logistics infrastructure with direct access to both the Pacific (Buenaventura) and Caribbean (Cartagena) for rapid capillary delivery."
      },
      peru: {
        title: "🇵🇪 Peru (Direct Sourcing Origin)",
        desc: "Primary sourcing origin for premium Giant Squid (Dosidicus gigas) and cold-water Pacific species. Sourced from HACCP-certified plants in Paita, Lima, and Chimbote."
      },
      china: {
        title: "🇨🇳 China (Sourcing Origin)",
        desc: "Primary sourcing origin for whole and filleted Tilapia. Sourced from internationally certified processing plants in Hainan and Guangdong."
      },
      vietnam: {
        title: "🇻🇳 Vietnam (Sourcing Origin)",
        desc: "Main sourcing origin for premium Basa fillets. Sourced directly from partner plants in the Mekong Delta, ensuring safety and quality."
      },
      calcAlert: "⚠️ Maximum container payload capacity is 24 Tons (24,000 kg).",
      toastSuccess: "✓ Inquiry submitted successfully.",
      modalTitle: "Inquiry Received!",
      modalDesc: "Thank you for contacting Golden Seafood. A specialized B2B import logistics executive will evaluate your requirements and contact you within 24 business hours.",
      modalClose: "Close Window",
      partialContainer: "full container and {partial}% partial load",
      fullContainer: "full container",
      containers: "40ft Reefer Containers"
    },
    zh: {
      mexico: {
        title: "🇲🇽 墨西哥 (核心枢纽)",
        desc: "大型进口与分销配送中枢。在蒙特雷和墨西哥城设有先进的超低温冷库设施。"
      },
      costarica: {
        title: "🇨🇷 哥斯达黎加 (中美洲枢纽)",
        desc: "战略分销与严格的质量控制。运营于卡尔德拉港（太平洋）与利蒙港（加勒比海），确保地区高效供应。"
      },
      colombia: {
        title: "🇨🇴 哥伦比亚 (双洋物流通道)",
        desc: "敏捷的物流网络，直通太平洋（布埃纳文图拉港）与加勒比海（卡塔赫纳港），实现快速分销。"
      },
      peru: {
        title: "🇵🇪 秘鲁 (深海直采原产地)",
        desc: "美洲大赤鱿（Dosidicus gigas）及太平洋冷水性鱼类直采基地。在派塔 (Paita)、利马 (Lima) 和钦博特 (Chimbote) 设有HACCP认证的加工厂。"
      },
      china: {
        title: "🇨🇳 中国 (罗非鱼直采)",
        desc: "整条罗非鱼及罗非鱼片的核心原产地。在海南和广东设有获得国际认证的加工厂。"
      },
      vietnam: {
        title: "🇻🇳 越南 (巴沙鱼直采)",
        desc: "优质巴沙鱼片的主要进口来源。对湄公河三角洲合作工厂进行直接品质监管，确保符合国际卫生标准。"
      },
      calcAlert: "⚠️ 单个集装箱最大载重上限为 24 吨 (24,000 公斤)。",
      toastSuccess: "✓ 您的询价单已成功提交。",
      modalTitle: "询价单已收到！",
      modalDesc: "非常感谢您联系 Golden Seafood。我们的跨国大宗物流及供应链专员将评估您的采购需求，并在 24 小时（工作日）内为您提供专业答复。",
      modalClose: "关闭窗口",
      partialContainer: "个整箱及 {partial}% 的拼箱载重",
      fullContainer: "个整箱",
      containers: "40尺冷冻集装箱 (Reefer)"
    }
  };

  const t = translations[lang] || translations.es;

  /* ==========================================================================
     1. STICKY HEADER & NAVBAR EFFECTS
     ========================================================================== */
  const header = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     2. LANGUAGE SELECTOR DROPDOWN
     ========================================================================== */
  const langBtn = document.querySelector('.lang-btn');
  const langDropdown = document.querySelector('.lang-dropdown');

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!langBtn.contains(e.target)) {
        langDropdown.classList.remove('show');
      }
    });
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
      spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  /* ==========================================================================
     4. INTERACTIVE OPERATIONS MAP
     ========================================================================== */
  const pins = document.querySelectorAll('.map-pin');

  const mapData = {
    mexico: t.mexico,
    costarica: t.costarica,
    colombia: t.colombia,
    peru: t.peru,
    china: t.china,
    vietnam: t.vietnam
  };

  if (pins.length > 0) {
    const resetMap = () => {
      pins.forEach(p => p.classList.remove('active'));
    };

    pins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const isAlreadyActive = pin.classList.contains('active');
        
        if (isAlreadyActive) {
          resetMap();
        } else {
          pins.forEach(p => p.classList.remove('active'));
          pin.classList.add('active');
          
          const countryKey = pin.dataset.country;
          const data = mapData[countryKey];
          if (data) {
            const tooltipDesc = pin.querySelector('.tooltip-desc');
            const tooltipTitle = pin.querySelector('.tooltip-title');
            if (tooltipDesc) tooltipDesc.textContent = data.desc;
            if (tooltipTitle) tooltipTitle.textContent = data.title;
          }
        }
      });
    });

    // Reset map when clicking anywhere else
    document.addEventListener('click', (e) => {
      const isClickInside = Array.from(pins).some(pin => pin.contains(e.target));
      if (!isClickInside) {
        resetMap();
      }
    });
  }

  // --- Widescreen Map: SVG Injection & Smart Micro-animations ---
  const mapWrapper = document.querySelector('.map-wrapper');
  if (mapWrapper) {
    // Inject SVG dynamically
    const mapLangPath = lang === 'en' ? '../assets/images/world-map-final.svg' : (lang === 'zh' ? '../assets/images/world-map-final.svg' : 'assets/images/world-map-final.svg');
    fetch(mapLangPath)
      .then(response => response.text())
      .then(svgText => {
        // Create a container for the SVG so it doesn't overwrite pins
        const svgContainer = document.createElement('div');
        svgContainer.innerHTML = svgText;
        const svgElement = svgContainer.querySelector('svg');
        if (svgElement) {
          // Remove native tooltips
          svgElement.querySelectorAll('title').forEach(t => t.remove());
          
          // Hide Antarctica as requested
          svgElement.querySelectorAll('[id*="Antarctica"]').forEach(el => el.style.display = 'none');

          mapWrapper.insertBefore(svgElement, mapWrapper.firstChild);
        }
      })
      .catch(err => console.error('Error loading map SVG:', err));

    let lastTime = 0;
    mapWrapper.addEventListener('mousemove', (e) => {
      // Collision detection: Check if we are hovering over a land path
      if (e.target.tagName.toLowerCase() === 'path') {
        // Optionally check class name or just assume all paths are land/countries
        return; 
      }

      const now = Date.now();
      if (now - lastTime < 120) return; // Throttle ripple creation
      lastTime = now;
      
      const ripple = document.createElement('div');
      ripple.classList.add('mouse-ripple');
      
      const rect = mapWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      mapWrapper.appendChild(ripple);
      
      setTimeout(() => {
        if(ripple.parentNode === mapWrapper) {
          mapWrapper.removeChild(ripple);
        }
      }, 1200);
    });
  }

  /* ==========================================================================
     5. B2B LOGISTICS CALCULATOR
     ========================================================================== */
  const calcProduct = document.getElementById('calc-product');
  const calcSackSizeGroup = document.getElementById('calc-sack-size-group');
  const calcSackSize = document.getElementById('calc-sack-size');
  const calcAmount = document.getElementById('calc-amount');
  
  // Results Elements
  const resultUnitsVal = document.getElementById('result-units-val');
  const resultUnitsLabel = document.getElementById('result-units-label');
  const resultKgVal = document.getElementById('result-kg-val');
  const resultLbsVal = document.getElementById('result-lbs-val');
  const resultContainersVal = document.getElementById('result-containers-val');
  const resultContainersLabel = document.getElementById('result-containers-label');

  if (calcProduct && calcAmount) {
    // Show/hide Squid sack specification options
    calcProduct.addEventListener('change', () => {
      if (calcProduct.value === 'squid') {
        calcSackSizeGroup.style.display = 'block';
      } else {
        calcSackSizeGroup.style.display = 'none';
      }
      calculateLogistics();
    });

    if (calcSackSize) {
      calcSackSize.addEventListener('change', calculateLogistics);
    }

    calcAmount.addEventListener('input', calculateLogistics);
    
    // Support switching unit (tons vs kg)
    const unitRadios = document.querySelectorAll('input[name="calc-unit"]');
    unitRadios.forEach(radio => {
      radio.addEventListener('change', calculateLogistics);
    });

    function calculateLogistics() {
      // 1. Gather values
      const product = calcProduct.value;
      const amountValue = parseFloat(calcAmount.value) || 0;
      
      let selectedUnit = 'tons';
      const checkedRadio = document.querySelector('input[name="calc-unit"]:checked');
      if (checkedRadio) {
        selectedUnit = checkedRadio.value;
      }

      // 2. Normalize input to Kilograms and Lbs
      let weightKg = 0;
      if (selectedUnit === 'tons') {
        weightKg = amountValue * 1000;
      } else {
        weightKg = amountValue;
      }
      
      const weightLbs = weightKg * 2.20462262;

      // 3. Compute Product packaging quantities
      let totalUnits = 0;
      let unitsLabel = '';

      if (product === 'tilapia') {
        // 1 caja = 4.536 kg exactos (Evita discrepancias financieras acumulativas por redondeo en fletes masivos)
        totalUnits = Math.round(weightKg / 4.536);
        unitsLabel = lang === 'es' ? 'Cajas de 10 lb' : (lang === 'zh' ? '10磅标准箱' : '10 lb Boxes');
      } else if (product === 'tilapia_whole') {
        // 1 caja = 40 lb = 18.1437 kg
        totalUnits = Math.round(weightKg / 18.1437);
        unitsLabel = lang === 'es' ? 'Cajas de 40 lb' : (lang === 'zh' ? '40磅标准箱' : '40 lb Boxes');
      } else if (product === 'squid') {
        // Sack size: 20 kg or 22.5 kg
        const sackSize = parseFloat(calcSackSize.value) || 20;
        totalUnits = Math.round(weightKg / sackSize);
        unitsLabel = lang === 'es' ? `Sacos de ${sackSize} kg` : (lang === 'zh' ? `${sackSize}公斤编织袋` : `${sackSize} kg Sacks`);
      } else if (product === 'shrimp') {
        // Cooked shrimp: standard commercial box (e.g. 5 kg pack, 10 kg master)
        // Assume standard B2B commercial 10 kg master boxes
        totalUnits = Math.round(weightKg / 10);
        unitsLabel = lang === 'es' ? 'Cajas Máster (10 kg)' : (lang === 'zh' ? '10公斤商用箱' : '10 kg Master Boxes');
      } else {
        // Basa or Mix: standard industrial 15 kg boxes
        totalUnits = Math.round(weightKg / 15);
        unitsLabel = lang === 'es' ? 'Cajas Industriales (15 kg)' : (lang === 'zh' ? '15公斤工业箱' : '15 kg Industrial Boxes');
      }

      // 4. Container count calculations
      // Capacity limit = 24 Metric Tons = 24,000 kg per B2B container
      const containerCapacity = 24000;
      const containerCountPrecise = weightKg / containerCapacity;
      
      let containerText = '';
      if (containerCountPrecise === 0) {
        containerText = `0 ${t.containers}`;
      } else {
        const wholeContainers = Math.floor(containerCountPrecise);
        const remainder = containerCountPrecise - wholeContainers;
        const partialPercent = Math.round(remainder * 100);

        if (wholeContainers === 0) {
          containerText = `${partialPercent}% ${lang === 'es' ? 'capacidad de 1 contenedor' : (lang === 'zh' ? '单箱装载率' : 'load of 1 container')}`;
        } else if (partialPercent === 0) {
          containerText = `${wholeContainers} ${wholeContainers === 1 ? (lang === 'es' ? 'contenedor completo' : (lang === 'zh' ? '个整箱' : 'full container')) : (lang === 'es' ? 'contenedores completos' : (lang === 'zh' ? '个整箱' : 'full containers'))}`;
        } else {
          const transPartial = t.partialContainer.replace('{partial}', partialPercent);
          containerText = `${wholeContainers} ${transPartial}`;
        }
      }

      // 5. Update UI values elegantly
      resultUnitsVal.textContent = totalUnits.toLocaleString();
      resultUnitsLabel.textContent = unitsLabel;
      
      resultKgVal.textContent = Math.round(weightKg).toLocaleString() + ' kg';
      resultLbsVal.textContent = Math.round(weightLbs).toLocaleString() + ' lbs';
      
      resultContainersVal.textContent = containerCountPrecise.toFixed(2);
      resultContainersLabel.textContent = containerText;
    }

    // Run initial calculation on page load
    calculateLogistics();
  }

  /* ==========================================================================
     6. B2B SECURE FORM VALIDATION & MODAL SUCCESS
     ========================================================================== */
  const contactForms = document.querySelectorAll('.b2b-contact-form');
  
  // Create Modal & Toast DOM dynamically if not present, to ensure clean deployment
  let backdrop = document.querySelector('.modal-backdrop');
  let modal = document.querySelector('.dialog-modal');
  let toastContainer = document.querySelector('.toast-container');

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    document.body.appendChild(backdrop);
  }

  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'dialog-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-icon">🏆</div>
        <h3 id="modal-title">${t.modalTitle}</h3>
        <p id="modal-text">${t.modalDesc}</p>
        <button class="btn btn-primary" id="modal-close-btn">${t.modalClose}</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  // Handle closing modal
  const closeModal = () => {
    modal.classList.remove('show');
    backdrop.classList.remove('show');
  };

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  backdrop.addEventListener('click', closeModal);

  // Function to show toast
  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✓</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    // Trigger animations
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Remove toast after 4s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 4000);
  };

  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Advanced B2B Field Filtering and Validation
      const nameField = form.querySelector('[id*="name"]') || form.querySelector('[name*="nombre"]');
      const companyField = form.querySelector('[id*="company"]') || form.querySelector('[name*="empresa"]');
      const emailField = form.querySelector('[type="email"]');
      const volumeField = form.querySelector('[id*="volume"]') || form.querySelector('[name*="volumen"]');
      
      // Lista de dominios de correo gratuitos populares (No B2B)
      const freeEmailDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 
        'icloud.com', 'aol.com', 'zoho.com', 'protonmail.com', 'yandex.com', 
        'mail.com', 'gmx.com', 'msn.com', 'comcast.net'
      ];
      
      let isCorporateEmail = true;
      if (emailField && emailField.value.trim() !== '') {
        const emailVal = emailField.value.trim().toLowerCase();
        const domain = emailVal.split('@')[1];
        if (freeEmailDomains.includes(domain)) {
          isCorporateEmail = false;
        }
      }

      let isValid = true;

      // Reset de estilos y mensajes de error previos
      form.querySelectorAll('.error-msg-span').forEach(el => el.remove());
      form.querySelectorAll('input, select, textarea').forEach(el => {
        el.style.borderColor = '';
      });

      if (!nameField || nameField.value.trim() === '') {
        isValid = false;
        if(nameField) nameField.style.borderColor = '#EF4444';
      }

      if (!companyField || companyField.value.trim() === '') {
        isValid = false;
        if(companyField) companyField.style.borderColor = '#EF4444';
      }

      if (!emailField || !emailField.validity.valid) {
        isValid = false;
        if(emailField) emailField.style.borderColor = '#EF4444';
      } else if (!isCorporateEmail) {
        isValid = false;
        emailField.style.borderColor = '#EF4444';
        
        // Crear alerta visual abajo del input
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-msg-span';
        errorSpan.style.color = '#EF4444';
        errorSpan.style.fontSize = '0.8rem';
        errorSpan.style.marginTop = '0.2rem';
        errorSpan.style.display = 'block';
        errorSpan.textContent = lang === 'es' ? '⚠️ Por favor, ingrese un correo corporativo de empresa (no Gmail/Yahoo).' 
                               : (lang === 'zh' ? '⚠️ 请使用企业电子邮箱提交（勿用个人免费邮箱）。' 
                               : '⚠️ Please use a corporate email address (not Gmail/Yahoo).');
        emailField.parentNode.appendChild(errorSpan);
      }

      if (!volumeField || volumeField.value.trim() === '') {
        isValid = false;
        if(volumeField) volumeField.style.borderColor = '#EF4444';
      }

      // Validación del campo trampa anti-spam (Honeypot)
      const honeypotField = form.querySelector('.hidden-honey-input');
      if (honeypotField && honeypotField.value !== '') {
        // Es un bot de spam automático
        console.warn('Spam bot detected');
        form.reset();
        return;
      }

      if (isValid) {
        // Trigger Success feedback
        showToast(t.toastSuccess);
        
        // Show Dialog Modal
        modal.classList.add('show');
        backdrop.classList.add('show');
        
        // Reset form fields
        form.reset();
        
        // Trigger calculator recalculation to base state if exists
        calculateLogistics();
      }
    });
  });

  /* ==========================================================================
     7. REVEAL-ON-SCROLL ENGINE (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });
});
