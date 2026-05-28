import { Home as HomeIcon, Users, GraduationCap, FileText, Folder, Settings, Search, CheckCircle, Loader2, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import SEO from '../components/SEO';
import CustomLogo from '../components/CustomLogo';
import MobileBottomNav from '../components/MobileBottomNav';
import Sidebar from '../components/Sidebar';


interface ExploreProps {
  onNavigate: (route: string) => void;
}

export default function Explore({ onNavigate }: ExploreProps) {
  const params = useParams();
  const folderSlug = params["*"] || "";
  const currentPath = folderSlug ? decodeURIComponent(folderSlug) : "";

  const [activeCourse, setActiveCourse] = useState('All');
  const [activeSemester, setActiveSemester] = useState('All');
  const { user, isAuthenticated, logout } = useAuth();
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const navigate = useNavigate();

  const setCurrentPath = (path: string) => {
    if (path) {
      navigate(`/explore/${path}`);
    } else {
      navigate('/explore');
    }
  };

  useEffect(() => {
    if (!currentPath) {
      setActiveCourse('All');
      setActiveSemester('All');
      return;
    }

    const parts = currentPath.split('/');
    const firstPart = parts[0]?.toUpperCase() || '';
    
    if (firstPart.includes('B HARMACY') || firstPart.includes('PHARMACY')) {
      setActiveCourse('B.PHARMACY');
    } else if (firstPart.includes('B.TECH') || firstPart.includes('BTECH')) {
      setActiveCourse('B.TECH');
    } else if (firstPart.includes('BCA')) {
      setActiveCourse('BCA');
    } else if (firstPart.includes('BBA')) {
      setActiveCourse('BBA');
    } else {
      setActiveCourse('All');
    }

    const secondPart = parts[1]?.toUpperCase() || '';
    if (secondPart && secondPart.includes('SEM')) {
      const matchingSem = ['FIRST SEM', 'SECOND SEM', 'THIRD SEM', 'FOURTH SEM', 'FIFTH SEM', 'SIXTH SEM', 'SEVENTH SEM', 'EIGHTH SEM']
        .find(s => s === secondPart || secondPart.includes(s));
      if (matchingSem) {
        setActiveSemester(matchingSem);
      } else {
        setActiveSemester('All');
      }
    } else {
      setActiveSemester('All');
    }
  }, [currentPath]);

  useEffect(() => {
    loadPDFs();
    if (user) {
      const b = localStorage.getItem(`bookmarks_${user.id}`);
      if (b) setBookmarks(JSON.parse(b));
    } else {
      setBookmarks([]);
    }
  }, [user]);

  const toggleBookmark = (e: React.MouseEvent, pdf: any) => {
    e.stopPropagation();
    if (!user) {
      alert("Please log in to save bookmarks.");
      return;
    }
    let newBookmarks = [...bookmarks];
    const idx = newBookmarks.findIndex(b => b.fullPath === pdf.fullPath && b.bucketName === pdf.bucketName);
    if (idx > -1) {
      newBookmarks.splice(idx, 1);
    } else {
      newBookmarks.push(pdf);
    }
    setBookmarks(newBookmarks);
    localStorage.setItem(`bookmarks_${user.id}`, JSON.stringify(newBookmarks));
  };


  const fetchFilesInFolder = async (bucketName: string, folderPath: string, depth = 0): Promise<any[]> => {
    if (depth > 4) return []; // Limit depth up to 4 for deeper tree
    try {
      const { data, error } = await supabase.storage.from(bucketName).list(folderPath, {
        limit: 1000,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

      if (error || !data) return [];

      const fetchedFiles: any[] = [];
      const subfolderPromises: Promise<any[]>[] = [];

      for (const item of data) {
        if (item.name === '.emptyFolderPlaceholder') continue;
        
        if (item.id == null) {
          // It's a subfolder
          const subFolderPath = folderPath ? `${folderPath}/${item.name}` : item.name;
          subfolderPromises.push(fetchFilesInFolder(bucketName, subFolderPath, depth + 1));
        } else if (item.name.toLowerCase().includes('.pdf')) {
          // It's a PDF file
          fetchedFiles.push({
             ...item,
             fullPath: folderPath ? `${folderPath}/${item.name}` : item.name,
             folderName: folderPath || 'Root',
             bucketName
          });
        }
      }
      
      const subResults = await Promise.all(subfolderPromises);
      return [...fetchedFiles, ...subResults.flat()];
    } catch (err) {
      console.error('Error fetching folder:', folderPath, err);
      return [];
    }
  };

  const loadPDFs = async () => {
    setIsLoading(true);
    try {
      // Check session cache for instant loading
      const cachedPdfs = sessionStorage.getItem('vault_pdfs_cache');
      const cacheTime = sessionStorage.getItem('vault_pdfs_cache_time');
      const cacheAgeMs = cacheTime ? Date.now() - parseInt(cacheTime, 10) : Infinity;
      
      if (cachedPdfs && cacheAgeMs < 1000 * 60 * 5) { // 5 minutes cache
        setPdfs(JSON.parse(cachedPdfs));
        setIsLoading(false); // Stop loading immediately, but fetch silently in background to refresh
      }

      // Fetch starting from root for all buckets
      const bucketsToFetch = ['pdfs', 'btech-files', 'bpharmacy-files', 'bba-files', 'bca-files'];
      const allBucketResults = await Promise.all(bucketsToFetch.map(bucket => fetchFilesInFolder(bucket, '')));
      const allFiles = allBucketResults.flat();
      
      // Separate User uploads from general uploads, if we consider user folder is their ID
      const userFiles = user ? allFiles.filter(f => f.fullPath.startsWith(`${user.id}/`)) : [];
      let publicFiles = allFiles.filter(f => !f.fullPath.match(/^[0-9a-f]{8}-/i)); // filter out user id UUID folders from public view

      // Merge and remove duplicates if any (combining bucket name and full path as unique key)
      const uniqueFiles = new Map();
      [...publicFiles, ...userFiles].forEach(f => uniqueFiles.set(`${f.bucketName}::${f.fullPath}`, f));
      
      const finalPdfs = Array.from(uniqueFiles.values()).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setPdfs(finalPdfs);
      sessionStorage.setItem('vault_pdfs_cache', JSON.stringify(finalPdfs));
      sessionStorage.setItem('vault_pdfs_cache_time', Date.now().toString());
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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

  const filteredPdfs = pdfs.filter(pdf => {
      const full = pdf.fullPath.toUpperCase();
      const bucketName = pdf.bucketName || 'pdfs';
      
      // Course filtering
      let courseMatch = false;
      const courseStr = activeCourse.toUpperCase();
      if (courseStr === 'ALL') {
          courseMatch = true;
      } else if (courseStr === 'B.PHARMACY') {
          courseMatch = full.includes('B HARMACY') || bucketName === 'bpharmacy-files';
      } else if (courseStr === 'BCA') {
          courseMatch = full.includes('BCA') || bucketName === 'bca-files';
      } else if (courseStr === 'BBA') {
          courseMatch = full.includes('BBA') || bucketName === 'bba-files';
      } else if (courseStr === 'B.TECH') {
          courseMatch = full.includes('B.TECH') || full.includes('BTECH') || bucketName === 'btech-files';
      } else {
          courseMatch = full.includes(courseStr) || full.includes(courseStr.replace('.',''));
      }
      
      // Semester filtering
      let semesterMatch = false;
      const semStr = activeSemester.toUpperCase();
      if (semStr === 'ALL') {
          semesterMatch = true;
      } else {
          semesterMatch = full.includes(semStr);
      }
      
      return courseMatch && semesterMatch;
  });

  const currentPathPrefix = currentPath ? currentPath + '/' : '';
  const currentFoldersSet = new Set<string>();
  const currentFiles: any[] = [];

  filteredPdfs.forEach(pdf => {
    if (currentPath === '' || pdf.fullPath.startsWith(currentPathPrefix)) {
      const remainingStr = currentPath === '' ? pdf.fullPath : pdf.fullPath.slice(currentPathPrefix.length);
      const slashIndex = remainingStr.indexOf('/');
      
      if (slashIndex === -1) {
        currentFiles.push(pdf);
      } else {
        currentFoldersSet.add(remainingStr.slice(0, slashIndex));
      }
    }
  });

  const currentFolders = Array.from(currentFoldersSet).sort();

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background overflow-hidden relative font-sans">
      <SEO 
        title="Explore Vault" 
        description="Search and browse thousands of previous year papers (PYQs), dynamic lecture notes, syllabus frameworks and coding resources across multiple departments." 
        keywords="PYQ, Exam Papers, BTech Resources, Study Vault, Engineering notes, SanskritVault" 
      />
      
      {/* Sidebar Rail */}
      <Sidebar activeTab="explore" onNavigate={onNavigate} />

      {/* Filter Sidebar */}
      <div className="w-64 border-r border-outline-variant bg-surface-container-low overflow-y-auto hidden md:block shrink-0">
        <div className="p-8">
          <h2 className="font-display uppercase tracking-tight text-2xl mb-8 text-on-surface font-bold">Explore Vault</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest mb-4">Courses</h3>
              <div className="space-y-2">
                {['All', 'B.TECH', 'B.PHARMACY', 'BBA', 'BCA'].map((course) => (
                  <label key={course} className="flex items-center gap-3 cursor-pointer group" onClick={() => {
                    setActiveCourse(course);
                    setActiveSemester('All');
                    setCurrentPath(course === 'All' ? '' : (course === 'B.PHARMACY' ? 'B HARMACY' : course));
                  }}>
                    <div className={cn(
                      "w-4 h-4 rounded-full border border-outline-variant/80 flex items-center justify-center transition-colors",
                      activeCourse === course && "border-primary"
                    )}>
                      {activeCourse === course && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors group-hover:text-on-surface",
                      activeCourse === course ? "text-on-surface" : "text-on-surface-variant"
                    )}>{course === 'B.PHARMACY' ? 'B. PHARMACY' : course}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest mb-4 mt-8">Semester</h3>
              <div className="space-y-2">
                {(['BCA', 'BBA'].includes(activeCourse) 
                  ? ['All', 'FIRST SEM', 'SECOND SEM', 'THIRD SEM', 'FOURTH SEM', 'FIFTH SEM', 'SIXTH SEM']
                  : ['All', 'FIRST SEM', 'SECOND SEM', 'THIRD SEM', 'FOURTH SEM', 'FIFTH SEM', 'SIXTH SEM', 'SEVENTH SEM', 'EIGHTH SEM']
                ).map((sem) => (
                  <label key={sem} className="flex items-center gap-3 cursor-pointer group" onClick={() => {
                    setActiveSemester(sem);
                    if (activeCourse !== 'All') {
                      const coursePath = activeCourse === 'B.PHARMACY' ? 'B HARMACY' : activeCourse;
                      setCurrentPath(sem === 'All' ? coursePath : `${coursePath}/${sem}`);
                    }
                  }}>
                    <div className={cn(
                      "w-4 h-4 rounded-full border border-outline-variant/80 flex items-center justify-center transition-colors",
                      activeSemester === sem && "border-primary"
                    )}>
                      {activeSemester === sem && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors group-hover:text-on-surface text-[13px]",
                      activeSemester === sem ? "text-on-surface" : "text-on-surface-variant"
                    )}>{sem}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest mb-4 mt-8">Institution</h3>
              <div className="space-y-2">
                {['AKTU'].map((inst) => (
                  <label key={inst} className="flex items-center gap-3 cursor-pointer group">
                     <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-primary" />
                     </div>
                    <span className="text-sm font-medium text-on-surface">{inst}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col bg-background/50 relative">

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto">
             {/* Mobile Quick Filters */}
             <div className="md:hidden space-y-4 mb-6 bg-[#111111]/95 dark:bg-[#000000]/65 backdrop-blur p-4 rounded-xl border border-[#FF6B00]/10 shadow-sm">
                <div>
                  <h4 className="font-mono text-[9px] text-[#FF6B00] uppercase font-bold tracking-widest mb-2">Filter Courses</h4>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
                     {['All', 'B.TECH', 'B.PHARMACY', 'BBA', 'BCA'].map((course) => (
                       <button
                         key={course}
                         onClick={() => {
                           setActiveCourse(course);
                           setActiveSemester('All');
                           setCurrentPath(course === 'All' ? '' : (course === 'B.PHARMACY' ? 'B HARMACY' : course));
                         }}
                         className={cn(
                           "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border whitespace-nowrap snap-start cursor-pointer",
                           activeCourse === course 
                             ? "bg-[#FF6B00] border-[#FF6B00] text-white shadow-md scale-[1.02]" 
                             : "bg-neutral-900/40 border-outline-variant/20 text-neutral-400 hover:text-white hover:border-[#FF6B00]/50 hover:bg-neutral-800/50"
                         )}
                       >
                         {course === 'B.PHARMACY' ? 'B. pharmacy' : course}
                       </button>
                     ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-[9px] text-[#FF6B00] uppercase font-bold tracking-widest mb-2">Filter Semesters</h4>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
                     {(['BCA', 'BBA'].includes(activeCourse) 
                       ? ['All', 'FIRST SEM', 'SECOND SEM', 'THIRD SEM', 'FOURTH SEM', 'FIFTH SEM', 'SIXTH SEM']
                       : ['All', 'FIRST SEM', 'SECOND SEM', 'THIRD SEM', 'FOURTH SEM', 'FIFTH SEM', 'SIXTH SEM', 'SEVENTH SEM', 'EIGHTH SEM']
                     ).map((sem) => (
                       <button
                         key={sem}
                         onClick={() => {
                           setActiveSemester(sem);
                           if (activeCourse !== 'All') {
                             const coursePath = activeCourse === 'B.PHARMACY' ? 'B HARMACY' : activeCourse;
                             setCurrentPath(sem === 'All' ? coursePath : `${coursePath}/${sem}`);
                           }
                         }}
                         className={cn(
                           "px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap snap-start cursor-pointer",
                           activeSemester === sem 
                             ? "bg-[#FF6B00] border-[#FF6B00] text-white shadow-md scale-[1.02]" 
                             : "bg-neutral-900/40 border-outline-variant/20 text-neutral-400 hover:text-white hover:border-[#FF6B00]/50 hover:bg-neutral-800/50"
                         )}
                       >
                         {sem}
                       </button>
                     ))}
                  </div>
                </div>
             </div>

             {/* File Explorer Breadcrumbs */}
             <div className="mb-8 flex items-center gap-1 text-xs text-on-surface-variant font-mono uppercase tracking-wider overflow-x-auto pb-3 border-b border-outline-variant/15 scrollbar-none shrink-0">
                 <button 
                   onClick={() => setCurrentPath('')} 
                   className="hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 px-2.5 py-1.5 rounded-lg transition-all shrink-0 flex items-center gap-1.5 font-black cursor-pointer bg-neutral-900/40 border border-[#FF6B00]/10"
                 >
                    <HomeIcon className="w-3.5 h-3.5 text-[#FF6B00]" /> Root
                 </button>
                 {currentPath.split('/').filter(Boolean).map((part, index, arr) => {
                    const p = arr.slice(0, index + 1).join('/');
                    return (
                      <div key={p} className="flex items-center gap-1 shrink-0">
                        <ChevronRight className="w-3.5 h-3.5 opacity-40 text-[#FF6B00]" />
                        <button 
                          onClick={() => setCurrentPath(p)} 
                          className="hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 px-2.5 py-1.5 rounded-lg transition-all font-black cursor-pointer bg-neutral-900/20 border border-outline-variant/10 text-[11px]"
                        >
                          {part}
                        </button>
                      </div>
                    );
                 })}
             </div>

             {isLoading ? (
                <div className="flex flex-col items-center justify-center p-20 text-on-surface-variant">
                  <Loader2 className="w-8 h-8 animate-spin mb-4" />
                  <p>Finding all your documents...</p>
                </div>
             ) : (currentFolders.length === 0 && currentFiles.length === 0) ? (
                <div className="flex flex-col items-center justify-center p-16 text-on-surface-variant bg-surface-container-low rounded-xl border border-outline-variant/30">
                  <FileText className="w-12 h-12 mb-4 text-outline" />
                  <h2 className="text-xl font-semibold text-on-surface mb-2 font-display">No PDFs Found</h2>
                  <p className="max-w-md text-center text-sm mb-4">
                    We couldn't find any documents under the current path and filters.
                  </p>
                  <div className="bg-surface-container-lowest border border-outline-variant/50 p-4 rounded-lg max-w-lg text-sm text-center">
                     <p className="font-semibold text-primary mb-1">Uploaded them on Supabase but don't see them?</p>
                     <p>Make sure you have created an <strong>RLS (Row Level Security) Policy</strong> on the <strong>storage.objects</strong> table allowing <strong>SELECT</strong> operations.</p>
                  </div>
                </div>
             ) : (
               <>
                 {/* Folders List with Animations */}
                 {currentFolders.length > 0 && (
                    <div className="mb-8">
                       <h3 className="font-mono text-[10px] text-[#FF6B00] uppercase font-bold tracking-widest mb-4">Folders</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                         <AnimatePresence mode="popLayout">
                           {currentFolders.map((folder, index) => (
                             <motion.div 
                               key={folder}
                               initial={{ opacity: 0, scale: 0.95, y: 8 }}
                               animate={{ opacity: 1, scale: 1, y: 0 }}
                               exit={{ opacity: 0, scale: 0.95, y: -8 }}
                               transition={{ duration: 0.25, delay: index * 0.02, ease: [0.16, 1, 0.3, 1] }}
                               onClick={() => setCurrentPath(currentPath ? `${currentPath}/${folder}` : folder)}
                               className="flex items-center gap-4 bg-surface-container-low hover:bg-surface-container-high border border-[#FF6B00]/10 hover:border-[#FF6B00]/40 p-4 rounded-xl cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-[0_8px_24px_rgba(255,107,0,0.15)] hover:-translate-y-0.5"
                             >
                                <div className="w-11 h-11 rounded-lg bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                                  <Folder className="w-5.5 h-5.5 transition-transform group-hover:scale-110" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="font-bold text-sm text-on-surface truncate block tracking-wide uppercase group-hover:text-[#FF6B00] transition-colors">{folder}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-on-surface-variant/40 group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all shrink-0" />
                             </motion.div>
                           ))}
                         </AnimatePresence>
                       </div>
                    </div>
                 )}

                 {/* Files Grid with Animations */}
                 {currentFiles.length > 0 && (
                    <div>
                       <h3 className="font-mono text-[10px] text-[#FF6B00] uppercase font-bold tracking-widest mb-4">Files</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                         <AnimatePresence mode="popLayout">
                           {currentFiles.map((pdf, i) => (
                             <motion.div 
                               key={pdf.id || pdf.fullPath} 
                               initial={{ opacity: 0, scale: 0.96 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.96 }}
                               transition={{ duration: 0.3, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                               className={cn(
                                 "bg-surface-container-lowest rounded-xl p-4 border transition-all duration-300 relative group cursor-pointer hover:shadow-[0_12px_32px_rgba(255,107,0,0.08)] hover:-translate-y-1",
                                 "border-outline-variant/40 hover:border-primary/50"
                               )}
                               onClick={() => handlePdfClick(pdf)}
                             >
                               <div className="aspect-[3/4] bg-surface-container-low rounded-lg mb-4 flex items-center justify-center p-4 relative overflow-hidden border border-outline-variant/20 shadow-inner group-hover:border-primary/20 transition-colors">
                                  <div 
                                    onClick={(e) => toggleBookmark(e, pdf)}
                                    className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-white/95 dark:bg-black/95 backdrop-blur shadow-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#FF6B00]/10"
                                    title={bookmarks.some(b => b.fullPath === pdf.fullPath && b.bucketName === pdf.bucketName) ? "Remove bookmark" : "Bookmark this PDF"}
                                  >
                                    {bookmarks.some(b => b.fullPath === pdf.fullPath && b.bucketName === pdf.bucketName) ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4 text-on-surface-variant hover:text-primary" />}
                                  </div>
                                  <FileText className="w-16 h-16 text-[#FF6B00]/25 group-hover:text-[#FF6B00]/65 group-hover:scale-105 transition-all duration-500" />
                                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-[9.5px] font-bold font-mono px-2 py-1 rounded shadow-sm text-white border border-[#FF6B00]/25 uppercase font-mono">
                                    {pdf.metadata?.size ? (pdf.metadata.size / 1024 / 1024).toFixed(2) + ' MB' : 'PDF'}
                                  </div>
                               </div>
                               
                               <h3 className="font-bold text-on-surface leading-snug mb-1 truncate text-sm tracking-tight group-hover:text-primary transition-colors" title={pdf.name}>{pdf.name}</h3>
                               <p className="font-sans font-medium text-[11px] text-on-surface-variant truncate flex items-center gap-1 opacity-85">
                                 {pdf.folderName !== 'Root' && `📁 ${pdf.folderName.split('/').pop()}`}
                                </p>
                                <p className="font-mono text-[10px] text-on-surface-variant/50 mb-4 mt-2">
                                 {new Date(pdf.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                               
                               <button className="w-full py-2.5 rounded-lg border border-outline text-[11px] uppercase tracking-widest font-black hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-all duration-300">
                                 Quick View
                               </button>
                             </motion.div>
                           ))}
                         </AnimatePresence>
                       </div>
                    </div>
                 )}
               </>
             )}
          </div>
        </div>
      </div>
      <MobileBottomNav activeTab="explore" onNavigate={onNavigate} />
    </div>
  );
}
