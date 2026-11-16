const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');const read=f=>fs.readFileSync(path.join(__dirname,f.split('?')[0]),'utf8');
class Element{constructor(){this.innerHTML='';this.textContent='';this.attrs={};this.handlers={};this.open=false;this.classList={toggle(){}};}setAttribute(k,v){this.attrs[k]=v;}addEventListener(k,f){this.handlers[k]=f;}showModal(){this.open=true;}close(){this.open=false;}}
const html=read('europa.html'),els={};for(const [,id]of html.matchAll(/id="([^"]+)"/g))els[id]=new Element();
const context=vm.createContext({CONTINENT_KEY:'europa',CONTINENT_NAME:'Europa',fetch:()=>new Promise(()=>{}),AbortSignal:{timeout:()=>({})},document:{getElementById:id=>{assert(els[id],id);return els[id];}}});
for(const [,file]of html.matchAll(/<script defer src="([^"]+)"/g))vm.runInContext(read(file),context);
const run=s=>vm.runInContext(s,context),buttons=()=> (els.countryGrid.innerHTML.match(/data-trains=/g)||[]).length;
assert.equal(buttons(),37);assert(!/<button[^>]*class="country[ "]/.test(els.countryGrid.innerHTML));
for(const code of run('activeCountries.map(c=>c.code)')){els.countryGrid.handlers.click({target:{closest:selector=>selector==='[data-trains]'?{dataset:{trains:code}}:null}});assert(els.countryDialog.open);assert(els.countryTitle.textContent.startsWith('Trens · '));els.closeCountry.handlers.click();assert(!els.countryDialog.open);}
run("openTrains('FR')");assert(els.countryContent.innerHTML.includes('Reino Unido'));assert(els.countryContent.innerHTML.includes('Londres (St Pancras)'));assert(els.countryContent.innerHTML.includes('Paris (Gare du Nord)'));assert(els.countryContent.innerHTML.includes('2h16'));
assert.equal(run("railConnections('PT').length"),0);run("openTrains('PT')");assert(els.countryContent.innerHTML.includes('ônibus substituto'));assert(els.countryContent.innerHTML.includes('Não é viagem integral em trem direto'));
assert(run("railConnections('LT',true).some(r=>r.destinationCountry==='PL'&&r.status==='transfer')"));assert(!run("railConnections('LT').some(r=>r.destinationCountry==='PL')"));
run("openTrains('AM')");assert(els.countryContent.innerHTML.includes('Sazonal'));assert(els.countryContent.innerHTML.includes('Tempo a confirmar'));
run("openTrains('VA')");assert(els.countryContent.innerHTML.includes('Ainda não há ligação'));assert(els.countryContent.innerHTML.includes('não significa que não exista'));
for(const route of run('railRoutes')){assert(route.a!==route.b);assert(route.duration);assert(route.source.startsWith('https://'));assert.equal(run(`railConnections('${route.a}').filter(r=>r.id==='${route.id}').length`),1);assert.equal(run(`railConnections('${route.b}').filter(r=>r.id==='${route.id}').length`),1);assert(run(`europeanCountries.some(c=>c.code==='${route.a}')&&europeanCountries.some(c=>c.code==='${route.b}')`));}
assert.equal(run('new Set(railRoutes.map(r=>r.id)).size'),run('railRoutes.length'));
els.directToggle.handlers.click();assert.equal(buttons(),run('activeCountries.filter(c=>flightsForCountry(c.code).length&&hasInternationalTrain(c.code)).length'));els.countryGrid.handlers.click({target:{closest:()=>({dataset:{trains:'FR'}})}});assert(els.countryTitle.textContent==='Trens · França');els.directToggle.handlers.click();els.currencyToggle.handlers.click();assert.equal(buttons(),run('activeCountries.filter(c=>currencyBelowReal(c)&&hasInternationalTrain(c.code)).length'));els.currencyToggle.handlers.click();assert.equal(buttons(),37);
run("CONTINENT_FOR_TEST='América do Sul'");assert(read('america-do-sul.html').includes('trains-ui.js'));
console.log(`OK trens: 37 botões europeus somente onde há ligação cadastrada; abertura/fechamento, ${run('railRoutes.length')} ligações publicadas, ${run('railReview.length')} avisos separados, ida/volta e filtros. DOM simulado.`);


