import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import { pullFromSupabase } from '../lib/sync';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const timeoutPromise = new Promise<{ data: { session: Session | null }, error: null }>((resolve) => {
          setTimeout(() => resolve({ data: { session: null }, error: null }), 4000)
        });

        const sessionTask = supabase.auth.getSession();
        sessionTask.catch(() => {}); // prevent unhandled rejection map 

        const result = await Promise.race([
          sessionTask,
          timeoutPromise
        ]);

        const session = result.data.session;
        
        setIsAuthenticated(!!session);
        setUser(session?.user ?? null);

        if (session?.user) {
           // Run in background to prevent blocking the UI
           pullFromSupabase().then(pulled => {
             if (pulled) window.dispatchEvent(new Event('storage'));
           }).catch(console.error);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsAuthenticated(!!session);
        setUser(session?.user ?? null);
        if (_event === 'SIGNED_IN' && session?.user) {
          pullFromSupabase().then(pulled => {
            if (pulled) window.dispatchEvent(new Event('storage'));
          }).catch(console.error);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email?: string, password?: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    
    pullFromSupabase().then(pulled => {
      if (pulled) window.dispatchEvent(new Event('storage'));
    }).catch(console.error);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      // Clear specific user data from local storage on logout to prevent other users from seeing it
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
            key.startsWith('bookmarks_') ||
            key.endsWith('_program_progress') ||
            key === 'watchLaterNews' ||
            key === 'savedProblems' ||
            key.startsWith('userSettings_') ||
            key === 'appData_lastUpdated'
        )) {
            keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => {
          // Avoid triggering sync logic on logout:
          const originalSetItem = Object.getPrototypeOf(localStorage).removeItem;
          originalSetItem.call(localStorage, k);
      });
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
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
