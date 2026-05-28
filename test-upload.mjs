import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://kipfommdgnzjbzwdnnqp.supabase.co', 'sb_publishable_mOJygyL8vPHWBnd8ltTl8Q_M27DgOhU');

async function run() {
  const { data, error } = await supabase.storage.from('pdfs').upload('test-avatar.txt', 'hello world', { upsert: true });
  console.log('Upload result:', { data, error });
}
run();
