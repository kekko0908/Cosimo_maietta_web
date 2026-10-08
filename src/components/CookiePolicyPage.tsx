import { PageReveal } from './PageTransition';
import { motion } from 'motion/react';
import { Cookie, Settings, Info } from 'lucide-react';

export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-32">
      <PageReveal />
      
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Cookie Policy</h1>
          <p className="text-neutral-400 text-sm mb-16 uppercase tracking-widest">Ultimo aggiornamento: 4 Marzo 2026</p>

          <div className="prose prose-invert prose-lg max-w-none">
            
            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white flex items-center gap-3">
                <Info size={24} />
                Cosa sono i Cookie
              </h2>
              <p className="text-neutral-400 leading-relaxed">
                I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali, 
                dove vengono memorizzati per essere ritrasmessi agli stessi siti in occasione di visite successive. 
                I cookie sono utilizzati per diverse finalità, hanno caratteristiche diverse, e possono essere 
                utilizzati sia dal titolare del sito che si sta visitando, sia da terze parti.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white flex items-center gap-3">
                <Cookie size={24} />
                Cookie utilizzati da questo sito
              </h2>
              
              <div className="space-y-8">
                <div className="bg-neutral-900 p-6 border border-white/5 rounded-xl">
                  <h3 className="text-lg font-serif text-white mb-2">Cookie Tecnici</h3>
                  <p className="text-neutral-400 text-sm">
                    Relativi ad attività strettamente necessarie al funzionamento del sito e all'erogazione del servizio. 
                    Non richiedono il consenso dell'utente.
                  </p>
                </div>

                <div className="bg-neutral-900 p-6 border border-white/5 rounded-xl">
                  <h3 className="text-lg font-serif text-white mb-2">Cookie di Statistica</h3>
                  <p className="text-neutral-400 text-sm">
                    Utilizzati per raccogliere informazioni, in forma aggregata, sul numero degli utenti e su come 
                    questi visitano il sito stesso (es. Google Analytics).
                  </p>
                </div>

                <div className="bg-neutral-900 p-6 border border-white/5 rounded-xl">
                  <h3 className="text-lg font-serif text-white mb-2">Cookie di Profilazione e Marketing</h3>
                  <p className="text-neutral-400 text-sm">
                    Utilizzati per tracciare la navigazione dell'utente in rete e creare profili sui suoi gusti, 
                    abitudini, scelte, ecc. Con questi cookie possono essere trasmessi al terminale dell'utente 
                    messaggi pubblicitari in linea con le preferenze già manifestate dallo stesso utente nella 
                    navigazione online.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white flex items-center gap-3">
                <Settings size={24} />
                Gestione delle preferenze
              </h2>
              <p className="text-neutral-400 mb-4">
                L'utente può gestire le preferenze relative ai Cookie direttamente all'interno del proprio browser 
                ed impedire – ad esempio – che terze parti possano installarne. Tramite le preferenze del browser 
                è inoltre possibile eliminare i Cookie installati in passato.
              </p>
              <p className="text-neutral-400">
                Per ulteriori informazioni su come gestire i cookie nel browser:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-neutral-400 marker:text-white">
                <li><a href="#" className="underline hover:text-white">Google Chrome</a></li>
                <li><a href="#" className="underline hover:text-white">Mozilla Firefox</a></li>
                <li><a href="#" className="underline hover:text-white">Apple Safari</a></li>
                <li><a href="#" className="underline hover:text-white">Microsoft Edge</a></li>
              </ul>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
