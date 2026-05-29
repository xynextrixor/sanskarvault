import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export function PWABadge() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If the app is already installed, hide the prompt
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[350px] z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-surface border border-outline/20 p-4 rounded-xl shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
            <Download size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Install App</h3>
            <p className="text-xs text-on-surface-variant">Add to home screen for quick access</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowPrompt(false)}
            className="px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-surface-variant/50 rounded-md transition-colors"
          >
            Later
          </button>
          <button 
            onClick={handleInstallClick}
            className="px-3 py-1.5 text-xs font-medium bg-primary text-white hover:bg-primary-container rounded-md transition-colors"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
