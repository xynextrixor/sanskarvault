import { Home as HomeIcon, Users, GraduationCap, FileText, Folder, Settings as SettingsIcon, LogOut, ArrowLeft, Camera, Check, Search, Loader2, BookmarkCheck, Menu, X, BookOpen, Zap, Volume2, Bell, Clock, Sparkles, Shield, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import CustomLogo from '../components/CustomLogo';
import MobileBottomNav from '../components/MobileBottomNav';
import Sidebar from '../components/Sidebar';


interface SettingsProps {
  onNavigate: (route: string) => void;
}

export default function Settings({ onNavigate }: SettingsProps) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile Form State
  const [displayName, setDisplayName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // New Basic Details (Profile)
  const [rollNumber, setRollNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [studyMode, setStudyMode] = useState('Individual Study');
  const [learningGoal, setLearningGoal] = useState('Skill Building');

  // New Preferences State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [offlineCaching, setOfflineCaching] = useState(false);
  const [autoplayPdf, setAutoplayPdf] = useState(false);
  const [aiCompanionTone, setAiCompanionTone] = useState('Intelligent Mentor');
  const [studyReminderTime, setStudyReminderTime] = useState('20:00');

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const openSidebar = () => {
    setIsSidebarOpen(true);
    setTimeout(() => {
      setIsSidebarOpen(false);
    }, 6000);
  };
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check initial dark mode state
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    const loadSettings = () => {
      if (user) {
        setDisplayName(user.email?.split('@')[0] || '');
        // Load saved preferences if any from localStorage (simulating db)
        const savedSettings = localStorage.getItem('userSettings_' + user.id);
        if (savedSettings) {
          try {
            const parsed = JSON.parse(savedSettings);
            if (parsed.displayName) setDisplayName(parsed.displayName);
            setCollegeName(parsed.collegeName || '');
            setCourse(parsed.course || '');
            setSemester(parsed.semester || '');
            setAvatarPreview(parsed.avatar || null);
            
            setRollNumber(parsed.rollNumber || '');
            setSpecialization(parsed.specialization || '');
            setGraduationYear(parsed.graduationYear || '');
            setStudyMode(parsed.studyMode || 'Individual Study');
            setLearningGoal(parsed.learningGoal || 'Skill Building');
            
            setEmailNotifications(parsed.emailNotifications !== undefined ? parsed.emailNotifications : true);
            setWeeklyDigest(parsed.weeklyDigest !== undefined ? parsed.weeklyDigest : true);
            setSoundEffects(parsed.soundEffects !== undefined ? parsed.soundEffects : true);
            setOfflineCaching(parsed.offlineCaching !== undefined ? parsed.offlineCaching : false);
            setAutoplayPdf(parsed.autoplayPdf !== undefined ? parsed.autoplayPdf : false);
            setAiCompanionTone(parsed.aiCompanionTone || 'Intelligent Mentor');
            setStudyReminderTime(parsed.studyReminderTime || '20:00');
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
    
    loadSettings();

    // Re-load settings when sync pushes from Supabase to local storage
    window.addEventListener('storage', loadSettings);

    return () => {
      window.removeEventListener('storage', loadSettings);
    };
  }, [user]);

  const handleLogout = async () => {
    await logout();
    onNavigate('login');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: import('react').ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 120;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Force JPEG with 0.8 quality to keep it ~2-4 KB
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setAvatarPreview(dataUrl);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      if (user) {
        localStorage.setItem('userSettings_' + user.id, JSON.stringify({
          displayName,
          collegeName,
          course,
          semester,
          avatar: avatarPreview,
          rollNumber,
          specialization,
          graduationYear,
          studyMode,
          learningGoal,
          emailNotifications,
          weeklyDigest,
          soundEffects,
          offlineCaching,
          autoplayPdf,
          aiCompanionTone,
          studyReminderTime
        }));
      }
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex h-[calc(100vh-73px)] bg-surface-container-lowest overflow-hidden">
      <SEO 
        title="Settings & Workspace Preferences" 
        description="Configure your SanskarVault account, manage your digital avatar, toggle light or dark themes, and customize your study dashboard preferences." 
        keywords="SanskarVault settings, user profile, dark mode, university organization, study preferences" 
      />
      
      {/* Sidebar Rail */}
      <Sidebar activeTab="settings" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col h-full overflow-hidden bg-surface-container-lowest w-full">
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 pb-24 md:pb-10">
          <div className="mb-8 flex items-center gap-3 md:gap-4 pl-0">
            <button onClick={() => onNavigate('home')} className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-on-surface-variant" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-medium text-on-surface tracking-tight">Settings</h1>
              <p className="text-on-surface-variant text-xs md:text-sm flex items-center gap-2 font-serif italic">
                Manage your account and preferences
              </p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            
            {/* Settings Sidebar */}
            <div className="w-full md:w-64 shrink-0">
               <nav className="space-y-1">
                 <button 
                   onClick={() => setActiveTab('profile')}
                   className={cn(
                     "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left",
                     activeTab === 'profile' ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                   )}
                 >
                   <Users className="w-5 h-5" />
                   Profile Details
                 </button>
                 <button 
                   onClick={() => setActiveTab('preferences')}
                   className={cn(
                     "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left",
                     activeTab === 'preferences' ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                   )}
                 >
                   <SettingsIcon className="w-5 h-5" />
                   Preferences
                 </button>
               </nav>
            </div>

            {/* Settings Content */}
            <div className="flex-1 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-sm p-4 md:p-8">
               {activeTab === 'profile' && (
                  <div className="space-y-6 md:space-y-8">
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-on-surface mb-1">Profile Details</h2>
                      <p className="text-xs md:text-sm text-on-surface-variant">Configure your institutional identity and personal learning coordinates.</p>
                    </div>

                    {user ? (
                      <div className="space-y-8">
                        {/* Avatar Picker Panel */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left bg-[#FAF9F5]/85 dark:bg-surface-container-low/85 p-4 rounded-xl border border-outline-variant/20 dark:border-outline-variant/10">
                          <div 
                             className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl md:text-4xl font-bold shadow-inner relative group overflow-hidden border-2 border-outline-variant/30 hover:border-primary/50 transition-colors"
                          >
                            {avatarPreview ? (
                               <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                               displayName.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={handleAvatarClick}>
                               <Camera className="w-8 h-8 text-white" />
                            </div>
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleFileChange} 
                              accept="image/*" 
                              className="hidden" 
                            />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-on-surface">Digital Avatar</h4>
                            <div className="flex gap-2 items-center justify-center sm:justify-start">
                              <button onClick={handleAvatarClick} className="px-3.5 py-1.5 bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-xs font-semibold transition-colors border border-outline-variant/50">
                                Upload Photo
                              </button>
                              {avatarPreview && (
                                <button onClick={() => setAvatarPreview(null)} className="px-3.5 py-1.5 text-xs font-semibold text-error/80 hover:bg-error/5 rounded-lg border border-transparent transition-colors">
                                  Reset
                                </button>
                              )}
                            </div>
                            <p className="text-[11px] text-on-surface-variant font-medium">PNG or JPG. Under 2MB.</p>
                          </div>
                        </div>

                        {/* Section: Academic Coordinates */}
                        <div className="space-y-4">
                          <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-primary flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5" /> Institutional Credentials
                          </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Display Name</label>
                                <input 
                                  type="text"
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                                  value={displayName}
                                  onChange={(e) => setDisplayName(e.target.value)}
                                  placeholder="Full Name"
                                />
                             </div>
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant/60 mb-1.5 uppercase tracking-wider">Email Address (Secured)</label>
                                <input 
                                  type="text"
                                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface-variant opacity-70 outline-none cursor-not-allowed font-medium"
                                  value={user.email || ''}
                                  disabled
                                />
                             </div>
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">College Name</label>
                                <input 
                                  type="text"
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                                  placeholder="University / Institute Name"
                                  value={collegeName}
                                  onChange={(e) => setCollegeName(e.target.value)}
                                />
                             </div>
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Registration Roll Number</label>
                                <input 
                                  type="text"
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                                  placeholder="e.g. CSR-2023-8941"
                                  value={rollNumber}
                                  onChange={(e) => setRollNumber(e.target.value)}
                                />
                             </div>
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Degree Course</label>
                                <select 
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all cursor-pointer font-sans"
                                  value={course}
                                  onChange={(e) => setCourse(e.target.value)}
                                >
                                  <option value="">Select your course</option>
                                  <option value="B.TECH font-sans">B.TECH (Bachelor of Technology)</option>
                                  <option value="B.PHARMACY font-sans">B.PHARMACY (Bachelor of Pharmacy)</option>
                                  <option value="BBA font-sans">BBA (Bachelor of Business Administration)</option>
                                  <option value="BCA font-sans">BCA (Bachelor of Computer Applications)</option>
                                  <option value="MBA font-sans">MBA (Master of Business Administration)</option>
                                </select>
                             </div>
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Stream Specialization</label>
                                <input 
                                  type="text"
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                                  placeholder="e.g. Computer Science & Eng, Pharmaceutics"
                                  value={specialization}
                                  onChange={(e) => setSpecialization(e.target.value)}
                                />
                             </div>
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Current Semester</label>
                                <select 
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all cursor-pointer"
                                  value={semester}
                                  onChange={(e) => setSemester(e.target.value)}
                                >
                                  <option value="">Select current semester</option>
                                  <option value="FIRST SEM">FIRST SEM</option>
                                  <option value="SECOND SEM">SECOND SEM</option>
                                  <option value="THIRD SEM">THIRD SEM</option>
                                  <option value="FOURTH SEM">FOURTH SEM</option>
                                  <option value="FIFTH SEM">FIFTH SEM</option>
                                  <option value="SIXTH SEM border-b">SIXTH SEM</option>
                                  <option value="SEVENTH SEM">SEVENTH SEM</option>
                                  <option value="EIGHTH SEM">EIGHTH SEM</option>
                                </select>
                             </div>
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Year of Graduation / Batch</label>
                                <input 
                                  type="text"
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                                  placeholder="e.g. 2027"
                                  value={graduationYear}
                                  onChange={(e) => setGraduationYear(e.target.value)}
                                />
                             </div>
                          </div>
                       </div>

                        {/* Section: Custom Learning Preferences */}
                        <div className="space-y-4 pt-2">
                          <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-primary flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" /> Primary Study Profile
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Learning / Study Mode</label>
                                <select 
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all cursor-pointer font-sans"
                                  value={studyMode}
                                  onChange={(e) => setStudyMode(e.target.value)}
                                >
                                  <option value="Individual Study">📖 Individual Study (Syllabus focus)</option>
                                  <option value="Active Recall">⚡ Active Recall (MCQ self-assessment)</option>
                                  <option value="Peer Group">👥 Peer Group Collaborative study</option>
                                  <option value="Exam Cramming">🎯 Exam Crammode (High difficulty first)</option>
                                </select>
                             </div>
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Academic Prime Goal</label>
                                <select 
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all cursor-pointer font-sans"
                                  value={learningGoal}
                                  onChange={(e) => setLearningGoal(e.target.value)}
                                >
                                  <option value="GPA Maximization">🎓 GPA Maximization (Top Marks)</option>
                                  <option value="Placement Readiness">💼 Placement & Competitive Coding prep</option>
                                  <option value="Higher Studies">🔬 Research / Masters Admission Prep</option>
                                  <option value="Skill Building">🛠️ Hands-on Skill & Project Mastery</option>
                                </select>
                             </div>
                          </div>
                        </div>

                        {/* Sandbox Technical metadata info */}
                        <div className="bg-surface-container-low/40 p-3.5 rounded-xl border border-outline-variant/15 flex items-center justify-between text-[11px] font-mono text-on-surface-variant/80">
                          <div className="space-y-0.5">
                            <span className="block font-bold">Secure Account Identity</span>
                            <span className="opacity-70 text-[10px]">Your personal vault authentication record</span>
                          </div>
                          <span className="text-[10px] font-bold bg-surface-container-high px-2 py-1 rounded select-all">{user.id}</span>
                        </div>
                        
                        {/* Actions Panel */}
                        <div className="pt-6 border-t border-outline-variant/30 flex justify-between items-center">
                          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-error hover:bg-error/10 rounded-lg text-sm font-medium transition-colors">
                            <LogOut className="w-4 h-4" />
                            Log Out
                          </button>
                          
                          <button 
                            onClick={handleSaveChanges} 
                            disabled={isSaving || saveSuccess}
                            className={cn(
                              "px-6 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center gap-2",
                              saveSuccess ? "bg-green-600 text-white hover:bg-green-700 font-sans" : "bg-primary text-white hover:bg-primary-container font-sans",
                              isSaving && "opacity-80 cursor-not-allowed"
                            )}
                          >
                            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {saveSuccess && <Check className="w-4 h-4" />}
                            {saveSuccess ? 'Saved!' : 'Save Details'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-surface-container-low rounded-xl p-8 text-center border border-outline-variant/30">
                        <Users className="w-12 h-12 text-on-surface-variant mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-on-surface mb-2">Not Logged In</h3>
                        <p className="text-on-surface-variant mb-6 max-w-sm mx-auto">You must be logged in to access and manage your profile settings.</p>
                        <button onClick={() => onNavigate('login')} className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold uppercase tracking-widest hover:bg-primary-container transition-colors">
                          Go to Login
                        </button>
                      </div>
                    )}
                  </div>
               )}

               {activeTab === 'preferences' && (
                  <div className="space-y-6 md:space-y-8">
                    <div>
                      <h2 className="text-xl font-semibold text-on-surface mb-1">Preferences</h2>
                      <p className="text-sm text-on-surface-variant">Configure notifications, offline storage limits, and study sandbox companion modes.</p>
                    </div>

                    {user ? (
                      <div className="space-y-6">
                        {/* Section: Alert Notifications */}
                        <div className="space-y-3">
                          <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-primary flex items-center gap-1.5">
                            <Bell className="w-3.5 h-3.5" /> Notifications & Digests
                          </h3>
                          <div className="space-y-3">
                            {/* Email Alerts Toggle */}
                            <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
                               <div>
                                  <h4 className="font-semibold text-xs text-on-surface mb-0.5">Academic Document Bulletins</h4>
                                  <p className="text-[11px] text-on-surface-variant font-medium">Receive notifications immediately when new university files or syllabus details are mapped.</p>
                               </div>
                               <button 
                                 type="button"
                                 onClick={() => setEmailNotifications(!emailNotifications)}
                                 className={cn("w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors shrink-0", emailNotifications ? "bg-primary" : "bg-outline-variant/50")}
                               >
                                  <div className={cn("w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 shadow-sm transition-all duration-300", emailNotifications ? "right-0.75" : "left-0.75")}></div>
                               </button>
                            </div>

                            {/* Weekly Digests Toggle */}
                            <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
                               <div>
                                  <h4 className="font-semibold text-xs text-on-surface mb-0.5">Weekly Performance Audit Record</h4>
                                  <p className="text-[11px] text-on-surface-variant font-medium">Get a weekly summary detailing solved sandbox MCQs, active bookmarks, and learning speed stats.</p>
                               </div>
                               <button 
                                 type="button"
                                 onClick={() => setWeeklyDigest(!weeklyDigest)}
                                 className={cn("w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors shrink-0", weeklyDigest ? "bg-primary" : "bg-outline-variant/50")}
                               >
                                  <div className={cn("w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 shadow-sm transition-all duration-300", weeklyDigest ? "right-0.75" : "left-0.75")}></div>
                               </button>
                            </div>
                          </div>
                        </div>

                        {/* Section: Sandbox Workspace Settings */}
                        <div className="space-y-3 pt-2">
                          <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-primary flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" /> Sandbox UI & System Variables
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Dark Mode Toggle */}
                            <div className="flex items-center justify-between p-3.5 bg-[#FAF9F5]/70 dark:bg-surface-container-low/70 rounded-xl border border-outline-variant/15 dark:border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
                               <div>
                                  <h4 className="font-semibold text-xs text-on-surface mb-0.5">Dynamic Dark Theme</h4>
                                  <p className="text-[10px] text-on-surface-variant font-medium">Convert layout elements to eyesafe darker modes.</p>
                               </div>
                               <button 
                                 type="button"
                                 onClick={toggleDarkMode}
                                 className={cn("w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors shrink-0", isDarkMode ? "bg-primary" : "bg-outline-variant/50")}
                               >
                                  <div className={cn("w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 shadow-sm transition-all duration-300", isDarkMode ? "right-0.75" : "left-0.75")}></div>
                               </button>
                            </div>

                            {/* Sound FX Toggle */}
                            <div className="flex items-center justify-between p-3.5 bg-[#FAF9F5]/70 dark:bg-surface-container-low/70 rounded-xl border border-outline-variant/15 dark:border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
                               <div>
                                  <h4 className="font-semibold text-xs text-on-surface mb-0.5">Interactive Sound Click Feedback</h4>
                                  <p className="text-[10px] text-on-surface-variant font-medium">Play acoustic audio cues upon MCQ scoring alerts.</p>
                               </div>
                               <button 
                                 type="button"
                                 onClick={() => setSoundEffects(!soundEffects)}
                                 className={cn("w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors shrink-0", soundEffects ? "bg-primary" : "bg-outline-variant/50")}
                               >
                                  <div className={cn("w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 shadow-sm transition-all duration-300", soundEffects ? "right-0.75" : "left-0.75")}></div>
                               </button>
                            </div>

                            {/* Offline Caching */}
                            <div className="flex items-center justify-between p-3.5 bg-[#FAF9F5]/70 dark:bg-surface-container-low/70 rounded-xl border border-outline-variant/15 dark:border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
                               <div>
                                  <h4 className="font-semibold text-xs text-on-surface mb-0.5">Syllabus Offline Caching</h4>
                                  <p className="text-[10px] text-on-surface-variant font-medium">Pre-load the core academic syllabus files offline.</p>
                               </div>
                               <button 
                                 type="button"
                                 onClick={() => setOfflineCaching(!offlineCaching)}
                                 className={cn("w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors shrink-0", offlineCaching ? "bg-primary" : "bg-outline-variant/50")}
                               >
                                  <div className={cn("w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 shadow-sm transition-all duration-300", offlineCaching ? "right-0.75" : "left-0.75")}></div>
                               </button>
                            </div>

                            {/* Autoplay PDF Preview */}
                            <div className="flex items-center justify-between p-3.5 bg-[#FAF9F5]/70 dark:bg-surface-container-low/70 rounded-xl border border-outline-variant/15 dark:border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
                               <div>
                                  <h4 className="font-semibold text-xs text-on-surface mb-0.5 font-sans">Immediate PDF Reader Launcher</h4>
                                  <p className="text-[10px] text-on-surface-variant font-medium font-sans">Bypass informational modals to view documents instantly.</p>
                               </div>
                               <button 
                                 type="button"
                                 onClick={() => setAutoplayPdf(!autoplayPdf)}
                                 className={cn("w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors shrink-0", autoplayPdf ? "bg-primary" : "bg-outline-variant/50")}
                               >
                                  <div className={cn("w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 shadow-sm transition-all duration-300", autoplayPdf ? "right-0.75" : "left-0.75")}></div>
                               </button>
                            </div>
                          </div>
                        </div>

                        {/* Section: AI Companion Assistant */}
                        <div className="space-y-4 pt-2">
                          <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-primary flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Companion Tuning
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">AI Companion Persona Voice</label>
                                <select 
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all cursor-pointer font-sans"
                                  value={aiCompanionTone}
                                  onChange={(e) => setAiCompanionTone(e.target.value)}
                                >
                                  <option value="Intelligent Mentor">💡 Intelligent Mentor (Concept Explanation-first)</option>
                                  <option value="Socratic Guide">🤔 Socratic Guide (Asks guiding questions)</option>
                                  <option value="Strict Professor">🎓 Strict Professor (Academic rigor focused)</option>
                                  <option value="Peer Companion">✨ Empathetic Study Peer (Casual encouragement)</option>
                                </select>
                             </div>
                             <div>
                                <label className="block text-[10px] font-mono font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Daily Study Scheduler Trigger</label>
                                <select 
                                  className="w-full bg-[#FAF9F5] dark:bg-surface-container border border-outline-variant/40 dark:border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all cursor-pointer font-sans"
                                  value={studyReminderTime}
                                  onChange={(e) => setStudyReminderTime(e.target.value)}
                                >
                                  <option value="08:00">⏰ 08:00 AM Morning Session Focus Reminder</option>
                                  <option value="12:00">⏰ 12:00 PM Afternoon Study Power Check-in</option>
                                  <option value="16:00">⏰ 04:00 PM Evening Review Session Alert</option>
                                  <option value="20:00">⏰ 08:00 PM Night Cap MCQ Recap Spark</option>
                                  <option value="Off">🔕 Mute Daily System Push Notifications</option>
                                </select>
                             </div>
                          </div>
                        </div>

                        {/* Save Action Banner */}
                        <div className="pt-6 border-t border-outline-variant/30 flex justify-end items-center">
                          <button 
                            onClick={handleSaveChanges} 
                            disabled={isSaving || saveSuccess}
                            className={cn(
                              "px-6 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center gap-2",
                              saveSuccess ? "bg-green-600 text-white hover:bg-green-700" : "bg-primary text-white hover:bg-primary-container",
                              isSaving && "opacity-80 cursor-not-allowed"
                            )}
                          >
                            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {saveSuccess && <Check className="w-4 h-4" />}
                            {saveSuccess ? 'Saved!' : 'Save Preferences'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-surface-container-low rounded-xl p-8 text-center border border-outline-variant/30">
                        <Users className="w-12 h-12 text-on-surface-variant mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-on-surface mb-2">Not Logged In</h3>
                        <p className="text-on-surface-variant mb-6 max-w-sm mx-auto">You must be logged in to view and save workspace system preferences.</p>
                      </div>
                    )}
                  </div>
               )}
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav activeTab="settings" onNavigate={onNavigate} />
    </div>
  );
}
