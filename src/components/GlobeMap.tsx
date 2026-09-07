import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';

export interface CountryData {
  iso: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
  flagCode: string;
}

/** Geometria y etiquetas; las descripciones llegan traducidas por prop. */
export const mapData: CountryData[] = [
  { iso: 'MEX', lat: 23.63, lng: -102.55, size: 0.05, color: '#d4a853', label: 'México', flagCode: 'mx' },
  { iso: 'CRI', lat: 9.75, lng: -83.75, size: 0.05, color: '#d4a853', label: 'Costa Rica', flagCode: 'cr' },
  { iso: 'COL', lat: 4.57, lng: -74.30, size: 0.05, color: '#d4a853', label: 'Colombia', flagCode: 'co' },
  { iso: 'PER', lat: -9.19, lng: -75.02, size: 0.05, color: '#d4a853', label: 'Perú', flagCode: 'pe' },
  { iso: 'CHN', lat: 36.07, lng: 120.38, size: 0.05, color: '#d4a853', label: 'China', flagCode: 'cn' },
  { iso: 'VNM', lat: 14.06, lng: 108.28, size: 0.05, color: '#d4a853', label: 'Vietnam', flagCode: 'vn' },
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

  // Ref al callback: el efecto de montaje corre una sola vez, asi que leer
  // onSelectCountry directamente dejaria una closure obsoleta.
  const onSelectRef = useRef(onSelectCountry);
  useEffect(() => { onSelectRef.current = onSelectCountry; }, [onSelectCountry]);

  // Sync external selectedCode changes
  useEffect(() => {
    if (!selectedCode) return;
    const match = mapData.find(m => m.flagCode === selectedCode || m.iso === selectedCode);
    if (match && worldRef.current) {
      setTooltip(match);
      worldRef.current.controls().autoRotate = false;
      worldRef.current.pointOfView({ lat: match.lat, lng: match.lng, altitude: 1.5 }, 600);
    }
  }, [selectedCode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // StrictMode monta el efecto dos veces en dev: sin esta guarda quedarian
    // dos globos y dos contextos WebGL vivos sobre el mismo contenedor.
    let disposed = false;

    // High performance Globe initialization
    const world = (Globe as any)({ waitForGlobeReady: true })(container)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(false);

    worldRef.current = world;

    // Set dimensions
    const resize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = Math.min(w, 550);
      world.width(w).height(h);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Controls optimization
    const controls = world.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;

    // Camera
    world.pointOfView({ lat: 10, lng: -70, altitude: 2.2 });

    // Load GeoJSON and FILTER ONLY OUR 6 ACTIVE COUNTRIES for 120 FPS WebGL rendering!
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
              setTooltip(match);
              onSelectRef.current?.(match.flagCode);
              controls.autoRotate = false;
              world.pointOfView({ lat: match.lat, lng: match.lng, altitude: 1.5 }, 600);
            }
          });
      })
      .catch(err => {
        // Antes se tragaba el error en silencio: si el CDN fallaba, el globo
        // se quedaba sin poligonos y no habia forma de saber por que.
        console.error('[GlobeMap] no se pudieron cargar los poligonos de paises:', err);
      });

    // Points
    world
      .pointsData(mapData)
      .pointAltitude('size')
      .pointColor('color')
      .pointRadius(0.6)
      .onPointClick((d: any) => {
        const data = d as CountryData;
        setTooltip(data);
        onSelectRef.current?.(data.flagCode);
        controls.autoRotate = false;
        world.pointOfView({ lat: data.lat, lng: data.lng, altitude: 1.5 }, 600);
      });

    return () => {
      disposed = true;
      window.removeEventListener('resize', resize);

      // Libera el contexto WebGL, el renderer y el loop de animacion.
      // Sin esto cada remontaje dejaba un globo huerfano consumiendo GPU.
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
    setTooltip(null);
    if (onSelectCountry) onSelectCountry(null);
    if (worldRef.current) {
      worldRef.current.controls().autoRotate = true;
      worldRef.current.pointOfView({ lat: 10, lng: -70, altitude: 2.2 }, 600);
    }
  };

  return (
    <div className="relative w-full flex justify-center">
      <div ref={containerRef} className="cursor-grab active:cursor-grabbing w-full max-w-4xl" />
      
      {/* Tooltip Card */}
      {tooltip && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md">
          <div className="glass rounded-2xl p-5 sm:p-6 shadow-2xl border border-[var(--gold)]/40 relative bg-[#0e1726]/95 backdrop-blur-xl">
            <button
              onClick={closeTooltip}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors text-xl font-bold cursor-pointer leading-none p-1"
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

            <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-light">{descriptions[tooltip.flagCode]}</p>
          </div>
        </div>
      )}
    </div>
  );
}
