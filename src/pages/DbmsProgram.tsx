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
  Database,
  Link,
  Lock,
  Search,
  Zap,
  Cpu,
  Bookmark
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

export default function DbmsProgram({ onNavigate }: { onNavigate: (route: string) => void }) {
  // Track selected category
  const [activeCategory, setActiveCategory] = useState<string>('db-basics');
  
  // Track completion states of items dynamically under localStorage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('dbms_program_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const categories: Category[] = [
    {
      id: 'db-basics',
      title: '🗄️ Database Basics',
      icon: Database,
      iconColor: 'text-violet-500 dark:text-violet-400',
      bgColor: 'bg-violet-555/10 dark:bg-violet-555/5',
      topics: [
        { name: 'What is DBMS?', completed: false, description: 'Learn data persistence, storage layers, dynamic lookups, and transactional control units.' },
        { name: 'Types of Databases', completed: false, description: 'Differentiate Relational, Document NoSQL, Key-Value stores, Columnar, and Graph structures.' },
        { name: 'DBMS vs File System', completed: false, description: 'Compare metadata catalogs, transactional recovery benefits, and consistency over raw directories.' },
        { name: 'Data Models', completed: false, description: 'Study hierarchical schemas, network representations, and modular object-oriented setups.' },
        { name: 'Database Architecture', completed: false, description: 'Analyze physical storage mappings, conceptual logic configurations, and outer client views.' },
      ]
    },
    {
      id: 'rdbms',
      title: '🔗 Relational Database (RDBMS)',
      icon: Link,
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-550/10 dark:bg-blue-550/5',
      topics: [
        { name: 'What is RDBMS?', completed: false, description: 'Master relational algebra constraints, entity-relation bounds, and ACID properties.' },
        { name: 'Tables & Rows', completed: false, description: 'Understand physical schema grids, fields data boundaries, row identifiers, and null types.' },
        { name: 'Primary Key', completed: false, description: 'Enforce absolute row uniqueness constraints, index trees, and non-nullable keys.' },
        { name: 'Foreign Key', completed: false, description: 'Link relational records across table limits using strict referential integrity rules.' },
        { name: 'Relationships', completed: false, description: 'Map entity associations clearly using ER schemas and physical keys.' },
        { name: 'One-to-One', completed: false, description: 'Design singular link structures where row IDs map uniquely to exactly one other.' },
        { name: 'One-to-Many', completed: false, description: 'Configure common branching records (e.g., one department having many employees).' },
        { name: 'Many-to-Many', completed: false, description: 'Implement composite junctions keys matching multiple records to other tables.' },
      ]
    },
    {
      id: 'sql-basics',
      title: '📘 SQL Basics',
      icon: Terminal,
      iconColor: 'text-sky-500 dark:text-sky-400',
      bgColor: 'bg-sky-550/10 dark:bg-sky-550/5',
      topics: [
        { name: 'Introduction to SQL', completed: false, description: 'Master declarative statements categories: DDL (Data Definition), DML (Data Manipulation), and DCL (Data Control).' },
        { name: 'CREATE DATABASE', completed: false, description: 'Initialize schemas structures in database systems under strict isolation guidelines.' },
        { name: 'CREATE TABLE', completed: false, description: 'Verify columns, datatypes (VARCHAR, INT, DATE), default parameters, and constraints.' },
        { name: 'INSERT Data', completed: false, description: 'Append raw database records cleanly using standard SQL INSERT commands.' },
        { name: 'SELECT Queries', completed: false, description: 'Retrieve attributes list selectively from targeted tables.' },
        { name: 'UPDATE Data', completed: false, description: 'Edit row values selectively while enforcing active safety indicators.' },
        { name: 'DELETE Data', completed: false, description: 'Remove tuples selectively from active storage layers.' },
        { name: 'WHERE Clause', completed: false, description: 'Filter returned datasets based on logical conditions (AND, OR, NOT, IN, BETWEEN).' },
      ]
    },
    {
      id: 'sql-queries',
      title: '🔍 SQL Queries',
      icon: Search,
      iconColor: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-550/10 dark:bg-amber-550/5',
      topics: [
        { name: 'ORDER BY', completed: false, description: 'Sort row displays dynamically in ascending (ASC) and descending (DESC) priorities.' },
        { name: 'GROUP BY', completed: false, description: 'Aggregate records against matching attribute pools to draw statistical counts or averages.' },
        { name: 'HAVING', completed: false, description: 'Incorporate logical condition checks directly onto dynamic aggregated groups.' },
        { name: 'DISTINCT', completed: false, description: 'Deduplicate retrieved row listings, showing only unique combinations.' },
        { name: 'LIMIT', completed: false, description: 'Cap maximum returned rows to prevent traffic bloat and support query paging.' },
         { name: 'LIKE', completed: false, description: 'Query values matching flexible regex wildcards (% for zero/more, _ for exact single characters).' },
        { name: 'Aliases', completed: false, description: 'Provide descriptive short names for complex tables or calculated columns (AS keyword).' },
      ]
    },
    {
      id: 'sql-joins',
      title: '🔗 SQL Joins',
      icon: Code2,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-550/10 dark:bg-emerald-550/5',
      topics: [
        { name: 'INNER JOIN', completed: false, description: 'Return matching cross-table tuples where foreign keys match precisely.' },
        { name: 'LEFT JOIN', completed: false, description: 'Retain all left-hand table rows, appending matching values or NULL offsets on the right.' },
        { name: 'RIGHT JOIN', completed: false, description: 'Preserve right-hand table listings, supplying matching data or NULL values to left variables.' },
        { name: 'FULL JOIN', completed: false, description: 'Compile combined records, showing null values where table references fail to match.' },
        { name: 'SELF JOIN', completed: false, description: 'Match rows inside a single table in a recursive manner (e.g. tracking supervisor chains).' },
        { name: 'CROSS JOIN', completed: false, description: 'Generate complete Cartesian products connecting every table entry to all alternate entries.' },
      ]
    },
    {
      id: 'advanced-sql',
      title: '⚡ Advanced SQL',
      icon: Zap,
      iconColor: 'text-indigo-505 dark:text-indigo-404',
      bgColor: 'bg-indigo-550/10 dark:bg-indigo-550/5',
      topics: [
        { name: 'Subqueries', completed: false, description: 'Nest SQL queries within outer conditionals inside WHERE, FROM, or SELECT contexts.' },
        { name: 'Nested Queries', completed: false, description: 'Resolve complex queries using EXISTS, ANY, ALL, and multi-value returns.' },
        { name: 'Views', completed: false, description: 'Create dynamic, read-only virtual screens over base physical tables to secure data.' },
        { name: 'Indexing', completed: false, description: 'Configure high-performance B-Tree and Hash indices to minimize physical disk page scans.' },
        { name: 'Stored Procedures', completed: false, description: 'Compile procedural scripts directly in database engines to execute complex transactions.' },
        { name: 'Triggers', completed: false, description: 'Automate query execution immediately before or after specific row modification events.' },
        { name: 'Transactions', completed: false, description: 'Enforce safe query groupings using START TRANSACTION, COMMIT, and ROLLBACK bounds.' },
      ]
    },
    {
      id: 'normalization',
      title: '🧠 Normalization',
      icon: Layers,
      iconColor: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-550/10 dark:bg-rose-550/5',
      topics: [
        { name: '1NF', completed: false, description: 'Eliminate duplicate columns and enforce atomic attribute layouts.' },
        { name: '2NF', completed: false, description: 'Fulfill 1NF criteria and completely remove partial functional dependencies.' },
        { name: '3NF', completed: false, description: 'Fulfill 2NF and remove all transitive functional dependencies.' },
        { name: 'BCNF', completed: false, description: 'Secure Boyce-Codd Normal Form where every determinant function serves as a Super Key.' },
        { name: 'Denormalization', completed: false, description: 'Inject calculated duplicate records into schemas to minimize heavy read joins.' },
      ]
    },
    {
      id: 'dbms-concepts',
      title: '🔐 DBMS Concepts',
      icon: Lock,
      iconColor: 'text-amber-600 dark:text-amber-500',
      bgColor: 'bg-amber-550/10 dark:bg-amber-550/5',
      topics: [
        { name: 'ACID Properties', completed: false, description: 'Uphold strict integrity: Atomicity, Consistency, Isolation, and Durability guarantees.' },
        { name: 'Concurrency Control', completed: false, description: 'Coordinate overlapping user transactions using serial schedules, timestamping, and locks.' },
        { name: 'Deadlocks', completed: false, description: 'Diagnose lock cycles, deploy waits, and compute rollback resolution actions.' },
        { name: 'Locks', completed: false, description: 'Inject Shared (S) and Exclusive (X) lock triggers during active write routines.' },
        { name: 'ER Diagram', completed: false, description: 'Draft visual entity relationships using rectangles, ovals, and connector diamonds.' },
        { name: 'Transactions', completed: false, description: 'Study active transaction Lifecycles (Active, Partially Committed, Aborted, Commited).' },
      ]
    },
    {
      id: 'practice',
      title: '💻 Practice Challenges',
      icon: Sparkles,
      iconColor: 'text-teal-500 dark:text-teal-400',
      bgColor: 'bg-teal-550/10 dark:bg-teal-550/5',
      topics: [
        { name: 'SQL Problems', completed: false, description: 'Leverage subqueries to report dynamic department metrics.' },
        { name: 'Query Practice', completed: false, description: 'Refine data manipulations using string conversions, date comparisons, and math methods.' },
        { name: 'Mini DBMS Projects', completed: false, description: 'Build and index fully operational models (e.g., student libraries, sales databases).' },
        { name: 'Interview Questions', completed: false, description: 'Prepare normalization proofs, composite index layouts, and transaction safety tasks.' },
        { name: 'LeetCode SQL', completed: false, description: 'Practice top interview query tasks (LeetCode SQL 50) covering complex joins.' },
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
    localStorage.setItem('dbms_program_progress', JSON.stringify(updated));
  };

  // Keep track of completion percentages
  const totalTopics = categories.reduce((sum, cat) => sum + cat.topics.length, 0);
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background text-on-surface overflow-hidden relative font-sans">
      <SEO 
        title="DBMS & SQL Master Curriculum" 
        description="Comprehensive interactive Database Management Systems and SQL curriculum roadmap with full topics, custom progress checklists, ACID isolations, and video courses." 
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
              DBMS & SQL
            </h1>
            <p className="text-xs text-on-surface-variant/70 leading-relaxed mb-4">
              Step-by-step Database Systems & SQL Path
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
                  Select and launch step-by-step masterclasses spanning Relational RDBMS constraints, SQL query syntax, and schema normalization designs.
                </p>
              </div>

              {/* HINDI RESOURCES */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[10px] font-bold tracking-widest text-[#e65100] dark:text-[#ffb74d] uppercase flex items-center gap-1.5">
                  🇮🇳 Hindi Resources
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <a 
                    href="https://www.youtube.com/@GateSmashers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          DBMS Masterclass
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Gate Smashers
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Gold-standard, academic exam and interview preparation covering normalizations, ACID isolations, and B-Trees.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      PLAY COURSE <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@KnowledgeGate" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          University & Gate Exam Prep
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Knowledge Gate
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Excellent clear tabular models explaining table dependencies, transitive reductions, and SQL schemas.
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
                          Complete SQL Video
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Apna College (Hindi)
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Comprehensive overview in one shot outlining SQL select, filters, groups, left/right joins, and key constraints.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
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
                          Practical SQL Web Course
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        CodeWithHarry
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Perfect practical exercises combining SQL joins, database queries, and raw table configurations.
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
                    href="https://www.youtube.com/@freecodecamp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Full 8+ Hour Bootcamp
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        freeCodeCamp
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Extremely detailed step-by-step introduction containing complete physical SQL design schemas, inserts, and query limits.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      PLAY VIDEOS <ExternalLink className="w-2.5 h-2.5" />
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
                          Comprehensive SQL Course
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Programming with Mosh
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Crystal-clear database walkthroughs with dynamic diagrams showing index scans and inner/outer joins.
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
                          SQL Basics & DBMS Setup
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Traversy Media
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Excellent visual setup tutorials covering database system installations, schema generations, and raw queries.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-primary font-mono mt-3 pt-1.5 border-t border-outline-variant/10">
                      VISIT CHANNEL <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/@CalebTheVideoMaker2" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-surface hover:bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 flex flex-col justify-between group transition-all duration-300 pointer cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          Database Design Series
                        </span>
                        <Play className="w-3.5 h-3.5 text-primary fill-primary/10 group-hover:scale-110 transition-transform" />
                      </div>
                      <h5 className="font-display font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        Caleb Curry
                      </h5>
                      <p className="text-[10px] text-on-surface-variant/60 leading-normal font-sans pt-1">
                        Engaging and light-hearted database normalization deepdives, indices configs, and relational constraints.
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
