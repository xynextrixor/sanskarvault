import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, User, Eye, EyeOff, Sparkles, GraduationCap, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import CustomLogo from '../components/CustomLogo';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: import('react').FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('TIMEOUT_ERROR')), 15000)
    );
    
    try {
      if (isSignUp) {
        const { data, error } = await Promise.race([
          supabase.auth.signUp({ 
            email, 
            password,
            options: {
              data: {
                full_name: name,
              }
            }
          }),
          timeoutPromise
        ]) as { data: any, error: any };
        
        if (error) throw error;
        
        if (data.user) {
          await supabase.from('profiles').insert([
            { id: data.user.id, name, email }
          ]);
        }
        
        if (data.session) {
          setSuccessMsg('Registration successful! Logging you in...');
          navigate('/');
        } else {
          setSuccessMsg('Verification link sent! Check your inbox/spam folder. (If it does not arrive, go to Supabase Dashboard -> Auth -> Providers -> Email, and disable "Confirm email".)');
        }
      } else {
        await Promise.race([
          login(email, password),
          timeoutPromise
        ]);
        navigate('/');
      }
    } catch (err: any) {
      if (err.message === 'TIMEOUT_ERROR') {
        setError('Request timed out. If you recently entered dummy values in Supabase SMTP settings, the server is stuck trying to send an email. Please turn off "Confirm email" or fix the SMTP host to fix the login process.');
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      console.error('OAuth error caught:', err);
      if (err.message?.includes('provider is not enabled') || err.message?.includes('Unsupported provider') || (err.msg && err.msg.includes('provider is not enabled'))) {
        setError('Google Provider is not enabled in your Supabase backend dashboard yet. Please enable Google in your Supabase Auth Providers console.');
      } else {
        setError(err.message || 'Google Auth failed. Please ensure the provider is configured.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface-container-lowest font-sans relative overflow-hidden">
      <SEO 
        title={isSignUp ? "Create Account & Sign Up" : "Secure Gate - Sign In"} 
        description="Access SanskarVault to download previous year papers, unlock AI-powered notes, and manage your university study progress organized in one secure dashboard."
      />

      {/* Decorative background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Left Pane - Educational Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-container-low border-r border-outline-variant/30 flex-col justify-between p-16 relative overflow-hidden">
        {/* Subtle geometric pattern layer */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary-dim">
            <CustomLogo className="w-6 h-6" />
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-wider text-on-surface">SANSKAR</span>
            <span className="font-display font-light text-xl tracking-wider text-primary">VAULT</span>
          </div>
        </div>

        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Study Portal
            </span>
            <h2 className="text-4xl font-display font-bold text-on-surface tracking-tight leading-tight">
              Unleash the full potential of your academic journey.
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed font-serif italic">
              Access previous year papers, AI-curated interactive notes, custom coding problems, and personalized progress tracking.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-outline-variant/30">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white border border-outline-variant/30 rounded-xl shadow-sm text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-sm">Verified PYQ Vault</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Explore BTech previous year question papers mapped directly by subject and semester.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white border border-outline-variant/30 rounded-xl shadow-sm text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-sm">Smart AI Study Notes</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Generate customized study materials dynamically tailored using modern curriculum formats.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white border border-outline-variant/30 rounded-xl shadow-sm text-primary">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-sm">Real-time Progress Tracker</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Follow and manage learning updates, syllabus checkpoints, and bookmark important files instantly.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-on-surface-variant flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" />
          <span>Secured with Industry-Standard Metadata Encryption</span>
        </div>
      </div>

      {/* Right Pane - Interactive Form (Visible on all sizes) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <motion.div 
          layout
          className="w-full max-w-[440px] bg-white md:bg-white border-0 md:border border-outline-variant/30 md:rounded-3xl p-4 md:p-10 md:shadow-2xl md:shadow-surface-container-high flex flex-col"
        >
          {/* Logo on Mobile Only */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
              <CustomLogo className="w-5.5 h-5.5 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-wider text-on-surface">SANSKAR</span>
              <span className="font-display font-light text-lg tracking-wider text-primary">VAULT</span>
            </div>
          </div>

          <div className="text-center md:text-left mb-8">
            <motion.h1 
              key={isSignUp ? "signup-title" : "signin-title"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-2xl md:text-3xl text-on-surface tracking-tight"
            >
              {isSignUp ? "Join SanskarVault" : "Welcome Back"}
            </motion.h1>
            <motion.p 
              key={isSignUp ? "signup-sub" : "signin-sub"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-on-surface-variant text-sm mt-2"
            >
              {isSignUp ? "Secure your lifetime vault access." : "Enter your gate credentials to sign in."}
            </motion.p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-600 text-xs rounded-xl p-3 font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-2 rounded-full bg-red-600 shrink-0" />
                  {error}
                </motion.div>
              )}

              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-700 text-xs rounded-xl p-3.5 font-medium flex gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3.5">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/70">
                    <User className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name" 
                    required={isSignUp}
                    autoComplete="name"
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl pl-10 pr-4 py-3 text-sm text-on-surface focus:outline-none transition-all"
                  />
                </motion.div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/70">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" 
                  required
                  autoComplete="email"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl pl-10 pr-4 py-3 text-sm text-on-surface focus:outline-none transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/70">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  required
                  autoComplete="current-password"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl pl-10 pr-10 py-3 text-sm text-on-surface focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant/70 hover:text-on-surface focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 px-4 rounded-xl font-semibold uppercase tracking-widest text-xs hover:bg-primary-container hover:shadow-lg focus:ring-2 focus:ring-primary/50 transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Authenticate Gate'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Google sign-in disabled until enabled in Supabase
            <div className="relative my-5 flex items-center justify-center">
              <div className="absolute inset-x-0 h-px bg-outline-variant/30" />
              <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-on-surface-variant font-medium">Or continue with</span>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border border-outline-variant/60 hover:bg-surface-container transition-all text-sm font-semibold py-3 px-4 rounded-xl text-on-surface shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
            */}
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
            <span className="text-sm text-on-surface-variant">
              {isSignUp ? 'Already have a secure key?' : 'New to SanskarVault?'}
            </span>
            <button 
              disabled={loading}
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setSuccessMsg('');
              }}
              className="ml-1.5 font-bold text-primary hover:underline hover:text-primary-container focus:outline-none cursor-pointer"
            >
              {isSignUp ? 'Sign In' : 'Register Now'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
