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
  Cpu,
  FolderOpen,
  BrainCircuit,
  BarChart3
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

export default function PythonProgram({ onNavigate }: { onNavigate: (route: string) => void }) {
  // Track selected category
  const [activeCategory, setActiveCategory] = useState<string>('python-basics');
  
  // Track completion states of items dynamically under localStorage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('python_program_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const categories: Category[] = [
    {
      id: 'python-basics',
      title: '🐍 Python Basics',
      icon: BookOpen,
      iconColor: 'text-yellow-500 dark:text-yellow-400',
      bgColor: 'bg-yellow-550/10 dark:bg-yellow-550/5',
      topics: [
        { name: 'Introduction to Python', completed: false, description: 'Learn the characteristics of Python, interpreted scripting paradigms, and dynamic typing benefits.' },
        { name: 'Installation & Setup', completed: false, description: 'Install standard Python 3.x, configure PATH, set up VS Code, and create script terminals.' },
        { name: 'First Python Program', completed: false, description: 'Write basic prints, execution statements, interactive terminals, and inline documentation comments.' },
        { name: 'Variables & Data Types', completed: false, description: 'Explore integers, floats, complex types, characters, strings, and standard typecasting.' },
        { name: 'Input / Output', completed: false, description: 'Retrieve keyboard input using input() and print premium formatted values using f-strings.' },
        { name: 'Operators', completed: false, description: 'Practice arithmetic, assignment, logical comparison, identity checks, and membership lookups.' },
      ]
    },
    {
      id: 'control-flow',
      title: '🔁 Control Flow',
      icon: Terminal,
      iconColor: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-550/10 dark:bg-amber-550/5',
      topics: [
        { name: 'if / else', completed: false, description: 'Structure simple branch checks using correct code indent blocks.' },
        { name: 'Nested Conditions', completed: false, description: 'Implement nested comparisons, complex elif statements, and logical combinations.' },
        { name: 'for loop', completed: false, description: 'Iterate loops using range(), sequences, lists, and unpackable indices easily.' },
        { name: 'while loop', completed: false, description: 'Execute iterative scripts conditional to real-time variable triggers.' },
        { name: 'break / continue', completed: false, description: 'Manage custom loop boundaries, exit commands, and skips in dynamic iterations.' },
      ]
    },
    {
      id: 'functions',
      title: '📦 Functions',
      icon: Code2,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-550/10 dark:bg-emerald-550/5',
      topics: [
        { name: 'Function Basics', completed: false, description: 'Define custom modular functions using the def keyword with local variable scopes.' },
        { name: 'Parameters & Arguments', completed: false, description: 'Support positional arguments, custom *args, **kwargs, and default variables.' },
        { name: 'Return Statements', completed: false, description: 'Deliver output values, multi-values unpacking, or silent None results safely.' },
        { name: 'Lambda Functions', completed: false, description: 'Author simple single-expression anonymous functions inline for instant mapping.' },
        { name: 'Recursion', completed: false, description: 'Implement self-callable algorithms bounded gracefully with base-cases.' },
      ]
    },
    {
      id: 'data-structures',
      title: '📚 Data Structures',
      icon: Layers,
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-550/10 dark:bg-blue-550/5',
      topics: [
        { name: 'Lists', completed: false, description: 'Create dynamic arrays, support value appending, slicing, sorting, and indexing.' },
        { name: 'Tuples', completed: false, description: 'Define immutable structured static sequences for secured tuple value storage.' },
        { name: 'Sets', completed: false, description: 'Utilize unique element lists, complete intersection, union, and difference loops.' },
        { name: 'Dictionaries', completed: false, description: 'Configure custom high-speed key-value pair tables and nesting lookups.' },
        { name: 'List Comprehension', completed: false, description: 'Craft highly optimized, inline list iterations using expressive syntax.' },
      ]
    },
    {
      id: 'oops',
      title: '🧠 OOPS in Python',
      icon: Cpu,
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-550/10 dark:bg-indigo-550/5',
      topics: [
        { name: 'Classes & Objects', completed: false, description: 'Model real-world entities into custom object prototypes with methods.' },
        { name: 'Constructors', completed: false, description: 'Initialize object attributes dynamically using the __init__ special method.' },
        { name: 'Inheritance', completed: false, description: 'Derive child classes from parents to preserve, reuse, and extend code blocks.' },
        { name: 'Polymorphism', completed: false, description: 'Implement dynamic method overriding and duck-typing interfaces gracefully.' },
        { name: 'Encapsulation', completed: false, description: 'Protect class internal variables using single and double prefix underscores.' },
      ]
    },
    {
      id: 'file-handling',
      title: '📂 File Handling',
      icon: FolderOpen,
      iconColor: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-550/10 dark:bg-pink-550/5',
      topics: [
        { name: 'Read Files', completed: false, description: 'Open local files safely using with blocks in modern read modes.' },
        { name: 'Write Files', completed: false, description: 'Save text documents, append real-time rows, or configure raw byte writers.' },
        { name: 'CSV Files', completed: false, description: 'Parse tabular sheet rows, write datasets, and manage CSV field delimiting.' },
        { name: 'JSON Handling', completed: false, description: 'Serialize dynamic python dict objects to standardized local json storage.' },
      ]
    },
    {
      id: 'advanced',
      title: '🚀 Advanced Python',
      icon: Settings,
      iconColor: 'text-violet-500 dark:text-violet-400',
      bgColor: 'bg-violet-550/10 dark:bg-violet-550/5',
      topics: [
        { name: 'Modules & Packages', completed: false, description: 'Build and import external layout modules, manage standard site-packages.' },
        { name: 'Exception Handling', completed: false, description: 'Implement strong try-except blocks, manage built-in and custom errors.' },
        { name: 'Decorators', completed: false, description: 'Modify execution behavior of functions using wrapper layouts dynamically.' },
        { name: 'Iterators & Generators', completed: false, description: 'Yield values in sequence to preserve physical computer memory buffers.' },
        { name: 'Virtual Environments', completed: false, description: 'Isolate library dependencies using venv and pip configurations.' },
      ]
    },
    {
      id: 'ai-ml',
      title: '🤖 AI / Machine Learning',
      icon: BrainCircuit,
      iconColor: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-550/10 dark:bg-rose-550/5',
      topics: [
        { name: 'NumPy', completed: false, description: 'Master multi-dimensional array operations, vector arithmetic, and math modules.' },
        { name: 'Pandas', completed: false, description: 'Cleanse and restructure datasets using structures like DataFrames and Series.' },
        { name: 'Matplotlib', completed: false, description: 'Draw high-fidelity scatter plots, line graphs, bar charts, and data trends.' },
        { name: 'Scikit-Learn', completed: false, description: 'Create custom machine learning predictive models and classify clusters.' },
        { name: 'Machine Learning Basics', completed: false, description: 'Understand supervised versus unsupervised models, features, and label values.' },
        { name: 'Deep Learning Basics', completed: false, description: 'Study layers of computational neural networks and forward propagation metrics.' },
        { name: 'Neural Networks', completed: false, description: 'Structure weights, biases, and activation formulas (ReLU, Sigmoid).' },
        { name: 'TensorFlow', completed: false, description: 'Build deep industrial deep learning neural architectures with Keras API.' },
        { name: 'PyTorch', completed: false, description: 'Manage matrix tensors and model evaluations using standard PyTorch models.' },
        { name: 'AI Projects', completed: false, description: 'Configure movie recommenders, price estimates, or hand-written classifiers.' },
      ]
    },
    {
      id: 'data-analytics',
      title: '📊 Data Analytics',
      icon: BarChart3,
      iconColor: 'text-cyan-500 dark:text-cyan-400',
      bgColor: 'bg-cyan-550/10 dark:bg-cyan-550/5',
      topics: [
        { name: 'Data Cleaning', completed: false, description: 'Handle missing properties (dropna/fillna) and deduplicate row indexes.' },
        { name: 'Data Visualization', completed: false, description: 'Create impressive distribution charts and heatmap correlations.' },
        { name: 'Excel for Analytics', completed: false, description: 'Reference datasets, extract insights, and map complex math logic.' },
        { name: 'Power BI', completed: false, description: 'Connect databases, create semantic models, and construct smart reports.' },
        { name: 'SQL Basics', completed: false, description: 'Perform simple data commands (SELECT, WHERE, JOIN) in local databases.' },
        { name: 'Dashboard Projects', completed: false, description: 'Combine separate data charts to form structured executive overview slides.' },
        { name: 'Analytics Projects', completed: false, description: 'Evaluate shopping baskets or churn reports with real raw metrics.' },
      ]
    },
    {
      id: 'practice',
      title: '💻 Practice Challenges',
      icon: Sparkles,
      iconColor: 'text-teal-500 dark:text-teal-400',
      bgColor: 'bg-teal-550/10 dark:bg-teal-550/5',
      topics: [
        { name: 'Beginner Problems', completed: false, description: 'Implement factorial recursions, grade calculators, and unit converters.' },
        { name: 'Pattern Questions', completed: false, description: 'Formulate double-index inner/outer loops to write geometric pattern stars.' },
        { name: 'Mini Projects', completed: false, description: 'Build text utility helpers, interactive unit tests, or random password systems.' },
        { name: 'Automation Projects', completed: false, description: 'Write script automation that parses online text files, renames files, or scrapes pages.' },
        { name: 'Interview Questions', completed: false, description: 'Prepare reverse indexing, linked lists, big-O, and standard algorithm tests.' },
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
    localStorage.setItem('python_program_progress', JSON.stringify(updated));
  };

  // Keep track of completion percentages
  const totalTopics = categories.reduce((sum, cat) => sum + cat.topics.length, 0);
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background text-on-surface overflow-hidden relative font-sans">
      <SEO 
        title="Python for AI & Analytics Curriculum" 
        description="Comprehensive interactive Python curriculum roadmap with full topics, custom progress checklists, AI/ML tracks, and curated video courses." 
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
              Python Roadmap
            </h1>
            <p className="text-xs text-on-surface-variant/70 leading-relaxed mb-4">
              Step-by-step AI & Analytics Engineering Path
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
                  Select and launch step-by-step masterclasses spanning core syntax to advanced AI frameworks and Data analysis pipelines.
                </p>
              </div>

              {/* HINDI RESOURCES */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[10px] font-bold tracking-widest text-[#e65100] dark:text-[#ffb74d] uppercase flex items-center gap-1.5">
                  🇮🇳 Hindi Resources
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <a 
                    href="https://www.youtube.com/watch?v=UrsmFxEIp5k" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Full Python Course
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        CodeWithHarry (Hindi)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Go from base installation to lists, classes, advanced methods in 100+ episodes.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      PLAY COURSE <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/watch?v=vLqTf2b6GZw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          One Shot Video
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Apna College (Hindi)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Complete comprehensive Python outline video containing loop scripts & OOPS logic safely.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      WATCH ONE SHOT <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@krishnaik06" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          AI & ML Specialization
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Krish Naik (AI/ML)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Deep statistical analysis modules, dynamic Scikit, PyTorch layers and modeling.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@campusx-official" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Data Science Path
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        CampusX (Data Science)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Industry level SQL queries, Pandas cleanups, Excel parameters, Power BI modeling.
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
                    href="https://www.youtube.com/watch?v=rfscVS0vtbw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Comprehensive Crash Course
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        freeCodeCamp (English)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Solid 4-hour initial tutorial spanning types, dictionaries, logic branches and mini-projects.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      PLAY COURSE <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@programmingwithmosh" 
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
                        Programming with Mosh
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Extremely clear, visually backed structured guides for beginners and professionals alike.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@coreyms" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Advanced Python & OOP
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Corey Schafer
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Gold-standard programming deepdives covering decorators, virtual environments, custom classes, logs.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@TechWithTim" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Projects & Automation
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Tech With Tim
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Engaging hands-on coding challenges, game projects, machine learning arrays and scripts guides.
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
