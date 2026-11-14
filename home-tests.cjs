const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
assert.equal((html.match(/class="continent /g)||[]).length,7);
assert(!/<input|<select|searchForm|id="query"/.test(html));
for(const slug of ['europa','america-do-sul','america-do-norte','america-central','asia','africa','oceania']){assert(html.includes('href="'+slug+'.html"'));assert(fs.existsSync(path.join(__dirname,slug+'.html')));}
assert(!html.includes('EM BREVE'));assert(!html.includes('continentDialog'));assert(fs.existsSync(path.join(__dirname,'assets/continentes.png')));
console.log('OK entrada: sete continentes ligados às páginas completas, sem busca ou avisos de conteúdo futuro.');
