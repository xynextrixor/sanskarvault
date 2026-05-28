import React, { useState, useEffect } from 'react';
import { FileText, Folder, Search, Loader2, Home as HomeIcon, LogOut, BookOpen, BookmarkMinus, GraduationCap, Settings, BookmarkCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import CustomLogo from '../components/CustomLogo';
import MobileBottomNav from '../components/MobileBottomNav';
import Sidebar from '../components/Sidebar';


interface MyPDFsProps {
  onNavigate: (route: string) => void;
}

export default function MyPDFs({ onNavigate }: MyPDFsProps) {
  const { user, logout } = useAuth();
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadBookmarks();
    }
  }, [user]);

  const loadBookmarks = () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const b = localStorage.getItem(`bookmarks_${user?.id}`);
      if (b) {
        setPdfs(JSON.parse(b));
      } else {
        setPdfs([]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to load bookmarks');
      setPdfs([]);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="flex h-[calc(100vh-73px)] bg-surface-container-lowest overflow-hidden">
      <SEO 
        title="Saved PDFs & Documents" 
        description="View and access your saved previous year papers, high-quality college notes, course syllabuses, and bookmarked digital resources." 
        keywords="bookmarked notes, university papers folder, saved PDFs, digital vault folder, SanskarVault" 
      />
      
      {/* Sidebar Rail */}
      <Sidebar activeTab="bookmarks" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative bg-surface-container-lowest">
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 pt-8 pb-24 md:pb-10">
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl text-on-surface">Bookmarks</h1>
            <p className="text-on-surface-variant font-medium mt-1">Your saved documents</p>
          </div>
          {errorMsg && (
            <div className="bg-error/10 border border-error/20 text-error p-4 rounded-lg mb-8 font-medium">
              {errorMsg}
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-20 text-on-surface-variant">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Loading your bookmarks...</p>
            </div>
          ) : pdfs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center bg-surface-container-low rounded-2xl border border-outline-variant/30">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-display text-on-surface mb-2">No Bookmarks Yet</h2>
              <p className="text-on-surface-variant max-w-md mb-8">You haven't saved any PDFs to your bookmarks. Explore the Vault to find materials.</p>
              <button 
                onClick={() => onNavigate('explore')}
                className="px-6 py-3 rounded-lg bg-primary text-white text-sm uppercase tracking-widest font-semibold cursor-pointer hover:bg-primary-container transition-all"
              >
                Explore Vault
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        </div>
      </div>
      <MobileBottomNav activeTab="bookmarks" onNavigate={onNavigate} />
    </div>
  );
}
