import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { Client, type HealthResponse } from 'cyborgdb';

dotenv.config();
const supabaseUrl: string = 'https://hvhtnhzwubhmmricdpxw.supabase.co';
const supabaseKey: string = process.env.supabaseKey || 'no key';

const supabase = createClient(supabaseUrl, supabaseKey);

async function saveData() {
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
}

const localClient = new Client({ baseUrl: 'http://localhost:8000', apiKey: process.env.CYBORGDB_API_KEY });

try {
    const health: HealthResponse = await localClient.getHealth();
    console.log('Service health status:', health);
    console.log('Status:', health.status);
} catch (error: any) {
    console.error('Health check failed:', error.message);
}