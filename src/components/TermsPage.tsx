import { PageReveal } from './PageTransition';
import { motion } from 'motion/react';
import { Scale, AlertCircle, HelpCircle } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-32">
      <PageReveal />
      
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Termini e Condizioni</h1>
          <p className="text-neutral-400 text-sm mb-16 uppercase tracking-widest">Ultimo aggiornamento: 4 Marzo 2026</p>

          <div className="prose prose-invert prose-lg max-w-none">
            
            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white flex items-center gap-3">
                <Scale size={24} />
                Introduzione
              </h2>
              <p className="text-neutral-400 leading-relaxed">
                I presenti Termini e Condizioni regolano l'uso di questo Sito Web e l'accordo che opera tra Noi e Voi. 
                I presenti Termini stabiliscono i diritti e gli obblighi di tutti gli utenti in relazione all'uso del Sito Web.
                L'accesso e l'utilizzo del Servizio sono condizionati dall'accettazione e dal rispetto dei presenti Termini.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white">Proprietà Intellettuale</h2>
              <p className="text-neutral-400 leading-relaxed">
                Il Servizio e i suoi contenuti originali (esclusi i Contenuti forniti dagli utenti), le caratteristiche e 
                le funzionalità sono e rimarranno di proprietà esclusiva di Arte Viva S.r.l. e dei suoi licenziatari. 
                Il Servizio è protetto da copyright, marchi e altre leggi sia italiane che di paesi stranieri.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white">Acquisti</h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Se desiderate acquistare qualsiasi prodotto o servizio reso disponibile tramite il Servizio ("Acquisto"), 
                vi potrebbe essere chiesto di fornire alcune informazioni rilevanti per il vostro Acquisto tra cui, 
                senza limitazioni, il numero della vostra carta di credito, la data di scadenza della vostra carta di credito, 
                il vostro indirizzo di fatturazione e le vostre informazioni di spedizione.
              </p>
              <div className="bg-neutral-900 p-6 border border-white/5 rounded-xl flex gap-4 items-start">
                <AlertCircle className="text-yellow-500 shrink-0 mt-1" />
                <p className="text-neutral-400 text-sm">
                  Ci riserviamo il diritto di rifiutare o annullare l'ordine in qualsiasi momento per determinati motivi, 
                  inclusi ma non limitati a: disponibilità del prodotto o servizio, errori nella descrizione o nel prezzo 
                  del prodotto o servizio, errore nel vostro ordine o altri motivi.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white flex items-center gap-3">
                <HelpCircle size={24} />
                Limitazione di Responsabilità
              </h2>
              <p className="text-neutral-400 leading-relaxed">
                In nessun caso Arte Viva S.r.l., né i suoi direttori, dipendenti, partner, agenti, fornitori o affiliati, 
                saranno responsabili per danni indiretti, incidentali, speciali, consequenziali o punitivi, inclusi, 
                senza limitazione, perdita di profitti, dati, uso, avviamento o altre perdite intangibili, derivanti da 
                (i) l'accesso o l'uso o l'impossibilità di accedere o utilizzare il Servizio; 
                (ii) qualsiasi condotta o contenuto di terzi sul Servizio.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white">Legge Applicabile</h2>
              <p className="text-neutral-400 leading-relaxed">
                I presenti Termini saranno regolati e interpretati in conformità con le leggi italiane, senza riguardo 
                alle disposizioni sui conflitti di legge. Il mancato rispetto di qualsiasi diritto o disposizione dei 
                presenti Termini non sarà considerato una rinuncia a tali diritti.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
