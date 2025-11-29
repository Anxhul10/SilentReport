import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();
const supabaseUrl: string = 'https://hvhtnhzwubhmmricdpxw.supabase.co';
const supabaseKey: string = process.env.supabaseKey || 'no key';

const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase
  .from('countries')
  .insert({ id: 2, name: 'Mordor' })
  .select();

if (error ) {
    console.log(error);
}
else {
    console.log(data);
}
console.log(data);
