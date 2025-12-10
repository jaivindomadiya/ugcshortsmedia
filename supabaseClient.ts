import { createClient } from '@supabase/supabase-js';

// Configuration provided by user
const supabaseUrl = 'https://usdhlthcygdqiedhjvei.supabase.co';
const supabaseKey = 'sb_publishable_U_aQ8XBQeyR4Av2khclejw_CFFko7ds';

export const supabase = createClient(supabaseUrl, supabaseKey);