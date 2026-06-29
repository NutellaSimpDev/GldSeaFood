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
     4. INTERACTIVE 3D GLOBE MAP (Globe.gl)
     ========================================================================== */
  const globeContainer = document.getElementById('globe-viz');
  
  if (globeContainer && typeof Globe !== 'undefined') {
    const mapDataArr = [
      { lat: 23.6345, lng: -102.5528, size: 0.05, color: '#D4AF37', label: t.mexico.title, desc: t.mexico.desc },
      { lat: 9.7489, lng: -83.7534, size: 0.05, color: '#D4AF37', label: t.costarica.title, desc: t.costarica.desc },
      { lat: 4.5709, lng: -74.2973, size: 0.05, color: '#D4AF37', label: t.colombia.title, desc: t.colombia.desc },
      { lat: -9.1899, lng: -75.0151, size: 0.05, color: '#D4AF37', label: t.peru.title, desc: t.peru.desc },
      { lat: 35.8616, lng: 104.1953, size: 0.05, color: '#D4AF37', label: t.china.title, desc: t.china.desc },
      { lat: 14.0583, lng: 108.2771, size: 0.05, color: '#D4AF37', label: t.vietnam.title, desc: t.vietnam.desc }
    ];

    const customTooltip = document.createElement('div');
    customTooltip.style.cssText = "position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0, 11, 20, 0.95); border: 1px solid #D4AF37; border-radius: 8px; padding: 15px; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.5); font-family: 'Outfit', sans-serif; max-width: 300px; width: 90%; display: none; z-index: 100; text-align: left;";
    globeContainer.style.position = 'relative';
    globeContainer.appendChild(customTooltip);

    const world = Globe()
      (globeContainer)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .pointsData(mapDataArr)
      .pointAltitude('size')
      .pointColor('color')
      .pointLabel(d => `<div style="background: rgba(0, 11, 20, 0.95); border: 1px solid #D4AF37; border-radius: 8px; padding: 12px; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.5); font-family: 'Outfit', sans-serif; max-width: 250px;">
          <strong style="display: block; font-size: 1.1rem; margin-bottom: 5px; color: #D4AF37;">📍 ${d.label}</strong>
          <span style="font-size: 0.9rem; line-height: 1.4; display: block;">${d.desc}</span>
        </div>`)
      .pointRadius(0.8)
      .onPointClick(d => {
        customTooltip.style.display = 'block';
        customTooltip.innerHTML = `
          <button style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; padding: 0;" onclick="this.parentElement.style.display='none'">×</button>
          <strong style="display: block; font-size: 1.1rem; margin-bottom: 5px; color: #D4AF37; padding-right: 20px;">📍 ${d.label}</strong>
          <span style="font-size: 0.9rem; line-height: 1.4; display: block;">${d.desc}</span>
        `;
        world.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.5 }, 1000);
      });

    // Initial position
    world.pointOfView({ lat: 10, lng: -70, altitude: 2.2 });

    // Handle resize
    window.addEventListener('resize', () => {
      world.width(globeContainer.clientWidth);
      world.height(globeContainer.clientHeight);
    });
    
    // Auto-rotate and disable scroll zoom
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.8;
    world.controls().enableZoom = false;
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
