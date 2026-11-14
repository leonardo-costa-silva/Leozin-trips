'use strict';
// Perfis editoriais amplos: não são preços, lotação medida ou previsão meteorológica.
Object.assign(tourismPatterns,{
 southern:'HHMMLLLLMMMH',
 winterSun:'HHHHMLLMLMHH',
 drySummer:'LLMMHHHHHMML',
 safari:'HHMLLHHHHMHM',
 springAutumn:'LMHHMMLMHHML',
 gulf:'HHHMLLLLLMHH',
 equatorial:'MMMMMMMMMMMM',
 unknown:'UUUUUUUUUUUU'
});
const tourismScope={};
function assignTourism(codes,profile,note){for(const code of codes.split(' ')){tourismProfile[code]=profile;tourismScope[code]=note;}}
assignTourism('AR BR CL UY PY AU NZ ZA','southern','Modelo geral de verão no Sul. Regiões tropicais, neve e feriados podem ter picos diferentes.');
assignTourism('US CA','summer','Modelo geral de verão no Norte. Destinos de neve, Caribe e parques variam.');
assignTourism('MX AG BS BB CU DM DO GD HT JM KN LC TT VC BZ CR GT HN NI PA SV','winterSun','Modelo geral de procura no período mais seco e férias de fim de ano. Chuvas e feriados variam por região.');
assignTourism('BO PE EC','drySummer','Modelo voltado aos circuitos andinos no período seco. Costa, Amazônia e ilhas têm padrões diferentes.');
assignTourism('CO GY SR VE','winterSun','Estimativa geral; altitude, costa e épocas de chuva diferem dentro do país.');
assignTourism('DZ MA TN EG','springAutumn','Primavera e outono no modelo geral. Praias, deserto e feriados têm picos distintos.');
assignTourism('AO BW MG MW MZ NA ZM ZW','drySummer','Estimativa para o período seco. Praias, safáris e eventos locais podem mudar o padrão.');
assignTourism('KE TZ UG RW','safari','Modelo amplo de procura por natureza/safáris; chuvas e migrações dependem da região.');
assignTourism('BI BJ BF CM CD CG CI DJ ER ET GA GH GN GM GW GQ LR ML MR NE NG SN SL TD TG','winterSun','Modelo geral de viagens na época menos chuvosa em parte do país. A estação seca local pode diferir.');
assignTourism('LS SZ','southern','Modelo geral do verão austral; montanhas, neve e eventos têm calendários próprios.');
assignTourism('CV KM MU SC ST','equatorial','Ilhas com diferenças locais de vento, chuva e feriados; sem pico nacional diferenciado neste modelo.');
assignTourism('AE BH KW OM QA SA','gulf','Modelo de procura nos meses menos quentes. Peregrinações e eventos não estão incorporados.');
assignTourism('BD IN NP BT PK','winterSun','Modelo amplo de circuitos culturais e meses menos quentes. Himalaia, monções e feriados variam.');
assignTourism('TH KH LA MM VN LK MV','winterSun','Modelo geral de procura no inverno boreal. Monções e costas têm calendários diferentes.');
assignTourism('ID TL','drySummer','Modelo geral para o período seco em destinos do sul; outras ilhas podem ter épocas diferentes.');
assignTourism('BN MY SG PH','winterSun','Modelo amplo de procura; monções, ilhas, férias e festas locais variam.');
assignTourism('CN JP KR TW','springAutumn','Modelo de procura na primavera e outono. Neve, feriados móveis e regiões tropicais podem inverter o padrão.');
assignTourism('IR IL JO LB PS','springAutumn','Modelo climático/editorial geral. Não avalia acesso, segurança, funcionamento ou restrições locais.');
assignTourism('KG MN TJ TM UZ','summer','Modelo amplo de viagens nos meses mais amenos. Altitude e regiões desérticas variam.');
assignTourism('FJ PG SB VU WS TO','drySummer','Modelo amplo do período menos chuvoso em parte do Pacífico Sul. Ilhas e férias escolares variam.');
assignTourism('FM KI MH NR PW TV','equatorial','Sem pico nacional diferenciado neste modelo; ilhas e regimes de chuva variam.');
assignTourism('AF CF IQ KP LY SD SO SS SY YE','unknown','Não há classificação turística nacional suficientemente verificada neste catálogo.');
for(const country of worldCountries){if(!tourismProfile[country.code]){tourismProfile[country.code]='unknown';tourismScope[country.code]='Classificação turística ainda não disponível.';}}
const originalCountrySeason=countrySeason;
countrySeason=function(code,month){return originalCountrySeason(code,month)||'unknown';};
tourismLabels.unknown='Não definida';
function tourismNote(code){return tourismScope[code]||'Procura geral estimada. Esqui, praias, feriados e eventos podem ter outra temporada.';}
