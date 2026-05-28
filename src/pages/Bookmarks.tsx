import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Search, GraduationCap, Settings as SettingsIcon, Newspaper, BookmarkPlus, BookmarkCheck, ExternalLink, Bookmark, FileText, BookmarkMinus, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import CustomLogo from '../components/CustomLogo';
import MobileBottomNav from '../components/MobileBottomNav';
import Sidebar from '../components/Sidebar';

interface BookmarksProps {
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

export default function Bookmarks({ onNavigate }: BookmarksProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState('');

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

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (user) {
      loadBookmarks();
    }
  }, [user]);

  const loadBookmarks = () => {
    setIsPdfLoading(true);
    setPdfError('');
    try {
      const b = localStorage.getItem(`bookmarks_${user?.id}`);
      if (b) {
        setPdfs(JSON.parse(b));
      } else {
        setPdfs([]);
      }
    } catch (err: any) {
      console.error(err);
      setPdfError('Failed to load document bookmarks');
      setPdfs([]);
    } finally {
      setIsPdfLoading(false);
    }
  };

  const removeBookmark = (e: React.MouseEvent, pdf: any) => {
    e.stopPropagation();
    const newBookmarks = pdfs.filter(b => !(b.fullPath === pdf.fullPath && b.bucketName === pdf.bucketName));
    setPdfs(newBookmarks);
    localStorage.setItem(`bookmarks_${user?.id}`, JSON.stringify(newBookmarks));
  };

  const handlePdfClick = async (pdf: any) => {
    try {
      const { data, error } = await supabase.storage
        .from(pdf.bucketName || 'pdfs')
        .createSignedUrl(pdf.fullPath, 3600);
        
      if (data?.signedUrl) {
        navigate('/document', { state: { pdfUrl: data.signedUrl, pdfName: pdf.name } });
      }
    } catch (err) {
      console.error('Error fetching signed URL:', err);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
           throw new Error('API failed');
        }
        const data = await response.json();
        if (data.articles) {
          setNews(data.articles.filter((a: any) => a.title && a.title !== '[Removed]'));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const toggleWatchLater = (url: string) => {
    setWatchLater(prev => prev.includes(url) ? prev.filter(v => v !== url) : [...prev, url]);
  };

  const toggleProblemBookmark = (id: string) => {
    setSavedProblems(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const displayedNews = news.filter(v => watchLater.includes(v.url));
  const displayedProblems = PRACTICE_PROBLEMS.filter(p => savedProblems.includes(p.id));
  
  return (
    <div className="flex h-[calc(100vh-73px)] bg-background overflow-hidden relative font-sans">
      
      {/* Sidebar */}
      <Sidebar activeTab="bookmarks" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-surface-container-lowest p-4 sm:p-10 pb-24 md:pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 border-b border-outline-variant/30 pb-4">
            <h1 className="font-display font-bold text-3xl mb-2 text-on-surface flex items-center gap-2">
              <Bookmark className="w-8 h-8 text-primary" /> Bookmarks
            </h1>
            <p className="text-on-surface-variant">Your saved documents, practice problems, and news articles.</p>
          </div>

          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl mb-3 text-on-surface">Documents</h2>
          </div>

          {pdfError && (
            <div className="bg-error/10 border border-error/20 text-error p-4 rounded-lg mb-8 font-medium">
              {pdfError}
            </div>
          )}

          {isPdfLoading ? (
            <div className="flex justify-center items-center py-20 text-on-surface-variant">
              <Loader2 className="w-8 h-8 animate-spin mr-3" />
              Loading documents...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {pdfs.length === 0 && (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center">
                   <FileText className="w-12 h-12 text-on-surface-variant/50 mb-4" />
                   <h3 className="text-lg font-bold text-on-surface mb-2">No documents bookmarked</h3>
                   <p className="text-on-surface-variant max-w-sm mx-auto">
                     Explore the Vault to find materials and save them here.
                   </p>
                   <button 
                    onClick={() => onNavigate('explore')}
                    className="mt-6 px-6 py-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors"
                   >
                     Explore Vault
                   </button>
                </div>
              )}

              {pdfs.map((pdf) => (
                <div 
                  key={pdf.bucketName + '::' + pdf.fullPath} 
                  className="bg-white rounded-xl p-5 border border-outline-variant/30 hover:border-primary/50 transition-all shadow-sm hover:shadow-md cursor-pointer group relative"
                  onClick={() => handlePdfClick(pdf)}
                >
                  <div className="aspect-[3/4] bg-surface-container-low rounded-lg mb-4 flex items-center justify-center border border-outline-variant/20 relative">
                     <FileText className="w-12 h-12 text-primary/40 group-hover:text-primary/60 transition-colors" />
                     <div 
                        onClick={(e) => removeBookmark(e, pdf)}
                        className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                        title="Remove bookmark"
                     >
                        <BookmarkMinus className="w-4 h-4 text-error" />
                     </div>
                     <div className="absolute top-2 right-2 bg-white/80 backdrop-blur text-[10px] font-bold font-mono px-2 py-1 rounded shadow-sm text-on-surface-variant">
                       {pdf.metadata?.size ? (pdf.metadata.size / 1024 / 1024).toFixed(2) + ' MB' : 'PDF'}
                     </div>
                  </div>
                  <h3 className="font-semibold text-on-surface truncate text-sm" title={pdf.name}>
                    {pdf.name}
                  </h3>
                  <p className="font-serif italic text-xs text-on-surface-variant truncate mt-1">
                    📁 {pdf.folderName !== 'Root' ? pdf.folderName : pdf.bucketName}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1 opacity-70">
                    Bookmarked: {new Date(pdf.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mb-8 mt-8">
            <h2 className="font-display font-bold text-2xl mb-3 text-on-surface">Practice Problems</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {displayedProblems.length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center">
                 <BookmarkPlus className="w-12 h-12 text-on-surface-variant/50 mb-4" />
                 <h3 className="text-lg font-bold text-on-surface mb-2">No problems bookmarked</h3>
                 <p className="text-on-surface-variant max-w-sm mx-auto">
                   Explore the home page to discover practice problems.
                 </p>
                 <button 
                  onClick={() => onNavigate('homeinfo')}
                  className="mt-6 px-6 py-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors"
                 >
                   Explore Problems
                 </button>
              </div>
            )}

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

          <div className="mb-8 mt-12">
            <h2 className="font-display font-bold text-2xl mb-3 text-on-surface">Tech & Academic News</h2>
          </div>

          {loading ? (
             <div className="flex justify-center items-center py-20 text-on-surface-variant">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
               Loading news...
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
              
              {displayedNews.length === 0 && (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center">
                   <BookmarkPlus className="w-12 h-12 text-on-surface-variant/50 mb-4" />
                   <h3 className="text-lg font-bold text-on-surface mb-2">No articles saved yet</h3>
                   <p className="text-on-surface-variant max-w-sm mx-auto">
                     Explore the home page to discover news articles.
                   </p>
                   <button 
                    onClick={() => onNavigate('homeinfo')}
                    className="mt-6 px-6 py-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors"
                   >
                     Explore News
                   </button>
                </div>
              )}

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
        </div>
      </div>
      <MobileBottomNav activeTab="bookmarks" onNavigate={onNavigate} />
    </div>
  );
}
