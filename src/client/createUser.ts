import { createClient } from "@supabase/supabase-js";
import { type user } from '../types/user.ts';

export async function createUser(supabaseKey: string, supabaseUrl: string, userData: user) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
    })
    console.log(data);
    if(error) {
        console.log(error);
    }
}
