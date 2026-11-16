'use strict';
const grid=document.getElementById('countryGrid');
const directToggle=document.getElementById('directToggle');
const countryDialog=document.getElementById('countryDialog');
let highlightDirect=false;
let highlightCurrency=false;
const currencyToggle=document.getElementById('currencyToggle');
const activeContinent=typeof CONTINENT_NAME==='string'?CONTINENT_NAME:'Europa';
const activeCountries=typeof CONTINENT_KEY==='string'&&typeof continentGroups!=='undefined'?worldCountries.filter(c=>continentGroups[CONTINENT_KEY].includes(c.code)):europeanCountries;
function flightsForCountry(code){return directFlights.filter(f=>f.country===code&&f.status==='published'&&f.nonstop);}
function daysLabel(days){return days.length===7?'Todos os dias':days.map(day=>['','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'][day]).join(' · ');}
function inlineFlights(code){return `<div class="inline-flights">${typeof fareCountryControls==='function'?fareCountryControls(code):''}${flightsForCountry(code).map(f=>`<section class="inline-route"><div class="inline-city"><h3>${f.city} <small>${f.airport}</small></h3><span>≈ ${f.duration}</span></div>${typeof fareRoutePanel==='function'?fareRoutePanel(f):''}${f.seasonalAirlines?.length?`<p class="seasonal-route">Operação sazonal: ${f.seasonalAirlines.join(", ")} · calendário a confirmar</p>`:""}<p class="inline-label">COMPANHIA · DIAS DA SEMANA</p><ul class="airline-days">${f.weekdays.map(s=>`<li><strong>${s.airline}</strong><span>${daysLabel(s.days)}</span></li>`).join('')}</ul><p class="data-reliability">Conferido em ${f.checked?f.checked.split('-').reverse().join('/'):'data não informada'} · rota publicada; operação na sua data a confirmar.</p><p class="schedule-reference">Partidas de GRU · Semana ${f.schedulePeriod.label}</p><a class="schedule-source" href="${f.scheduleSource}" target="_blank" rel="noopener noreferrer">Consultar grade ↗</a></section>`).join('')}<p class="inline-disclaimer">Duração aproximada de ida. Dias válidos para a semana indicada; confirme sua data antes de viajar.</p></div>`;}
function renderCountries(){
 const visibleCountries=activeCountries.filter(c=>(!highlightDirect||flightsForCountry(c.code).length>0)&&(!highlightCurrency||currencyBelowReal(c))&&(typeof matchesTourismFilter!=='function'||matchesTourismFilter(c.code)));
 grid.innerHTML=visibleCountries.map((c,i)=>{const selected=highlightDirect||highlightCurrency;const trains=typeof trainButton==='function'?trainButton(c.code):'';const tag=selected||trains?'article':'button';return `<${tag}${tag==='button'?' type="button"':''} class="country${selected?' direct-selected':''}${typeof seasonClass==='function'?seasonClass(c.code):''}" data-country="${c.code}" aria-label="${c.name}${selected?', selecionado':''}"><span class="country-number">${String(i+1).padStart(2,'0')}</span><span class="country-name"><img class="country-flag" src="assets/flags/${c.code.toLowerCase()}.png" alt="" width="32" height="24">${c.name}</span>${selected?`<span class="country-status">${highlightDirect?'✓ Voo direto':''}${highlightDirect&&highlightCurrency?' · ':''}${highlightCurrency?'✓ Moeda inferior ao real':''}</span>`:''}${typeof seasonCardLabel==='function'?seasonCardLabel(c.code):''}${currencyDetails(c)}${trains}${highlightDirect?inlineFlights(c.code):''}</${tag}>`;}).join('')||'<p class="empty-countries">Nenhum país atende aos filtros selecionados neste catálogo. Desative um dos botões para ampliar a lista.</p>';
 grid.classList.toggle('show-flight-details',highlightDirect);
 grid.classList.toggle('selected-list',highlightDirect||highlightCurrency||(typeof selectedTourismLevel!=='undefined'&&selectedTourismLevel!==null));
 directToggle.setAttribute('aria-pressed',String(highlightDirect));directToggle.classList.toggle('enabled',highlightDirect);
 currencyToggle.setAttribute('aria-pressed',String(highlightCurrency));currencyToggle.classList.toggle('enabled',highlightCurrency);
 const count=visibleCountries.length;
 document.getElementById('selectionStatus').textContent=(highlightDirect||highlightCurrency)?`${count} países selecionados${highlightCurrency?' · Cotação de '+rateDate():''}. Desative os filtros para mostrar os ${activeCountries.length}.`:`${activeCountries.length} países · Moedas, cotações e idiomas`;
 grid.setAttribute('aria-label',`${count} países · ${activeContinent}${highlightDirect?' com voos diretos de São Paulo':''}${highlightCurrency?' com moeda inferior ao real':''}`);
}
function openCountry(code){
 const country=activeCountries.find(c=>c.code===code);if(!country)return;
 const flights=flightsForCountry(code);document.getElementById('countryTitle').textContent=country.name;
 document.getElementById('countryContent').innerHTML=flights.length?`${typeof fareCountryControls==='function'?fareCountryControls(code):''}<p class="modal-intro">${flights.length} ${flights.length===1?'cidade com voo direto':'cidades com voo direto'} de São Paulo/Guarulhos.</p><div class="flight-list">${flights.map(f=>`<article class="flight"><div class="flight-heading"><h3>${f.city} <span>${f.airport}</span></h3><span class="nonstop">✓ Sem escala</span></div><p class="route-path">São Paulo <b>GRU</b> → ${f.city} <b>${f.airport}</b></p><dl><div><dt>COMPANHIAS</dt><dd>${f.airlines.join(' · ')}</dd></div><div><dt>DURAÇÃO APROXIMADA · IDA</dt><dd class="duration">${f.duration}</dd></div></dl>${typeof fareRoutePanel==='function'?fareRoutePanel(f):''}<p class="data-reliability">Conferido em ${f.checked?f.checked.split('-').reverse().join('/'):'data não informada'} · <b>${f.seasonal||f.seasonalAirlines?.length?'Operação sazonal: confirmar calendário':'Sazonalidade não aferida'}</b></p><a href="${f.source}" target="_blank" rel="noopener noreferrer">Fonte da rota e duração ↗</a></article>`).join('')}</div><p class="modal-note">Fontes consultadas em 13/11/2026. Tempos de referência por rota; variam com a companhia, a data e as condições do voo. Confirme a operação na data escolhida. Sazonalidade não aferida.</p>`:'<div class="no-flight"><h3>Sem voo direto confirmado neste catálogo</h3><p>Ainda não temos uma rota sem escala de Guarulhos para este país cadastrada. Isso não é uma consulta em tempo real.</p></div>';
 countryDialog.showModal();
}
directToggle.addEventListener('click',()=>{highlightDirect=!highlightDirect;renderCountries();});
currencyToggle.addEventListener('click',()=>{if(!currencyData){renderCurrencyStatus('Cotação indisponível. Conecte-se à internet e recarregue a página para usar o filtro por moeda.');return;}highlightCurrency=!highlightCurrency;renderCountries();});
grid.addEventListener('click',event=>{const guide=event.target.closest('[data-country-guide]');if(guide?.dataset.countryGuide)return;const flightButton=event.target.closest('[data-country-flights]');if(flightButton?.dataset.countryFlights&&typeof openCountryFlights==='function'){openCountryFlights(flightButton.dataset.countryFlights);return;}const train=event.target.closest('[data-trains]');if(train?.dataset.trains&&typeof openTrains==='function'){openTrains(train.dataset.trains);return;}if(highlightDirect||highlightCurrency)return;const button=event.target.closest('[data-country]');if(button)openCountry(button.dataset.country);});
document.getElementById('closeCountry').addEventListener('click',()=>countryDialog.close());
countryDialog.addEventListener('click',event=>{if(event.target!==countryDialog)return;const b=countryDialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)countryDialog.close();});
if(typeof initializeTourism==='function')initializeTourism();
if(typeof initializeFareFilters==='function')initializeFareFilters();
renderCountries();
renderCurrencyStatus();
refreshCurrency();

