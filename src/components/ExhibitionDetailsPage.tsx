import { useParams, Link } from 'react-router-dom';
import { EXHIBITIONS, ARTISTS, ARTWORKS } from '../lib/utils';
import { PageReveal } from './PageTransition';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

// Custom Marker Icon (Same as ExhibitionsPage)
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

export function ExhibitionDetailsPage() {
  const { id } = useParams();
  const exhibition = EXHIBITIONS.find(e => e.id === id);

  if (!exhibition) {
    return <div className="min-h-screen flex items-center justify-center text-white">Mostra non trovata</div>;
  }

  const artists = ARTISTS.filter(a => exhibition.artistIds.includes(a.id));
  const artworks = ARTWORKS.filter(a => exhibition.artworkIds.includes(a.id));

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-32">
      <PageReveal />
      
      {/* Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden mb-24">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={exhibition.image} 
          alt={exhibition.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto w-full">
          <Link to="/mostre" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors font-sans text-xs tracking-widest uppercase w-fit">
            <ArrowLeft size={16} /> Torna alle Mostre
          </Link>
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif leading-none mb-8"
          >
            {exhibition.title}
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm font-sans tracking-widest uppercase text-white/80">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(exhibition.startDate).toLocaleDateString()} — {new Date(exhibition.endDate).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {exhibition.location.name}, {exhibition.location.address}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Description & Info */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif mb-8 italic text-neutral-400">Il Concept</h2>
            <p className="text-xl leading-relaxed text-white/80 font-serif">
              {exhibition.description}
            </p>
            <p className="mt-8 text-neutral-500 leading-loose">
              Questa esposizione rappresenta un punto di incontro unico tra diverse discipline artistiche, 
              creando un dialogo vibrante tra spazio, materia e percezione. I visitatori sono invitati 
              non solo ad osservare, ma a immergersi completamente nell'atmosfera creata dalle opere.
            </p>
          </div>
          <div className="bg-neutral-900 p-8 border border-white/5 h-fit">
            <h3 className="font-sans text-xs uppercase tracking-widest text-neutral-500 mb-6">Informazioni Visita</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-neutral-400">Orari</span>
                <span>10:00 - 19:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-neutral-400">Chiusura</span>
                <span>Lunedì</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-neutral-400">Biglietto Intero</span>
                <span>€15.00</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-neutral-400">Biglietto Ridotto</span>
                <span>€10.00</span>
              </div>
            </div>
            <button className="w-full mt-8 bg-white text-black py-3 font-sans text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
              Prenota Biglietto
            </button>
          </div>
        </section>

        {/* Location Map */}
        <section className="mb-32">
          <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center">La Location</h2>
          <div className="h-[400px] w-full rounded-xl overflow-hidden border border-white/10 relative z-0">
            <MapContainer 
              center={[exhibition.location.lat, exhibition.location.lng]} 
              zoom={15} 
              scrollWheelZoom={false} 
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              <Marker 
                position={[exhibition.location.lat, exhibition.location.lng]}
                icon={customIcon}
              >
                <Popup className="custom-popup">
                  <div className="p-4 min-w-[200px] text-white">
                    <h3 className="font-serif text-lg mb-1">{exhibition.location.name}</h3>
                    <p className="text-xs text-neutral-400 font-sans">{exhibition.location.address}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>

        {/* Artists */}
        <section className="mb-32">
          <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center">Artisti in Mostra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map(artist => (
              <Link key={artist.id} to={`/artisti/${artist.id}`} className="group block bg-neutral-900 border border-white/5 hover:border-white/20 transition-colors p-6">
                <div className="flex items-center gap-6 mb-6">
                  <img src={artist.avatar} alt={artist.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h3 className="font-serif text-xl group-hover:text-neutral-300 transition-colors">{artist.name}</h3>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest">{artist.category}</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 line-clamp-3 mb-4">{artist.bio}</p>
                <span className="text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors border-b border-transparent group-hover:border-white inline-block pb-0.5">
                  Vedi Profilo
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Artworks */}
        <section>
          <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center">Opere Esposte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map(work => (
              <Link key={work.id} to={`/opera/${work.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-neutral-800">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="border border-white px-6 py-2 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                      Vedi Opera
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-serif italic">{work.title}</h3>
                <p className="text-neutral-500 text-xs font-sans tracking-widest mt-1">{work.artist}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
