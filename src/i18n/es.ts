/**
 * Espanol — idioma base. `en.ts` y (mas adelante) `zh.ts` se tipan contra
 * este objeto, asi que si aqui se agrega una clave, TypeScript exige que
 * las demas traducciones tambien la tengan.
 */
export const es = {
  meta: {
    title: 'Golden Seafood | Importación Directa & Logística Mayorista',
    description:
      'Golden Seafood - Líderes en importación directa y logística mayorista de productos marinos congelados premium.',
  },

  nav: {
    inicio: 'Inicio',
    operaciones: 'Alcance Global',
    productos: 'Catálogo',
    calculadora: 'Calculadora B2B',
    ventajas: 'Ventajas',
    cta: 'Cotizar Contenedor',
  },

  hero: {
    badge: 'Red de Suministro Internacional Activa',
    title: 'Su Socio Global en Abastecimiento de Pescados y Mariscos',
    subtitle:
      'Garantizamos el abastecimiento continuo de Premium Seafood de alta calidad para distribuidores y pescaderías. Logística de cadena de frío impecable y certificada, directamente desde el origen hasta sus almacenes.',
    ctaPrimary: 'Explorar Catálogo',
    ctaSecondary: 'Contáctenos',
    kpiVolume: 'Volumen Anual Consolidado',
    kpiCold: 'Cadena de Frío Garantizada',
    kpiTrace: 'Seguimiento Documental',
  },

  certifications: {
    label: 'Estándares & Certificaciones:',
    items: {
      haccp: 'Análisis de Peligros y Puntos Críticos',
      fda: 'Registro Sanitario de Instalaciones EE.UU.',
      bap: 'Mejores Prácticas de Acuicultura',
      iso: 'Gestión de Inocuidad Alimentaria',
      senasa: 'Permisos Sanitarios de Importación',
    },
  },

  operations: {
    eyebrow: 'Alcance Internacional & Puertos Operativos',
    title: 'Presencia Directa en Origen y Destino',
    body: 'Operamos con oficinas y contratos de abastecimiento en los principales hubs pesqueros de Asia y América Latina. Garantizamos tiempos de tránsito optimizados y cupos constantes en buques porta-contenedores reefer.',
    hint: 'Haga clic en las tarjetas de país o en el globo para consultar detalles',
    cta: 'Ver Catálogo de Productos',
    loading: 'Cargando mapa global',
    markets: {
      mx: { hub: 'Manzanillo / Veracruz', capacity: '18,000 MT/año' },
      cr: { hub: 'Puerto Caldera', capacity: '8,500 MT/año' },
      co: { hub: 'Buenaventura / Cartagena', capacity: '12,000 MT/año' },
      pe: { hub: 'Callao / Paita', capacity: '15,000 MT/año' },
      cn: { hub: 'Qingdao / Ningbo', capacity: 'Origen Primario' },
      vn: { hub: 'Ho Chi Minh', capacity: 'Origen Primario' },
    },
    globe: {
      mx: 'Hub de distribución central. Acceso directo a mercados del norte y centro del país con infraestructura frigorífica certificada.',
      cr: 'Centro estratégico en América Central con operaciones de importación directa y redistribución regional.',
      co: 'Presencia en Bogotá y Buenaventura. Importación directa con gestión aduanal integral.',
      pe: 'Origen del Calamar Gigante Dosidicus gigas. Plantas de procesamiento certificadas en la costa.',
      cn: 'Abastecimiento de tilapia y basa desde Qingdao y Hainan. Control de calidad en origen.',
      vn: 'Producción de filete de panga premium. Procesamiento de alta tecnología con certificación BAP.',
    },
  },

  catalog: {
    eyebrow: 'Catálogo de Abastecimiento B2B',
    title: 'Especies & Productos Marinos Procesados',
    body: 'Seleccione una categoría para consultar presentaciones comerciales, calibres y especificaciones de empaque industrial.',
    all: 'Todos',
    categories: {
      squid: 'Calamar Gigante',
      tilapia: 'Tilapia',
      shrimp: 'Camarón',
      panga: 'Panga',
      tuna: 'Atún',
    },
    badge: '100% IQF',
    seeSpecs: 'Ver especificaciones',
    specsTitle: 'Especificaciones de Empaque B2B',
    quote: 'Iniciar Cotización',
    empty: 'No hay productos en esta categoría.',
  },

  calculator: {
    badge: 'Herramienta B2B',
    title: 'Calculadora de Capacidad por Contenedor',
    body: 'Estime la cantidad aproximada de cajas y peso neto utilizable por tipo de contenedor frigorífico (Reefer).',
    step1: '1. Seleccione la Especie / Producto',
    step2: '2. Tipo de Contenedor Frigorífico (Reefer)',
    c20: '20ft Reefer',
    c20sub: '~18 Toneladas',
    c40: '40ft High Cube',
    c40sub: '~26.5 Toneladas',
    resultTitle: 'Estimación de Capacidad de Embarque',
    totalBoxes: 'Total Cajas',
    boxesUnit: 'Cajas Máster',
    netWeight: 'Peso Neto',
    optimized: 'Carga Optimizada',
    quote: 'Iniciar Cotización',
    estimateNote: 'Peso referencial: confirme la presentación exacta con su ejecutivo.',
  },

  advantages: {
    eyebrow: 'Ventajas Competitivas B2B',
    title: 'Garantía Total en Cada Contenedor',
    body: 'Diseñamos soluciones de abastecimiento continuo que optimizan sus costos operativos y protegen sus márgenes de ganancia.',
    items: {
      cold: {
        title: 'Cadena de Frío Garantizada',
        kpi: '0% Interrupción',
        desc: 'Sensores térmicos continuos desde la planta de origen hasta su bodega final. Garantía de temperatura constante a -18°C.',
      },
      trace: {
        title: 'Trazabilidad & Seguimiento Documental',
        kpi: '100% de Trazabilidad',
        desc: 'Monitoreo en tiempo real y gestión ordenada de expedientes de embarque, BL, certificados sanitarios y factura comercial para una liberación ágil en puerto.',
      },
      weight: {
        title: 'Pesos & Calibres Exactos',
        kpi: '±0% Desviación',
        desc: 'Auditorías de empaque en origen. Cumplimos rigurosamente los porcentajes de glaseado declarados para proteger sus márgenes.',
      },
    },
  },

  contact: {
    eyebrow: 'Atención Comercial Especializada',
    title: 'Inicie su Cotización Corporativa',
    body: 'Estructure una propuesta adaptada a sus requerimientos de volumen, puerto de destino y frecuencia de embarque.',
    noticeLabel: 'NOTA DE VOLUMEN:',
    notice:
      'Solo procesamos solicitudes para compras al por mayor y contenedores consolidados (Reefer 20ft / 40ft). No realizamos ventas al menudeo.',
    name: 'Nombre Completo',
    namePh: 'Carlos Mendoza',
    company: 'Empresa / Razón Social',
    companyPh: 'Empresa S.A.',
    country: 'País de Operación',
    countryPh: 'Ej: México, Costa Rica, Colombia...',
    email: 'Email Corporativo',
    emailPh: 'carlos.mendoza@empresa.com',
    product: 'Producto Requerido',
    productPh: 'Seleccione el producto...',
    productMixed: 'Contenedor Mixto / Múltiples Especies',
    details: 'Puerto de Destino / Volumen Estimado',
    detailsPh:
      'Indique puerto de destino (ej: Manzanillo, Buenaventura, Caldera), volumen estimado y frecuencia de compra...',
    submit: 'Enviar Solicitud de Cotización B2B',
    success:
      'Solicitud enviada con éxito. Un ejecutivo comercial se pondrá en contacto en menos de 24 horas hábiles.',
  },

  footer: {
    about:
      'Líderes regionales en importación y logística de productos marinos congelados premium. Abastecimiento constante en toda América Latina.',
    linksTitle: 'Enlaces Rápidos',
    quote: 'Solicitud de Cotización',
    contactTitle: 'Contacto Regional',
    sales: 'Comercial:',
    latam: 'América Latina:',
    latamValue: 'México, Costa Rica, Colombia, Perú.',
    modality: 'Modalidad:',
    modalityValue: 'FOB y CIF para volúmenes mayoristas.',
    rights: '© 2026 Golden Seafood. Todos los derechos reservados. Abastecimiento B2B.',
    terms: 'Términos y Condiciones',
    privacy: 'Política de Privacidad B2B',
    safety: 'Normativas de Inocuidad',
  },

  // ─── Fichas de producto, indexadas por slug ─────────────────────
  products: {
    'giant-squid-fillet': {
      tag: 'Dosidicus gigas · Origen Perú',
      desc: 'Láminas de manto limpias, de blancura uniforme y textura firme. Base ideal para reempaque, corte secundario y elaboración de anillos o tiras.',
      specs: [
        ['Presentación', 'Bloque / saco de rafia 20 kg'],
        ['Procesamiento', 'Congelado en bloque o IQF'],
        ['Origen', 'Perú — plantas con habilitación sanitaria'],
        ['Uso', 'Reempaque y procesamiento industrial'],
      ],
    },
    'giant-squid-neck': {
      tag: 'Cuello · Corte Limpio',
      desc: 'Cuello de calamar gigante limpio, sin piel ni cartílago. Rendimiento alto y textura consistente para corte en aros o preparaciones enteras.',
      specs: [
        ['Presentación', 'Saco de rafia 20 kg'],
        ['Procesamiento', 'Congelado a bordo / en origen'],
        ['Origen', 'Perú'],
        ['Textura', 'Firme, apta para procesado secundario'],
      ],
    },
    'giant-squid-wing': {
      tag: 'Aleta · Alto Rendimiento',
      desc: 'Aleta de calamar gigante, corte económico de excelente rendimiento. Muy utilizada en la industria de snacks marinos y preparaciones apanadas.',
      specs: [
        ['Presentación', 'Saco de rafia 20 kg'],
        ['Procesamiento', 'Congelado en bloque'],
        ['Origen', 'Perú'],
        ['Canal', 'Industria y procesadores'],
      ],
    },
    'giant-squid-rings': {
      tag: 'Anillos · Listos para Empanizar',
      desc: 'Anillos de calibre uniforme cortados del manto, listos para empanizar o cocinar. Presentación de alta rotación en food-service y retail.',
      specs: [
        ['Presentación', 'Caja máster 10 kg'],
        ['Procesamiento', 'IQF (Congelación Rápida Individual)'],
        ['Calibres', 'Según especificación del cliente'],
        ['Canal', 'Food-service, retail y HORECA'],
      ],
    },
    'giant-squid-bp': {
      tag: 'BP · Piezas Seleccionadas',
      desc: 'Piezas de calamar gigante clasificadas y limpias, de blancura pareja. Formato versátil para reempaque y elaboración de productos con valor agregado.',
      specs: [
        ['Presentación', 'Saco de rafia 20 kg'],
        ['Procesamiento', 'Congelado en bloque o IQF'],
        ['Origen', 'Perú'],
        ['Uso', 'Reempaque y valor agregado'],
      ],
    },
    'giant-squid-sexual-organ': {
      tag: 'Especialidad · Mercado Asiático',
      desc: 'Producto de especialidad con demanda sostenida en mercados asiáticos. Procesado y clasificado en origen bajo estándares sanitarios de exportación.',
      specs: [
        ['Presentación', 'Saco de rafia 20 kg'],
        ['Procesamiento', 'Congelado en bloque'],
        ['Origen', 'Perú'],
        ['Mercado', 'Principalmente Asia'],
      ],
    },
    'giant-squid-tentacles': {
      tag: 'Tentáculos · Limpios',
      desc: 'Tentáculos limpios y clasificados por tamaño. Textura firme y sabor marino pronunciado, muy solicitados en parrilla, salteados y conservas.',
      specs: [
        ['Presentación', 'Saco de rafia 20 kg'],
        ['Procesamiento', 'Congelado en bloque o IQF'],
        ['Origen', 'Perú'],
        ['Canal', 'Food-service y conserveras'],
      ],
    },

    'tilapia-fillet-ivp': {
      tag: 'IVP · Sin Piel · Carne Blanca',
      desc: 'Filetes seleccionados de carne blanca y firme, sin espinas ni piel, empacados individualmente al vacío (IVP). Clasificados estrictamente por gramaje.',
      specs: [
        ['Presentación', 'Caja Máster 10 lb (4.54 kg)'],
        ['Procesamiento', 'IVP — empaque individual al vacío'],
        ['Glaseado', '10% al 20% según especificación'],
        ['Calibres', '3-5 oz, 5-7 oz, 7-9 oz'],
      ],
    },
    'tilapia-whole-round': {
      tag: 'WR · Entera sin Procesar',
      desc: 'Tilapia entera sin eviscerar, congelada inmediatamente tras la cosecha. Formato de menor costo por kilo para plantas con proceso propio.',
      specs: [
        ['Presentación', 'Caja Máster 40 lb (18.14 kg)'],
        ['Procesamiento', 'Congelado entero (Whole Round)'],
        ['Tallas', '350-550g, 550-750g, 750g+'],
        ['Canal', 'Plantas procesadoras'],
      ],
    },
    'tilapia-gs': {
      tag: 'Gutted & Scaled',
      desc: 'Tilapia entera limpia, sin vísceras y sin escamas. Procesada inmediatamente tras la cosecha para preservar sabor y estructura de la carne.',
      specs: [
        ['Presentación', 'Caja Máster 40 lb (18.14 kg)'],
        ['Especificación', 'Sin vísceras ni escamas (G/S)'],
        ['Conservación', 'IQF bolsa individual'],
        ['Tallas', '350-550g, 550-750g, 750g+'],
      ],
    },
    'tilapia-breaded-raw': {
      tag: 'Empanizado Crudo · Valor Agregado',
      desc: 'Filete de tilapia empanizado en crudo, listo para freír u hornear en destino. Cobertura uniforme y adherencia estable tras la descongelación.',
      specs: [
        ['Presentación', 'Caja Máster 10 kg'],
        ['Procesamiento', 'Empanizado crudo, congelado IQF'],
        ['Preparación', 'Freír u hornear desde congelado'],
        ['Canal', 'Food-service y retail'],
      ],
    },
    'tilapia-breaded-prefried': {
      tag: 'Pre-frito · Listo para Servir',
      desc: 'Filete de tilapia empanizado y pre-frito en origen. Solo requiere calentamiento final, lo que reduce tiempos y merma en cocina.',
      specs: [
        ['Presentación', 'Caja Máster 10 kg'],
        ['Procesamiento', 'Empanizado y pre-frito, IQF'],
        ['Preparación', 'Calentar desde congelado'],
        ['Canal', 'Food-service, cadenas y catering'],
      ],
    },

    'shrimp-vannamei-hoso': {
      tag: 'HOSO · Entero con Cabeza',
      desc: 'Camarón Vannamei de cultivo entero, con cabeza y caparazón (Head-On Shell-On). Color y frescura preservados por congelación inmediata en origen.',
      specs: [
        ['Presentación', 'Caja Máster 10 kg (bloques o IQF)'],
        ['Calibres', '20/30, 30/40, 40/50, 50/60, 60/70'],
        ['Conservación', 'Congelado a -18°C'],
        ['Canal', 'Retail, HORECA y reproceso'],
      ],
    },
    'shrimp-vannamei-pd': {
      tag: 'PD · Pelado & Desvenado Crudo',
      desc: 'Camarón Vannamei pelado y desvenado en crudo. Rendimiento neto sin merma de pelado, ideal para líneas de producción y cocina de volumen.',
      specs: [
        ['Presentación', 'Caja Máster 10 kg (bolsas 1 kg)'],
        ['Calibres', 'U15, 21/25, 31/40, 51/60, 70/90'],
        ['Conservación', 'IQF a -18°C'],
        ['Canal', 'Industria y food-service'],
      ],
    },
    'shrimp-cooked-pd': {
      tag: 'Listo para Consumo · Pelado & Desvenado',
      desc: 'Camarón de cultivo pelado y desvenado, cocido al vapor en origen. Mantiene color naranja brillante, textura crujiente y cero mermas al descongelar.',
      specs: [
        ['Presentación', 'Caja Máster 10 kg (bolsas 1 kg)'],
        ['Calibres', 'U15, 21/25, 31/40, 51/60, 70/90'],
        ['Canal Principal', 'Supermercados, hoteles y restaurantes'],
        ['Conservación', 'IQF a -18°C'],
      ],
    },
    'shrimp-paste': {
      tag: 'Pasta · Base Industrial',
      desc: 'Pasta de camarón para uso industrial, base de salsas, rellenos, embutidos marinos y productos formados. Textura homogénea y sabor concentrado.',
      specs: [
        ['Presentación', 'Caja Máster 10 kg'],
        ['Procesamiento', 'Molido y congelado en origen'],
        ['Uso', 'Salsas, rellenos y productos formados'],
        ['Canal', 'Industria alimentaria'],
      ],
    },

    'rose-panga-fillet': {
      tag: 'Pangasius · Filete Rosado',
      desc: 'Filete de panga de tonalidad rosada natural, bien recortado, sin grasa, sin espinas y sin línea roja. Rendimiento 100% neto para comedores industriales y procesadores.',
      specs: [
        ['Presentación', 'Caja Máster de 15 kg'],
        ['Tratamiento', 'Libre de fosfatos o nivel especificado'],
        ['Conservación', 'IQF congelado en origen'],
        ['Calibres', '120-170g, 170-220g, 220g+'],
      ],
    },
    'panga-steaks': {
      tag: 'Steaks · Corte Transversal',
      desc: 'Corte transversal de panga con hueso central, de grosor uniforme. Presentación de alta rotación en mercados donde se valora el corte tipo posta.',
      specs: [
        ['Presentación', 'Caja Máster de 15 kg'],
        ['Procesamiento', 'Corte transversal, IQF'],
        ['Origen', 'Vietnam — certificación BAP'],
        ['Canal', 'Retail y food-service'],
      ],
    },
    'panga-breaded-fillet': {
      tag: 'Empanizado · Valor Agregado',
      desc: 'Filete de panga empanizado, de cobertura pareja y crocante estable tras la cocción. Formato pensado para cadenas de comida rápida y catering.',
      specs: [
        ['Presentación', 'Caja Máster 10 kg'],
        ['Procesamiento', 'Empanizado, congelado IQF'],
        ['Preparación', 'Freír u hornear desde congelado'],
        ['Canal', 'Cadenas, catering y food-service'],
      ],
    },

    'tuna-steaks': {
      tag: 'Lomo · Corte Premium',
      desc: 'Lomos de atún de corte limpio y color intenso, seleccionados por calidad de carne. Congelación rápida que preserva textura y presentación en plato.',
      specs: [
        ['Presentación', 'Caja Máster 10 kg'],
        ['Procesamiento', 'Corte y congelación rápida'],
        ['Gramaje', 'Según especificación del cliente'],
        ['Canal', 'HORECA y retail premium'],
      ],
    },
    'tuna-cubes': {
      tag: 'Cubos · Porcionado',
      desc: 'Cubos de atún de tamaño homogéneo, listos para porcionar. Formato eficiente para poke, ceviches, salteados y líneas de preparación rápida.',
      specs: [
        ['Presentación', 'Caja Máster 10 kg'],
        ['Procesamiento', 'Cubicado y congelado IQF'],
        ['Tamaño', 'Uniforme, según especificación'],
        ['Canal', 'Food-service y preparados'],
      ],
    },
  },
};

/** El tipo se deriva del espanol: es la fuente de verdad de las claves. */
export type Dict = typeof es;

/** Slug valido dentro del diccionario de fichas de producto. */
export type ProductKey = keyof typeof es.products;
