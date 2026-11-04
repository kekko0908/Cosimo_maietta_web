import { Link } from 'react-router-dom';
import { Versione2Footer, Versione2Header } from './Versione2Chrome';
import { SiteMeta } from './SiteMeta';
import { siteConfig } from './siteConfig';
import { versione2Socials } from './content';

export default function PrivacyPage() {
  return (
    <div className="v2-site">
      <SiteMeta
        title="Privacy e contatti"
        description="Come funzionano i contatti e i servizi esterni nel portfolio di Cosimo Maietta."
      />
      <Versione2Header />
      <main id="v2-content" className="v2-privacy">
        <span className="v2-kicker">Informazioni / 4 novembre 2026</span>
        <h1>Privacy e contatti</h1>
        {siteConfig.preview && (
          <p className="v2-privacy-preview">
            Sito in anteprima. Le informazioni del titolare e del servizio di invio saranno
            completate prima della pubblicazione definitiva.
          </p>
        )}
        <section>
          <h2>Le richieste di contatto</h2>
          <p>
            {siteConfig.contactEndpoint
              ? 'Il modulo trasmette nome, email e informazioni inserite al servizio di contatto configurato per gestire la richiesta. Inserisci soltanto le informazioni utili al progetto.'
              : 'Il modulo prepara un messaggio che puoi copiare e inviare a Cosimo. In questa anteprima i dati del modulo non vengono inviati a un server e non vengono salvati dal sito. Restano nei campi fino a quando li cancelli o lasci la pagina.'}
          </p>
          <p>
            Se scegli di scrivere su Instagram o su un’altra piattaforma, la conversazione avviene
            sul servizio scelto, secondo le sue impostazioni e informative.
          </p>
        </section>
        <section>
          <h2>Immagini, video e audio</h2>
          <p>
            Le fotografie e il video di anteprima sono serviti da questo sito. Il suono ambientale
            viene generato nel browser soltanto quando lo attivi e si ferma durante la riproduzione
            di un video o quando lasci la pagina.
          </p>
        </section>
        <section>
          <h2>Servizi esterni</h2>
          <p>
            I collegamenti a Instagram, Flickr, TikTok, ProntoPro e StarOfService aprono siti
            esterni. I caratteri tipografici sono caricati da Google Fonts. Questo portfolio non
            integra strumenti di analisi del traffico o pubblicità.
          </p>
        </section>
        <section>
          <h2>Per contattare Cosimo</h2>
          <p>
            Puoi scrivere tramite il{' '}
            <a href={versione2Socials[0].href} target="_blank" rel="noreferrer">
              profilo Instagram
            </a>{' '}
            oppure usare la <Link to="/#contatti">sezione contatti</Link>.
          </p>
        </section>
      </main>
      <Versione2Footer />
    </div>
  );
}
