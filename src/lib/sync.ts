import { supabase } from './supabase';

let syncTimer: any = null;

export function initSync() {
  if (typeof window === 'undefined') return;

  const originalSetItem = localStorage.setItem;

  localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);

    const isSyncableKey = 
      key.startsWith('bookmarks_') ||
      key.endsWith('_program_progress') ||
      key === 'watchLaterNews' ||
      key === 'savedProblems' ||
      key.startsWith('userSettings_') ||
      key === 'theme';

    if (isSyncableKey && key !== 'appData_lastUpdated') {
      const now = Date.now();
      originalSetItem.call(this, 'appData_lastUpdated', now.toString());
      
      if (syncTimer) clearTimeout(syncTimer);
      syncTimer = setTimeout(() => {
        pushToSupabase();
      }, 3000); // debounce 3 seconds
    }
  };
}

async function pushToSupabase() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const appData: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    
    if (
      key.startsWith('bookmarks_') ||
      key.endsWith('_program_progress') ||
      key === 'watchLaterNews' ||
      key === 'savedProblems' ||
      key.startsWith('userSettings_') ||
      key === 'theme' ||
      key === 'appData_lastUpdated'
    ) {
      appData[key] = localStorage.getItem(key) || '';
    }
  }

  try {
    const { error } = await supabase.auth.updateUser({
      data: { appData }
    });
    
    if (error) {
       console.error('Supabase updateUser error:', error);
       // If size exceeded, we might want to try removing images from userSettings
       if (error.status === 413 || error.message.includes('too large')) {
           for (const key of Object.keys(appData)) {
               if (key.startsWith('userSettings_')) {
                   try {
                       const settings = JSON.parse(appData[key]);
                       if (settings.avatar) {
                           settings.avatar = null; // strip avatar
                           appData[key] = JSON.stringify(settings);
                       }
                   } catch (e) {}
               }
           }
           await supabase.auth.updateUser({ data: { appData } });
       }
    } else {
       console.log('Synced local data to remote profile.');
    }
  }  catch (e) {
    console.error('Failed to sync to remote', e);
  }
}

export async function pullFromSupabase() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const remoteData = user.user_metadata?.appData || {};
    const remoteLastUpdated = parseInt(remoteData['appData_lastUpdated'] || '0', 10);
    const localLastUpdated = parseInt(localStorage.getItem('appData_lastUpdated') || '0', 10);

    const hasRemoteKeys = Object.keys(remoteData).length > 0;

    if (remoteLastUpdated > localLastUpdated || (localLastUpdated === 0 && hasRemoteKeys)) {
      console.log('Remote data is newer or local is empty, pulling to local storage.');
      
      const originalSetItem = Object.getPrototypeOf(localStorage).setItem;
      
      for (const key of Object.keys(remoteData)) {
        if (remoteData[key] !== undefined) {
           originalSetItem.call(localStorage, key, remoteData[key]);
        }
      }
      
      // Dispatch a storage event so if any components listen, they update, 
      // but typically we just reload or components read on mount
      window.dispatchEvent(new Event('storage'));
      return true; // Indicates we pulled
    }
    
    // Also push just in case remote doesn't have it but we do
    if (localLastUpdated > remoteLastUpdated) {
        pushToSupabase();
    }
    
    return false;
  } catch (e) {
    console.error('Failed to pull from remote', e);
    return false;
  }
}
