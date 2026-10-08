import { motion, AnimatePresence } from 'motion/react';
import { useOrders } from '../context/OrderContext';
import { PageReveal } from './PageTransition';
import { Package, Calendar, ChevronDown, ChevronUp, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 px-8 pb-32">
      <PageReveal />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif mb-12">Storico Ordini</h1>

        {orders.length === 0 ? (
          <div className="text-center py-32 border border-white/10 rounded-xl bg-neutral-900">
            <Package className="w-16 h-16 mx-auto text-neutral-600 mb-6" />
            <h2 className="text-2xl font-serif mb-4">Nessun ordine effettuato</h2>
            <p className="text-neutral-400 mb-8">Non hai ancora acquistato nessuna opera.</p>
            <Link to="/" className="inline-block bg-white text-black px-8 py-4 font-sans text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
              Inizia a esplorare
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              // @ts-ignore
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden"
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex gap-6 items-center">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
            <Package className="text-white/60" size={24} />
          </div>
          <div>
            <p className="font-sans text-xs text-neutral-500 uppercase tracking-widest mb-1">Ordine #{order.id}</p>
            <div className="flex items-center gap-4 text-sm text-neutral-300">
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {new Date(order.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="w-1 h-1 bg-neutral-600 rounded-full" />
              <span className="flex items-center gap-2">
                <CreditCard size={14} />
                {order.paymentMethod === 'card' ? 'Carta di Credito' : 'PayPal'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
          <div className="text-right">
            <p className="font-sans text-xs text-neutral-500 uppercase tracking-widest mb-1">Totale</p>
            <p className="font-mono text-xl">€{order.total}</p>
          </div>
          <button className="text-white/40 hover:text-white transition-colors">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-black/20"
          >
            <div className="p-6 md:p-8 space-y-6">
              <h3 className="font-serif text-lg italic text-neutral-400">Dettaglio Articoli</h3>
              <div className="grid gap-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-lg">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover bg-neutral-800 rounded" />
                    <div className="flex-1">
                      <h4 className="font-serif text-lg">{item.title}</h4>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider">{item.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-neutral-500 uppercase mb-1">Qtà: {item.quantity}</p>
                      <p className="font-mono">€{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button className="text-xs font-sans uppercase tracking-widest text-white/60 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-all">
                  Scarica Fattura
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
