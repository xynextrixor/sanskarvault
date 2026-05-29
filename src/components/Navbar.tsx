import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import CustomLogo from './CustomLogo';

export { CustomLogo };

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onNavigate = (route: string) => {
    setMobileMenuOpen(false);
    navigate(route === 'home' ? '/' : `/${route}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ease-in-out border-b",
      scrolled 
        ? "bg-primary shadow-md py-2 text-white border-transparent dark:bg-white dark:text-primary dark:border-transparent" 
        : "bg-white py-4 text-primary border-outline-variant/30 dark:bg-background/80 dark:border-outline-variant/30 dark:text-on-surface"
    )}>
      <nav className="flex items-center justify-between px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 sm:gap-3 font-display font-bold text-lg sm:text-xl uppercase tracking-tight cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
            scrolled ? "bg-white/20 dark:bg-primary/10" : "bg-primary/10 dark:bg-transparent"
          )}>
             <CustomLogo className={cn(
                "w-8 h-8 transition-colors duration-300",
                scrolled ? "text-white dark:text-primary" : "text-primary dark:text-primary"
             )} />
          </div>
          <span className="inline-block">
            SanskarVault
          </span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 font-sans text-[13px] uppercase tracking-widest font-medium">
          <span onClick={() => onNavigate('contact')} className={cn(
            "relative cursor-pointer opacity-80 hover:opacity-100 transition-all py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
            scrolled 
              ? "text-white hover:text-white after:bg-white opacity-100 dark:text-primary dark:hover:text-primary dark:after:bg-primary" 
              : "text-primary hover:text-primary/80 after:bg-primary opacity-100 dark:text-on-surface-variant dark:hover:text-primary dark:after:bg-primary"
          )}>Contact</span>
          <span onClick={() => onNavigate('explore')} className={cn(
            "relative cursor-pointer opacity-80 hover:opacity-100 transition-all py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
            scrolled 
              ? "text-white hover:text-white after:bg-white opacity-100 dark:text-primary dark:hover:text-primary dark:after:bg-primary" 
              : "text-primary hover:text-primary/80 after:bg-primary opacity-100 dark:text-on-surface-variant dark:hover:text-primary dark:after:bg-primary"
          )}>Explore Vault</span>
          {isAuthenticated && <span onClick={() => onNavigate('pdfs')} className={cn(
            "relative cursor-pointer opacity-80 hover:opacity-100 transition-all py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
            scrolled 
              ? "text-white hover:text-white after:bg-white opacity-100 dark:text-primary dark:hover:text-primary dark:after:bg-primary" 
              : "text-primary hover:text-primary/80 after:bg-primary opacity-100 dark:text-on-surface-variant dark:hover:text-primary dark:after:bg-primary"
          )}>Bookmarks</span>}
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <button 
              onClick={() => logout()}
              className={cn(
                "text-[13px] uppercase tracking-widest font-medium px-4 py-2 rounded-md transition-all duration-300 opacity-80 hover:opacity-100",
                scrolled 
                  ? "text-white hover:bg-white/10 opacity-100 dark:text-primary dark:hover:bg-primary/10" 
                  : "text-primary hover:bg-primary/5 dark:text-on-surface-variant dark:hover:bg-on-surface/5"
              )}
            >
              Log Out
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('login')}
              className={cn(
                "text-[13px] uppercase tracking-widest font-medium px-4 py-2 rounded-md transition-all duration-300 opacity-80 hover:opacity-100",
                scrolled 
                  ? "text-white hover:bg-white/10 opacity-100 dark:text-primary dark:hover:bg-primary/10" 
                  : "text-primary hover:bg-primary/5 dark:text-on-surface-variant dark:hover:bg-on-surface/5"
              )}
            >
              Log In
            </button>
          )}
          <button 
            onClick={() => onNavigate('explore')} 
            className={cn(
              "px-6 py-2 rounded-md text-[13px] uppercase tracking-widest font-semibold transition-all duration-300 shadow-sm border",
              scrolled 
                ? "border-white text-primary bg-white hover:bg-white/90 dark:border-primary dark:text-white dark:bg-primary dark:hover:bg-primary-container" 
                : "border-primary text-white bg-primary hover:bg-primary-container dark:border-outline dark:text-on-surface dark:hover:border-primary dark:hover:text-primary dark:bg-transparent"
            )}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "p-2 -mr-2 transition-colors",
              scrolled 
                ? "text-white dark:text-primary" 
                : "text-primary dark:text-on-surface"
            )}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={cn(
          "md:hidden absolute top-full left-0 w-full backdrop-blur-xl border-b shadow-lg animate-in fade-in slide-in-from-top-4 duration-200 z-40",
          scrolled
            ? "bg-primary/95 text-white border-white/10 dark:bg-white/95 dark:text-primary dark:border-primary/10"
            : "bg-white/95 text-primary border-primary/10 dark:bg-background/95 dark:text-on-surface dark:border-outline-variant/30"
        )}>
          <div className="flex flex-col px-6 py-4">
             <span onClick={() => onNavigate('contact')} className={cn(
               "py-4 border-b font-sans text-sm uppercase tracking-widest font-medium cursor-pointer",
               scrolled
                 ? "border-white/10 dark:border-primary/10"
                 : "border-primary/10 dark:border-outline-variant/20"
             )}>Contact</span>
             <span onClick={() => onNavigate('explore')} className={cn(
               "py-4 border-b font-sans text-sm uppercase tracking-widest font-medium cursor-pointer",
               scrolled
                 ? "border-white/10 dark:border-primary/10"
                 : "border-primary/10 dark:border-outline-variant/20"
             )}>Explore Vault</span>
            {isAuthenticated && (
               <span onClick={() => onNavigate('pdfs')} className={cn(
                 "py-4 border-b font-sans text-sm uppercase tracking-widest font-medium cursor-pointer",
                 scrolled
                   ? "border-white/10 dark:border-primary/10"
                   : "border-primary/10 dark:border-outline-variant/20"
               )}>Bookmarks</span>
            )}
            
            <div className="flex flex-col gap-3 mt-6 mb-2">
              {isAuthenticated ? (
                <button 
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className={cn(
                    "w-full text-center text-sm uppercase tracking-widest font-medium px-4 py-3 rounded-md transition-colors",
                    scrolled
                      ? "bg-white/10 hover:bg-white/20 text-white dark:bg-primary/10 dark:hover:bg-primary/20 dark:text-primary"
                      : "bg-primary/10 hover:bg-primary/20 text-primary dark:bg-white/10 dark:hover:bg-white/20 dark:text-on-surface"
                  )}
                >
                  Log Out
                </button>
              ) : (
                <button 
                  onClick={() => onNavigate('login')}
                  className={cn(
                    "w-full text-center text-sm uppercase tracking-widest font-medium px-4 py-3 rounded-md transition-colors",
                    scrolled
                      ? "bg-white/10 hover:bg-white/20 text-white dark:bg-primary/10 dark:hover:bg-primary/20 dark:text-primary"
                      : "bg-primary/10 hover:bg-primary/20 text-primary dark:bg-white/10 dark:hover:bg-white/20 dark:text-on-surface"
                  )}
                >
                  Log In
                </button>
              )}
              <button 
                onClick={() => onNavigate('explore')} 
                className={cn(
                  "w-full text-center px-6 py-3 rounded-md text-sm uppercase tracking-widest font-semibold transition-colors",
                  scrolled
                    ? "text-primary bg-white hover:bg-white/90 dark:text-white dark:bg-primary dark:hover:bg-primary-container"
                    : "text-white bg-primary hover:bg-primary-container dark:text-primary dark:bg-white dark:hover:bg-white/90"
                )}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
