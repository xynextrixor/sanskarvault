import { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Terminal, 
  Code2, 
  Layers, 
  Settings, 
  Play, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layout,
  Palette,
  Laptop
} from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';

interface Topic {
  name: string;
  completed: boolean;
  description: string;
}

interface Category {
  id: string;
  title: string;
  icon: any;
  iconColor: string;
  bgColor: string;
  topics: Topic[];
}

export default function HtmlCssProgram({ onNavigate }: { onNavigate: (route: string) => void }) {
  // Track selected category
  const [activeCategory, setActiveCategory] = useState<string>('html-basics');
  
  // Track completion states of items dynamically under localStorage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('html_css_program_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const categories: Category[] = [
    {
      id: 'html-basics',
      title: '🌐 HTML Basics',
      icon: BookOpen,
      iconColor: 'text-orange-500 dark:text-orange-400',
      bgColor: 'bg-orange-550/10 dark:bg-orange-550/5',
      topics: [
        { name: 'Introduction to HTML', completed: false, description: 'Learn standard markup concepts, elements, attributes, and browser interpretation rules.' },
        { name: 'HTML Structure', completed: false, description: 'Declare robust standard templates using html, head, title, body, and meta headers.' },
        { name: 'Headings & Paragraphs', completed: false, description: 'Formulate textual hierarchy using standard h1-h6 tags, p paragraphs, and inline blocks.' },
        { name: 'Links & Images', completed: false, description: 'Hyperlink navigation resources with anchor attributes and implement customizable image displays.' },
        { name: 'Lists', completed: false, description: 'Create organized ordered lists, unordered dots, and nested description term maps.' },
        { name: 'Tables', completed: false, description: 'Arrange structural grids using tables, table rows, headers, cells, thread, and body tags.' },
        { name: 'Forms', completed: false, description: 'Implement interactive input controls, forms, selects, labels, textareas, and action buttons.' },
        { name: 'Semantic Tags', completed: false, description: 'Utilize robust, clean semantic markup including header, nav, article, section, footer.' },
        { name: 'SEO Basics', completed: false, description: 'Configure keyword indexing tags, description metadata, alt flags, and open graph titles.' },
      ]
    },
    {
      id: 'css-basics',
      title: '🎨 CSS Basics',
      icon: Palette,
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-550/10 dark:bg-blue-550/5',
      topics: [
        { name: 'Introduction to CSS', completed: false, description: 'Link custom style sheets, declare rulesets, use class and id selectors, and understand cascades.' },
        { name: 'Colors & Backgrounds', completed: false, description: 'Modify background patterns, apply HEX, RGB, HSL colors, and implement stylish gradients.' },
        { name: 'Fonts & Typography', completed: false, description: 'Configure text weights, adjust sizes with rem/em units, and import elegant web Google Fonts.' },
        { name: 'Borders & Shadows', completed: false, description: 'Format borders, round outer corners, and append elegant realistic shadows to card wrappers.' },
        { name: 'Margin & Padding', completed: false, description: 'Understand standard spacing principles, clear outer bounds, and configure inside offsets.' },
        { name: 'Display & Position', completed: false, description: 'Toggle blocks, inline blocks, absolute, relative, fixed, and sticky positions safely.' },
        { name: 'Units & Measurements', completed: false, description: 'Master relative values (rem, em, vh, vw, %) versus absolute pixel guidelines.' },
      ]
    },
    {
      id: 'layouts',
      title: '📦 Layouts',
      icon: Layout,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-550/10 dark:bg-emerald-550/5',
      topics: [
        { name: 'Flexbox', completed: false, description: 'Align variables, justify spaces, configure wraps, directions, and shrink layouts inline.' },
        { name: 'CSS Grid', completed: false, description: 'Create powerful, complex column designs, define templates, gap values, and span grid cells.' },
        { name: 'Responsive Design', completed: false, description: 'Build adaptive interfaces using flexible grids, fluid viewports, and mobile-first logic.' },
        { name: 'Media Queries', completed: false, description: 'Inject specific breakpoint style criteria to optimize tablet or smartphone views.' },
        { name: 'Navbar Design', completed: false, description: 'Style sticky, space-between headers, collapse options, and map interactive links.' },
        { name: 'Card Layouts', completed: false, description: 'Implement clean bento grids, balanced spacing, and realistic border trims on boxes.' },
      ]
    },
    {
      id: 'modern-ui',
      title: '✨ Modern UI',
      icon: Sparkles,
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-550/10 dark:bg-purple-550/5',
      topics: [
        { name: 'Animations', completed: false, description: 'Author custom @keyframes timelines, configure loops, and trigger elegant entrance offsets.' },
        { name: 'Transitions', completed: false, description: 'Smoothly slide and scale items upon interaction using ease timing curves.' },
        { name: 'Hover Effects', completed: false, description: 'Design delightful feedback animations, subtle zoom effects, and overlay state shifts.' },
        { name: 'Glassmorphism', completed: false, description: 'Engineer frosted glass containers using backdrop-blur, raw overlays, and highlight borders.' },
        { name: 'Dark Mode', completed: false, description: 'Define dual-color states, support prefers-color-scheme, and toggle themes.' },
        { name: 'Landing Pages', completed: false, description: 'Unify typography, heroic call-to-actions, and clear layouts to maximize conversion.' },
      ]
    },
    {
      id: 'advanced-css',
      title: '🚀 Advanced CSS',
      icon: Settings,
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-550/10 dark:bg-indigo-550/5',
      topics: [
        { name: 'CSS Variables', completed: false, description: 'Declare global root variables to modify color schemes dynamically across sheets.' },
        { name: 'Custom Scrollbars', completed: false, description: 'Override default native page scrolls using custom track and thumb styles.' },
        { name: 'CSS Functions', completed: false, description: 'Leverage dynamic functional logic using modern calc(), min(), max(), and clamp() formulas.' },
        { name: 'Pseudo Classes', completed: false, description: 'Address dynamic state rules such as hover, active, focus, nth-child, and not selectors.' },
        { name: 'Pseudo Elements', completed: false, description: 'Inject secondary decorative contents using before and after element flags.' },
        { name: 'Tailwind CSS Basics', completed: false, description: 'Learn class compile techniques, utility combinations, and theme configurations.' },
      ]
    },
    {
      id: 'projects',
      title: '💻 Projects',
      icon: Laptop,
      iconColor: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-550/10 dark:bg-rose-550/5',
      topics: [
        { name: 'Portfolio Website', completed: false, description: 'Build a gorgeous responsive portfolio showing skills, projects, and contact forms.' },
        { name: 'Landing Page', completed: false, description: 'Write a high-intensity product sales page featuring price schedules and testimonials.' },
        { name: 'Dashboard UI', completed: false, description: 'Implement bento grid metrics, dynamic analytics structures, sidebars, and statistics panels.' },
        { name: 'Login Page', completed: false, description: 'Code a symmetric, stunning login card with interactive labels and floating indicators.' },
        { name: 'Responsive Website', completed: false, description: 'Compose an entire news portal completely configured for desktop, tablet, and mobile.' },
        { name: 'Clone Projects', completed: false, description: 'Replicate famous interfaces (Netflix, Spotify, or GitHub layouts) to harden structural rules.' },
      ]
    }
  ];

  // Save progress changes
  const toggleTopic = (topicName: string) => {
    const updated = {
      ...completedTopics,
      [topicName]: !completedTopics[topicName]
    };
    setCompletedTopics(updated);
    localStorage.setItem('html_css_program_progress', JSON.stringify(updated));
  };

  // Keep track of completion percentages
  const totalTopics = categories.reduce((sum, cat) => sum + cat.topics.length, 0);
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background text-on-surface overflow-hidden relative font-sans">
      <SEO 
        title="HTML & CSS Design Roadmap" 
        description="Comprehensive interactive HTML & CSS curriculum roadmap with full topics, custom progress checklists, responsive grid models, and visual YouTube courses." 
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        
        {/* LEFT COLUMN: Categories & Progress - Scrollable */}
        <div className="w-full md:w-80 border-r border-outline-variant/30 bg-surface-container-lowest flex flex-col h-1/2 md:h-full shrink-0">
          
          {/* Header block with back controls */}
          <div className="p-4 border-b border-outline-variant/30">
            <button 
              onClick={() => onNavigate('courseinfo')}
              className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </button>
            <h1 className="font-display font-black text-xl text-on-surface tracking-tight uppercase">
              HTML & CSS
            </h1>
            <p className="text-xs text-on-surface-variant/70 leading-relaxed mb-4">
              Step-by-step UI Design & Responsive Roadmap
            </p>

            {/* Progress Bar widget */}
            <div className="bg-primary/5 dark:bg-white/5 p-3 rounded-xl border border-primary/10">
              <div className="flex justify-between text-xs font-bold mb-1.5 font-mono text-primary dark:text-white">
                <span>Overall Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-on-surface-variant/15 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-on-surface-variant/60 font-medium mt-1 text-right">
                {completedCount} of {totalTopics} topics mastered
              </div>
            </div>
          </div>

          {/* Scrollable list of Categories */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const catCompletedCount = cat.topics.filter(t => completedTopics[t.name]).length;
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl transition-all duration-200 border flex items-center justify-between group relative cursor-pointer",
                    isSelected 
                      ? "bg-primary text-white border-transparent shadow-sm" 
                      : "bg-transparent text-on-surface border-transparent hover:bg-primary/5 dark:hover:bg-white/5 hover:border-outline-variant/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors",
                      isSelected 
                        ? "bg-white/20 border-white/10" 
                        : cn(cat.bgColor, "border-transparent")
                    )}>
                      <CatIcon className={cn("w-4 h-4", isSelected ? "text-white" : cat.iconColor)} />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-xs sm:text-sm tracking-tight leading-snug">
                        {cat.title.replace(/^[^a-zA-Z]*/, '')}
                      </div>
                      <div className={cn(
                        "text-[10px] font-mono",
                        isSelected ? "text-white/70" : "text-on-surface-variant/50"
                      )}>
                        {catCompletedCount} / {cat.topics.length} Done
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform",
                    isSelected ? "text-white rotate-90" : "text-on-surface-variant/40 group-hover:translate-x-0.5"
                  )} />
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Category Content & Recommended Course Videos - Scrollable */}
        <div className="flex-1 flex flex-col h-1/2 md:h-full overflow-y-auto bg-background">
          <div className="p-4 sm:p-6 max-w-4xl w-full mx-auto space-y-6">
            
            {/* Header section describing currently selected category */}
            {categories.map((cat) => {
              if (cat.id !== activeCategory) return null;
              const CatIcon = cat.icon;

              return (
                <div key={cat.id} className="bg-surface border border-outline-variant/20 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <CatIcon className="w-24 h-24 text-on-surface" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{cat.title.split(' ')[0]}</span>
                    <h2 className="font-display font-bold text-lg sm:text-xl text-on-surface tracking-tight uppercase">
                      {cat.title.substring(2)}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-xl font-sans">
                    Complete this learning path module by testing your concepts and checking off completed sections.
                  </p>
                </div>
              );
            })}

            {/* List of subtopics with custom checkbox tracking */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold text-on-surface-variant/70 tracking-widest uppercase mb-2 px-1">
                Curriculum Topic Roadmap
              </h3>
              
              <div className="grid gap-2.5">
                {categories.find(c => c.id === activeCategory)?.topics.map((topic, idx) => {
                  const isDone = !!completedTopics[topic.name];
                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleTopic(topic.name)}
                      className={cn(
                        "p-3 sm:p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer group select-none",
                        isDone 
                          ? "bg-primary/5 dark:bg-white/5 border-primary/20 dark:border-white/20" 
                          : "bg-surface border-outline-variant/25 hover:border-primary/40 dark:hover:border-white/40 shadow-sm"
                      )}
                    >
                      <button className="mt-0.5 shrink-0 focus:outline-none">
                        <CheckCircle2 className={cn(
                          "w-5 h-5 transition-all duration-200",
                          isDone 
                            ? "text-primary scale-110 drop-shadow-sm fill-primary/10" 
                            : "text-on-surface-variant/30 group-hover:text-primary/50"
                        )} />
                      </button>
                      <div className="space-y-0.5">
                        <h4 className={cn(
                          "font-sans font-semibold text-xs sm:text-sm tracking-tight leading-snug",
                          isDone ? "text-on-surface-variant line-through opacity-80" : "text-on-surface text-primary-hover"
                        )}>
                          {topic.name}
                        </h4>
                        <p className={cn(
                          "text-[10px] sm:text-xs leading-relaxed font-sans",
                          isDone ? "text-on-surface-variant/50 line-through" : "text-on-surface-variant/70"
                        )}>
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RECOMMENDED VIDEOS & LEARNING CHANNELS (Hindi and English sections) */}
            <div className="border border-primary/20 bg-primary/5 dark:bg-zinc-950 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-widest font-mono mb-2">
                  🎥 Recommended Resources
                </div>
                <h3 className="font-display font-black text-base sm:text-lg text-on-surface tracking-tight uppercase leading-snug">
                  Premium Learning Playlists Included
                </h3>
                <p className="text-[11px] sm:text-xs text-on-surface-variant/80 font-sans max-w-xl">
                  Select and launch step-by-step masterclasses spanning semantic structures to complex design framework integrations.
                </p>
              </div>

              {/* HINDI RESOURCES */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[10px] font-bold tracking-widest text-[#e65100] dark:text-[#ffb74d] uppercase flex items-center gap-1.5">
                  🇮🇳 Hindi Resources
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <a 
                    href="https://www.youtube.com/watch?v=BsDoLVMnmZs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Full Course
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        CodeWithHarry (Hindi)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        High level walkthrough covering pages layout, styles, containers and properties systematically.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      PLAY COURSE <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@ThapaTechnical" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Full Playlist
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Thapa Technical (Hindi)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Master CSS grids, animations, Flexbox details, and elegant responsive web layouts.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      WATCH PLAYLIST <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@ApnaCollegeOfficial" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          One Shot Videos
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Apna College (Hindi)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Modern video classes outlining semantic HTML tags, styling properties, selectors, and variables.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@HiteshCodeLab" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Advanced Modern CSS
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Hitesh Choudhary (Hindi)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Tailwind styling combinations, premium responsive landing pages, and component styling models.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>
                </div>
              </div>

              {/* ENGLISH RESOURCES */}
              <div className="space-y-2.5 pt-1">
                <h4 className="font-mono text-[10px] font-bold tracking-widest text-[#0d47a1] dark:text-[#90caf9] uppercase flex items-center gap-1.5">
                  🇺🇸 English Resources
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <a 
                    href="https://www.youtube.com/watch?v=G3e-cpL7ofc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Premium Course
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        freeCodeCamp (English)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Excellent step-by-step masterclass covering box bounds, grids, flex directions, variables, and fully responsive code templates.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      PLAY COURSE <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@SuperSimpleDev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Clean Explanations
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        SuperSimpleDev
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        High intensity visually engaging walkthroughs describing precise margin offsets, border grids, and text layouts.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@TraversyMedia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Practical Projects
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Traversy Media
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Build modern multi-column landing pages, responsive portal menus, and deploy clean layouts.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@KevinPowell" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          CSS Specialist
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Kevin Powell
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Gold standard depth on complex layout configurations, modern clamp calculations, custom animations and scroll behaviors.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
