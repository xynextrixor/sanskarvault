import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://kipfommdgnzjbzwdnnqp.supabase.co', 'sb_publishable_mOJygyL8vPHWBnd8ltTl8Q_M27DgOhU');

async function run() {
  const fetchFilesInFolder = async (folderPath, depth = 0) => {
    if (depth > 4) return [];
    try {
      const { data, error } = await supabase.storage.from('pdfs').list(folderPath, {
        limit: 100,
      });

      if (error || !data) return [];

      let fetchedFiles = [];
      for (const item of data) {
        if (item.name === '.emptyFolderPlaceholder') continue;
        
        if (item.id == null) {
          const subFolderPath = folderPath ? `${folderPath}/${item.name}` : item.name;
          const subFiles = await fetchFilesInFolder(subFolderPath, depth + 1);
          fetchedFiles = [...fetchedFiles, ...subFiles];
        } else {
          fetchedFiles.push({
             ...item,
             fullPath: folderPath ? `${folderPath}/${item.name}` : item.name,
             folderName: folderPath || 'Root'
          });
        }
      }
      return fetchedFiles;
    } catch (err) {
      console.error('Error fetching folder:', folderPath, err);
      return [];
    }
  };
  const allFiles = await fetchFilesInFolder('');
  console.log('All files length:', allFiles.length);
  if (allFiles.length > 0) {
     console.log('First 5 files:', allFiles.slice(0, 5));
  }
}
run();
