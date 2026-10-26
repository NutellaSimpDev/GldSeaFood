import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { motion, AnimatePresence } from 'motion/react';

export interface CountryData {
  iso: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
  flagCode: string;
}

/**
 * Geometria y etiquetas; las descripciones llegan traducidas por prop.
 *
 * Las coordenadas apuntan al PUERTO operativo, no al centroide del pais:
 * Manzanillo (MEX), Caldera (CRI), Buenaventura (COL), Callao (PER),
 * Yantian (CHN), Ho Chi Minh (VNM).
 */
export const mapData: CountryData[] = [
  { iso: 'MEX', lat: 19.05, lng: -104.31, size: 0.05, color: '#d4a853', label: 'México', flagCode: 'mx' },
  { iso: 'CRI', lat: 9.91, lng: -84.72, size: 0.05, color: '#d4a853', label: 'Costa Rica', flagCode: 'cr' },
  { iso: 'COL', lat: 3.88, lng: -77.03, size: 0.05, color: '#d4a853', label: 'Colombia', flagCode: 'co' },
  { iso: 'PER', lat: -12.05, lng: -77.14, size: 0.05, color: '#d4a853', label: 'Perú', flagCode: 'pe' },
  { iso: 'CHN', lat: 22.58, lng: 114.27, size: 0.05, color: '#d4a853', label: 'China', flagCode: 'cn' },
  { iso: 'VNM', lat: 10.76, lng: 106.70, size: 0.05, color: '#d4a853', label: 'Vietnam', flagCode: 'vn' },
];

interface GlobeMapProps {
  selectedCode?: string | null;
  onSelectCountry?: (code: string | null) => void;
  /** Descripcion por codigo de pais en el idioma activo. */
  descriptions: Record<string, string>;
}

export default function GlobeMap({ selectedCode, onSelectCountry, descriptions }: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<CountryData | null>(null);
  const worldRef = useRef<any>(null);

  // Guarda para evitar doble disparo de animaciones: evita que la sincronizacion
  // de React aborte y salte la interpolacion suave de la camara en globe.gl.
  const currentTargetRef = useRef<string | null>(null);

  const onSelectRef = useRef(onSelectCountry);
  useEffect(() => {
    onSelectRef.current = onSelectCountry;
  }, [onSelectCountry]);

  // Centra y anima suavemente hacia el pais seleccionado
  const focusCountry = (match: CountryData, duration = 1200) => {
    if (!worldRef.current) return;

    // Si ya estamos centrados o transicionando hacia este pais, no reiniciar el tween
    if (currentTargetRef.current === match.flagCode) {
      setTooltip(match);
      return;
    }

    currentTargetRef.current = match.flagCode;
    setTooltip(match);

    const controls = worldRef.current.controls();
    if (controls) {
      controls.autoRotate = false;
    }

    // Animacion fluida y continua sin salto brusco
    worldRef.current.pointOfView({ lat: match.lat, lng: match.lng, altitude: 1.55 }, duration);
  };

  // Sincronizacion externa de selectedCode (ej: botones de banderas en App.tsx)
  useEffect(() => {
    if (!selectedCode) {
      if (currentTargetRef.current !== null && worldRef.current) {
        currentTargetRef.current = null;
        setTooltip(null);
        const controls = worldRef.current.controls();
        if (controls) controls.autoRotate = true;
        worldRef.current.pointOfView({ lat: 10, lng: -70, altitude: 2.2 }, 1000);
      }
      return;
    }

    const match = mapData.find(m => m.flagCode === selectedCode || m.iso === selectedCode);
    if (match) {
      focusCountry(match, 1200);
    }
  }, [selectedCode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let disposed = false;

    // Inicializacion del globo 3D
    const world = (Globe as any)({ waitForGlobeReady: true })(container)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(false);

    worldRef.current = world;

    // Ajuste responsivo de dimensiones
    const resize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = Math.min(w, 550);
      world.width(w).height(h);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Controles de orbita
    const controls = world.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;

    // Vista inicial sobre el continente americano
    world.pointOfView({ lat: 10, lng: -70, altitude: 2.2 });

    // Carga de poligonos filtrados para maximo rendimiento WebGL
    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => {
        if (!res.ok) throw new Error(`GeoJSON HTTP ${res.status}`);
        return res.json();
      })
      .then(countries => {
        if (disposed) return;
        const activeISOs = mapData.map(d => d.iso);
        const activeFeatures = countries.features.filter((f: any) => activeISOs.includes(f.properties.ISO_A3));

        world
          .polygonsData(activeFeatures)
          .polygonAltitude(0.012)
          .polygonCapColor(() => 'rgba(212, 168, 83, 0.4)')
          .polygonSideColor(() => 'rgba(212, 168, 83, 0.1)')
          .polygonStrokeColor(() => '#f5c86b')
          .onPolygonHover((hoverD: any) => {
            world
              .polygonAltitude((d: any) => d === hoverD ? 0.05 : 0.012)
              .polygonCapColor((d: any) => d === hoverD ? 'rgba(245, 200, 107, 0.75)' : 'rgba(212, 168, 83, 0.4)');
          })
          .onPolygonClick((d: any) => {
            const iso = d?.properties?.ISO_A3;
            const match = mapData.find(m => m.iso === iso);
            if (match) {
              focusCountry(match, 1200);
              onSelectRef.current?.(match.flagCode);
            }
          });
      })
      .catch(err => {
        console.error('[GlobeMap] no se pudieron cargar los poligonos de paises:', err);
      });

    // Marcadores de puertos en los paises clave
    world
      .pointsData(mapData)
      .pointAltitude('size')
      .pointColor('color')
      .pointRadius(0.6)
      .onPointClick((d: any) => {
        const data = d as CountryData;
        focusCountry(data, 1200);
        onSelectRef.current?.(data.flagCode);
      });

    return () => {
      disposed = true;
      window.removeEventListener('resize', resize);

      try {
        world._destructor?.();
      } catch (err) {
        console.warn('[GlobeMap] fallo al destruir la instancia del globo:', err);
      }
      container.replaceChildren();
      worldRef.current = null;
    };
  }, []);

  const closeTooltip = () => {
    currentTargetRef.current = null;
    setTooltip(null);
    onSelectRef.current?.(null);
    if (worldRef.current) {
      const controls = worldRef.current.controls();
      if (controls) controls.autoRotate = true;
      worldRef.current.pointOfView({ lat: 10, lng: -70, altitude: 2.2 }, 1000);
    }
  };

  return (
    <div className="relative w-full flex justify-center">
      <div ref={containerRef} className="cursor-grab active:cursor-grabbing w-full max-w-4xl" />

      {/* Tooltip Card con transicion suave */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key={tooltip.flagCode}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md pointer-events-auto"
          >
            <div className="glass rounded-2xl p-5 sm:p-6 shadow-2xl border border-[var(--gold)]/40 relative bg-[#0e1726]/95 backdrop-blur-xl">
              <button
                type="button"
                onClick={closeTooltip}
                className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors text-xl font-bold cursor-pointer leading-none p-1"
                aria-label="Cerrar detalle"
              >
                ×
              </button>

              <div className="flex items-center gap-3 mb-2.5">
                <img
                  src={`https://flagcdn.com/w40/${tooltip.flagCode}.png`}
                  alt={tooltip.label}
                  className="w-7 h-5 rounded object-cover shadow-sm border border-white/20"
                />
                <strong className="text-[var(--gold-bright)] text-lg font-bold">{tooltip.label}</strong>
              </div>

              <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-light">
                {descriptions[tooltip.flagCode]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
