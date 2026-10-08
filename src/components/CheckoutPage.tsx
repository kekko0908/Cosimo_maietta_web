import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { PageReveal } from './PageTransition';
import { Lock, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      addOrder(items, total, paymentMethod);
      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white pt-32 px-8 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-neutral-900 border border-white/10 p-8 text-center rounded-2xl"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif mb-4">Pagamento Riuscito</h2>
          <p className="text-neutral-400 mb-8">Grazie per il tuo ordine. Riceverai una email di conferma a breve.</p>
          <Link to="/" className="block w-full bg-white text-black py-4 font-sans text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
            Torna alla Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 px-8 pb-32">
      <PageReveal />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif mb-12">Checkout Sicuro</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Shipping Info (Simplified) */}
            <section>
              <h2 className="text-xl font-sans uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Dati di Spedizione</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Nome" placeholder="Mario" />
                <Input label="Cognome" placeholder="Rossi" />
                <Input label="Email" type="email" placeholder="mario@example.com" className="md:col-span-2" />
                <Input label="Indirizzo" placeholder="Via Roma 1" className="md:col-span-2" />
                <Input label="Città" placeholder="Milano" />
                <Input label="CAP" placeholder="20100" />
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-xl font-sans uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Metodo di Pagamento</h2>
              
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    "flex-1 py-4 border flex items-center justify-center gap-3 transition-all",
                    paymentMethod === 'card' ? "bg-white text-black border-white" : "border-white/20 text-neutral-400 hover:border-white"
                  )}
                >
                  <CreditCard size={20} />
                  <span className="font-sans text-xs uppercase tracking-widest">Carta di Credito</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('paypal')}
                  className={cn(
                    "flex-1 py-4 border flex items-center justify-center gap-3 transition-all",
                    paymentMethod === 'paypal' ? "bg-[#0070BA] border-[#0070BA] text-white" : "border-white/20 text-neutral-400 hover:border-white"
                  )}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.05-4.336 6.794-9.116 6.794H9.468a1.15 1.15 0 0 0-1.148 1.03L7.076 21.337z"/>
                  </svg>
                  <span className="font-sans text-xs uppercase tracking-widest">PayPal</span>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <form onSubmit={handlePayment} className="space-y-6 bg-neutral-900 p-8 border border-white/5 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-neutral-400">Accettiamo</span>
                    <div className="flex gap-2">
                       <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[10px]">VISA</div>
                       <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[10px]">MC</div>
                       <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[10px]">AMEX</div>
                    </div>
                  </div>
                  
                  <Input label="Intestatario Carta" placeholder="MARIO ROSSI" />
                  <Input label="Numero Carta" placeholder="0000 0000 0000 0000" icon={<Lock size={14} />} />
                  <div className="grid grid-cols-2 gap-6">
                    <Input label="Scadenza" placeholder="MM/YY" />
                    <Input label="CVC" placeholder="123" type="password" />
                  </div>

                  <div className="flex items-center gap-2 text-green-400 text-xs mt-4">
                    <Lock size={12} />
                    <span>Pagamento criptato SSL a 256-bit</span>
                  </div>

                  <button 
                    disabled={isProcessing}
                    className="w-full bg-white text-black py-4 mt-6 font-sans text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? "Elaborazione..." : `Paga €${total}`}
                  </button>
                </form>
              ) : (
                <div className="bg-neutral-900 p-8 border border-white/5 rounded-xl text-center">
                  <p className="text-neutral-400 mb-6">Verrai reindirizzato al sito sicuro di PayPal per completare il pagamento.</p>
                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-[#0070BA] text-white py-4 font-sans text-xs uppercase tracking-widest hover:bg-[#005ea6] transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? "Connessione a PayPal..." : "Paga con PayPal"}
                  </button>
                </div>
              )}
            </section>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 p-8 border border-white/10 sticky top-32">
              <h3 className="font-serif text-2xl italic mb-6">Riepilogo Ordine</h3>
              
              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-white/5 pb-4 last:border-0">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover bg-neutral-800" />
                    <div>
                      <h4 className="font-serif text-sm">{item.title}</h4>
                      <p className="text-xs text-neutral-500 uppercase">{item.artist}</p>
                      <p className="text-sm font-mono mt-1">€{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Subtotale</span>
                  <span>€{total}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Spedizione</span>
                  <span>Gratuita</span>
                </div>
                <div className="flex justify-between text-lg font-serif text-white pt-4 border-t border-white/10">
                  <span>Totale</span>
                  <span>€{total}</span>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded flex gap-3 items-start">
                <AlertCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-blue-200/80 leading-relaxed">
                  Tutte le transazioni sono sicure e criptate. Non salviamo i dati della tua carta di credito.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, className, ...props }: any) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-xs font-sans uppercase tracking-widest text-neutral-500">{label}</label>
      <div className="relative">
        <input 
          className="w-full bg-neutral-950 border border-white/10 py-3 px-4 focus:outline-none focus:border-white transition-colors text-sm placeholder:text-neutral-700"
          {...props}
        />
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
