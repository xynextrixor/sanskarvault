import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Terminal, 
  Code2, 
  Cpu, 
  Layers, 
  Settings, 
  Play, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles
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

export default function CProgram({ onNavigate }: { onNavigate: (route: string) => void }) {
  // Track selected category
  const [activeCategory, setActiveCategory] = useState<string>('basics');
  
  // Track completion states of items dynamically under localStorage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('c_program_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const categories: Category[] = [
    {
      id: 'basics',
      title: '📘 Basics',
      icon: BookOpen,
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-550/10 dark:bg-blue-550/5',
      topics: [
        { name: 'Introduction to C', completed: false, description: 'Learn standard paradigms of compiled, structured low-level application programming.' },
        { name: 'Setup VS Code / Compiler', completed: false, description: 'Install standard GCC, configure environment path variables, custom compiler settings.' },
        { name: 'First Program', completed: false, description: 'Explore basic structure of main() entrypoint, return values, header file references.' },
        { name: 'Variables & Data Types', completed: false, description: 'Understand integer, float, char, double byte sizes, primitive memory registers.' },
        { name: 'Input / Output', completed: false, description: 'Interactive standard IO functions including printf() formats and scanf() addresses.' },
        { name: 'Operators', completed: false, description: 'Practice arithmetic, bitwise logical shift, conditional, and assignment actions.' },
      ]
    },
    {
      id: 'control-flow',
      title: '🔁 Control Flow',
      icon: Terminal,
      iconColor: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-550/10 dark:bg-amber-550/5',
      topics: [
        { name: 'if / else', completed: false, description: 'Implement dynamic branching with nested if/else statements.' },
        { name: 'switch', completed: false, description: 'Verify optimized integer key lookup tables with standard break keywords.' },
        { name: 'for loop', completed: false, description: 'Iterate structured arrays using bounded variables, increments, and scope checks.' },
        { name: 'while loop', completed: false, description: 'Control open-ended logic blocks using state monitoring condition tags.' },
        { name: 'do while', completed: false, description: 'Ensure initial code execution blocks precede secondary conditional evaluations.' },
      ]
    },
    {
      id: 'functions',
      title: '📦 Functions',
      icon: Code2,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-550/10 dark:bg-emerald-550/5',
      topics: [
        { name: 'Function Basics', completed: false, description: 'Declare signatures, define standard subroutines and avoid global variable pollution.' },
        { name: 'Parameters', completed: false, description: 'Integrate pass-by-value and address pointer reference bindings into calls.' },
        { name: 'Return Values', completed: false, description: 'Handle void contexts or structured datatype pointers cleanly on exit.' },
        { name: 'Recursion', completed: false, description: 'Trace memory stack allocations caused by self-triggering stack frames.' },
        { name: 'Header Files', completed: false, description: 'Generate custom target headers, prevent redundant loader imports using #ifndef wrappers.' },
      ]
    },
    {
      id: 'arrays-strings',
      title: '📚 Arrays & Strings',
      icon: Layers,
      iconColor: 'text-violet-500 dark:text-violet-400',
      bgColor: 'bg-violet-550/10 dark:bg-violet-550/5',
      topics: [
        { name: '1D Arrays', completed: false, description: 'Allocate contiguous linear bytes, identify index values and base pointers.' },
        { name: '2D Arrays', completed: false, description: 'Learn row-major array calculations, multi-index offsets, and matrix bounds.' },
        { name: 'Strings', completed: false, description: 'Explore character sequences terminated with dynamic null pointer bytes.' },
        { name: 'String Functions', completed: false, description: 'Apply optimized string functions (strlen, strcpy, strcat, strcmp) safely.' },
        { name: 'Character Arrays', completed: false, description: 'Configure custom user input buffers, avoid buffer overflow exploits gracefully.' },
      ]
    },
    {
      id: 'pointers',
      title: '🧠 Pointers',
      icon: Cpu,
      iconColor: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-550/10 dark:bg-rose-550/5',
      topics: [
        { name: 'Pointer Basics', completed: false, description: 'Learn memory addresses, reference values, and deep value dereferencing.' },
        { name: 'Pointer Arithmetic', completed: false, description: 'Navigate dynamic linear grids safely with scalable offset size indices.' },
        { name: 'Arrays with Pointers', completed: false, description: 'Establish dynamic array index calculations using base addresses.' },
        { name: 'Functions with Pointers', completed: false, description: 'Modify caller arguments directly using local variables pointers references.' },
        { name: 'Double Pointers', completed: false, description: 'Manage multidimensional memory tables using addresses to pointers.' },
      ]
    },
    {
      id: 'advanced',
      title: '🏗️ Advanced Topics',
      icon: Settings,
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-550/10 dark:bg-indigo-550/5',
      topics: [
        { name: 'Structures', completed: false, description: 'Group heterogeneous primitive properties into structured byte layouts.' },
        { name: 'Unions', completed: false, description: 'Conserve system memory buffers by sharing overlapping value scopes.' },
        { name: 'Dynamic Memory Allocation', completed: false, description: 'Utilize standard malloc, calloc, realloc and free on custom Heap blocks.' },
        { name: 'File Handling', completed: false, description: 'Write sequential text streams and byte values to local storage drives.' },
        { name: 'Preprocessors', completed: false, description: 'Customize macro expansions, leverage condition tags and code link actions.' },
      ]
    },
    {
      id: 'practice',
      title: '💻 Practice Challenges',
      icon: Sparkles,
      iconColor: 'text-cyan-500 dark:text-cyan-400',
      bgColor: 'bg-cyan-550/10 dark:bg-cyan-550/5',
      topics: [
        { name: 'Pattern Questions', completed: false, description: 'Construct nested for Loops structures to build nested string triangles.' },
        { name: 'Number Problems', completed: false, description: 'Implement prime checkers, fibonacci sequences, and armstrong loops.' },
        { name: 'String Problems', completed: false, description: 'Code optimal solutions for anagram detection, palindromes and compression.' },
        { name: 'Array Problems', completed: false, description: 'Code searching, sorting (bubble, insertion) and array reversals.' },
        { name: 'Mini Projects', completed: false, description: 'Build simple system terminal utility games (Tic-Tac-Toe, Calculator).' },
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
    localStorage.setItem('c_program_progress', JSON.stringify(updated));
  };

  // Keep track of completion percentages
  const totalTopics = categories.reduce((sum, cat) => sum + cat.topics.length, 0);
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background text-on-surface overflow-hidden relative font-sans">
      <SEO 
        title="C Programming Foundation Curriculum" 
        description="Comprehensive interactive C Language curriculum roadmap with full topics, custom progress checklists, and leading recommended YouTube courses." 
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
              C Programming
            </h1>
            <p className="text-xs text-on-surface-variant/70 leading-relaxed mb-4">
              Step-by-step Low Level Computing Foundations
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

            {/* RECOMMENDED COURSE: Deep orange highlighted segment with icons and high contrast action buttons */}
            <div className="border border-primary/20 bg-primary/5 dark:bg-zinc-950 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-widest font-mono mb-2">
                    🔥 Highly Recommended
                  </div>
                  <h3 className="font-display font-black text-base sm:text-lg text-on-surface tracking-tight uppercase leading-snug">
                    Recommended Course Videos
                  </h3>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant/80 font-sans max-w-md">
                    Watch premium, high-fidelity programming lessons to reinforce dynamic low-level concept modules.
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0 font-mono text-xs sm:text-sm font-black text-on-surface">
                  <span className="text-primary font-bold">100% FREE</span>
                </div>
              </div>

              {/* YouTube Links Grid Column layout */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                
                {/* Channel 1: CodeWithHarry */}
                <a 
                  href="https://www.youtube.com/watch?v=ZSPZob_1TOk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3.5 flex flex-col justify-between group transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] font-black text-primary uppercase tracking-widest bg-primary/5 dark:bg-white/5 px-2 py-0.5 rounded-md">
                        Full Course Video
                      </span>
                      <Play className="w-4 h-4 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-on-surface mb-0.5 leading-snug">
                      C Tutorial by CodeWithHarry
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-on-surface-variant/70 leading-normal font-sans">
                      Master basic syntax, variables, pointers, structs, loops & practical builds sequentially in 15 hours.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-primary font-mono mt-4 pt-2 border-t border-outline-variant/10">
                    WATCH LESSON <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>

                {/* Channel 2: Jenny's Lectures */}
                <a 
                  href="https://www.youtube.com/playlist?list=PLdo5W4Nhv31a8UcMN9-35ghv8qyFWD9_S" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3.5 flex flex-col justify-between group transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] font-black text-primary uppercase tracking-widest bg-primary/5 dark:bg-white/5 px-2 py-0.5 rounded-md">
                        Complete Playlist
                      </span>
                      <Play className="w-4 h-4 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-on-surface mb-0.5 leading-snug">
                      Jenny's Lectures in C
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-on-surface-variant/70 leading-normal font-sans">
                      Deep academic dive on complex memory allocation mapping, nested double Pointers & memory arrays.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-semibold text-primary font-mono mt-4 pt-2 border-t border-outline-variant/10">
                    OPEN PLAYLIST <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
