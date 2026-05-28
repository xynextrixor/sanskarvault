import { Layers, Search, FileText, Calendar, BookOpen, Clock, BarChart3, Building, Users, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

interface HomeProps {
  onNavigate: (route: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  
  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-64px)]">
      <SEO />

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 sm:py-24">
        <div className="max-w-4xl text-center space-y-12 px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-medium text-5xl tracking-tighter sm:text-[88px] text-on-surface leading-[1.25] sm:leading-[1.1] mb-6"
          >
            Find. Practice.<br className="hidden sm:inline" /> Score <span className="text-primary">Higher.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-xl sm:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-loose mt-8 mb-8"
          >
            A unified solution replacing fragmented tools with a singular, powerful intelligence layer for your entire organization.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 pb-6 relative z-20"
          >
            <button 
              onClick={() => onNavigate('homeinfo')}
              className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-lg text-sm font-semibold uppercase tracking-widest shadow-xl shadow-primary-dim hover:bg-primary-container transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('explore')}
              className="w-full sm:w-auto bg-white border border-outline text-on-surface px-10 py-5 rounded-lg text-sm font-semibold uppercase tracking-widest hover:bg-surface-container transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              Explore Vault
            </button>
          </motion.div>
        </div>
        
        {/* Mock 3D Illustration */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative w-full max-w-4xl px-6 flex justify-center mb-24 z-10"
        >
          <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="w-full max-w-2xl aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-br from-white/60 to-white/30 border border-outline-variant rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-md p-4 group/preview">
             {/* Dynamic background particles/grid lines */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px] pointer-events-none opacity-40" />
             
             {/* Left Card: Curriculum Tracker Card */}
             <div className="w-[58%] h-[82%] sm:h-[78%] bg-white/95 rounded-2xl shadow-xl border border-white/60 absolute left-[6%] top-[8%] sm:top-[10%] transform -rotate-3 transition-transform duration-500 group-hover/preview:-rotate-1 group-hover/preview:translate-y-[-2px] flex flex-col p-3 sm:p-5 text-left select-none overflow-hidden">
                <div className="flex items-center justify-between mb-2 sm:mb-4 border-b border-outline-variant/30 pb-2 sm:pb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400" />
                    <span className="font-mono text-[8px] sm:text-[9px] font-black text-on-surface-variant/60 tracking-wider ml-1 uppercase">SANSKAR VAULT</span>
                  </div>
                  <span className="bg-primary/10 text-primary text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider scale-95 sm:scale-100 origin-right">AKTU / BCA</span>
                </div>
                
                <h3 className="font-display font-black text-[11px] sm:text-base text-on-surface mb-1 sm:mb-2 tracking-tight line-clamp-1">Computer Graphics & Multimedia</h3>
                <div className="space-y-1.5 sm:space-y-2.5 mt-1 sm:mt-2 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-surface-container/40 p-1.5 sm:p-2.5 rounded-lg border border-outline-variant/10">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-primary/40 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-xs font-semibold text-on-surface/90 line-clamp-1">Unit 2: 2D Transformations & Clipping</p>
                      <p className="text-[7px] sm:text-[10px] text-on-surface-variant/60 font-mono tracking-tight">7 files • Notes & MCQ Practice</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-lg hover:bg-surface-container/20 transition-colors">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-outline-variant shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-xs font-medium text-on-surface/70 line-clamp-1">Unit 3: 3D Projection & Hidden Surfaces</p>
                      <p className="text-[7px] sm:text-[10px] text-on-surface-variant/40 font-mono tracking-tight">12 premium notes available</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar info */}
                <div className="mt-auto pt-2 sm:pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                  <div className="flex-1 mr-2 sm:mr-3">
                    <div className="flex justify-between items-center text-[7px] sm:text-[9px] font-bold text-on-surface-variant/80 mb-0.5 sm:mb-1">
                      <span>SEMESTER PROGRESS</span>
                      <span>82%</span>
                    </div>
                    <div className="w-full bg-surface-container h-1 sm:h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: '82%' }} />
                    </div>
                  </div>
                  <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-mono text-[9px] sm:text-xs font-black text-primary">8.6</div>
                </div>
             </div>
             
             {/* Right Card: AI Copilot Recommendations / Live Graph Card */}
             <div className="w-[44%] h-[72%] sm:h-[68%] bg-surface border border-outline-variant/30 rounded-2xl shadow-lg absolute right-[8%] bottom-[8%] sm:bottom-[12%] transform rotate-3 transition-transform duration-500 group-hover/preview:rotate-1 group-hover/preview:translate-y-[-1px] flex flex-col p-2.5 sm:p-4 text-left select-none overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[7px] sm:text-[9px] font-bold text-on-surface-variant/60 tracking-wider">PRACTICE ANALYTICS</span>
                  <span className="bg-green-500/10 text-green-600 font-mono text-[7px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full">+14.2%</span>
                </div>
                
                <h4 className="font-display font-bold text-[9px] sm:text-sm text-on-surface tracking-tight mb-1 sm:mb-2">Weekly Solved Rate</h4>
                
                {/* Embedded SVG Graph Line */}
                <div className="w-full h-10 sm:h-20 bg-surface-container-low rounded-lg p-1 sm:p-2 flex flex-col justify-end relative overflow-hidden group-hover/preview:bg-surface-container-highest transition-colors">
                  <svg className="w-full h-[70%] sm:h-[80%] absolute inset-x-0 bottom-1 text-primary opacity-90" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path
                      d="M0,50 Q15,40 30,30 T60,20 T85,15 T100,5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M0,50 Q15,40 30,30 T60,20 T85,15 T100,5 L100,50 L0,50 Z"
                      fill="url(#goldGradient)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex gap-1 sm:gap-1.5">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary animate-ping" />
                    <span className="font-mono text-[7px] text-primary/80 font-black">LIVE</span>
                  </div>
                  <div className="flex justify-between items-center text-[6px] sm:text-[8px] text-on-surface-variant/40 mt-auto font-mono">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                    <span>Sun</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 mt-2 p-1 sm:p-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                  <span className="text-[9px] sm:text-xs text-yellow-500">🔥</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[7px] sm:text-[9px] font-bold text-on-surface leading-snug">LeetCode: 8 days!</p>
                  </div>
                </div>
             </div>
             
             {/* Floating elements: Lightbulbs & interactive icons */}
             {/* Floating bulb icon */}
             <div className="absolute top-[8%] right-[16%] w-10 sm:w-16 h-10 sm:h-16 bg-yellow-100 rounded-full blur-xl animate-pulse pointer-events-none" />
             <div className="absolute top-[12%] right-[14%] bg-white p-2 sm:p-2.5 rounded-2xl shadow-lg border border-yellow-200/50 transform -rotate-12 translate-x-[-10%] translate-y-[-10%] hover:scale-110 transition-transform cursor-pointer">
               <span className="text-base sm:text-2xl" title="Smart AI Recommendations">💡</span>
             </div>
             
             {/* Floating dynamic checklist item */}
             <div className="absolute bottom-[3%] sm:bottom-[4%] left-[10%] bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-md border border-outline-variant/50 transform rotate-6 flex items-center gap-1.5 select-none hover:scale-105 transition-all">
                <span className="text-green-500 font-bold text-[9px] sm:text-xs">✓</span>
                <span className="font-semibold text-on-surface/90 text-[8px] sm:text-xs">Notes Sync OK</span>
             </div>
          </div>
        </motion.div>

        {/* Section: Academic Tools */}
        <section id="vault-sections" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-outline-variant/30">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-on-surface mb-4">Intelligent Academic Tools</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Bento grid cards with trim unified, elaignant academic icons.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tool Card 1 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-on-surface" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-on-surface">AI Paper Analysis</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Paper analysis results astmetion concur analysiss of AI Paper analysis.</p>
            </div>
            
            {/* Tool Card 2 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-on-surface" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-on-surface">Important Questions</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Genaerate questions to asssess quesciont corretzers important questions.</p>
            </div>
            
            {/* Tool Card 3 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-on-surface" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-on-surface">Generate Notes</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Genaerate notes and hn corerosng oarrant incotment claiss cptions generate notes.</p>
            </div>
            
            {/* Tool Card 4 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-on-surface" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-on-surface">Study Planner</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Study plome a study planner commete study plannning enewbelass and oday tormor.</p>
            </div>
            
             {/* Tool Card 5 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-on-surface" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-on-surface">Study Matter</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Turn conrsne rcaus for the queshos.</p>
            </div>
            
             {/* Tool Card 6 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-on-surface" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-on-surface">AI Semester</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Rovise the containes nursce cuennmbes.</p>
            </div>
            
             {/* Tool Card 7 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-on-surface" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-on-surface">Procaosa Evense</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Gecenhe ongsorooce n aouinand cyuobines sations.</p>
            </div>
            
             {/* Tool Card 8 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg transition-all group lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-on-surface" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-on-surface">Stoatic Fincher</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Cesoociongrunere nesrouce olom camos.</p>
            </div>
          </div>
          
          <div className="w-full flex justify-center mt-12">
            <button onClick={() => onNavigate('explore')} className="bg-transparent border border-outline text-on-surface px-8 py-3.5 rounded-lg uppercase tracking-widest text-sm font-semibold hover:bg-surface-container transition-all duration-300">
              Explore Courses
            </button>
          </div>
        </section>

        {/* Section: All Semesters Covered */}
         <section className="w-full max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-on-surface mb-4">All Semesters Covered</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Papers', desc: 'Access previous year questions and comprehensive research papers.', icon: FileText },
              { title: 'Modules', desc: 'Explore core curriculum subjects and elective course modules.', icon: Layers },
              { title: 'Notes', desc: 'Curated study guides and detailed lecture notes for every class.', icon: BookOpen },
              { title: 'And More', desc: 'Syllabi, practical schedules, assignments, and study planners.', icon: GraduationCap }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-outline-variant flex flex-col justify-center text-center group hover:border-primary transition-colors">
                <div className="mx-auto w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                   <item.icon className="w-8 h-8 text-on-surface group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-on-surface uppercase tracking-tight">{item.title}</h3>
                <p className="font-serif italic text-[13px] text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center mt-10">
            <button onClick={() => onNavigate('explore')} className="bg-transparent border border-outline text-on-surface px-8 py-3.5 rounded-lg uppercase tracking-widest text-sm font-semibold hover:bg-surface-container transition-all duration-300">
              Explore Vault
            </button>
          </div>
         </section>
         
         {/* Stats Row */}
         <section className="w-full max-w-5xl mx-auto px-6 py-12 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              id="stats-card-institutions"
              className="flex flex-col sm:flex-row bg-white dark:bg-black border border-outline-variant/30 hover:border-primary/45 rounded-3xl p-6 sm:p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative z-10 flex-1 flex flex-col justify-between pr-4 items-start text-left">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-mono font-bold tracking-wider uppercase mb-4">
                    Academic Network
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3 text-on-surface tracking-tight">
                    200+ Trusted Colleges
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 max-w-xs font-sans">
                    Access curated engineering, pharmacy, and management curricula sourced securely from leading state universities and autonomous institutions.
                  </p>
                </div>
                <div>
                  <button 
                    onClick={() => onNavigate('explore')} 
                    className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl uppercase tracking-widest text-[11px] font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    Explore Vault
                  </button>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 sm:right-2 sm:bottom-2 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary/5 group-hover:bg-primary/10 border border-primary/5 transition-all duration-500 flex items-center justify-center">
                <Building className="w-14 h-14 sm:w-16 sm:h-16 text-primary/20 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-500" />
              </div>
            </div>
            
            <div 
              id="stats-card-students"
              className="flex flex-col sm:flex-row bg-white dark:bg-black border border-outline-variant/30 hover:border-primary/45 rounded-3xl p-6 sm:p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative z-10 flex-1 flex flex-col justify-between pr-4 items-start text-left">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-mono font-bold tracking-wider uppercase mb-4">
                     Learning Community
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3 text-on-surface tracking-tight">
                    Join 150K+ Peers
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 max-w-xs font-sans">
                     Learn together with an expansive network of students sharing exam guides, active recall quizzes, and custom subject logs.
                  </p>
                </div>
                <div>
                  <button 
                    onClick={() => onNavigate('explore')} 
                    className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl uppercase tracking-widest text-[11px] font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                     Connect Today
                  </button>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 sm:right-2 sm:bottom-2 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary/5 group-hover:bg-primary/10 border border-primary/5 transition-all duration-500 flex items-center justify-center">
                <Users className="w-14 h-14 sm:w-16 sm:h-16 text-primary/20 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-500" />
              </div>
            </div>
         </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low text-on-surface py-16 px-6 relative overflow-hidden border-t border-outline-variant">
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-display font-bold text-xl uppercase tracking-tight mb-6">
              <div className="w-6 h-6 bg-primary rounded-md" />
              SanskarVault
            </div>
            <p className="font-serif italic text-sm text-on-surface-variant leading-relaxed">
              Empowering students with<br/>curated resources, syllabus trackers,<br/>and modern interactive tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest mb-6">Links</h4>
            <ul className="space-y-4 text-[13px] uppercase tracking-widest font-medium text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest mb-6">Newsletter</h4>
            <div className="flex gap-2 mb-4">
              <input 
                type="email" 
                placeholder="Enter your address" 
                className="bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:border-outline placeholder:text-on-surface-variant/50"
              />
              <button className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-widest hover:bg-primary-container transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="font-mono text-[11px] text-on-surface-variant/70">Receive timely syllabus updates and weekly digest bulletins.</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-on-surface-variant relative z-10">
          <p>Copyright © SanskarVault</p>
          <p>Educating India</p>
        </div>
      </footer>
    </div>
  );
}
