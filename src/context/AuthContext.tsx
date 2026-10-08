import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (provider: 'google' | 'instagram' | 'email', data?: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (provider: 'google' | 'instagram' | 'email', data?: any) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        let newUser: User;
        
        if (provider === 'google') {
          newUser = {
            id: 'g_12345',
            name: 'Mario Rossi',
            email: 'mario.rossi@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'
          };
        } else if (provider === 'instagram') {
          newUser = {
            id: 'i_67890',
            name: 'Mario Artista',
            email: 'mario@instagram.com',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop'
          };
        } else {
          newUser = {
            id: 'e_54321',
            name: data?.name || 'Utente',
            email: data?.email || 'user@example.com',
          };
        }

        setUser(newUser);
        localStorage.setItem('user_session', JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
    // Optional: Clear orders or keep them? Usually keep them in local storage for demo, 
    // but in real app they'd be fetched from server.
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
