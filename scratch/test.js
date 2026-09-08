import fs from 'fs';
const env = fs.readFileSync('.env', 'utf-8');
const SUPABASE_URL = env.match(/SUPABASE_URL="(.*?)"/)?.[1] || env.match(/SUPABASE_URL=(.*?)\n/)[1];
const SUPABASE_KEY = env.match(/SUPABASE_KEY="(.*?)"/)?.[1] || env.match(/SUPABASE_KEY=(.*?)\n/)[1];

async function run() {
  const res = await fetch(SUPABASE_URL + '/rest/v1/levels?select=id,calendar_year&limit=5', {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
  });
  console.log(await res.text());
}
run();
