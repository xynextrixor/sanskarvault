import { useState, useEffect } from 'react';
import { Home as HomeIcon, Search, GraduationCap, Folder, Settings as SettingsIcon, Newspaper, BookmarkPlus, BookmarkCheck, ExternalLink, Code, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import CustomLogo from '../components/CustomLogo';
import MobileBottomNav from '../components/MobileBottomNav';
import Sidebar from '../components/Sidebar';

interface HomeInfoProps {
  onNavigate: (route: string) => void;
}

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
  publishedAt: string;
}

const PRACTICE_PROBLEMS = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], url: 'https://leetcode.com/problems/two-sum/' },
  { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', tags: ['Linked List', 'Math'], url: 'https://leetcode.com/problems/add-two-numbers/' },
  { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['Hash Table', 'String', 'Sliding Window'], url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', tags: ['Array', 'Binary Search', 'Divide and Conquer'], url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
  { id: '5', title: 'Longest Palindromic Substring', difficulty: 'Medium', tags: ['String', 'Dynamic Programming'], url: 'https://leetcode.com/problems/longest-palindromic-substring/' },
  { id: '6', title: 'Zigzag Conversion', difficulty: 'Medium', tags: ['String'], url: 'https://leetcode.com/problems/zigzag-conversion/' },
  { id: '7', title: 'Reverse Integer', difficulty: 'Medium', tags: ['Math'], url: 'https://leetcode.com/problems/reverse-integer/' },
  { id: '8', title: 'String to Integer (atoi)', difficulty: 'Medium', tags: ['String'], url: 'https://leetcode.com/problems/string-to-integer-atoi/' },
  { id: '9', title: 'Palindrome Number', difficulty: 'Easy', tags: ['Math'], url: 'https://leetcode.com/problems/palindrome-number/' },
  { id: '10', title: 'Regular Expression Matching', difficulty: 'Hard', tags: ['String', 'Dynamic Programming'], url: 'https://leetcode.com/problems/regular-expression-matching/' }
];

export default function HomeInfo({ onNavigate }: HomeInfoProps) {
  const { user } = useAuth();
  
  const [watchLater, setWatchLater] = useState<string[]>(() => {
    const saved = localStorage.getItem('watchLaterNews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => {
    setIsSidebarOpen(true);
    setTimeout(() => {
      setIsSidebarOpen(false);
    }, 6000);
  };

  const [activeSection, setActiveSection] = useState<'news' | 'problems'>('news');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [solveProblemData, setSolveProblemData] = useState<any>(null);

  const [savedProblems, setSavedProblems] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedProblems');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('watchLaterNews', JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    localStorage.setItem('savedProblems', JSON.stringify(savedProblems));
  }, [savedProblems]);

  useEffect(() => {
    const fetchSolveProblem = async () => {
      try {
        const response = await fetch('/api/solveproblem');
        if (!response.ok) {
           throw new Error('API failed');
        }
        const data = await response.json();
        setSolveProblemData(data);
      } catch (error) {
        console.error('Error fetching solve problem:', error);
      }
    };
    fetchSolveProblem();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the search query to minimize API requests while typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const queryParam = debouncedQuery.trim();
        const url = queryParam ? `/api/news?q=${encodeURIComponent(queryParam)}` : '/api/news';
        const response = await fetch(url);
        if (!response.ok) {
           throw new Error('API failed');
        }
        const data = await response.json();
        if (data.articles) {
          setNews(data.articles.filter((a: any) => a.title && a.title !== '[Removed]'));
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [debouncedQuery]);

  const toggleWatchLater = (url: string) => {
    setWatchLater(prev => prev.includes(url) ? prev.filter(v => v !== url) : [...prev, url]);
  };

  const toggleProblemBookmark = (id: string) => {
    setSavedProblems(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const displayedNews = news;
  const displayedProblems = PRACTICE_PROBLEMS;
  
  return (
    <div className="flex h-[calc(100vh-73px)] bg-background overflow-hidden relative font-sans">
      <SEO 
        title="Latest News & Practice Problems" 
        description="Stay updated with student global news, educational announcements, and level up with daily handpicked coding challenges."
        keywords="Education News, Coding Challenges, LeetCode, CSE problems, Study news, SanskarVault"
      />
      
      {/* Sidebar */}
      <Sidebar activeTab="homeinfo" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-surface-container-lowest p-4 sm:p-10 pb-24 md:pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 border-b border-outline-variant/30 mb-8 pb-1 flex-wrap">
            <button 
              onClick={() => setActiveSection('news')}
              className={cn(
                "px-4 py-2 text-sm font-semibold transition-colors border-b-2",
                activeSection === 'news' ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"
              )}
            >
              News
            </button>
            <button 
              onClick={() => setActiveSection('problems')}
              className={cn(
                "px-4 py-2 text-sm font-semibold transition-colors border-b-2",
                activeSection === 'problems' ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"
              )}
            >
              Problems
            </button>
          </div>

          {activeSection === 'problems' && solveProblemData && (
            <div className="mb-12">
              <div className="mb-6">
                <h2 className="font-display font-bold text-2xl mb-2 text-on-surface flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" /> Daily Solve Problem
                </h2>
                <p className="text-on-surface-variant">Challenge yourself with today's coding problem.</p>
              </div>
              <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-1 text-xs font-bold rounded bg-primary/10 text-primary uppercase tracking-wider">
                      {solveProblemData.difficulty || 'Daily Challenge'}
                    </span>
                    <span className="text-sm font-medium text-on-surface-variant">
                      {solveProblemData.date || new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {solveProblemData.questionTitle || solveProblemData.name || 'LeetCode Problem of the Day'}
                  </h3>
                  {solveProblemData.totalSolved !== undefined && (
                    <p className="text-sm text-on-surface-variant flex items-center gap-4">
                      <span>Total Solved: <strong className="text-on-surface">{solveProblemData.totalSolved}</strong></span>
                      <span>Total Submissions: <strong className="text-on-surface">{solveProblemData.totalSubmissions?.[0]?.submissions || 0}</strong></span>
                    </p>
                  )}
                </div>
                <a
                  href={
                    solveProblemData.questionLink 
                      ? (solveProblemData.questionLink.startsWith('http') ? solveProblemData.questionLink : `https://leetcode.com${solveProblemData.questionLink}`) 
                      : `https://leetcode.com/problemset/all/`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors shrink-0 flex items-center gap-2"
                >
                  Solve Now <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {activeSection === 'problems' && (
            <>
              <div className="mb-8 mt-12">
                <h1 className="font-display font-bold text-3xl mb-3 text-on-surface">Practice Problems</h1>
                <p className="text-on-surface-variant max-w-2xl">
                  Sharpen your skills with these curated coding challenges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

            {displayedProblems.map((problem) => {
              const isSaved = savedProblems.includes(problem.id);
              return (
                 <div key={problem.id} className="bg-surface-container border border-outline-variant/30 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                         <span className={cn("px-2.5 py-1 text-xs font-bold rounded uppercase tracking-wider", 
                           problem.difficulty === 'Easy' ? "bg-green-500/10 text-green-600" :
                           problem.difficulty === 'Medium' ? "bg-orange-500/10 text-orange-600" :
                           "bg-red-500/10 text-red-600"
                         )}>
                           {problem.difficulty}
                         </span>
                         <button 
                          onClick={() => toggleProblemBookmark(problem.id)}
                          className={cn(
                            "p-1.5 rounded-full transition-colors flex items-center justify-center shrink-0",
                            isSaved ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                          )}
                          title={isSaved ? "Remove Bookmark" : "Bookmark Problem"}
                        >
                          {isSaved ? <BookmarkCheck className="w-5 h-5 fill-primary/20" /> : <BookmarkPlus className="w-5 h-5" />}
                        </button>
                      </div>
                      <h3 className="font-display text-lg font-bold mb-3">{problem.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {problem.tags.map(tag => (
                          <span key={tag} className="text-xs font-medium px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-outline-variant/30">
                       <a href={problem.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                         Solve Problem <ExternalLink className="w-3.5 h-3.5" />
                       </a>
                    </div>
                 </div>
              );
            })}
          </div>
        </>
      )}

          {activeSection === 'news' && (
            <>
              <div className="mb-6">
                <h1 className="font-display font-bold text-3xl mb-3 text-on-surface">Tech & Academic News</h1>
                <p className="text-on-surface-variant max-w-2xl">
                  Stay updated with the latest news on technology, BCA courses, and AKTU curriculum.
                </p>
              </div>

              {/* News Search bar with SUGGESTIONS */}
              <div className="mb-8 bg-surface-container border border-outline-variant/30 rounded-2xl p-4 sm:p-5 shadow-xs">
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-on-surface-variant/70">
                    <Search className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news by title, source, content or technology..."
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl py-3 pl-12 pr-10 text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-surface transition-all placeholder:text-on-surface-variant/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 p-1 rounded-full text-on-surface-variant/70 hover:bg-surface-container hover:text-on-surface transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Popular Keywords suggestions */}
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none flex-wrap">
                  <span className="text-[11px] font-mono font-black uppercase tracking-widest text-primary mr-1">Hot Topics:</span>
                  {['Google', 'AI', 'Apple', 'NVIDIA', 'Education', 'College', 'Developer'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className={cn(
                        "px-3 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap",
                        searchQuery.toLowerCase() === tag.toLowerCase()
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-surface text-on-surface-variant border-outline-variant/30 hover:border-primary/50 hover:text-primary"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-3 py-1 text-xs font-semibold rounded-full text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-all cursor-pointer"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20 text-on-surface-variant">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
                  Loading news...
                </div>
              ) : displayedNews.length === 0 ? (
                <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-10 text-center max-w-lg mx-auto my-12 shadow-sm">
                  <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto mb-4 text-on-surface-variant/60">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 text-on-surface">No news matched "{searchQuery}"</h3>
                  <p className="text-on-surface-variant text-sm mb-6 max-w-sm mx-auto">
                    Try checking your spelling, looking for hot topic suggestions above, or resetting the filters.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="bg-primary text-white text-xs px-4 py-2 hover:bg-primary-container font-semibold rounded-lg transition-all shadow-xs"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {displayedNews.map((article, idx) => {
                    const isSaved = watchLater.includes(article.url);
                    return (
                      <div key={idx} className="bg-surface-container border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                        {article.urlToImage && (
                          <div className="aspect-video relative bg-surface-container-high shrink-0 overflow-hidden">
                            <img 
                              src={article.urlToImage} 
                              alt={article.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          </div>
                        )}
                        <div className="p-3 md:p-6 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-2 md:mb-3">
                            <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold text-primary uppercase tracking-wider">
                              <Newspaper className="w-3 h-3 md:w-4 md:h-4" /> <span className="line-clamp-1">{article.source?.name || 'News API'}</span>
                            </div>
                            <button 
                              onClick={() => toggleWatchLater(article.url)}
                              className={cn(
                                "p-1.5 rounded-full transition-colors flex items-center justify-center shrink-0",
                                isSaved ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                              )}
                              title={isSaved ? "Remove from Reading List" : "Add to Reading List"}
                            >
                              {isSaved ? <BookmarkCheck className="w-4 h-4 md:w-5 md:h-5 fill-primary/20" /> : <BookmarkPlus className="w-4 h-4 md:w-5 md:h-5" />}
                            </button>
                          </div>
                          <h3 className="font-display text-sm md:text-lg font-bold mb-2 md:mb-3 line-clamp-2 md:line-clamp-3 overflow-hidden text-ellipsis leading-snug">{article.title}</h3>
                          <p className="text-xs md:text-sm text-on-surface-variant line-clamp-2 md:line-clamp-3 overflow-hidden text-ellipsis mb-2 md:mb-4">{article.description}</p>
                          
                          <div className="mt-auto flex items-center gap-2 md:gap-4 pt-3 md:pt-4 border-t border-outline-variant/30">
                             <a 
                              href={article.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm font-semibold text-primary hover:underline"
                             >
                               Read Full Article <ExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5" />
                             </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <MobileBottomNav activeTab="homeinfo" onNavigate={onNavigate} />
    </div>
  );
}
