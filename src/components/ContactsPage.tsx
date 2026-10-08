import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { PageReveal } from './PageTransition';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

// Custom Marker Icon (Consistent with other pages)
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

export function ContactsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-32">
      <PageReveal />
      
      <div className="max-w-7xl mx-auto px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-9xl font-serif mb-16 text-center"
        >
          CONTATTI
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-12 mb-16">
              <div>
                <h2 className="text-2xl font-serif mb-6">Sede Principale</h2>
                <p className="text-neutral-400 leading-relaxed mb-8">
                  Vieni a trovarci nel cuore di Napoli. Il nostro spazio è aperto a tutti gli amanti dell'arte, 
                  curatori e collezionisti.
                </p>
                
                <div className="space-y-6 font-sans text-sm tracking-widest uppercase text-white/80">
                  <div className="flex items-start gap-4">
                    <MapPin className="shrink-0 mt-1" size={18} />
                    <span>Via dei Mille, 60<br/>80121 Napoli (NA), Italia</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="shrink-0" size={18} />
                    <a href="mailto:info@arteviva.it" className="hover:text-white transition-colors">info@arteviva.it</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="shrink-0" size={18} />
                    <a href="tel:+390811234567" className="hover:text-white transition-colors">+39 081 123 4567</a>
                  </div>
                </div>
              </div>

              <div className="h-[300px] w-full rounded-xl overflow-hidden border border-white/10 relative z-0">
                <MapContainer 
                  center={[40.8363, 14.2335]} 
                  zoom={15} 
                  scrollWheelZoom={false} 
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  <Marker 
                    position={[40.8363, 14.2335]}
                    icon={customIcon}
                  >
                    <Popup className="custom-popup">
                      <div className="p-4 min-w-[200px] text-white">
                        <h3 className="font-serif text-lg mb-1">Arte Viva</h3>
                        <p className="text-xs text-neutral-400 font-sans">Via dei Mille, 60, Napoli</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-neutral-900 p-8 md:p-12 border border-white/5 rounded-2xl h-fit"
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif mb-4">Messaggio Inviato</h3>
                <p className="text-neutral-400 mb-8">
                  Grazie per averci contattato. Ti risponderemo il prima possibile.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-sm font-sans uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-all"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-serif mb-2">Scrivici</h2>
                <p className="text-neutral-400 text-sm mb-8">Compila il form per richiedere informazioni o prenotare una visita privata.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-sans uppercase tracking-widest text-neutral-500">Nome</label>
                      <input 
                        required
                        type="text"
                        className="w-full bg-neutral-950 border border-white/10 py-3 px-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-sans uppercase tracking-widest text-neutral-500">Cognome</label>
                      <input 
                        required
                        type="text"
                        className="w-full bg-neutral-950 border border-white/10 py-3 px-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm"
                        placeholder="Il tuo cognome"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-sans uppercase tracking-widest text-neutral-500">Email</label>
                    <input 
                      required
                      type="email"
                      className="w-full bg-neutral-950 border border-white/10 py-3 px-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm"
                      placeholder="nome@esempio.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-sans uppercase tracking-widest text-neutral-500">Oggetto</label>
                    <select 
                      className="w-full bg-neutral-950 border border-white/10 py-3 px-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm appearance-none"
                    >
                      <option>Informazioni Generali</option>
                      <option>Acquisto Opere</option>
                      <option>Proposte Artistiche</option>
                      <option>Collaborazioni</option>
                      <option>Altro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-sans uppercase tracking-widest text-neutral-500">Messaggio</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full bg-neutral-950 border border-white/10 py-3 px-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm resize-none"
                      placeholder="Scrivi qui il tuo messaggio..."
                    />
                  </div>

                  <div className="flex items-start gap-3 text-xs text-neutral-500">
                    <input type="checkbox" required className="mt-1" />
                    <p>
                      Acconsento al trattamento dei dati personali secondo la <a href="/privacy-policy" className="underline hover:text-white">Privacy Policy</a>.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-4 rounded-lg font-sans text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : (
                      <>
                        Invia Messaggio
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
