const fs = require('fs');

function extract(file) {
  if (!fs.existsSync(file)) return "Not Found";
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const score = data.categories.performance?.score * 100;
  const issues = [];
  
  for (const key in data.audits) {
    const audit = data.audits[key];
    if (audit.score !== 1 && audit.score !== null) {
      if (audit.details?.type === 'opportunity' || audit.details?.type === 'table') {
        const title = audit.title;
        const savings = audit.displayValue || (audit.details.overallSavingsMs ? audit.details.overallSavingsMs + 'ms' : '');
        if (savings || audit.score < 0.9) {
          issues.push(`${title}: ${savings} (score: ${audit.score})`);
        }
      } else if (audit.score < 0.9) {
         issues.push(`${audit.title} (score: ${audit.score})`);
      }
    }
  }
  return { score, issues };
}

console.log("MOBILE:", '\n' + extract('./report-mobile.json')?.score + '\n' + (extract('./report-mobile.json')?.issues || []).join('\n'));
console.log("\nDESKTOP:", '\n' + extract('./report-desktop.json')?.score + '\n' + (extract('./report-desktop.json')?.issues || []).join('\n'));
