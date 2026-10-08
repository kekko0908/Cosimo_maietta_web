import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { PageReveal } from './PageTransition';
import { useAuth } from '../context/AuthContext';
import { Lock, Save, User, Shield, Bell } from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('security');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Le nuove password non coincidono.' });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'La password deve essere di almeno 8 caratteri.' });
      return;
    }
    
    // Mock API call
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Password aggiornata con successo.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  if (!user) {
    return <div className="min-h-screen pt-32 text-center">Accesso richiesto.</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 px-8 pb-32">
      <PageReveal />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif mb-12">Impostazioni</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-6 py-4 flex items-center gap-4 transition-colors ${activeTab === 'profile' ? 'bg-white text-black' : 'hover:bg-white/5 text-neutral-400 hover:text-white'}`}
            >
              <User size={18} />
              <span className="font-sans text-xs uppercase tracking-widest">Profilo</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-6 py-4 flex items-center gap-4 transition-colors ${activeTab === 'security' ? 'bg-white text-black' : 'hover:bg-white/5 text-neutral-400 hover:text-white'}`}
            >
              <Shield size={18} />
              <span className="font-sans text-xs uppercase tracking-widest">Sicurezza</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-6 py-4 flex items-center gap-4 transition-colors ${activeTab === 'notifications' ? 'bg-white text-black' : 'hover:bg-white/5 text-neutral-400 hover:text-white'}`}
            >
              <Bell size={18} />
              <span className="font-sans text-xs uppercase tracking-widest">Notifiche</span>
            </button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-neutral-900 border border-white/10 p-8 md:p-12"
            >
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-serif mb-8 flex items-center gap-4">
                    <Lock className="text-white/60" />
                    Modifica Password
                  </h2>

                  {message && (
                    <div className={`p-4 mb-8 text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {message.text}
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Password Attuale</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 focus:outline-none focus:border-white transition-colors text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Nuova Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 focus:outline-none focus:border-white transition-colors text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Conferma Nuova Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 focus:outline-none focus:border-white transition-colors text-white"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-8 bg-white text-black px-8 py-3 font-sans text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-2"
                    >
                      <Save size={16} />
                      Aggiorna Password
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-serif mb-8 flex items-center gap-4">
                    <User className="text-white/60" />
                    Profilo Utente
                  </h2>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-white/20">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xl font-serif">{user.name}</p>
                      <p className="text-neutral-500">{user.email}</p>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-sm">La modifica del profilo non è disponibile in questa demo.</p>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-serif mb-8 flex items-center gap-4">
                    <Bell className="text-white/60" />
                    Preferenze Notifiche
                  </h2>
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 p-4 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-white bg-transparent" />
                      <div>
                        <p className="font-sans text-sm">Nuove Mostre</p>
                        <p className="text-xs text-neutral-500">Ricevi aggiornamenti sulle nuove esposizioni.</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-4 p-4 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-white bg-transparent" />
                      <div>
                        <p className="font-sans text-sm">Nuove Opere</p>
                        <p className="text-xs text-neutral-500">Notifiche quando i tuoi artisti preferiti pubblicano nuove opere.</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
