import fs from 'fs';
import path from 'path';

const levelsPath = path.resolve('data/levels.json');
const levelsData = JSON.parse(fs.readFileSync(levelsPath, 'utf8'));

let sql = '';

for (const level of levelsData) {
  const escapedLevelTitle = level.title.replace(/'/g, "''");
  const escapedLevelDesc = level.description.replace(/'/g, "''");
  
  sql += `INSERT INTO levels (id, title, description) VALUES (${level.id}, '${escapedLevelTitle}', '${escapedLevelDesc}');\n`;
  
  for (const question of level.questions) {
    const escapedType = question.type.replace(/'/g, "''");
    const escapedPromptPt = question.promptPt.replace(/'/g, "''");
    const escapedPromptEn = question.promptEn.replace(/'/g, "''");
    const escapedImageUrl = question.imageUrl ? `'${question.imageUrl.replace(/'/g, "''")}'` : 'NULL';
    const escapedOptions = JSON.stringify(question.options).replace(/'/g, "''");
    
    sql += `INSERT INTO questions (level_id, type, "promptPt", "promptEn", "imageUrl", options) VALUES (${level.id}, '${escapedType}', '${escapedPromptPt}', '${escapedPromptEn}', ${escapedImageUrl}, '${escapedOptions}'::jsonb);\n`;
  }
  
  sql += '\n';
}

fs.writeFileSync('seed.sql', sql);
console.log('seed.sql generated!');
