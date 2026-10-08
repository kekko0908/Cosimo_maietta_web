import { PageReveal } from './PageTransition';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-32">
      <PageReveal />
      
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Privacy Policy</h1>
          <p className="text-neutral-400 text-sm mb-16 uppercase tracking-widest">Ultimo aggiornamento: 4 Marzo 2026</p>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-neutral-900 p-8 border border-white/5 rounded-xl mb-12">
              <div className="flex items-start gap-4">
                <Shield className="text-white shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-serif mb-2 text-white">Titolare del Trattamento dei Dati</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    <strong>Arte Viva S.r.l.</strong><br/>
                    Via dei Mille, 60 - 80121 Napoli (NA)<br/>
                    P.IVA: 12345678901<br/>
                    Email: privacy@arteviva.it
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white flex items-center gap-3">
                <FileText size={24} />
                Tipologie di Dati raccolti
              </h2>
              <p className="text-neutral-400 mb-4">
                Fra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400 marker:text-white">
                <li>Cookie e Dati di utilizzo</li>
                <li>Email, Nome, Cognome (tramite moduli di contatto/registrazione)</li>
                <li>Dati di pagamento (gestiti da provider esterni sicuri)</li>
                <li>Indirizzo di spedizione (per l'invio degli ordini)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white flex items-center gap-3">
                <Eye size={24} />
                Finalità del Trattamento
              </h2>
              <p className="text-neutral-400 mb-4">
                I Dati dell'Utente sono raccolti per consentire al Titolare di fornire i propri Servizi, così come per le seguenti finalità:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400 marker:text-white">
                <li>Contattare l'Utente (risposta a richieste di informazioni)</li>
                <li>Gestione ordini e pagamenti</li>
                <li>Statistica (Google Analytics con IP anonimizzato)</li>
                <li>Visualizzazione di contenuti da piattaforme esterne (Google Maps, YouTube)</li>
                <li>Remarketing e Behavioral Targeting</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif mb-6 text-white flex items-center gap-3">
                <Lock size={24} />
                Diritti dell'Utente
              </h2>
              <p className="text-neutral-400 mb-4">
                Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare. In particolare, l'Utente ha il diritto di:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400 marker:text-white">
                <li>Revocare il consenso in ogni momento.</li>
                <li>Opporsi al trattamento dei propri Dati.</li>
                <li>Accedere ai propri Dati.</li>
                <li>Verificare e chiedere la rettificazione.</li>
                <li>Ottenere la limitazione del trattamento.</li>
                <li>Ottenere la cancellazione o rimozione dei propri Dati Personali.</li>
                <li>Ricevere i propri Dati o farli trasferire ad altro titolare (portabilità).</li>
              </ul>
            </section>

            <div className="border-t border-white/10 pt-8 mt-16 text-xs text-neutral-500">
              <p>
                Questa informativa privacy è redatta sulla base di molteplici ordinamenti legislativi, inclusi gli artt. 13 e 14 del Regolamento (UE) 2016/679.
                Questa informativa privacy riguarda esclusivamente questa Applicazione, se non diversamente specificato.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
