'use strict';
const tourismMonths=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
const tourismLabels={low:'Baixa',medium:'Média',high:'Alta'};
// Estimativas editoriais de procura turística geral, não dados de lotação/preços.
// L=baixa, M=média, H=alta. Inverno alpino e verão têm picos distintos.
const tourismPatterns={
 summer:'LLLMMHHHMM LL'.replace(/ /g,''),
 alpine:'HHHMLMHHMLMH',
 urban:'LLMMMH HHMM LH'.replace(/ /g,''),
 nordic:'LLLMMHHHMMML',
 mediterranean:'LLLMMHHHHMLM',
 caucasus:'LLLM MHHHHMLL'.replace(/ /g,'')
};
const tourismProfile={AL:'mediterranean',DE:'urban',AD:'alpine',AM:'caucasus',AT:'alpine',AZ:'caucasus',BE:'urban',BY:'summer',BA:'summer',BG:'summer',KZ:'summer',CY:'mediterranean',HR:'mediterranean',DK:'nordic',SK:'summer',SI:'summer',ES:'mediterranean',EE:'nordic',FI:'nordic',FR:'urban',GE:'caucasus',GR:'mediterranean',HU:'urban',IE:'summer',IS:'nordic',IT:'mediterranean',XK:'summer',LV:'nordic',LI:'alpine',LT:'nordic',LU:'urban',MK:'summer',MT:'mediterranean',MD:'summer',MC:'mediterranean',ME:'mediterranean',NO:'nordic',NL:'urban',PL:'summer',PT:'mediterranean',GB:'urban',CZ:'urban',RO:'summer',RU:'summer',SM:'mediterranean',RS:'summer',SE:'nordic',CH:'alpine',TR:'mediterranean',UA:'summer',VA:'mediterranean'};
let selectedTourismMonth=null;
let selectedTourismLevel=null;
function matchesTourismFilter(code){return selectedTourismLevel===null||(selectedTourismMonth!==null&&countrySeason(code,selectedTourismMonth)===selectedTourismLevel);}
function countrySeason(code,month){const symbol=tourismPatterns[tourismProfile[code]||'summer'][month];return {L:'low',M:'medium',H:'high'}[symbol];}
function countrySeasonCalendar(code){return `<div class="country-months" aria-label="Temporadas turísticas estimadas por mês">${tourismMonths.map((name,index)=>{const level=countrySeason(code,index);return `<span class="country-month season-${level}" title="${name}: ${tourismLabels[level]} temporada (estimativa)" aria-label="${name}: ${tourismLabels[level]} temporada">${name}</span>`;}).join('')}<span class="country-season-caption">Procura turística geral · estimativa</span></div>`;}
function seasonClass(code){return selectedTourismMonth===null?'':` season-${countrySeason(code,selectedTourismMonth)}`;}
function seasonCardLabel(code){return selectedTourismMonth===null?'':`<span class="country-season-label">${tourismMonths[selectedTourismMonth]} · ${tourismLabels[countrySeason(code,selectedTourismMonth)]} temporada</span>`;}
function renderTourismControls(){const panel=document.getElementById('tourismControls');if(!panel)return;panel.innerHTML=`<div class="tourism-month-buttons" aria-label="Selecione um mês para colorir os países"><strong>Temporada:</strong>${tourismMonths.map((month,index)=>`<button type="button" data-tourism-month="${index}" aria-pressed="${selectedTourismMonth===index}" class="tourism-month-button${selectedTourismMonth===index?' active':''}">${month}</button>`).join('')}</div><div class="tourism-legend">${Object.entries(tourismLabels).filter(([level])=>level!=='unknown').map(([level,label])=>`<button type="button" data-tourism-level="${level}" aria-pressed="${selectedTourismLevel===level}" class="tourism-level-button legend-${level}${selectedTourismLevel===level?' active':''}">● ${label}</button>`).join('')}</div>`;}
function initializeTourism(){
 const panel=document.getElementById('tourismControls');if(!panel)return;
 panel.addEventListener('click',event=>{
  const levelButton=event.target.closest('[data-tourism-level]');
  const monthButton=event.target.closest('[data-tourism-month]');
  let focusSelector;
  if(levelButton){
   const level=levelButton.dataset.tourismLevel;if(!Object.hasOwn(tourismLabels,level))return;
   selectedTourismLevel=selectedTourismLevel===level?null:level;
   if(selectedTourismLevel!==null&&selectedTourismMonth===null)selectedTourismMonth=new Date().getMonth();
   focusSelector='[data-tourism-level="'+level+'"]';
  }else if(monthButton){
   const month=Number(monthButton.dataset.tourismMonth);if(!Number.isInteger(month)||month<0||month>11)return;
   selectedTourismMonth=selectedTourismMonth===month?null:month;
   if(selectedTourismMonth===null)selectedTourismLevel=null;
   focusSelector='[data-tourism-month="'+month+'"]';
  }else return;
  renderTourismControls();renderCountries();panel.querySelector?.(focusSelector)?.focus();
 });renderTourismControls();
}
