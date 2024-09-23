import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://isjbolzjzgnshvczxfrg.supabase.co";
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzamJvbHpqemduc2h2Y3p4ZnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0NTU2MzYsImV4cCI6MjA0MTAzMTYzNn0.ibKejc2x36vEcRMkNy7mkkpOvVOGR196ll0yLHp-CZg";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
