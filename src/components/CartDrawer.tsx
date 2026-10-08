import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-neutral-900 border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <h2 className="font-serif text-2xl italic text-white">Il Tuo Carrello</h2>
              <button onClick={toggleCart} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
                  <p className="font-sans text-sm uppercase tracking-widest">Il carrello è vuoto</p>
                  <button onClick={toggleCart} className="text-white underline underline-offset-4 hover:text-white/80">
                    Torna alla galleria
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-white/5 p-4 rounded-lg"
                  >
                    <img src={item.image} alt={item.title} className="w-20 h-24 object-cover bg-neutral-800" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-white">{item.title}</h3>
                        <p className="text-xs text-white/60 font-sans uppercase tracking-wider">{item.artist}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-sm text-white">€{item.price}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-neutral-900">
                <div className="flex justify-between items-center mb-6 text-white">
                  <span className="font-sans text-sm uppercase tracking-widest">Totale</span>
                  <span className="font-mono text-xl">€{total}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-white text-black py-4 font-sans text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group"
                >
                  Procedi al Checkout
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
