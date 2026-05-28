import { useState, useMemo } from 'react';
import { 
  Home as HomeIcon, 
  Search, 
  GraduationCap, 
  BookmarkCheck, 
  Settings as SettingsIcon, 
  BookOpen, 
  Clock, 
  Code, 
  Award, 
  Sparkles, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ChevronRight, 
  HelpCircle, 
  Play, 
  Cpu, 
  Database, 
  Laptop, 
  Layers, 
  BookOpen as BookIcon,
  CheckCircle,
  Brain
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import CustomLogo from '../components/CustomLogo';
import MobileBottomNav from '../components/MobileBottomNav';
import Sidebar from '../components/Sidebar';

// Types inside the page structure
interface Subject {
  code: string;
  name: string;
  credits: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Completed' | 'In Progress' | 'Not Started';
  topics: string[];
  examQuestions?: {
    q: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

interface Semester {
  num: number;
  title: string;
  subjects: Subject[];
}

interface Degree {
  id: string;
  name: string;
  fullName: string;
  duration: string;
  description: string;
  semesters: Semester[];
}

interface TechCourse {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  duration: string;
  description: string;
  concepts: string[];
  bgColor: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
  playgroundCode?: string;
  playgroundOutput?: string;
  examQuestions: {
    q: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

// ----------------------------------------------------
// Real, Comprehensive Academic Programs Data
// ----------------------------------------------------
const ACADEMIC_PROGRAMS: Degree[] = [
  {
    id: 'btech',
    name: 'B.Tech',
    fullName: 'Bachelor of Technology (Computer Science & Engineering)',
    duration: '4 Years (8 Semesters)',
    description: 'An intensive engineering degree covering computation systems, hardware architecture, advanced algorithmic solutions, and full-stack software development pipelines.',
    semesters: [
      {
        num: 1,
        title: 'Semester 1: Foundation of Engineering',
        subjects: [
          { 
            code: 'BT-101', 
            name: 'Engineering Mathematics I', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'Completed', 
            topics: ['Differential Calculus', 'Matrix Eigenvalues & Vectors', 'Taylor and Maclaurin Series Expansion'],
            examQuestions: [
              {
                q: 'What is the limit of (sin x) / x as x approaches 0?',
                options: ['0', '1', 'Infinity', 'Undetermined'],
                answerIndex: 1,
                explanation: 'By L\'Hopital\'s rule or standard trigonometric limit expansions, the limit of sin(x)/x when x approaches 0 is 1.'
              },
              {
                q: 'Which of the following is true for an orthogonal matrix A?',
                options: ['A^T = A^-1', 'A^T = A', 'Determinant is always 0', 'A^-1 does not exist'],
                answerIndex: 0,
                explanation: 'A matrix A is orthogonal if A * A^T = I. Therefore, the transpose of A (A^T) equals its inverse (A^-1).'
              }
            ]
          },
          { 
            code: 'BT-102', 
            name: 'Engineering Physics', 
            credits: 4, 
            difficulty: 'Medium', 
            status: 'Completed', 
            topics: ['Wave Interference & Diffraction', 'Heisenberg Uncertainty Principle', 'Solid State Semiconductors'],
            examQuestions: [
              {
                q: 'What does Heisenberg\'s Uncertainty Principle link?',
                options: ['Force & Acceleration', 'Position & Momentum', 'Mass & Velocity', 'Energy & Entropy'],
                answerIndex: 1,
                explanation: 'It states that the position and momentum of a particle cannot be simultaneously measured with arbitrary precision (Δx * Δp >= h/4π).'
              }
            ]
          },
          { 
            code: 'BT-103', 
            name: 'Programming for Problem Solving (C)', 
            credits: 3, 
            difficulty: 'Medium', 
            status: 'Completed', 
            topics: ['Loops & Arrays Manipulation', 'Dynamic Memory Management', 'Pointers & Dynamic Structures'],
            examQuestions: [
              {
                q: 'What is the size of a pointer variable in C in a 64-bit environment?',
                options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on pointed data type'],
                answerIndex: 2,
                explanation: 'In standard modern 64-bit operating architectures, memory addresses are 64 bits wide, which corresponds to 8 bytes.'
              }
            ]
          }
        ]
      },
      {
        num: 2,
        title: 'Semester 2: Core Engineering Foundations',
        subjects: [
          { 
            code: 'BT-201', 
            name: 'Engineering Mathematics II', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'Completed', 
            topics: ['Ordinary Differential Equations', 'Vector calculus (Green & Stokes theorem)', 'Complex Integrations'],
            examQuestions: [
              {
                q: 'What does the divergence of a vector field measure?',
                options: ['Net flux expansion or contraction', 'Rotation intensity', 'Translational velocity', 'Dimensional span'],
                answerIndex: 0,
                explanation: 'Divergence measures the rate of flow leaving or entering any infinitesimal point.'
              }
            ]
          },
          { 
            code: 'BT-202', 
            name: 'Object Oriented Programming (C++)', 
            credits: 3, 
            difficulty: 'Easy', 
            status: 'Completed', 
            topics: ['Encapsulation & Message Passing', 'Inheritance Hierarchies', 'Polymorphic Runtime Resolution'],
            examQuestions: [
              {
                q: 'Which C++ keyword permits runtime polymorphic binding of class methods?',
                options: ['static', 'friend', 'virtual', 'override'],
                answerIndex: 2,
                explanation: 'Marking a base class member method as "virtual" ensures that Calls are bound dynamically at runtime based on the actual object type.'
              }
            ]
          }
        ]
      },
      {
        num: 3,
        title: 'Semester 3: Computation & Logic',
        subjects: [
          { 
            code: 'BT-301', 
            name: 'Data Structures & Algorithms', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'In Progress', 
            topics: ['Asymptotic Notation (Big O)', 'Linked Lists, Stacks, Queues', 'BST, AVL & Red-Black Trees', 'Graph DFS/BFS & Shortest Path'],
            examQuestions: [
              {
                q: 'What is the worst-case time complexity of lookup in a balanced AVL tree?',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                answerIndex: 1,
                explanation: 'Because AVL trees strictly enforce depth balance, their height remains restricted to O(log n), guaranteeing logarithmic lookup time.'
              },
              {
                q: 'Which graph traversal technique employs a Queue queue structure?',
                options: ['Depth First Search (DFS)', 'Breadth First Search (BFS)', 'Dijkstra Routing', 'Kruskal\'s Spanning Tree'],
                answerIndex: 1,
                explanation: 'BFS explores vertices layer-by-layer, which relies on a First-In-First-Out (FIFO) queue structure to track unvisited adjacent nodes.'
              }
            ]
          },
          { 
            code: 'BT-302', 
            name: 'Computer Organization & Architecture', 
            credits: 3, 
            difficulty: 'Medium', 
            status: 'In Progress', 
            topics: ['MIPS Instruction Cycle', 'Cache Mapping Policies (LRU & Direct)', 'Pipelining hazards & bypasses']
          }
        ]
      },
      {
        num: 4,
        title: 'Semester 4: Low-level Systems & Automata',
        subjects: [
          { 
            code: 'BT-401', 
            name: 'Operating Systems', 
            credits: 4, 
            difficulty: 'Medium', 
            status: 'Not Started', 
            topics: ['Virtual Paged Memory & TLB caches', 'Process Deadlock Prevention (Bankers)', 'Critical Section semaphores']
          },
          { 
            code: 'BT-402', 
            name: 'Theory of Automata & Formal Languages', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'Not Started', 
            topics: ['Deterministic Finite Automata (DFA)', 'Context-Free Grammars (CFG)', 'Turing Machine solvabilities']
          }
        ]
      }
    ]
  },
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    duration: '3 Years (6 Semesters)',
    description: 'A professional curriculum tailored for entry-level software scripting, application maintenance, dynamic web design, and digital relational databases.',
    semesters: [
      {
        num: 1,
        title: 'Semester 1: Introduction to Computing',
        subjects: [
          { 
            code: 'BC-101', 
            name: 'Computer Fundamentals & Office', 
            credits: 3, 
            difficulty: 'Easy', 
            status: 'Completed', 
            topics: ['CPU component blocks', 'Binary representation', 'Essential Windows/Linux OS Command lines']
          },
          { 
            code: 'BC-102', 
            name: 'Programming foundations in C', 
            credits: 4, 
            difficulty: 'Medium', 
            status: 'Completed', 
            topics: ['Data structures types', 'Decision controls (switch, if)', 'One-dimensional arrays'],
            examQuestions: [
              {
                q: 'Which of the following describes an array variable in C?',
                options: ['Non-contiguous memory positions', 'Homogeneous contiguous memory', 'Unstructured heap allocations', 'Dynamic resize vectors'],
                answerIndex: 1,
                explanation: 'An array provides homogeneous elements stored in absolutely contiguous memory addresses.'
              }
            ]
          }
        ]
      },
      {
        num: 2,
        title: 'Semester 2: Structured Logic',
        subjects: [
          { 
            code: 'BC-201', 
            name: 'Data Structures using C', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'Completed', 
            topics: ['Stack Push & Pop implementations', 'Circular queue loops', 'Binary Search routines']
          },
          { 
            code: 'BC-202', 
            name: 'Management Information System (MIS)', 
            credits: 3, 
            difficulty: 'Easy', 
            status: 'Completed', 
            topics: ['Corporate databases architectures', 'DSS (Decision Support)', 'E-Commerce systems']
          }
        ]
      },
      {
        num: 3,
        title: 'Semester 3: Web & DB Integration',
        subjects: [
          { 
            code: 'BC-301', 
            name: 'Database Management Basics', 
            credits: 4, 
            difficulty: 'Medium', 
            status: 'In Progress', 
            topics: ['Entity-Relationship notation (ERD)', 'SQL Queries (SELECT, WHERE, JOIN)', 'First, Second & Third Normal forms'],
            examQuestions: [
              {
                q: 'Which normal form focuses on removing transitive functional dependency?',
                options: ['1NF', '2NF', '3NF', 'BCNF'],
                answerIndex: 2,
                explanation: 'A relation schema is in 3NF if there are no transitive functional dependencies for non-prime attributes.'
              }
            ]
          },
          { 
            code: 'BC-302', 
            name: 'Web Technologies (HTML, CSS & JS)', 
            credits: 3, 
            difficulty: 'Easy', 
            status: 'In Progress', 
            topics: ['Document Object Model (DOM)', 'Flexbox styles', 'Interactive Click events']
          }
        ]
      },
      {
        num: 4,
        title: 'Semester 4: Advanced Application Design',
        subjects: [
          { 
            code: 'BC-401', 
            name: 'Java Programming', 
            credits: 4, 
            difficulty: 'Medium', 
            status: 'Not Started', 
            topics: ['JVM execution environment', 'Class inheritance & Packages', 'JDBC MySQL connectors']
          }
        ]
      }
    ]
  },
  {
    id: 'mba',
    name: 'MBA',
    fullName: 'Master of Business Administration',
    duration: '2 Years (4 Semesters)',
    description: 'A global business management certification detailing accounting parameters, strategy models, human resources management, and digital marketing trends.',
    semesters: [
      {
        num: 1,
        title: 'Semester 1: Business Management Core',
        subjects: [
          { 
            code: 'MB-101', 
            name: 'Management Principles & Practice', 
            credits: 3, 
            difficulty: 'Easy', 
            status: 'Completed', 
            topics: ['Fayols 14 Management Principles', 'Hierarchy design', 'Motivation Models']
          },
          { 
            code: 'MB-102', 
            name: 'Managerial Economics', 
            credits: 3, 
            difficulty: 'Medium', 
            status: 'Completed', 
            topics: ['Supply and demand charts', 'Monopoly market pricing', 'Marginal Utility analytics']
          },
          { 
            code: 'MB-103', 
            name: 'Financial Accounting', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'Completed', 
            topics: ['Double entry ledgers', 'Trial balances, Income statements', 'Asset & Depreciation evaluations'],
            examQuestions: [
              {
                q: 'Which equation correctly expresses the Accounting Balance Equation?',
                options: ['Assets = Liabilities - Equity', 'Assets = Liabilities + Owner\'s Equity', 'Liabilities = Assets + Equity', 'Equity = Assets + Liabilities'],
                answerIndex: 1,
                explanation: 'The foundation of double-entry bookkeeping states that everything a business owns (Assets) is funded by foreign debts (Liabilities) and internal investments (Equity).'
              }
            ]
          }
        ]
      },
      {
        num: 2,
        title: 'Semester 2: Strategic Control Units',
        subjects: [
          { 
            code: 'MB-201', 
            name: 'Financial Management Strategy', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'Completed', 
            topics: ['Capital budgeting models (NPV, IRR)', 'WACC formula', 'Working Capital management']
          },
          { 
            code: 'MB-202', 
            name: 'Human Resource Management', 
            credits: 3, 
            difficulty: 'Easy', 
            status: 'Completed', 
            topics: ['Employee recruitment campaigns', 'Balanced Scorecard performance metrics', 'Labor dispute settlements']
          }
        ]
      },
      {
        num: 3,
        title: 'Semester 3: Modern Channels Specialization',
        subjects: [
          { 
            code: 'MB-301', 
            name: 'Strategic Management Ethics', 
            credits: 3, 
            difficulty: 'Medium', 
            status: 'In Progress', 
            topics: ['Porters Five Forces evaluation', 'BCG Growth matrix', 'Corporate ethical conduct guidelines'],
            examQuestions: [
              {
                q: 'In Porter\'s Five Forces model, which force evaluates the ease of entry for new players?',
                options: ['Buyer bargaining power', 'Supplier bargaining power', 'Threat of New Entrants', 'Competitive Rivalry'],
                answerIndex: 2,
                explanation: 'The "Threat of New Entrants" force analyzes barriers to entry, such as patents, initial capital outlay, and scale efficiencies.'
              }
            ]
          },
          { 
            code: 'MB-302', 
            name: 'Digital & Content Marketing', 
            credits: 3, 
            difficulty: 'Easy', 
            status: 'In Progress', 
            topics: ['Google AdWords budget allocation', 'Keyword indexing (SEO)', 'Click-Through Rate evaluation']
          }
        ]
      },
      {
        num: 4,
        title: 'Semester 4: Enterprise Capstone',
        subjects: [
          { 
            code: 'MB-401', 
            name: 'Corporate Governance', 
            credits: 3, 
            difficulty: 'Easy', 
            status: 'Not Started', 
            topics: ['Board obligations', 'Sarbanes-Oxley audit standards', 'Whistleblower frameworks']
          },
          { 
            code: 'MB-402', 
            name: 'Entrepreneurial VC Planning', 
            credits: 3, 
            difficulty: 'Medium', 
            status: 'Not Started', 
            topics: ['Cap table configuration', 'Pre-/Post-money valuation metrics', 'Pitch deck frameworks']
          }
        ]
      }
    ]
  },
  {
    id: 'bpharmacy',
    name: 'B.Pharmacy',
    fullName: 'Bachelor of Pharmacy',
    duration: '4 Years (8 Semesters)',
    description: 'A licensed medical-scientific program assessing biological systems biochemistry, synthesis of chemical drug formulas, extraction of compounds, and patient safety precautions.',
    semesters: [
      {
        num: 1,
        title: 'Semester 1: Biological & Analytical Foundations',
        subjects: [
          { 
            code: 'BP-101', 
            name: 'Human Anatomy & Physiology I', 
            credits: 4, 
            difficulty: 'Medium', 
            status: 'Completed', 
            topics: ['Cell structure reproduction', 'Skeletal bone system layout', 'Circulatory blood flow systems'],
            examQuestions: [
              {
                q: 'Which organ acts as the central pump in the human cardiovascular system?',
                options: ['Lungs', 'Liver', 'Heart', 'Kidneys'],
                answerIndex: 2,
                explanation: 'The heart is the primary organ containing coordinated ventricles that distribute oxygenated/deoxygenated blood throughout the body.'
              }
            ]
          },
          { 
            code: 'BP-102', 
            name: 'Pharmaceutical Chemistry I', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'Completed', 
            topics: ['Impurities determination limits', 'Acid-Base neutralizations buffers', 'Astringent compounds']
          }
        ]
      },
      {
        num: 2,
        title: 'Semester 2: Bioenergetics & Organic Bases',
        subjects: [
          { 
            code: 'BP-201', 
            name: 'Pharmaceutical Organic Chemistry I', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'Completed', 
            topics: ['Isomerisms classifications', 'Alkyl Halides substitution mechanisms (SN1, SN2)', 'Electrophilic Addition reactions']
          },
          { 
            code: 'BP-202', 
            name: 'Biochemistry in Pharmacy', 
            credits: 4, 
            difficulty: 'Hard', 
            status: 'Completed', 
            topics: ['Glycolysis ATP processing', 'Urea Cycle steps', 'Nucleic Acid translation processes'],
            examQuestions: [
              {
                q: 'What is the net gain of ATP molecules produced directly during anaerobic Glycolysis?',
                options: ['2 ATP', '8 ATP', '36 ATP', '38 ATP'],
                answerIndex: 0,
                explanation: 'Anaerobic glycolysis yields a net of 2 ATP molecules per oxidized glucose molecule (4 produced, 2 consumed).'
              }
            ]
          }
        ]
      },
      {
        num: 3,
        title: 'Semester 3: Compounding & Sterility',
        subjects: [
          { 
            code: 'BP-301', 
            name: 'Pharmaceutical Microbiology', 
            credits: 4, 
            difficulty: 'Medium', 
            status: 'In Progress', 
            topics: ['Gram staining tests', 'Sterilization techniques (Autoclaving)', 'Antibiotics bacterial testing'],
            examQuestions: [
              {
                q: 'Which primary parameters govern sterilization inside a steam Autoclave?',
                options: ['121°C temperature and 15 psi pressure', '100°C temperature and ambient open airflow', '180°C hot dry oven baking', 'Radiation waves exposure'],
                answerIndex: 0,
                explanation: 'Autoclaving typically operates at 121°C at 15 psi steam pressure for 15-20 minutes to disrupt all bacterial spores.'
              }
            ]
          },
          { 
            code: 'BP-302', 
            name: 'Physical Pharmaceutics I', 
            credits: 4, 
            difficulty: 'Medium', 
            status: 'In Progress', 
            topics: ['Diffusion states & kinetics', 'Surface tension active factors', 'Complexation drug carriers']
          }
        ]
      },
      {
        num: 4,
        title: 'Semester 4: Medicinal Mechanisms',
        subjects: [
          { 
            code: 'BP-401', 
            name: 'Pharmacology I (ADME Basics)', 
            credits: 4, 
            difficulty: 'Medium', 
            status: 'Not Started', 
            topics: ['Absorption channels & gastric pH', 'Metabolic enzymes (Cytochrome P450)', 'Drug clearance filters']
          }
        ]
      }
    ]
  }
];

// ----------------------------------------------------
// Practical Technology / Skill Courses Data
// ----------------------------------------------------
const TECHNOLOGY_COURSES: TechCourse[] = [
  {
    id: 'html-css',
    title: 'HTML & CSS Design',
    subtitle: 'Responsive Layouts & Architecture',
    difficulty: 'Easy',
    rating: 4.8,
    duration: '20 Hours',
    description: 'Acquire absolute mastery over semantic tags, layout systems (Flexbox vs CSS Grid), fluid typography ratios, and tailored Tailwind spacing utilities.',
    concepts: [
      'Semantic document markup (Accessibility standard)',
      'Aesthetic Multi-column configurations (CSS Grid & Flexbox)',
      'Adaptive spacing constraints (Mobile-Responsive rules)',
      'Modern styling layouts (Tailwind CSS theme parameters)'
    ],
    bgColor: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-orange-500/20',
    textColor: 'text-orange-600',
    accentColor: 'bg-orange-600',
    playgroundCode: `<div className="p-6 bg-orange-50 border border-orange-200 rounded-2xl shadow-sm text-center">
  <h4 className="text-orange-800 font-black text-xl mb-1">Interactive Container</h4>
  <p className="text-orange-700 font-mono text-xs">Styled elegantly with tailwind utility classes.</p>
</div>`,
    playgroundOutput: 'Styled border-orange-200 container rendering correctly.',
    examQuestions: [
      {
        q: 'Which element is semantically correct for representing main navigational links?',
        options: ['<nav>', '<div id="nav">', '<links>', '<section-nav>'],
        answerIndex: 0,
        explanation: 'The <nav> element represents a structural section of a document intended for navigation link lists.'
      },
      {
        q: 'Which CSS display mode allows aligned child resizing along both rows AND columns simultaneously?',
        options: ['display: flex', 'display: grid', 'display: inline-block', 'display: block'],
        answerIndex: 1,
        explanation: 'While Flexbox behaves as a single-dimensional layout system, CSS Grid specializes in two-dimensional alignments.'
      }
    ]
  },
  {
    id: 'javascript-react',
    title: 'Web Dev & JS (React)',
    subtitle: 'Component-Based Dynamic Applications',
    difficulty: 'Hard',
    rating: 4.9,
    duration: '45 Hours',
    description: 'Learn modern JavaScript closures, callbacks, asynchronous operations alongside React hooks lifecycle, dynamic routers, and motion layouts.',
    concepts: [
      'Async / Await API fetches & error handling',
      'React Hooks state, context, & effect hooks',
      'Minimizing heavy execution re-renders in trees',
      'Polished motion transitions for view routing'
    ],
    bgColor: 'from-blue-500/10 to-indigo-500/10',
    borderColor: 'border-blue-500/20',
    textColor: 'text-blue-600',
    accentColor: 'bg-blue-600',
    playgroundCode: `function DynamicCounter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
      Count: {count}
    </button>
  );
}`,
    playgroundOutput: 'Interactive React components mounted state tracking safely.',
    examQuestions: [
      {
        q: 'What occurs if you update a React component state directly in its main execution block?',
        options: ['Nothing, it works fine', 'It triggers an infinite re-render loop', 'It outputs garbage data', 'An error prompt alerts in UI'],
        answerIndex: 1,
        explanation: 'State changes cause component re-renders. Triggering updates in compile blocks triggers an immediate infinite re-render cycle.'
      }
    ]
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    subtitle: 'Computational Efficiency & Coding Master',
    difficulty: 'Hard',
    rating: 4.9,
    duration: '60 Hours',
    description: 'Perfect for engineering interviews. Demystifies Big O notation, collections stack, tree balances (BST, AVL), backtracks, and dynamic optimization.',
    concepts: [
      'Evaluating complexity benchmarks (Big O)',
      'Implementing Linked lists, structures, queues, stacks',
      'Recursion traversals, pathfinders, & Dijkstra operations',
      'Evaluating memoized state solutions (Dynamic Programming)'
    ],
    bgColor: 'from-red-500/10 to-pink-500/10',
    borderColor: 'border-red-500/20',
    textColor: 'text-red-600',
    accentColor: 'bg-red-600',
    playgroundCode: `// Fibonacci DP Optimization
int fibonacci(int n) {
  int memo[100];
  memo[0] = 0; memo[1] = 1;
  for(int i = 2; i <= n; i++) {
    memo[i] = memo[i-1] + memo[i-2];
  }
  return memo[n];
}`,
    playgroundOutput: 'Time Complexity optimized from exponential O(2^n) to linear O(n).',
    examQuestions: [
      {
        q: 'What is the theoretical search complexity of Hash Map operations under ideal uniform hashing key conditions?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        answerIndex: 0,
        explanation: 'With direct index mapping and zero collision factors, Hash Map retrieve computations operate in O(1) constant time.'
      }
    ]
  },
  {
    id: 'python',
    title: 'Python for AI & Analytics',
    subtitle: 'Numerical computing & AI automations',
    difficulty: 'Medium',
    rating: 4.7,
    duration: '35 Hours',
    description: 'Learn computational Pandas dataframes, NumPy vectors, automated web script parsers, and machine learning models with Scikit-learn.',
    concepts: [
      'Statistical cleansing inside tabular dataframes (Pandas)',
      'Optimized linear matrix arrays (NumPy)',
      'Compiling classification neural grids (Scikit)',
      'Automated background headless scrapers'
    ],
    bgColor: 'from-emerald-500/10 to-teal-500/10',
    borderColor: 'border-emerald-500/20',
    textColor: 'text-emerald-600',
    accentColor: 'bg-emerald-600',
    playgroundCode: `import pandas as pd
df = pd.read_csv("marks.csv")
average_scores = df.groupby("semester")["score"].mean()`,
    playgroundOutput: 'Correct analytical metrics consolidated in 12ms.',
    examQuestions: [
      {
        q: 'Which Pandas method is utilized to group records based on a specific categorization column?',
        options: ['.aggregate()', '.groupby()', '.pivot_table()', '.split()'],
        answerIndex: 1,
        explanation: 'The .groupby() method performs a split-apply-combine sequence over the customized index criteria.'
      }
    ]
  },
  {
    id: 'c-prog',
    title: 'C Programming Foundation',
    subtitle: 'Low Level Computing Paradigms',
    difficulty: 'Medium',
    rating: 4.6,
    duration: '15 Hours',
    description: 'Obtain exact conceptual understanding of system storage buffers, pointers arithmetic, structural blocks, and custom linker settings.',
    concepts: [
      'Typed standard variables & scopes',
      'Pointer tracking (Address Allocation / malloc)',
      'Dynamic structures & heap blocks management',
      'Asynchronous thread bounds & link files'
    ],
    bgColor: 'from-violet-500/10 to-purple-500/10',
    borderColor: 'border-violet-500/20',
    textColor: 'text-violet-600',
    accentColor: 'bg-violet-600',
    playgroundCode: `int num = 42;
int *ptr = &num; // ptr stores address of num
printf("Value of num: %d, Accessed via pointer: %d", num, *ptr);`,
    playgroundOutput: 'Value of num: 42, Accessed via pointer: 42',
    examQuestions: [
      {
        q: 'Which library call allocates initialized bytes in Heap memory dynamically in C?',
        options: ['sizeof()', 'malloc()', 'free()', 'include'],
        answerIndex: 1,
        explanation: 'The malloc() (Memory Allocation) method requests raw heap memory space allocation returning a void pointer.'
      }
    ]
  },
  {
    id: 'database',
    title: 'Relational DBs & SQL',
    subtitle: 'Queries, Indexing & Storage Engine',
    difficulty: 'Medium',
    rating: 4.8,
    duration: '22 Hours',
    description: 'Construct advanced subqueries, leverage keys constraints, tune index search trees, and analyze ACID integrity models.',
    concepts: [
      'Crafting nested SQL structures & outer joins',
      'Designing compound indexes & scan improvements',
      'Verifying transaction isolations & logs (ACID)',
      'Comparing relative features of Document NoSQL (MongoDB)'
    ],
    bgColor: 'from-cyan-500/10 to-sky-500/10',
    borderColor: 'border-cyan-500/20',
    textColor: 'text-cyan-600',
    accentColor: 'bg-cyan-600',
    playgroundCode: `SELECT subjects.name, count(students.id) as enrolled 
FROM subjects 
LEFT JOIN students ON subjects.id = students.subject_id 
GROUP BY subjects.name;`,
    playgroundOutput: 'Tabulated relational row counts aggregated instantly.',
    examQuestions: [
      {
        q: 'What does the "I" represent inside standard Database "ACID" guidelines?',
        options: ['Index', 'Input', 'Isolation', 'Integrity'],
        answerIndex: 2,
        explanation: 'Isolation ensures concurrent execution of actions yields exact database updates as if running individually.'
      }
    ]
  }
];

interface CourseInfoProps {
  onNavigate: (route: string) => void;
}

export default function CourseInfo({ onNavigate }: CourseInfoProps) {
  const { user } = useAuth();
  
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<'academic' | 'technology'>('academic');
  
  // Selected Academic program B.Tech/BCA/MBA/Pharmacy
  const [selectedDegreeId, setSelectedDegreeId] = useState<string>('btech');
  
  // Search state across subjects and technology titles
  const [searchFilter, setSearchFilter] = useState<string>('');
  
  // Collapsible semesters state: store expanded semesters
  const [expandedSemesters, setExpandedSemesters] = useState<number[]>([1, 2, 3]);

  // Modal selector for Interactive self-test view
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTechCourse, setSelectedTechCourse] = useState<TechCourse | null>(null);
  
  // Interactive test answers state inside modal
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Toggle dynamic expansion for Semesters list
  const toggleSemester = (semNum: number) => {
    if (expandedSemesters.includes(semNum)) {
      setExpandedSemesters(expandedSemesters.filter(n => n !== semNum));
    } else {
      setExpandedSemesters([...expandedSemesters, semNum]);
    }
  };

  const expandAllSems = (sems: Semester[]) => {
    setExpandedSemesters(sems.map(s => s.num));
  };

  const collapseAllSems = () => {
    setExpandedSemesters([]);
  };

  // 1. Memoized academic degree filter based on search query
  const filteredDegree = useMemo(() => {
    const orig = ACADEMIC_PROGRAMS.find(d => d.id === selectedDegreeId);
    if (!orig) return null;
    if (!searchFilter.trim()) return orig;
    
    const query = searchFilter.toLowerCase();
    
    // Deep clone original and filter semesters/subjects matching query
    const filteredSemesters = orig.semesters.map(semester => {
      const matchingSubjects = semester.subjects.filter(
        sub => 
          sub.name.toLowerCase().includes(query) || 
          sub.code.toLowerCase().includes(query) ||
          sub.topics.some(t => t.toLowerCase().includes(query))
      );
      return {
        ...semester,
        subjects: matchingSubjects
      };
    }).filter(semester => semester.subjects.length > 0);

    return {
      ...orig,
      semesters: filteredSemesters
    };
  }, [selectedDegreeId, searchFilter]);

  // 2. Memoized Technology course search filter
  const filteredTechCourses = useMemo(() => {
    if (!searchFilter.trim()) return TECHNOLOGY_COURSES;
    const query = searchFilter.toLowerCase();
    return TECHNOLOGY_COURSES.filter(c => 
      c.title.toLowerCase().includes(query) ||
      c.subtitle.toLowerCase().includes(query) ||
      c.concepts.some(t => t.toLowerCase().includes(query)) ||
      c.description.toLowerCase().includes(query)
    );
  }, [searchFilter]);

  // Get matching program overview
  const rawDegreeObj = ACADEMIC_PROGRAMS.find(d => d.id === selectedDegreeId);

  // Trigger detailed self-checker modal
  const openSubjectModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedTechCourse(null);
    setTestAnswers({});
    setQuizSubmitted(false);
  };

  const openTechModal = (tc: TechCourse) => {
    setSelectedTechCourse(tc);
    setSelectedSubject(null);
    setTestAnswers({});
    setQuizSubmitted(false);
  };

  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return; // Lock options once submitted
    setTestAnswers({
      ...testAnswers,
      [questionIndex]: optionIndex
    });
  };

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background overflow-hidden relative font-sans">
      <SEO 
        title="Course Information" 
        description="Comprehensive dynamic curriculum browser for B.Tech, BCA, MBA, B.Pharmacy, and fundamental computer technology modules."
        keywords="BTech Syllabus, BCA Program, MBA Subjects, BPharmacy Semester, Web Dev, Python course, DSA Practice"
      />
      
      {/* Primary Desktop Left Navigation Sidebar */}
      <Sidebar activeTab="courseinfo" onNavigate={onNavigate} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#F9F9FB] dark:bg-background pb-24 md:pb-10">
        
        {/* Upper Dashboard Sub-Header banner */}
        <div className="bg-white dark:bg-surface border-b border-outline-variant/30 px-4 sm:px-10 py-6 md:py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-primary/10 text-primary text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Curriculums Hub</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-on-surface-variant font-mono">Semester-wise Tracker</span>
              </div>
              <h1 className="font-display font-medium text-2xl md:text-3xl text-on-surface leading-tight">Course Information</h1>
              <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">
                Browse official university courses, semester syllabus divisions, and interactive learning guidelines.
              </p>
            </div>
            
            {/* Double Search Bar Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search subject, syllabus, or coding tech..." 
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 placeholder-on-surface-variant/40 text-on-surface text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-sans"
              />
              {searchFilter && (
                <button 
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Mode Toggle - Capsule design */}
        <div className="px-4 sm:px-10 py-6 max-w-6xl mx-auto w-full">
          <div className="flex justify-center mb-8">
            <div className="bg-[#EEEDEA] dark:bg-surface-container/60 p-1 rounded-full flex gap-1 w-full max-w-sm sm:max-w-md shadow-inner border border-transparent dark:border-outline-variant/10">
              <button
                onClick={() => { setActiveTab('academic'); }}
                className={cn(
                  "flex-1 py-2 sm:py-2.5 px-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5",
                  activeTab === 'academic' 
                    ? "bg-white dark:bg-surface-container text-primary shadow-sm" 
                    : "text-on-surface-variant/80 dark:text-on-surface-variant hover:text-on-surface"
                )}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                Academic Programs
              </button>
              <button
                onClick={() => { setActiveTab('technology'); }}
                className={cn(
                  "flex-1 py-2 sm:py-2.5 px-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5",
                  activeTab === 'technology' 
                    ? "bg-white dark:bg-surface-container text-[#5F00E6] dark:text-violet-400 shadow-sm" 
                    : "text-on-surface-variant/80 dark:text-on-surface-variant hover:text-on-surface"
                )}
              >
                <Code className="w-4 h-4 shrink-0" />
                Technology Skills
              </button>
            </div>
          </div>

          {/* SEARCH ALERT TAG */}
          {searchFilter && (
            <div className="mb-6 p-3 bg-primary/5 border border-primary/10 rounded-xl text-xs text-primary flex items-center justify-between">
              <span className="font-medium">Showing search matches for: "{searchFilter}"</span>
              <button onClick={() => setSearchFilter('')} className="underline text-[10px] font-bold uppercase hover:opacity-80">Clear Filter</button>
            </div>
          )}

          {/* ----------------------------------------------------
              SECTION A: Academic Programs Course View
             ---------------------------------------------------- */}
          <AnimatePresence mode="wait">
            {activeTab === 'academic' && (
              <motion.div
                key="academic-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                id="academic-course-portal"
              >
                {/* Academic Course Selector with Dropdown Picker */}
                <div className="bg-surface border border-outline-variant/20 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <label htmlFor="course-select-picker" className="text-[10px] font-mono font-bold tracking-wider text-primary block uppercase">
                      🎓 Choose Your Academic Course:
                    </label>
                    <span className="text-[11px] sm:text-xs text-on-surface-variant font-medium block">
                      Select a custom degree to load its semester-wise curriculum
                    </span>
                  </div>
                  <div className="relative w-full sm:w-64 shrink-0">
                    <select
                      id="course-select-picker"
                      value={selectedDegreeId}
                      onChange={(e) => setSelectedDegreeId(e.target.value)}
                      className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 text-on-surface text-xs font-bold rounded-xl pl-3 pr-8 py-2.5 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer appearance-none font-sans"
                    >
                      {ACADEMIC_PROGRAMS.map((prog) => (
                        <option key={prog.id} value={prog.id}>
                          {prog.name} - {prog.fullName}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Horizontal program cards list (B.Tech, BCA, MBA, B.Pharmacy) */}
                <div className="hidden sm:flex overflow-x-auto gap-3 pb-3 scrollbar-none scroll-smooth">
                  {ACADEMIC_PROGRAMS.map((prog) => {
                    const isSelected = selectedDegreeId === prog.id;
                    return (
                      <button
                        key={prog.id}
                        onClick={() => setSelectedDegreeId(prog.id)}
                        className={cn(
                          "flex-1 min-w-[155px] sm:min-w-[180px] text-left p-3 sm:p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden select-none shrink-0 group",
                          isSelected 
                            ? "bg-surface border-primary shadow-md ring-1 ring-primary/20" 
                            : "bg-surface/80 dark:bg-surface-container/40 border-outline-variant/30 hover:border-outline-variant hover:bg-surface dark:hover:bg-surface-container/60"
                        )}
                        id={`program-tab-${prog.id}`}
                      >
                        {/* Selected overlay accent indicator */}
                        {isSelected && (
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                        )}
                        
                        <div className="flex items-center gap-2 mb-1">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            isSelected ? "bg-primary/10 text-primary" : "bg-surface-container-high text-on-surface-variant group-hover:bg-primary/5 group-hover:text-primary transition-colors"
                          )}>
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-on-surface-variant/60">{prog.duration.split(' ')[0]} Yrs</span>
                        </div>
                        
                        <h3 className="font-display font-black text-sm text-on-surface tracking-tight leading-none mb-1">{prog.name}</h3>
                        <p className="text-[10px] text-on-surface-variant leading-tight line-clamp-1">{prog.fullName.replace(/(Bachelor of |Master of )/, '')}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Selected degree summary banner */}
                {rawDegreeObj && (
                  <div className="p-4 sm:p-6 bg-surface border border-outline-variant/30 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <h2 className="font-display font-black text-lg sm:text-xl text-on-surface flex items-center gap-1.5">
                        {rawDegreeObj.fullName}
                        <span className="text-xs bg-primary/15 font-mono text-primary px-2.5 py-0.5 rounded-full font-bold">{rawDegreeObj.name}</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {rawDegreeObj.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 bg-[#FAF9F5] dark:bg-surface-container p-3 rounded-2xl border border-outline-variant/20 dark:border-outline-variant/10 self-stretch md:self-auto justify-between md:justify-start">
                      <div className="text-center md:text-left">
                        <span className="text-[9px] font-mono text-on-surface-variant/60 uppercase block">Duration</span>
                        <span className="text-xs sm:text-sm font-bold text-on-surface">{rawDegreeObj.duration}</span>
                      </div>
                      <div className="w-[1px] h-8 bg-outline-variant/30" />
                      <div className="text-center md:text-left">
                        <span className="text-[9px] font-mono text-on-surface-variant/60 uppercase block">Semesters</span>
                        <span className="text-xs sm:text-sm font-bold text-on-surface">{rawDegreeObj.semesters.length} Core</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Collapsible Action Buttons: Expand-all / Collapse-all */}
                {filteredDegree && filteredDegree.semesters.length > 0 && (
                  <div className="flex justify-between items-center bg-white/50 dark:bg-surface/50 p-2 rounded-xl backdrop-blur-sm">
                    <span className="text-[11px] font-mono text-on-surface-variant">
                      Showing {filteredDegree.semesters.length} semester divisions
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => expandAllSems(filteredDegree.semesters)}
                        className="text-[10px] font-mono font-bold bg-surface dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 px-2.5 py-1 rounded-md hover:bg-surface-container-low transition-colors text-on-surface"
                      >
                        Expand All
                      </button>
                      <button 
                        onClick={collapseAllSems} 
                        className="text-[10px] font-mono font-bold bg-surface dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 px-2.5 py-1 rounded-md hover:bg-surface-container-low transition-colors text-on-surface"
                      >
                        Collapse All
                      </button>
                    </div>
                  </div>
                )}

                {/* Render Semesters Accordions */}
                <div className="space-y-4">
                  {filteredDegree && filteredDegree.semesters.length > 0 ? (
                    filteredDegree.semesters.map((semester) => {
                      const isExpanded = expandedSemesters.includes(semester.num);
                      return (
                        <div 
                          key={semester.num}
                          className="bg-surface border border-outline-variant/20 dark:border-outline-variant/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          id={`semester-accordion-block-${semester.num}`}
                        >
                          {/* Semester trigger header */}
                          <button
                            onClick={() => toggleSemester(semester.num)}
                            className="w-full flex items-center justify-between p-4 sm:p-5 text-left border-b border-outline-variant/10 hover:bg-surface-container-lowest/50 transition-colors"
                            aria-expanded={isExpanded}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-xs text-on-surface font-mono">
                                S{semester.num}
                              </div>
                              <div>
                                <h3 className="font-display font-medium text-sm sm:text-base text-on-surface leading-tight">
                                  {semester.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] text-on-surface-variant flex items-center gap-1">
                                    <BookIcon className="w-3 h-3 text-primary" /> {semester.subjects.length} Core Subjects
                                  </span>
                                  <span className="w-1 h-1 rounded-full bg-on-surface-variant/30" />
                                  <span className="text-[10px] text-on-surface-variant">
                                    Total Credits: {semester.subjects.reduce((sum, s) => sum + s.credits, 0)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="p-1 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </button>

                          {/* Subject cards expansion view */}
                          {isExpanded && (
                            <div className="p-3 sm:p-5 bg-[#FAF9F6]/50 dark:bg-surface-container/20 border-t border-outline-variant/5">
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                                {semester.subjects.map((sub) => {
                                  const isCompleted = sub.status === 'Completed';
                                  const isInProgress = sub.status === 'In Progress';
                                  
                                  return (
                                    <div 
                                      key={sub.code}
                                      onClick={() => openSubjectModal(sub)}
                                      className="bg-surface border border-outline-variant/30 rounded-xl p-2.5 sm:p-4 shadow-sm hover:shadow hover:border-primary/30 transition-all cursor-pointer flex flex-col justify-between group"
                                      id={`academic-subject-card-${sub.code}`}
                                    >
                                      <div>
                                        {/* Row 1: Code and badging difficulty */}
                                        <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-1 mb-2">
                                          <span className="font-mono text-[8px] sm:text-[9.5px] font-black text-on-surface-variant/70 tracking-wider bg-surface-container-high px-1.5 sm:px-2 py-0.5 rounded uppercase self-start">
                                            {sub.code}
                                          </span>
                                          <div className="flex flex-wrap items-center gap-1">
                                            {/* Difficulty Badge */}
                                            <span className={cn(
                                              "text-[7px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider",
                                              sub.difficulty === 'Hard' && "bg-red-50 text-red-600",
                                              sub.difficulty === 'Medium' && "bg-amber-50 text-amber-600",
                                              sub.difficulty === 'Easy' && "bg-emerald-50 text-emerald-600"
                                            )}>
                                              {sub.difficulty}
                                            </span>

                                            {/* Status Badge */}
                                            <span className={cn(
                                              "text-[7px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full",
                                              isCompleted && "bg-green-100 text-green-700",
                                              isInProgress && "bg-blue-100 text-blue-700",
                                              sub.status === 'Not Started' && "bg-slate-100 text-slate-500"
                                            )}>
                                              {sub.status}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Subject Title */}
                                        <h4 className="font-display font-bold text-xs sm:text-sm text-on-surface line-clamp-2 mb-1.5 group-hover:text-primary transition-colors leading-tight">
                                          {sub.name}
                                        </h4>
                                        
                                        {/* Subject conceptual topics pills */}
                                        <div className="hidden sm:flex flex-wrap gap-1 mb-3">
                                          {sub.topics.slice(0, 2).map((topic, index) => (
                                            <span key={index} className="text-[10px] text-on-surface-variant/70 border border-outline-variant/30 px-1.5 py-0.5 rounded bg-surface-container-low max-w-[120px] truncate">
                                              {topic}
                                            </span>
                                          ))}
                                          {sub.topics.length > 2 && (
                                            <span className="text-[9px] text-on-surface-variant/50 font-mono self-center">
                                              +{sub.topics.length - 2} more
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      {/* Lower Panel: Credits & dynamic self quiz badge trigger */}
                                      <div className="pt-2 border-t border-outline-variant/20 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 text-[9px] sm:text-[11px] font-mono mt-2">
                                        <div className="text-on-surface-variant/70">
                                          Credits: <span className="font-bold text-on-surface">{sub.credits} U</span>
                                        </div>
                                        <div className="text-primary hover:underline font-bold flex items-center gap-0.5 shrink-0 self-end xs:self-auto">
                                          Practice MCQ <ChevronRight className="w-3 h-3" />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-surface border border-outline-variant/20 rounded-3xl p-8 text-center max-w-lg mx-auto shadow-sm">
                      <p className="text-base text-on-surface font-semibold mb-1">No Academic Subjects found</p>
                      <p className="text-xs text-on-surface-variant">We couldn't check off any courses matching your parameter filters. Please refine your search keyword term.</p>
                      <button onClick={() => setSearchFilter('')} className="mt-4 bg-primary text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-xl shadow-md">Reset Search filter</button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                SECTION B: Technology & Practical Skills View
               ---------------------------------------------------- */}
            {activeTab === 'technology' && (
              <motion.div
                key="technology-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                id="technology-course-portal"
              >
                {/* Responsive Tech Section banner overview */}
                <div className="p-4 sm:p-6 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 border border-violet-100 dark:border-violet-900/30 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="space-y-0.5">
                    <h2 className="font-display font-medium text-lg text-violet-950 dark:text-violet-200 flex items-center gap-1.5">
                      <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
                      Practical Skill Foundations
                    </h2>
                    <p className="text-xs sm:text-sm text-violet-800 dark:text-violet-300 max-w-2xl leading-relaxed">
                      Equip your career with contemporary algorithms, structured databases, and fluid scripting architectures explicitly designed to match modern job profiles.
                    </p>
                  </div>
                  <div className="bg-white/80 dark:bg-surface border border-violet-200 dark:border-violet-900/40 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1 cursor-pointer shrink-0">
                    <Award className="w-4 h-4 text-violet-700 dark:text-violet-300 shrink-0" /> Interactive MCQ Playground
                  </div>
                </div>

                {/* Grid of Technological Skills Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
                  {filteredTechCourses.length > 0 ? (
                    filteredTechCourses.map((tc) => {
                      return (
                        <div 
                          key={tc.id} 
                          onClick={() => {
                            if (tc.id === 'c-prog') {
                              onNavigate('cprogram');
                            } else if (tc.id === 'python') {
                              onNavigate('pythonprogram');
                            } else if (tc.id === 'html-css') {
                              onNavigate('htmlcssprogram');
                            } else if (tc.id === 'dsa') {
                              onNavigate('dsaprogram');
                            } else if (tc.id === 'database') {
                              onNavigate('dbmsprogram');
                            } else if (tc.id === 'javascript-react') {
                              onNavigate('webdevprogram');
                            } else {
                              openTechModal(tc);
                            }
                          }}
                          className={cn(
                            "bg-surface border rounded-2xl p-3 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-pointer border-outline-variant/30 dark:border-outline-variant/15",
                            `hover:border-violet-300 dark:hover:border-violet-555`
                          )}
                          id={`tech-skill-card-${tc.id}`}
                        >
                          <div>
                            {/* Horizontal Line header indicator color */}
                            <div className={cn("absolute top-0 inset-x-0 h-1", tc.accentColor)} />

                            <div className="flex items-center justify-between mb-2.5 pt-1">
                              {/* Tech icon category shape indicator */}
                              <div className={cn(
                                "w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br",
                                tc.bgColor
                              )}>
                                {tc.id === 'html-css' && <Laptop className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", tc.textColor)} />}
                                {tc.id === 'javascript-react' && <Layers className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", tc.textColor)} />}
                                {tc.id === 'dsa' && <Code className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", tc.textColor)} />}
                                {tc.id === 'python' && <Brain className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", tc.textColor)} />}
                                {tc.id === 'c-prog' && <Cpu className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", tc.textColor)} />}
                                {tc.id === 'database' && <Database className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", tc.textColor)} />}
                              </div>

                              {/* Rating & difficulty parameters */}
                              <div className="flex items-center gap-1.5">
                                <span className={cn(
                                  "text-[7px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider",
                                  tc.difficulty === 'Hard' && "bg-red-50 text-red-600",
                                  tc.difficulty === 'Medium' && "bg-amber-50 text-amber-600",
                                  tc.difficulty === 'Easy' && "bg-emerald-50 text-emerald-600"
                                )}>
                                  {tc.difficulty}
                                </span>
                                <span className="font-mono text-[9px] sm:text-xs font-bold text-on-surface-variant flex items-center gap-0.5">
                                  ★ {tc.rating}
                                </span>
                              </div>
                            </div>

                            <span className="font-mono text-[8.5px] sm:text-[9px] font-black text-on-surface-variant/40 tracking-wider block uppercase mb-0.5">
                              {tc.duration} Course
                            </span>
                            <h3 className="font-display font-bold text-xs sm:text-base text-on-surface tracking-tight group-hover:text-primary transition-colors leading-tight mb-1">
                              {tc.title}
                            </h3>
                            <p className="text-[10px] sm:text-[11px] text-on-surface-variant/70 leading-relaxed font-sans line-clamp-1 mb-2">
                              {tc.subtitle}
                            </p>

                            <p className="text-[11px] sm:text-xs text-on-surface-variant leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2.5 sm:mb-4">
                              {tc.description}
                            </p>

                            {/* Core subconcepts checkpoint indicators */}
                            <div className="hidden sm:block space-y-1.5 mb-4 border-t border-outline-variant/10 pt-3">
                              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-on-surface-variant/50 block">Subject Modules</span>
                              {tc.concepts.slice(0, 3).map((concept, index) => (
                                <div key={index} className="flex items-start gap-1.5 text-[11px] text-on-surface-variant/90 font-medium">
                                  <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{concept}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action start trigger bar */}
                          <div className="pt-2 sm:pt-3 border-t border-outline-variant/15 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 text-[9px] sm:text-xs font-bold text-violet-600 mt-2">
                            <span className="text-[9px] sm:text-[10px] text-on-surface-variant/50 font-mono font-normal">Syllabus included</span>
                            <div className="flex items-center gap-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform self-end xs:self-auto">
                              Self-Assessment <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-surface border border-outline-variant/20 rounded-3xl p-8 text-center max-w-lg mx-auto shadow-sm">
                      <p className="text-base text-on-surface font-semibold mb-1">No Technology Courses found</p>
                      <p className="text-xs text-on-surface-variant">We couldn't check off any technology modules matching your filters. Please refine your search query.</p>
                      <button onClick={() => setSearchFilter('')} className="mt-4 bg-primary text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-xl shadow-md">Reset Search filter</button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ----------------------------------------------------
          INTERACTIVE SELF-TEST CURRICULUM DRILLDOWN MODAL
         ---------------------------------------------------- */}
      <AnimatePresence>
        {(selectedSubject || selectedTechCourse) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-outline-variant/30 dark:border-outline-variant/20"
              id="interactive-drilldown-modal"
            >
              {/* Modal Banner-Head */}
              <div className="bg-[#FAF9F5] dark:bg-[#1E1E1E] p-5 sm:p-6 border-b border-outline-variant/25 dark:border-outline-variant/10 flex justify-between items-start shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] font-black uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                      {selectedSubject ? selectedSubject.code : 'TECH-00I'}
                    </span>
                    <span className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                      (selectedSubject ? selectedSubject.difficulty : selectedTechCourse?.difficulty) === 'Hard' && "bg-red-50 text-red-600",
                      (selectedSubject ? selectedSubject.difficulty : selectedTechCourse?.difficulty) === 'Medium' && "bg-amber-50 text-amber-600",
                      (selectedSubject ? selectedSubject.difficulty : selectedTechCourse?.difficulty) === 'Easy' && "bg-emerald-50 text-emerald-600"
                    )}>
                      {selectedSubject ? selectedSubject.difficulty : selectedTechCourse?.difficulty}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-base sm:text-lg text-on-surface leading-tight">
                    {selectedSubject ? selectedSubject.name : selectedTechCourse?.title} Syllabus
                  </h3>
                  <p className="text-xs text-on-surface-variant italic">
                    {selectedSubject ? `Credits: ${selectedSubject.credits} Core Units` : selectedTechCourse?.subtitle}
                  </p>
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={() => {
                    setSelectedSubject(null);
                    setSelectedTechCourse(null);
                    setTestAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
                  aria-label="Close modal dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                
                {/* Concepts list section */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant/60 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-primary" /> Key Learning Modules & Chapters
                  </h4>
                  <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 space-y-2">
                    {(selectedSubject ? selectedSubject.topics : selectedTechCourse?.concepts)?.map((topic, index) => {
                      return (
                        <div key={index} className="flex gap-2 items-start selection:bg-transparent">
                          <CheckCircle className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm text-on-surface">
                            <span className="font-bold text-on-surface/85 font-mono mr-1">Unit {index + 1}:</span>
                            {topic}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Playground Playground (C/React/SQL/Python specific) */}
                {selectedTechCourse?.playgroundCode && (
                  <div className="space-y-2.5" id="code-playground-preview-sandbox">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant/60 flex items-center gap-1.5">
                      <Code className="w-4 h-4 text-violet-600" /> Compiled Concept Sandbox
                    </h4>
                    <div className="bg-[#1E1E2E] rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                      {/* Code file header strip */}
                      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
                        <span>main.{selectedTechCourse.id === 'html-css' ? 'html' : selectedTechCourse.id === 'python' ? 'py' : selectedTechCourse.id === 'c-prog' ? 'c' : 'jsx'}</span>
                        <span className="text-violet-400 text-[10px] font-black uppercase">READ-ONLY SANDBOX</span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-[11px] font-mono text-slate-200">
                        {selectedTechCourse.playgroundCode}
                      </pre>
                      
                      {/* Output Console simulation area */}
                      <div className="bg-slate-950/80 p-3.5 border-t border-slate-900">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1 font-bold">Terminal Output:</span>
                        <div className="flex gap-1.5 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[11px] font-mono text-emerald-400">{selectedTechCourse.playgroundOutput}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* University Practice / Self-checking MCQ Section */}
                {(selectedSubject?.examQuestions || selectedTechCourse?.examQuestions) ? (
                  <div className="space-y-4 border-t border-outline-variant/15 pt-5">
                    <div className="flex justify-between items-center bg-[#FAF9F5] dark:bg-surface-container p-2.5 rounded-xl border border-outline-variant/10 dark:border-outline-variant/5">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant/70 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-primary" /> Multi-Choice Semester Self-Test
                      </h4>
                      <span className="text-[10px] bg-primary/10 text-primary font-mono px-2 py-0.5 rounded font-black uppercase">Exams Practice</span>
                    </div>

                    <div className="space-y-5">
                      {(selectedSubject ? selectedSubject.examQuestions : selectedTechCourse?.examQuestions)?.map((question, qIdx) => {
                        const sAns = testAnswers[qIdx];
                        const isCorrect = sAns === question.answerIndex;
                        
                        return (
                          <div key={qIdx} className="bg-surface border border-outline-variant/20 dark:border-outline-variant/10 rounded-xl p-4 space-y-3">
                            <p className="text-xs sm:text-sm font-semibold text-on-surface">
                              Q{qIdx + 1}: {question.q}
                            </p>
                            
                            {/* Quiz Option List selection items */}
                            <div className="space-y-2">
                              {question.options.map((opt, oIdx) => {
                                const isCurrentlySelected = sAns === oIdx;
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => selectAnswer(qIdx, oIdx)}
                                    className={cn(
                                      "w-full text-left text-xs p-2.5 rounded-lg border transition-all flex items-center justify-between",
                                      isCurrentlySelected 
                                        ? "bg-primary/5 border-primary text-primary font-medium dark:bg-primary/10" 
                                        : "bg-[#FAF9F5]/50 dark:bg-[#1E1E1E]/50 border-outline-variant/30 dark:border-outline-variant/10 text-on-surface-variant hover:bg-[#FAF9F5] dark:hover:bg-[#1E1E1E]"
                                    )}
                                  >
                                    <span>{opt}</span>
                                    <div className={cn(
                                      "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                                      isCurrentlySelected ? "border-primary bg-primary text-white" : "border-outline-variant"
                                    )}>
                                      {isCurrentlySelected && <Check className="w-3 h-3" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Self correctness evaluation prompt */}
                            {quizSubmitted && (
                              <div className={cn(
                                "p-3 rounded-lg text-xs mt-2 space-y-1.5",
                                isCorrect 
                                  ? "bg-green-50 text-green-700 border border-green-200" 
                                  : "bg-red-50 text-red-700 border border-red-200"
                              )}>
                                <div className="flex items-center gap-1.5 font-bold">
                                  <span>{isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Selection'}</span>
                                  {!isCorrect && <span className="text-[10px] opacity-80">(Correct: {question.options[question.answerIndex]})</span>}
                                </div>
                                <p className="text-[11px] leading-relaxed opacity-90">{question.explanation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit action panel */}
                    <div className="flex justify-end pt-3">
                      {!quizSubmitted ? (
                        <button
                          onClick={() => {
                            if (Object.keys(testAnswers).length === 0) return;
                            setQuizSubmitted(true);
                          }}
                          disabled={Object.keys(testAnswers).length === 0}
                          className={cn(
                            "text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95",
                            Object.keys(testAnswers).length > 0 
                              ? "bg-primary text-white hover:opacity-90 cursor-pointer" 
                              : "bg-slate-200 text-slate-400 cursor-not-allowed"
                          )}
                        >
                          Submit Answers ({Object.keys(testAnswers).length} evaluated)
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setTestAnswers({});
                            setQuizSubmitted(false);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 border border-outline-variant/30 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl text-on-surface transition-colors"
                        >
                          Reset Exam Practice
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FAF9F5] border border-outline-variant/20 rounded-2xl p-5 text-center text-xs text-on-surface-variant flex flex-col items-center gap-2">
                    <span className="text-xl">🎓</span>
                    <div>
                      <span className="font-bold text-on-surface block">Self-Assessment Pending</span>
                      <span>This base subject syllabus focuses mainly on practical lab tutorials and field reports project preparation. Check unit topics above.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal base frame footer */}
              <div className="bg-surface-container-low p-4 text-center text-[10px] text-on-surface-variant/50 font-mono tracking-wide border-t border-outline-variant/15 shrink-0 select-none">
                Exam preparation tool Powered by Sanskar Vault • ACT/AI Engine Syllabus
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Dynamic mobile bottom footer navigation tabs widget */}
      <MobileBottomNav activeTab="courseinfo" onNavigate={onNavigate} />
    </div>
  );
}
