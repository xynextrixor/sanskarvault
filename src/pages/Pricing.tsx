import { motion } from 'motion/react';
import { BarChart3 } from 'lucide-react';
import SEO from '../components/SEO';

interface PricingProps {
  onNavigate: (route: string) => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <SEO 
        title="Pricing Plans" 
        description="View translucent and flexible pricing structures. Unlock unlimited BTech previous year papers, high-quality notes, and smart AI study resources."
        keywords="SanskarVault pricing, BTech notes package, premium study materials, university PYQ package"
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-display font-bold text-4xl mb-4 text-on-surface">Pricing</h1>
        <p className="text-on-surface-variant mb-8">Transparent and simple plans for everyone.</p>
        <button 
          onClick={() => onNavigate('home')}
          className="px-6 py-2 border border-outline rounded-lg text-sm uppercase tracking-widest font-semibold hover:bg-surface-container transition-colors"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
