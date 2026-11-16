'use strict';
let currencyData=typeof bundledRates!=='undefined'?bundledRates:null;
let currencyOrigin='Referência incluída no site';
const rateEndpoints=['https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/brl.json','https://latest.currency-api.pages.dev/v1/currencies/brl.json'];
function validRates(data){const date=typeof data?.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(data.date)?Date.parse(data.date+'T00:00:00Z'):NaN;return Boolean(Number.isFinite(date)&&new Date(date).toISOString().slice(0,10)===data.date&&date<=Date.now()+86400000&&data.brl&&data.brl.brl===1&&Object.values(countryInfo).every(([code])=>typeof data.brl[code.toLowerCase()]==='number'&&Number.isFinite(data.brl[code.toLowerCase()])&&data.brl[code.toLowerCase()]>0));}
if(!validRates(currencyData))currencyData=null;
const currencyCacheKey='leozin-trips:rates:v1';
try{const saved=JSON.parse(localStorage.getItem(currencyCacheKey));if(validRates(saved)&&(!currencyData||saved.date>=currencyData.date)){currencyData=saved;currencyOrigin='Última cotação salva neste aparelho';}}catch{}
let currencyRefreshing=false;
function currencyIsOld(){return !!currencyData&&Date.now()-Date.parse(currencyData.date+'T00:00:00Z')>3*86400000;}
function notifyCurrencyChange(){if(typeof renderCountries==='function')renderCountries();if(typeof renderBudget==='function')renderBudget();}
function unitInReais(code){const rate=currencyData?.brl[code.toLowerCase()];return typeof rate==='number'&&rate>0?1/rate:null;}
function currencyBelowReal(country){const info=countryInfo[country.code];const value=info?unitInReais(info[0]):null;return value!==null&&value<1;}
function rateDate(){return currencyData?currencyData.date.split('-').reverse().join('/'):'indisponível';}
function currencyDetails(country){const [code,languages,otherCodes]=countryInfo[country.code];const codes=[...new Set([code,...(otherCodes||[])])];const names=codes.map(c=>`${currencyNames[c]||c} (${c})`).join(' · ');const quotes=codes.map(c=>{const value=unitInReais(c);return value===null?`${c}: indisponível`:`1 ${c} = ${new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:2,maximumFractionDigits:8}).format(value)}`;}).join('<br>');return `<span class="country-facts"><span class="fact-row"><span class="fact-label">Moeda:</span><span class="fact-value">${names}</span></span><span class="fact-row"><span class="fact-label">Cotação:</span><span class="fact-value">${quotes}${currencyData?` <small>(${rateDate()})</small>`:''}</span></span><span class="fact-row"><span class="fact-label">Idioma:</span><span class="fact-value">${languages}</span></span></span>`;}
function renderCurrencyStatus(message){const status=document.getElementById('currencyStatus');if(!status)return;if(message){status.textContent=message;return;}status.textContent=currencyData?`${currencyOrigin} · Cotação de ${rateDate()}.${currencyIsOld()?' ⚠ Referência antiga: mais de 3 dias.':''} Valores indicativos, sem taxas de câmbio ou impostos. Moeda nominalmente menor que o real não indica custo de vida menor.`:'Cotações indisponíveis. O filtro por moeda precisa de uma cotação válida.';}
async function refreshCurrency(){
 if(currencyRefreshing)return;currencyRefreshing=true;const button=document.getElementById('refreshCurrency');if(button)button.disabled=true;
 try{
 renderCurrencyStatus(currencyData?`Consultando cotação mais recente… Referência disponível: ${rateDate()}.`:'Consultando cotações…');
 for(const url of rateEndpoints){try{const response=await fetch(url,{signal:AbortSignal.timeout(8000),cache:'no-cache'});if(!response.ok)throw Error('HTTP');const data=await response.json();if(!validRates(data))throw Error('Dados inválidos');if(!currencyData||data.date>=currencyData.date){currencyData=data;currencyOrigin='API gratuita · última publicação';try{localStorage.setItem(currencyCacheKey,JSON.stringify(data));}catch{}}notifyCurrencyChange();renderCurrencyStatus();return;}catch{/* Próximo provedor, sem substituir a referência por dados inválidos. */}}
 currencyOrigin='Sem atualização online · referência salva';notifyCurrencyChange();renderCurrencyStatus();
 }finally{currencyRefreshing=false;if(button)button.disabled=false;}
}
if(typeof document.addEventListener==='function'){
 document.addEventListener('click',event=>{if(event.target.closest?.('#refreshCurrency'))refreshCurrency();});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshCurrency();});
 if(typeof setInterval==='function')setInterval(()=>{if(!document.hidden)refreshCurrency();},30*60*1000);
 if(typeof window!=='undefined')window.addEventListener('online',refreshCurrency);
}

