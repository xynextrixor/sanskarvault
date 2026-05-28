import { Home as HomeIcon, Search, GraduationCap, BookmarkCheck, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface MobileBottomNavProps {
  activeTab: 'homeinfo' | 'explore' | 'courseinfo' | 'bookmarks' | 'settings';
  onNavigate: (route: string) => void;
}

export default function MobileBottomNav({ activeTab, onNavigate }: MobileBottomNavProps) {
  const tabs = [
    { id: 'homeinfo', label: 'Dashboard', icon: HomeIcon },
    { id: 'explore', label: 'Vault', icon: Search },
    { id: 'courseinfo', label: 'Syllabus', icon: GraduationCap },
    { id: 'bookmarks', label: 'Saved', icon: BookmarkCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[68px] bg-white border-t border-outline-variant/40 flex items-center justify-around px-2 z-50 shadow-2xl pb-safe dark:bg-surface-container-lowest dark:border-outline-variant/20 transition-all">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex flex-col items-center justify-center flex-1 h-full py-2 cursor-pointer transition-all relative active:scale-95"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            {isActive && (
              <span className="absolute top-0 w-8 h-1 bg-primary rounded-b-md dark:bg-primary" />
            )}
            <Icon 
              className={cn(
                "w-5.5 h-5.5 transition-all duration-200",
                isActive 
                  ? "text-primary scale-110" 
                  : "text-on-surface-variant/70 hover:text-on-surface"
              )} 
            />
            <span 
              className={cn(
                "text-[10px] font-semibold mt-1 tracking-wide font-sans transition-all transition-colors",
                isActive 
                  ? "text-primary font-bold" 
                  : "text-on-surface-variant/60"
              )}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
