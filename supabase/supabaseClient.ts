import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_PUBLISHABLE_KEY } from '@env';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseKey = REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);