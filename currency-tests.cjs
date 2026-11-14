const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const read=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
async function check(responses){let calls=0;const status={};const context=vm.createContext({AbortSignal:{timeout:()=>({})},document:{getElementById:()=>status},renderCountries(){},fetch:async()=>{const item=responses[calls++];if(item instanceof Error)throw item;return {ok:true,json:async()=>item};}});vm.runInContext(read('country-info.js')+'\n'+read('currency-snapshot.js')+'\n'+read('currency.js'),context);await vm.runInContext('refreshCurrency()',context);return {calls,status,run:s=>vm.runInContext(s,context)};}
module.exports=(async()=>{
 const snapshot=vm.runInNewContext(read('currency-snapshot.js')+';bundledRates');
 const fresh=structuredClone(snapshot);fresh.date='2026-11-13';fresh.brl.eur=0.2;
 const primary=await check([fresh]);assert.equal(primary.calls,1);assert.equal(primary.run('unitInReais("EUR")'),5);assert.equal(primary.run('rateDate()'),'13/11/2026');
 const fallback=await check([Error('offline'),fresh]);assert.equal(fallback.calls,2);assert.equal(fallback.run('rateDate()'),'13/11/2026');
 const unavailable=await check([Error('offline'),Error('offline')]);assert.equal(unavailable.run('rateDate()'),snapshot.date.split('-').reverse().join('/'));assert(unavailable.status.textContent.includes('Sem atualização online'));
 const invalid=structuredClone(fresh);invalid.brl.eur=-1;const rejected=await check([invalid,fresh]);assert.equal(rejected.calls,2);assert.equal(rejected.run('unitInReais("EUR")'),5);
 const older=structuredClone(snapshot);older.date='2020-01-01';const old=await check([older]);assert.equal(old.run('currencyData.date'),snapshot.date);
 console.log('OK atualização de cotação: API principal, provedor alternativo, modo offline, rejeição de valor inválido e preservação da referência mais recente.');
})().catch(error=>{console.error(error);process.exitCode=1;});
