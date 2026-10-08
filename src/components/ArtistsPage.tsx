import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Palette, ChevronDown, Check } from 'lucide-react';
import { ARTISTS } from '../lib/utils';
import { PageReveal } from './PageTransition';
import { cn } from '../lib/utils';

export function ArtistsPage() {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const locations = useMemo(() => Array.from(new Set(ARTISTS.map(a => a.location))), []);
  const categories = useMemo(() => Array.from(new Set(ARTISTS.map(a => a.category))), []);

  const filteredArtists = useMemo(() => {
    return ARTISTS.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = locationFilter ? artist.location === locationFilter : true;
      const matchesCategory = categoryFilter ? artist.category === categoryFilter : true;
      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [search, locationFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 px-8 pb-32">
      <PageReveal />
      
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-9xl font-serif mb-16 text-center"
        >
          GLI <span className="italic text-neutral-500">ARTISTI</span>
        </motion.h1>

        {/* Filters */}
        <div className="sticky top-[60px] z-30 bg-neutral-950/80 backdrop-blur-md py-6 mb-16 border-b border-white/10">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input 
                type="text" 
                placeholder="CERCA ARTISTA..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-2 pl-8 focus:outline-none focus:border-white transition-colors font-sans tracking-widest uppercase text-sm placeholder:text-neutral-700"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <FilterDropdown 
                icon={MapPin}
                label="Tutte le Nazioni"
                value={locationFilter}
                options={locations}
                onChange={setLocationFilter}
              />
              <FilterDropdown 
                icon={Palette}
                label="Tutte le Categorie"
                value={categoryFilter}
                options={categories}
                onChange={setCategoryFilter}
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {filteredArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/artisti/${artist.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                  <img 
                    src={artist.coverImage} 
                    alt={artist.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Avatar Overlay */}
                  <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                    <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex justify-between items-end border-b border-white/10 pb-4 group-hover:border-white transition-colors duration-500">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-serif mb-2">{artist.name}</h2>
                    <div className="flex gap-4 text-neutral-500 font-sans text-xs tracking-widest uppercase">
                      <span>{artist.location}</span>
                      <span>•</span>
                      <span>{artist.category}</span>
                    </div>
                  </div>
                  <span className="font-sans text-xs tracking-widest uppercase border border-white/20 px-4 py-2 group-hover:bg-white group-hover:text-black transition-all">
                    Visita
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-32 text-neutral-500 font-serif text-2xl">
            Nessun artista trovato.
          </div>
        )}
      </div>
    </div>
  );
}

function FilterDropdown({ 
  icon: Icon, 
  label, 
  value, 
  options, 
  onChange 
}: { 
  icon: any, 
  label: string, 
  value: string, 
  options: string[], 
  onChange: (val: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-w-[220px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between border px-4 py-3 transition-all duration-300",
          isOpen ? "bg-white text-black border-white" : "border-white/20 hover:border-white text-white"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon size={16} />
          <span className="font-sans text-xs tracking-widest uppercase truncate max-w-[140px]">
            {value || label}
          </span>
        </div>
        <ChevronDown 
          size={14} 
          className={cn("transition-transform duration-300 flex-shrink-0", isOpen ? "rotate-180" : "")} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-full bg-neutral-900 border border-white/10 z-50 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => { onChange(''); setIsOpen(false); }}
                className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors border-b border-white/5 flex items-center justify-between group/item text-white/70 hover:text-black"
              >
                <span>Tutti</span>
                {!value && <Check size={14} />}
              </button>
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => { onChange(option); setIsOpen(false); }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-between group/item",
                    value === option ? "text-white bg-white/10" : "text-white/70"
                  )}
                >
                  <span>{option}</span>
                  {value === option && <Check size={14} />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
