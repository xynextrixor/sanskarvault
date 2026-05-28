import { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Terminal, 
  Code2, 
  Layers, 
  Play, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Globe,
  Zap,
  Flame,
  MousePointer,
  Monitor,
  Database,
  Tv
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

export default function WebDevProgram({ onNavigate }: { onNavigate: (route: string) => void }) {
  // Track selected category
  const [activeCategory, setActiveCategory] = useState<string>('html-css-basics');
  
  // Track completion states of items dynamically under localStorage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('webdev_program_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const categories: Category[] = [
    {
      id: 'html-css-basics',
      title: '🌐 HTML & CSS Basics',
      icon: Globe,
      iconColor: 'text-orange-500 dark:text-orange-400',
      bgColor: 'bg-orange-550/10 dark:bg-orange-550/5',
      topics: [
        { name: 'HTML Structure', completed: false, description: 'Understand document types (doctype), metadata tags, headers, paragraphs, and lists.' },
        { name: 'Forms & Inputs', completed: false, description: 'Design accessible forms using labels, text field variants, select listings, radios, and validation triggers.' },
        { name: 'Semantic Tags', completed: false, description: 'Build structure using SEO-safe containers (<header>, <article>, <main>, <footer>) for proper hierarchy.' },
        { name: 'CSS Basics', completed: false, description: 'Master cascaded models, selector variations, priorities weights (specificity), and custom resets.' },
        { name: 'Flexbox', completed: false, description: 'Align child margins dynamically within columns or rows centering spaces instantly.' },
        { name: 'Grid', completed: false, description: 'Organize high-density pages through structured template columns, grid gaps, and relative layout tracks.' },
        { name: 'Responsive Design', completed: false, description: 'Structure design grids with fluid relative units (rem, em, vh, %) adapting seamlessly to device scales.' },
        { name: 'Media Queries', completed: false, description: 'Deploy styled rules matching devices breakpoints across phone, tablet, and desktop bounds.' },
      ]
    },
    {
      id: 'js-basics',
      title: '⚡ JavaScript Basics',
      icon: Zap,
      iconColor: 'text-yellow-500 dark:text-yellow-400',
      bgColor: 'bg-yellow-550/10 dark:bg-yellow-550/5',
      topics: [
        { name: 'Introduction to JavaScript', completed: false, description: 'Configure modern browser engines and execute initial statements inside consoles.' },
        { name: 'Variables', completed: false, description: 'Examine scope identifiers (let, const, var), declarations mechanisms, and temporal deadzone boundaries.' },
        { name: 'Data Types', completed: false, description: 'Format values using primitives (String, Number, Boolean, Symbol, null, undefined) or complex types.' },
        { name: 'Operators', completed: false, description: 'Perform calculations using arithmetic signs, comparison symbols, and logical checks.' },
        { name: 'Conditions', completed: false, description: 'Structure dynamic logical flow using nested if/else statements and switch structures.' },
        { name: 'Loops', completed: false, description: 'Iterate loops repeatedly with for, while, do-while, and elegant array map loops.' },
        { name: 'Functions', completed: false, description: 'Build reusable logic utilizing scopes, arguments, callbacks, and arrow declarations.' },
        { name: 'Arrays', completed: false, description: 'Utilize list index maps, search vectors, and dynamic element shift functions.' },
        { name: 'Objects', completed: false, description: 'Map dynamic key-value dictionaries containing custom functions and embedded tables.' },
        { name: 'ES6 Basics', completed: false, description: 'Leverage modern tools: spread/rest operators, template literals, and property destructuring.' },
      ]
    },
    {
      id: 'advanced-js',
      title: '🧠 Advanced JavaScript',
      icon: Terminal,
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-550/10 dark:bg-purple-550/5',
      topics: [
        { name: 'DOM Manipulation', completed: false, description: 'Select HTML nodes, modify styles, append nested sections, and rewrite classes dynamically.' },
        { name: 'Events', completed: false, description: 'Listen to mouse clicks, key releases, form changes, and control event bubbling or propagation.' },
        { name: 'Async JavaScript', completed: false, description: 'Track processes using callback patterns, execution queues, and microtask loops.' },
        { name: 'Promises', completed: false, description: 'Control async states through Resolve or Reject pathways, catching pipeline errors safely.' },
        { name: 'Async / Await', completed: false, description: 'Write asynchronous logic with synchronous readability using async labels and await constraints.' },
        { name: 'Fetch API', completed: false, description: 'Request external JSON resources dynamically using custom HTTP methods, headers, and params.' },
        { name: 'Local Storage', completed: false, description: 'Persist simple stringified values in the client browser across page reloads.' },
        { name: 'Modules', completed: false, description: 'Deconstruct applications using import and export statements to isolate functions.' },
        { name: 'API Integration', completed: false, description: 'Process external query states, transform responses, and update views on the fly.' },
      ]
    },
    {
      id: 'react-basics',
      title: '⚛️ React Basics',
      icon: Code2,
      iconColor: 'text-cyan-500 dark:text-cyan-400',
      bgColor: 'bg-cyan-555/10 dark:bg-cyan-555/5',
      topics: [
        { name: 'Introduction to React', completed: false, description: 'Explore Vitual DOM concepts, reactive updates, and single-page-application theory.' },
        { name: 'Vite Setup', completed: false, description: 'Scaffold modern modular apps instantly configuring active dev servers and bundlers.' },
        { name: 'Components', completed: false, description: 'Build reusable, modular visual UI blocks with functional syntax.' },
        { name: 'JSX', completed: false, description: 'Express HTML-aligned layout structures directly inside declarative JavaScript modules.' },
        { name: 'Props', completed: false, description: 'Deliver configuring values and variables downstream safely to nested child components.' },
        { name: 'State', completed: false, description: 'Track dynamic interactive component values utilizing the standard useState hooks.' },
        { name: 'useEffect', completed: false, description: 'Synchronize components with external services, tracking specific cleanups and dependency changes.' },
        { name: 'Event Handling', completed: false, description: 'Capture click loops, key strokes, and input modifications safely through React event abstractions.' },
        { name: 'Conditional Rendering', completed: false, description: 'Toggle component displays dynamically based on state values, flags, or inline assertions.' },
      ]
    },
    {
      id: 'advanced-react',
      title: '🚀 Advanced React',
      icon: Layers,
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-550/10 dark:bg-indigo-550/5',
      topics: [
        { name: 'React Router', completed: false, description: 'Manage multi-screen page navigations without full page reloads.' },
        { name: 'Context API', completed: false, description: 'Share global configurations and states across massive component trees without nested prop drilling.' },
        { name: 'Custom Hooks', completed: false, description: 'Encapsulate and reuse complex stateful logic patterns in customized functions.' },
        { name: 'API Fetching', completed: false, description: 'Sync remote database resource pipelines, tracking loading circles and errors.' },
        { name: 'Authentication', completed: false, description: 'Enforce private routes and session state checks to guard sensitive components.' },
        { name: 'Lazy Loading', completed: false, description: 'Lower initial loading times using lazy imports and Suspense fallback states.' },
        { name: 'Dark Mode', completed: false, description: 'Toggle client themes seamlessly using state context and class adjustments on document roots.' },
        { name: 'Protected Routes', completed: false, description: 'Redirect unauthorized visitors away from admin portals or private dashboard zones.' },
        { name: 'Performance Optimization', completed: false, description: 'Avoid unnecessary calculations and re-renders using useMemo, useCallback, and Memo bindings.' },
      ]
    },
    {
      id: 'modern-ui',
      title: '🎨 Modern UI',
      icon: Monitor,
      iconColor: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-550/10 dark:bg-pink-550/5',
      topics: [
        { name: 'Tailwind CSS', completed: false, description: 'Style visually stunning web layouts rapidly using intuitive utilities directly in markup.' },
        { name: 'Animations', completed: false, description: 'Engage visitors using subtle transitions and active state transformations.' },
        { name: 'Framer Motion', completed: false, description: 'Build physics-aligned drag items, spring-based panels, and smooth layout changes.' },
        { name: 'Glassmorphism', completed: false, description: 'Design modern frosted layouts matching ambient backgrounds with blur backdrops.' },
        { name: 'Responsive Navbar', completed: false, description: 'Coordinate responsive header bars that toggle elegant mobile drawer folders on mobile taps.' },
        { name: 'Dashboard UI', completed: false, description: 'Assemble complex bento layouts, stats cards, and interactive navigation elements.' },
        { name: 'Landing Pages', completed: false, description: 'Craft compelling showcase boards with responsive columns, hero banners, and feature reviews.' },
      ]
    },
    {
      id: 'backend',
      title: '🔥 Backend & Database',
      icon: Flame,
      iconColor: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-550/10 dark:bg-rose-550/5',
      topics: [
        { name: 'Firebase Basics', completed: false, description: 'Initialize cloud SDK connections instantly, configuring Firestore and secure rules.' },
        { name: 'Supabase', completed: false, description: 'Integrate realworld relational SQL backends with instant REST APIs and secure Row Level Security.' },
        { name: 'Authentication', completed: false, description: 'Leverage managed email, password, and social Google OAuth login integrations.' },
        { name: 'Database CRUD', completed: false, description: 'Query, insert, update, and delete remote server documents dynamically.' },
        { name: 'Storage Uploads', completed: false, description: 'Upload, serve, and secure static media, documents, and profile avatars.' },
        { name: 'APIs', completed: false, description: 'Structure custom Express routes to retrieve and process server actions securely.' },
        { name: 'Environment Variables', completed: false, description: 'Protect critical server API secrets and configuration keys away from public clients.' },
      ]
    },
    {
      id: 'projects',
      title: '💻 Projects',
      icon: Award,
      iconColor: 'text-teal-500 dark:text-teal-400',
      bgColor: 'bg-teal-555/10 dark:bg-teal-555/5',
      topics: [
        { name: 'Portfolio Website', completed: false, description: 'Display your creative projects, resume specs, and contact links on a single stylish screen.' },
        { name: 'Landing Page', completed: false, description: 'Deliver products value propositions clearly on responsive layouts with hero animations.' },
        { name: 'Weather App', completed: false, description: 'Connect real-time climate telemetry APIs, displaying beautiful dynamic sunset/wind metrics.' },
        { name: 'Notes App', completed: false, description: 'Draft, search, and save thoughts with local persistent backups on the fly.' },
        { name: 'AI App', completed: false, description: 'Enable conversational context streams using prompt generation schemas and AI models.' },
        { name: 'Dashboard', completed: false, description: 'Display dynamic chart modules, user profiles, and active data logs.' },
        { name: 'E-commerce UI', completed: false, description: 'Assemble filter criteria systems, cart addition summaries, and checkout workflows.' },
        { name: 'Full Stack App', completed: false, description: 'Integrate custom Express backend structures with database tracking and user login checks.' },
      ]
    }
  ];

  // Substitute "Spa" with a valid lucide icon like Layers or Terminal
  const getIconForCategory = (icon: any) => {
    return icon || Layers;
  };

  // Save progress changes
  const toggleTopic = (topicName: string) => {
    const updated = {
      ...completedTopics,
      [topicName]: !completedTopics[topicName]
    };
    setCompletedTopics(updated);
    localStorage.setItem('webdev_program_progress', JSON.stringify(updated));
  };

  // Keep track of completion percentages
  const totalTopics = categories.reduce((sum, cat) => sum + cat.topics.length, 0);
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background text-on-surface overflow-hidden relative font-sans">
      <SEO 
        title="Web Development & React Roadmap" 
        description="Comprehensive interactive JavaScript & React curriculum roadmap with full topics, custom progress checklists, dynamic UI models, and visual courses." 
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
              Web Dev Roadmap
            </h1>
            <p className="text-xs text-on-surface-variant/70 leading-relaxed mb-4">
              Modern JavaScript, React & Full-Stack
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
              const CatIcon = getIconForCategory(cat.icon);
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
              const CatIcon = getIconForCategory(cat.icon);

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
                  Select and launch step-by-step masterclasses spanning semantic DOM layouts, custom dynamic reactive logic, and APIs connectivity.
                </p>
              </div>

              {/* HINDI RESOURCES */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[10px] font-bold tracking-widest text-[#e65100] dark:text-[#ffb74d] uppercase flex items-center gap-1.5">
                  🇮🇳 Hindi Resources
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <a 
                    href="https://www.youtube.com/@HiteshCodeLab" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Web Masterclass
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Hitesh Choudhary
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Excellent practical visual walkthrough courses explaining modern Web Dev structures, tools mechanics, and clean designs.
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
                          React & UI Series
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Thapa Technical
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Comprehensive step-by-step layout courses teaching JavaScript events handlers, DOM selectors, and responsive css screens.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      WATCH PLAYLIST <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@CodeWithHarry" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Sigma Web Dev
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        CodeWithHarry
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Famous in-depth full-stack walkthrough series outlining HTML structure, databases connections, and node express servers.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
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
                          Delta Placement Batch
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Apna College
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Perfect structured visual assets course maps covering Web fundamentals and enterprise landing UI schemas.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@chaiaurcode" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col items-start justify-between group transition-all duration-300 pointer cursor-pointer sm:col-span-2"
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Chai aur JavaScript/React Series
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Chai aur Code
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Outstanding deep-dives outlining JavaScript closures, prototypes chains, async actions, context buffers, and hands-on React tasks.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10 w-full">
                      WATCH MASTERCLASSES <ExternalLink className="w-2.5 h-2.5" />
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
                    href="https://www.youtube.com/@freecodecamp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Web Dev Bootcamps
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        freeCodeCamp
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Complete 10+ hours visual workshops targeting clean web layouts, variables, React components lifecycle, API fetch structures and more.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      PLAY VIDEOS <ExternalLink className="w-2.5 h-2.5" />
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
                          Modern Crash Courses
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Traversy Media
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Tailored web engineering series mapping custom layout design specs, databases models, integrations procedures, and vanilla JS actions.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@javascriptmastery" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Realworld JS & Next.js
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        JavaScript Mastery
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        High fidelity full stack guides displaying responsive dashboards architectures, authentication setups, database tables, and polished CSS grids.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@WebDevSimplified" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Simplified CSS/Hooks
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Web Dev Simplified
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Deconstruction of tricky React hook lifecycles, CSS flex/grid layout nuances, custom utility hooks, and lightweight structures.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@SuperSimpleDev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col items-start justify-between group transition-all duration-300 pointer cursor-pointer sm:col-span-2"
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          First Principles JS Course
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        SuperSimpleDev
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Outstanding, accessible, zero-assumption videos teaching raw HTML forms, CSS layouts rules, and essential vanilla JS from scratch.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10 w-full">
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
