import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EXHIBITIONS, ARTISTS } from '../lib/utils';
import { PageReveal } from './PageTransition';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, ArrowRight, Search, Filter, X, ChevronLeft, ChevronRight, Check, ChevronDown } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useRef, useState, useMemo, useEffect } from 'react';

// Custom Marker Icon
const customMarkerHtml = renderToStaticMarkup(
  <div className="relative flex items-center justify-center w-8 h-8">
    <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-ping"></div>
    <div className="relative w-6 h-6 bg-neutral-950 border-2 border-white rounded-full shadow-xl flex items-center justify-center">
      <div className="w-2 h-2 bg-white rounded-full"></div>
    </div>
  </div>
);

const customIcon = L.divIcon({
  html: customMarkerHtml,
  className: 'custom-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

// Helper for date formatting
const formatDateRange = (start: Date, end: Date, mode: 'week' | 'month' | 'year') => {
  if (mode === 'year') {
    return start.getFullYear().toString();
  }
  if (mode === 'month') {
    return start.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  }
  // Week mode
  return `${start.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} — ${end.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}`;
};

// MultiSelect Component
function MultiSelect({ 
  label, 
  options, 
  selectedValues, 
  onChange 
}: { 
  label: string; 
  options: { value: string; label: string }[]; 
  selectedValues: string[]; 
  onChange: (values: string[]) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-3 px-4 py-2 text-sm uppercase tracking-wider border transition-all w-full md:w-auto min-w-[200px] ${
          isOpen || selectedValues.length > 0 
            ? 'bg-white text-neutral-950 border-white' 
            : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600'
        }`}
      >
        <span className="truncate">
          {selectedValues.length === 0 
            ? label 
            : `${selectedValues.length} Selezionat${selectedValues.length === 1 ? 'o' : 'i'}`}
        </span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-full md:w-64 bg-neutral-900 border border-neutral-800 shadow-2xl z-50 max-h-64 overflow-y-auto"
          >
            {options.map(option => (
              <div 
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-800 transition-colors border-b border-neutral-800 last:border-0"
              >
                <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                  selectedValues.includes(option.value) 
                    ? 'bg-white border-white' 
                    : 'border-neutral-600'
                }`}>
                  {selectedValues.includes(option.value) && <Check size={10} className="text-neutral-950" />}
                </div>
                <span className={`text-sm ${selectedValues.includes(option.value) ? 'text-white' : 'text-neutral-400'}`}>
                  {option.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ExhibitionsPage() {
  const featuredExhibition = EXHIBITIONS[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Filter States
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  
  // Date Navigation State
  const [dateMode, setDateMode] = useState<'week' | 'month' | 'year'>('week');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Calculate range based on mode
  const dateRange = useMemo(() => {
    const start = new Date(currentDate);
    const end = new Date(currentDate);

    if (dateMode === 'week') {
      const day = start.getDay();
      const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
      start.setDate(diff);
      start.setHours(0, 0, 0, 0);
      
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else if (dateMode === 'month') {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      
      end.setMonth(start.getMonth() + 1);
      end.setDate(0); // Last day of current month
      end.setHours(23, 59, 59, 999);
    } else if (dateMode === 'year') {
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      
      end.setMonth(11, 31);
      end.setHours(23, 59, 59, 999);
    }

    return { start, end };
  }, [currentDate, dateMode]);

  const changeDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    const multiplier = direction === 'next' ? 1 : -1;

    if (dateMode === 'week') {
      newDate.setDate(newDate.getDate() + (7 * multiplier));
    } else if (dateMode === 'month') {
      newDate.setMonth(newDate.getMonth() + multiplier);
    } else if (dateMode === 'year') {
      newDate.setFullYear(newDate.getFullYear() + multiplier);
    }
    setCurrentDate(newDate);
  };

  const toggleDateMode = () => {
    if (dateMode === 'week') setDateMode('month');
    else if (dateMode === 'month') setDateMode('year');
    else setDateMode('week');
  };

  // Derived Data
  const uniqueLocations = useMemo(() => {
    const locations = new Set(EXHIBITIONS.map(ex => ex.location.name));
    return Array.from(locations).map(loc => ({ value: loc, label: loc }));
  }, []);

  const artistOptions = useMemo(() => {
    return ARTISTS.map(artist => ({ value: artist.id, label: artist.name }));
  }, []);

  const filteredExhibitions = useMemo(() => {
    return EXHIBITIONS.filter(exhibition => {
      // Filter by Artists (Multi-select)
      if (selectedArtistIds.length > 0) {
        const hasSelectedArtist = exhibition.artistIds.some(id => selectedArtistIds.includes(id));
        if (!hasSelectedArtist) return false;
      }

      // Filter by Locations (Multi-select)
      if (selectedLocations.length > 0 && !selectedLocations.includes(exhibition.location.name)) {
        return false;
      }

      // Filter by Date Range
      const exStart = new Date(exhibition.startDate);
      const exEnd = new Date(exhibition.endDate);
      
      // Overlap logic: (StartA <= EndB) and (EndA >= StartB)
      const overlaps = (dateRange.start <= exEnd) && (dateRange.end >= exStart);
      if (!overlaps) return false;

      return true;
    });
  }, [selectedArtistIds, selectedLocations, dateRange]);

  const clearFilters = () => {
    setSelectedArtistIds([]);
    setSelectedLocations([]);
    setCurrentDate(new Date());
    setDateMode('week');
  };

  const hasActiveFilters = selectedArtistIds.length > 0 || selectedLocations.length > 0;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <PageReveal />
      
      {/* Hero Section */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={featuredExhibition?.image || "https://images.unsplash.com/photo-1518998053901-5348d3969105?q=80&w=2592&auto=format&fit=crop"} 
            alt="Mostre Hero" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/80 mb-6 block">
              Programma Espositivo 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-none mb-8 text-white">
              Visioni <span className="italic text-white/80">Contemporanee</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-serif max-w-2xl mx-auto leading-relaxed">
              Un viaggio attraverso le espressioni artistiche più innovative. 
              Scopri le mostre che stanno ridefinendo il panorama culturale di Napoli.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase flex flex-col items-center gap-2 z-20"
        >
          <span>Scorri per Esplorare</span>
          <div className="w-[1px] h-12 bg-white/20" />
        </motion.div>
      </div>

      <div className="relative z-10 bg-neutral-950">
        {/* Sticky Filters Section */}
        <div className="sticky top-[60px] z-40 bg-neutral-950 border-b border-white/10 py-6 transition-all">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Left Side: Multi-selects */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-white uppercase tracking-widest text-xs font-sans font-semibold mr-4">
                  <Filter size={14} />
                  <span>Filtri</span>
                </div>

                <MultiSelect 
                  label="Tutti gli Artisti" 
                  options={artistOptions} 
                  selectedValues={selectedArtistIds} 
                  onChange={setSelectedArtistIds} 
                />
                
                <MultiSelect 
                  label="Tutti i Luoghi" 
                  options={uniqueLocations} 
                  selectedValues={selectedLocations} 
                  onChange={setSelectedLocations} 
                />

                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-white pb-0.5 ml-2"
                  >
                    Rimuovi
                  </button>
                )}
              </div>

              {/* Right Side: Date Navigation */}
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <button 
                  onClick={() => changeDate('prev')}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-neutral-400 hover:text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="text-center cursor-pointer group" onClick={toggleDateMode}>
                  <span className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-1 group-hover:text-white transition-colors">
                    {dateMode === 'week' ? 'Settimana' : dateMode === 'month' ? 'Mese' : 'Anno'}
                  </span>
                  <span className="font-serif text-lg capitalize whitespace-nowrap">
                    {formatDateRange(dateRange.start, dateRange.end, dateMode)}
                  </span>
                </div>

                <button 
                  onClick={() => changeDate('next')}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-neutral-400 hover:text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Map Section */}
          <div className="mb-32">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif mb-4">Mappa delle Esposizioni</h2>
                <p className="text-neutral-400 max-w-md">
                  {filteredExhibitions.length} {filteredExhibitions.length === 1 ? 'mostra trovata' : 'mostre trovate'}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-neutral-500">
                <MapPin size={14} />
                <span>Napoli, Italia</span>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="h-[600px] w-full rounded-xl overflow-hidden border border-white/10 relative z-0 shadow-2xl shadow-black/50"
            >
              <MapContainer center={[40.845, 14.25]} zoom={14} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {filteredExhibitions.map((exhibition) => (
                  <Marker 
                    key={exhibition.id} 
                    position={[exhibition.location.lat, exhibition.location.lng]}
                    icon={customIcon}
                  >
                    <Popup className="custom-popup">
                      <div className="p-4 min-w-[240px] text-white">
                        <img src={exhibition.image} alt={exhibition.title} className="w-full h-32 object-cover mb-4 rounded-lg" />
                        <h3 className="font-serif text-xl mb-1">{exhibition.title}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-3">{exhibition.location.name}</p>
                        <p className="text-xs text-neutral-300 mb-4 font-sans">{new Date(exhibition.startDate).toLocaleDateString()} - {new Date(exhibition.endDate).toLocaleDateString()}</p>
                        <Link 
                          to={`/mostre/${exhibition.id}`} 
                          className="inline-block border-b border-white/30 hover:border-white transition-colors text-[10px] uppercase tracking-widest pb-1 text-white/80 hover:text-white"
                        >
                          Vedi Dettagli
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>
          </div>

          {/* List Section */}
          <div className="grid grid-cols-1 gap-16">
            {filteredExhibitions.length > 0 ? (
              filteredExhibitions.map((exhibition, index) => (
                <motion.div
                  key={exhibition.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center border-b border-white/10 pb-16 last:border-0"
                >
                  <Link to={`/mostre/${exhibition.id}`} className="relative aspect-video overflow-hidden rounded-lg cursor-pointer block">
                    <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                    <img 
                      src={exhibition.image} 
                      alt={exhibition.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                  </Link>
                  
                  <div>
                    <div className="flex items-center gap-4 text-xs font-sans tracking-widest uppercase text-neutral-500 mb-4">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(exhibition.startDate).toLocaleDateString()} — {new Date(exhibition.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-serif mb-6 group-hover:text-neutral-300 transition-colors">{exhibition.title}</h2>
                    
                    <div className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
                      <MapPin size={16} />
                      <span>{exhibition.location.name}, {exhibition.location.address}</span>
                    </div>

                    <p className="text-lg text-white/70 mb-8 leading-relaxed">
                      {exhibition.description}
                    </p>

                    <Link 
                      to={`/mostre/${exhibition.id}`}
                      className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-all uppercase text-xs tracking-widest"
                    >
                      Scopri di più <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-24 text-neutral-500">
                <p className="text-xl font-serif mb-4">Nessuna mostra trovata</p>
                <p className="text-sm font-sans">Prova a modificare i filtri di ricerca</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
