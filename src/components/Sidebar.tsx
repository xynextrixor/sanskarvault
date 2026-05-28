import { Home as HomeIcon, Search, GraduationCap, BookmarkCheck, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import CustomLogo from './CustomLogo';

interface SidebarProps {
  activeTab: 'homeinfo' | 'explore' | 'courseinfo' | 'bookmarks' | 'settings';
  onNavigate: (route: string) => void;
}

export default function Sidebar({ activeTab, onNavigate }: SidebarProps) {
  return (
    <div className="hidden md:flex w-20 bg-surface-container-lowest border-r border-outline-variant/30 flex-col items-center py-8 z-40 h-full shrink-0 shadow-sm dark:bg-zinc-950 dark:border-zinc-800/60">
      {/* Brand logo container */}
      <div className="mb-12 cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-200" onClick={() => onNavigate('home')}>
        <CustomLogo className="w-10 h-10 text-primary animate-pulse-slow" />
      </div>

      {/* Main navigation icons stack */}
      <div className="flex flex-col gap-6 text-on-surface-variant flex-1">
        
        {/* Dashboard/HomeInfo option */}
        <button
          onClick={() => onNavigate('homeinfo')}
          className={cn(
            "p-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group active:scale-95",
            activeTab === 'homeinfo'
              ? "bg-primary/10 text-primary"
              : "hover:bg-surface-container-high hover:text-on-surface text-on-surface-variant/80"
          )}
          title="Dashboard"
        >
          {activeTab === 'homeinfo' && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md" />
          )}
          <HomeIcon className="w-6 h-6 outline-2" />
        </button>

        {/* Explore Vault option */}
        <button
          onClick={() => onNavigate('explore')}
          className={cn(
            "p-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group active:scale-95",
            activeTab === 'explore'
              ? "bg-primary/10 text-primary"
              : "hover:bg-surface-container-high hover:text-on-surface text-on-surface-variant/80"
          )}
          title="Explore Vault"
        >
          {activeTab === 'explore' && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md" />
          )}
          <Search className="w-6 h-6 outline-2" />
        </button>

        {/* Syllabus / CourseInfo option */}
        <button
          onClick={() => onNavigate('courseinfo')}
          className={cn(
            "p-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group active:scale-95",
            activeTab === 'courseinfo'
              ? "bg-primary/10 text-primary"
              : "hover:bg-surface-container-high hover:text-on-surface text-on-surface-variant/80"
          )}
          title="Curriculum Syllabus"
        >
          {activeTab === 'courseinfo' && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md" />
          )}
          <GraduationCap className="w-6 h-6 outline-2" />
        </button>

        {/* Bookmarks option */}
        <button
          onClick={() => onNavigate('bookmarks')}
          className={cn(
            "p-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group active:scale-95",
            activeTab === 'bookmarks'
              ? "bg-primary/10 text-primary"
              : "hover:bg-surface-container-high hover:text-on-surface text-on-surface-variant/80"
          )}
          title="Bookmarks & Saved"
        >
          {activeTab === 'bookmarks' && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md" />
          )}
          <BookmarkCheck className="w-6 h-6 outline-2" />
        </button>

      </div>

      {/* Bottom Option Stack: Settings & User profile avatar */}
      <div className="mt-auto flex flex-col gap-6 text-on-surface-variant items-center">
        
        {/* Settings button */}
        <button
          onClick={() => onNavigate('settings')}
          className={cn(
            "p-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group active:scale-95",
            activeTab === 'settings'
              ? "bg-primary/10 text-primary"
              : "hover:bg-surface-container-high hover:text-on-surface text-on-surface-variant/80"
          )}
          title="Settings"
        >
          {activeTab === 'settings' && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md" />
          )}
          <SettingsIcon className="w-6 h-6 outline-2" />
        </button>

      </div>
    </div>
  );
}
