import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const SUPABASE_URL = env.match(/SUPABASE_URL="(.*?)"/)[1];
const SUPABASE_KEY = env.match(/SUPABASE_KEY="(.*?)"/)[1];

async function run() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_KEY}`);
  const data = await res.json();
  console.log(JSON.stringify(data.definitions, null, 2));
}
run();
