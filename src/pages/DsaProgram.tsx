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
  GitCommit,
  GitMerge,
  GitPullRequest,
  Hash,
  Database,
  Spline,
  Grid,
  TrendingUp,
  Award
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

export default function DsaProgram({ onNavigate }: { onNavigate: (route: string) => void }) {
  // Track selected category
  const [activeCategory, setActiveCategory] = useState<string>('dsa-basics');
  
  // Track completion states of items dynamically under localStorage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('dsa_program_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const categories: Category[] = [
    {
      id: 'dsa-basics',
      title: '🟢 DSA Basics',
      icon: BookOpen,
      iconColor: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-550/10 dark:bg-green-550/5',
      topics: [
        { name: 'What is DSA?', completed: false, description: 'Learn logic organizing, physical memory limits, cache lines, and standard coding methodologies.' },
        { name: 'Time Complexity', completed: false, description: 'Compute runtime growth rates through logical operation counting of loops and function trees.' },
        { name: 'Space Complexity', completed: false, description: 'Calculate physical auxiliary memory structures allocated during algorithm executions.' },
        { name: 'Big O Notation', completed: false, description: 'Master worst-case (Big O), average (Theta), and best-case (Omega) performance limits.' },
        { name: 'Problem Solving Basics', completed: false, description: 'Practice pseudocode mapping, boundary test analysis, and standard bug scanning.' },
      ]
    },
    {
      id: 'arrays',
      title: '📚 Arrays',
      icon: Grid,
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-550/10 dark:bg-blue-550/5',
      topics: [
        { name: 'Array Basics', completed: false, description: 'Understand contiguous ram block structures, offsets, and multi-dimensional matrices.' },
        { name: 'Traversal', completed: false, description: 'Access and print elements systematically with classic and enhanced index-based iterations.' },
        { name: 'Searching', completed: false, description: 'Compare linear scans versus highly efficient O(log N) binary search on sorted blocks.' },
        { name: 'Sorting', completed: false, description: 'Master Bubble, Selection, Insertion, Merge, Quick, and dynamic built-in sort calls.' },
        { name: 'Prefix Sum', completed: false, description: 'Implement cumulative running sum arrays to search range values in constant time.' },
        { name: 'Sliding Window', completed: false, description: 'Track sub-array margins dynamically using left-right boundaries to lower complexities.' },
      ]
    },
    {
      id: 'strings',
      title: '🔤 Strings',
      icon: Terminal,
      iconColor: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-550/10 dark:bg-amber-550/5',
      topics: [
        { name: 'String Basics', completed: false, description: 'Study character encoders (ASCII, Unicode), byte buffers, and immutable objects principles.' },
        { name: 'String Manipulation', completed: false, description: 'Formulate dynamic sub-string splits, custom joins, reverse characters, and concat loops.' },
        { name: 'Palindrome Problems', completed: false, description: 'Verify symmetric string sequences using single and double pointer checks.' },
        { name: 'Pattern Matching', completed: false, description: 'Implement naive matching rules, KMP prefix tables, or Rabin-Karp hash matching.' },
        { name: 'Hashing Basics', completed: false, description: 'Map variable size keys into fixed indices using custom multipliers and collision rules.' },
      ]
    },
    {
      id: 'recursion',
      title: '📦 Recursion & Backtracking',
      icon: Spline,
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-550/10 dark:bg-indigo-550/5',
      topics: [
        { name: 'Recursion Basics', completed: false, description: 'Formulate inductive loops, understand active stack frames, and define base boundaries.' },
        { name: 'Stack Memory', completed: false, description: 'Examine stack overflows, frames allocation, and local parameters preservation.' },
        { name: 'Backtracking', completed: false, description: 'Prune recursion paths, return state values, and search entire combination trees.' },
        { name: 'N-Queens', completed: false, description: 'Solve classical non-attacking chess layout schemes using recursive backtracking.' },
        { name: 'Sudoku Solver', completed: false, description: 'Fill grid cells while periodically checking column-row-square criteria dynamically.' },
      ]
    },
    {
      id: 'stack-queue',
      title: '🥞 Stack & Queue',
      icon: Layers,
      iconColor: 'text-violet-500 dark:text-violet-400',
      bgColor: 'bg-violet-550/10 dark:bg-violet-550/5',
      topics: [
        { name: 'Stack Basics', completed: false, description: 'Implement Last-In First-Out (LIFO) interfaces using arrays and dynamic lists.' },
        { name: 'Queue Basics', completed: false, description: 'Configure First-In First-Out (FIFO) buffers, front/rear indexes, and enqueue/dequeue methods.' },
        { name: 'Circular Queue', completed: false, description: 'Optimize memory recycling by joining head and tail boundaries through modulo math.' },
        { name: 'Priority Queue', completed: false, description: 'Deliver elements sorted by user rankings, backed by physical Binary Heaps.' },
        { name: 'Monotonic Stack', completed: false, description: 'Retain strictly ascending or descending element indexes to solve nearest greater/lesser puzzles.' },
      ]
    },
    {
      id: 'linked-list',
      title: '🔗 Linked List',
      icon: GitCommit,
      iconColor: 'text-orange-500 dark:text-orange-400',
      bgColor: 'bg-orange-550/10 dark:bg-orange-550/5',
      topics: [
        { name: 'Singly Linked List', completed: false, description: 'Construct nodes linking values to subsequent addresses, implement insertions and deletes.' },
        { name: 'Doubly Linked List', completed: false, description: 'Establish bilateral connections with backward and forward references.' },
        { name: 'Circular Linked List', completed: false, description: 'Cycle list endpoints directly back to root headers to create circular rings.' },
        { name: 'Reverse Linked List', completed: false, description: 'Invert node pointers in O(N) linear time using iterative and recursive shifts.' },
        { name: 'Cycle Detection', completed: false, description: 'Locate infinite loops in lists using Floyds Tortoise and Hare double cursor speed comparison.' },
      ]
    },
    {
      id: 'trees',
      title: '🌳 Trees',
      icon: GitMerge,
      iconColor: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-550/10 dark:bg-pink-550/5',
      topics: [
        { name: 'Binary Trees', completed: false, description: 'Model hierarchical parents and children connections, computing height and diameters.' },
        { name: 'BST', completed: false, description: 'Enforce sorted left-lower and right-greater hierarchies to look up nodes in O(log N).' },
        { name: 'Tree Traversal', completed: false, description: 'Execute Depth-First (Pre-order, In-order, Post-order) and Breadth-First Level-order sweeps.' },
        { name: 'Heap', completed: false, description: 'Construct max/min structures where parent weights consistently override child nodes.' },
        { name: 'Trie', completed: false, description: 'Implement high-performance character prefix trees to code rapid dictionary completions.' },
        { name: 'Segment Tree', completed: false, description: 'Resolve complex interval point queries and range modifications in O(log N) time.' },
      ]
    },
    {
      id: 'graphs',
      title: '🕸️ Graphs',
      icon: GitPullRequest,
      iconColor: 'text-cyan-500 dark:text-cyan-400',
      bgColor: 'bg-cyan-550/10 dark:bg-cyan-550/5',
      topics: [
        { name: 'Graph Basics', completed: false, description: 'Model grids using Adjacency Lists and Adjacency Matrices, dealing with directed/weighted layouts.' },
        { name: 'BFS', completed: false, description: 'Explore graph structures outwards level by level using queue tracking setups.' },
        { name: 'DFS', completed: false, description: 'Traverse graph pathways recursively outwards down deeply until turning back.' },
        { name: 'Shortest Path', completed: false, description: 'Compute edge counts on unweighted networks using linear BFS checks.' },
        { name: 'Dijkstra', completed: false, description: 'Discover absolute shortest routes using dynamic priority queues on non-negative weighted edges.' },
         { name: 'MST', completed: false, description: 'Formulate minimal weight connection trees using Prim or Kruskal algorithms.' },
        { name: 'Union Find', completed: false, description: 'Track separate partition groups using Union by Rank and Path Compression optimizations.' },
      ]
    },
    {
      id: 'dp',
      title: '⚡ Dynamic Programming',
      icon: TrendingUp,
      iconColor: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-550/10 dark:bg-rose-550/5',
      topics: [
        { name: 'DP Basics', completed: false, description: 'Identify subproblem overlaps and optimal substructure characteristics.' },
        { name: 'Memoization', completed: false, description: 'Store computed recursive outcomes inside look-up key tables (Top-Down).' },
        { name: 'Tabulation', completed: false, description: 'Resolve problems iteratively starting from base inputs to larger targets (Bottom-Up).' },
        { name: 'Knapsack', completed: false, description: 'Solve item selection logic optimizing combined weight limits.' },
        { name: 'LIS', completed: false, description: 'Determine longest strictly increasing subsequences using matrix memo blocks.' },
        { name: 'DP on Trees', completed: false, description: 'Solve subproblems bounding tree paths recursively using topological metrics.' },
      ]
    },
    {
      id: 'advanced-algos',
      title: '🧠 Advanced Algorithms',
      icon: Code2,
      iconColor: 'text-red-500 dark:text-red-400',
      bgColor: 'bg-red-550/10 dark:bg-red-550/5',
      topics: [
        { name: 'Greedy Algorithms', completed: false, description: 'Produce optimal long-range choices by choosing immediate localized maximum outcomes.' },
        { name: 'Binary Search', completed: false, description: 'Operate splits on monotonic functions to find boundary values in O(log N).' },
        { name: 'Two Pointer', completed: false, description: 'Co-ordinate two indexes sliding inwards to simplify multi-value loops.' },
        { name: 'Bit Manipulation', completed: false, description: 'Leverage logic operators (AND, OR, XOR, shifts) to process states extremely fast.' },
        { name: 'Divide & Conquer', completed: false, description: 'Partition modules into identical smaller setups (e.g. Quick Sort, Merge Sort).' },
        { name: 'Mathematical Algorithms', completed: false, description: 'Master Euclid GCD bounds, modular arithmetic, and Primality test sieves.' },
      ]
    },
    {
      id: 'practice',
      title: '💻 Practice Platforms',
      icon: Award,
      iconColor: 'text-teal-500 dark:text-teal-400',
      bgColor: 'bg-teal-550/10 dark:bg-teal-550/5',
      topics: [
        { name: 'LeetCode', completed: false, description: 'Complete curated, tiered challenges targeting key topics (LeetCode 75/Blind 75).' },
        { name: 'Codeforces', completed: false, description: 'Test timing performance under competitive pressure on strict dynamic algorithm sets.' },
        { name: 'GeeksforGeeks', completed: false, description: 'Review topic-wise interview sheets and specific company-wise question pools.' },
        { name: 'HackerRank', completed: false, description: 'Practice initial structural tests, and unlock core certification badges.' },
        { name: 'CodeChef', completed: false, description: 'Solve tiered division contests and challenge online users globally.' },
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
    localStorage.setItem('dsa_program_progress', JSON.stringify(updated));
  };

  // Keep track of completion percentages
  const totalTopics = categories.reduce((sum, cat) => sum + cat.topics.length, 0);
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background text-on-surface overflow-hidden relative font-sans">
      <SEO 
        title="DSA & Algorithms Roadmap Master" 
        description="Comprehensive interactive DSA curriculum roadmap with full topics, custom progress checklists, dynamic programming models, and visual YouTube courses." 
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
              DSA Roadmap
            </h1>
            <p className="text-xs text-on-surface-variant/70 leading-relaxed mb-4">
              Advanced Problem Solving & Structures
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
                  Select and launch step-by-step masterclasses spanning algorithmic complexity limits to high-level system components.
                </p>
              </div>

              {/* HINDI RESOURCES */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[10px] font-bold tracking-widest text-[#e65100] dark:text-[#ffb74d] uppercase flex items-center gap-1.5">
                  🇮🇳 Hindi Resources
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <a 
                    href="https://www.youtube.com/@takeUforward" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Striver A2Z Playlist
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Striver (takeUforward)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Gold standard algorithmic curriculum covering recursions, graphs, trees, and dynamic programming in depth.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      PLAY COURSE <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@CodeHelp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Love Babbar DSA Series
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Love Babbar (CodeHelp)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        High intensity walkthrough courses with code examples in C++ and Java explaining fundamental structures.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      WATCH CLASS <ExternalLink className="w-2.5 h-2.5" />
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
                          Placement Course
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Apna College (Hindi)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Step-by-step videos mapping essential array patterns, binary trees, heaps, and sliding windows.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@KunalKushwaha" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          First Principles DSA
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Kunal Kushwaha
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Amazing detailed lessons explaining time/space complexities and recursive backtracking logic visually.
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
                    href="https://www.youtube.com/@NeetCode" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          NeetCode 150
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        NeetCode
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Unmatched logical descriptions of algorithm breakdowns for the most famous LeetCode interview queries.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      PLAY VIDEOS <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@freecodecamp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          10+ Hour Bootcamps
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        freeCodeCamp
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        High-quality production-ready lectures explaining sorting vectors, arrays, pointers, and memory allocations.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@abdul_bari" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Legendary Algorithms
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Abdul Bari
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Academically perfect, clear blackboard drawings of Knapsack recurrences and greedy algorithms logic.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@WilliamFiset-videos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Advanced Graph Theory
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        William Fiset
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Interactive visualizations tracking Dijkstra, MST, Union Find, and topological paths.
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
