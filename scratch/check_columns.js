import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const SUPABASE_URL = env.match(/SUPABASE_URL="(.*?)"/)[1];
const SUPABASE_KEY = env.match(/SUPABASE_KEY="(.*?)"/)[1];

async function run() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/students_whitelist?limit=1`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const data = await res.json();
  console.log("Status:", res.status);
  console.log("Data:", data);
}
run();
