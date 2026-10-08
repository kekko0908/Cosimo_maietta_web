import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, User as UserIcon, LogOut, Package, History, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, toggleCart, showNotification } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleUserClick = () => {
    if (isAuthenticated) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 text-white transition-all duration-300",
          isScrolled ? "bg-black/80 backdrop-blur-md py-4" : ""
        )}
      >
        <Link 
          to="/" 
          className={cn(
            "text-xl font-serif tracking-widest font-bold uppercase",
            !isScrolled && "mix-blend-difference"
          )}
        >
          L'Arte Viva
        </Link>

        <nav className={cn(
          "hidden md:flex items-center space-x-12 font-sans text-sm tracking-widest uppercase",
          !isScrolled && "mix-blend-difference"
        )}>
          <Link to="/" className="hover:opacity-70 transition-opacity">Galleria</Link>
          <Link to="/artisti" className="hover:opacity-70 transition-opacity">Artisti</Link>
          <Link to="/mostre" className="hover:opacity-70 transition-opacity">Mostre</Link>
          <Link to="/manifesto" className="hover:opacity-70 transition-opacity">Chi Siamo</Link>
        </nav>

        <div className="flex items-center space-x-6">
          <Link 
            to="/ordini" 
            className={cn("hover:opacity-70 transition-opacity", !isScrolled && "mix-blend-difference")} 
            title="Storico Ordini"
          >
            <History size={20} />
          </Link>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={handleUserClick}
              className={cn(
                "hover:opacity-70 transition-opacity flex items-center gap-2",
                !isScrolled && "mix-blend-difference"
              )}
            >
              {isAuthenticated && user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover border border-white/20" />
              ) : (
                <UserIcon size={20} />
              )}
            </button>

            <AnimatePresence>
              {isUserMenuOpen && isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-56 bg-neutral-900 border border-white/10 rounded-xl shadow-xl overflow-hidden py-2"
                >
                  <div className="px-4 py-3 border-b border-white/5 mb-2">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                  </div>
                  
                  <Link 
                    to="/ordini" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package size={16} />
                    I Miei Ordini
                  </Link>

                  <Link 
                    to="/impostazioni" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings size={16} />
                    Impostazioni
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Esci
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="relative">
            <button 
              onClick={toggleCart} 
              className={cn(
                "hover:opacity-70 transition-opacity relative block",
                !isScrolled && "mix-blend-difference"
              )}
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  exit={{ opacity: 0, y: 10, x: '-50%' }}
                  className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black text-[10px] font-sans uppercase tracking-widest px-3 py-1 pointer-events-none"
                >
                  Aggiunto
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            className={cn("md:hidden hover:opacity-70 transition-opacity", !isScrolled && "mix-blend-difference")}
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
