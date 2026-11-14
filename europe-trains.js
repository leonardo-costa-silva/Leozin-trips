'use strict';
// Ligações entre cidades, sem troca de trem. Tempos indicativos por sentido.
// Não inferir conexões por transitividade: FR–BE e BE–DE não provam FR–DE.
const railRoutes=[
['GB','Londres (St Pancras)','BE','Bruxelas (Midi)','1h53–1h57','Eurostar','https://www.sncf-connect.com/en-en/train/route/london/brussels'],
['GB','Londres (St Pancras)','NL','Amsterdã (Centraal)','4h09–4h19','Eurostar','https://www.eurostar.com/uk-en/train/london-to-amsterdam'],
['FR','Paris (Gare de Lyon)','IT','Milão (Centrale)','6h50–7h15','Frecciarossa','https://trenitalia.fr/wp-content/uploads/2025/12/Trenitalia-France-Dossier-de-presse-2026.pdf'],
['FR','Paris (Gare de Lyon)','ES','Barcelona (Sants)','6h42–7h00','TGV INOUI','https://www.sncf-connect.com/train/trajet/paris/barcelone'],
['GB','Londres (St Pancras)','FR','Paris (Gare du Nord)','2h16','Eurostar','https://www.eurostar.com/uk-en/train/london-to-paris'],
['FR','Paris (Gare du Nord)','BE','Bruxelas (Midi)','1h22','Eurostar','https://www.b-europe.com/EN/Routes/Paris-Brussels'],
['FR','Paris (Gare du Nord)','NL','Amsterdã (Centraal)','3h20','Eurostar','https://www.eurostar.com/us-en/train/paris-to-amsterdam'],
['BE','Bruxelas (Midi)','NL','Amsterdã (Centraal)','1h52','Eurostar','https://www.eurostar.com/be-en/train/brussels-to-amsterdam'],
['BE','Bruxelas (Midi)','DE','Colônia (Hbf)','1h47','ICE / Eurostar','https://travel.b-europe.com/EN/Routes/Brussels-Cologne'],
['NL','Amsterdã (Centraal)','DE','Berlim (Hbf)','5h51','ICE','https://www.nsinternational.com/en/trains/ice-to-berlin'],
['FR','Paris (Gare de Lyon)','CH','Zurique (HB)','4h04','TGV Lyria','https://www.tgv-lyria.com/fr/en/destination/train-route/paris-zurich'],
['CH','Zurique (HB)','IT','Milão (Centrale)','3h17','EuroCity','https://www.sbb.ch/en/leisure-holidays/europe/countries-cities/italy/zurich-milan.html'],
['CH','Zurique (HB)','DE','Munique (Hbf)','3h32','EuroCity','https://www.sbb.ch/en/leisure-holidays/europe/countries-cities/germany/zurich-munich.html'],
['CH','Zurique (HB)','AT','Viena (Hbf)','7h52','Railjet','https://www.sbb.ch/en/leisure-holidays/europe/countries-cities/austria/zurich-vienna.html'],
['AT','Viena (Hbf)','SK','Bratislava (Petržalka)','1h00','REX','https://www.oebb.at/en/regionale-angebote/ueberregionale-angebote/bratislava-ticket'],
['HU','Budapeste','AT','Viena (Hbf)','2h40','Railjet','https://int.bahn.de/en/faq/international-rail-companies-oebb-connections'],
['CZ','Praga (hlavní nádraží)','AT','Viena (Hbf)','4h00–4h15','ČD / ÖBB Railjet','https://www.cd.cz/trasy/trasy-rakousko/praha-wien/-30049/'],
['DE','Berlim (Hbf)','CZ','Praga (hlavní nádraží)','4h10–4h30','DB / ČD','https://www.bahn.de/reisen/view/verbindung/berlin/prag.shtml'],
['DK','Copenhague (H)','DE','Hamburgo (Hbf)','4h35–4h50','DSB / DB EuroCity','https://www.dsb.dk/find-produkter-og-services/dsb-udland/tyskland/hamborg/'],
['SE','Estocolmo (Central)','NO','Oslo (S)','5h00–6h00','SJ','https://www.sj.no/en/highspeed/'],
['FR','Nice (Ville)','MC','Mônaco (Monte-Carlo)','0h23','TER SNCF','https://www.sncf-connect.com/en-en/train/route/nice/monaco'],
['IE','Dublin (Connolly)','GB','Belfast (Grand Central)','2h05–2h15','Enterprise','https://www.translink.co.uk/Timetable/Download/fc3c3a851ebb12da75b8c012966370c6fce7a1076cc2f2e798d320f3ed56a0b8'],
['EE','Tallinn (Balti jaam)','LV','Riga','5h58–6h10','Elron','https://elron.ee/sites/default/files/2026-03/Tallinn-Riia_Vilnius_6aprill_3mm_0.pdf'],
['LT','Vilnius','LV','Riga','4h00–4h30','LTG Link','https://ltglink.lt/vilnius-ryga'],
['SI','Liubliana','HR','Zagreb (Glavni kolodvor)','2h15–2h47','SŽ / HŽPP','https://potniski.sz.si/wp-content/uploads/2026/05/Ljubljana%E2%80%93Zagreb-in-obratno.pdf'],
['ME','Bar','RS','Belgrado (Centar)','10h58–11h15','ŽPCG / Srbija Voz','https://www.zpcg.me/me/red-voznje/medjunarodni?do=Beograd+Centar&od=Bar']
].map(([a,from,b,to,duration,operator,source],index)=>({id:'rail-'+index,a,from,b,to,duration,operator,source,status:'published',checked:'2026-11-13',note:'Tempo de referência, que varia por sentido e partida. Confirme a grade e eventuais obras na data da viagem.'}));
// Rotas com serviço publicado, mas duração/condição sem validação suficiente.
const railReview=[
{a:'PT',from:'Porto (Campanhã)',b:'ES',to:'Vigo (Guixar)',status:'bus-replacement',operator:'Celta · CP / Renfe',duration:null,source:'https://cp.pt/en/detalhe-aviso/transbordo-celta-2026-2027',note:'De 06/04/2026 a 07/04/2027, o trecho Vigo–Valença tem ônibus substituto. Não é viagem integral em trem direto nesse período.'},
{a:'LT',from:'Vilnius',b:'PL',to:'Varsóvia',status:'transfer',operator:'LTG Link / PKP',duration:null,source:'https://ltglink.lt/en/international-travel-ticket',note:'A operadora informa troca em Mockava. Não conta como trem direto.'},
{a:'BG',from:'Sófia',b:'TR',to:'Istambul (Halkalı)',status:'duration-unverified',operator:'BDŽ / TCDD',duration:null,source:'https://www.bdz.bg/en/a/sofia-istanbul-sofia',note:'Trem noturno direto publicado. Horário alterado de 10/10 a 12/12/2026; duração atual a confirmar na grade. Halkalı não é o centro de Istambul.'},
{a:'RO',from:'Bucareste (Nord)',b:'MD',to:'Chișinău',status:'duration-unverified',operator:'CFR / CFM · Prietenia',duration:null,source:'https://www.cfrcalatori.ro/en/moldova/',note:'Serviço direto em carro-leito publicado; duração e calendário atuais ainda não verificados neste catálogo.'},
{a:'AM',from:'Yerevan',b:'GE',to:'Tbilisi',status:'seasonal',operator:'South Caucasus Railway',duration:null,source:'https://www.railway.am/en/route',note:'Grade sazonal publicada de 02/10/2026 a 13/06/2027, com partidas de Yerevan em datas pares. Duração por sentido a confirmar.'},
{a:'DE',from:'Berlim',b:'PL',to:'Varsóvia',status:'duration-unverified',operator:'DB / PKP Intercity',duration:null,source:'https://www.bahn.de/reisen/view/verbindung/berlin/warschau.shtml',note:'Serviço direto publicado; há variação importante por obras/partida. Tempo da opção sem troca a confirmar.'},
{a:'LI',from:'Schaan-Vaduz',b:'AT',to:'Feldkirch',status:'duration-unverified',operator:'ÖBB regional',duration:null,source:'https://www.schaan.li/news/bahnstrecke-wieder-betrieb',note:'Linha Feldkirch–Buchs reaberta em outubro de 2026. Partidas com parada em Schaan-Vaduz e duração atual ainda não verificadas.'},
{a:'LI',from:'Schaan-Vaduz',b:'CH',to:'Buchs (SG)',status:'duration-unverified',operator:'ÖBB regional',duration:null,source:'https://www.schaan.li/news/bahnstrecke-wieder-betrieb',note:'Linha internacional reaberta; confirmar quais trens param em Schaan-Vaduz e o tempo de viagem.'}
].map((r,index)=>({...r,id:'review-'+index,checked:'2026-11-13'}));
function railConnections(code,review=false){return (review?railReview:railRoutes).filter(r=>r.a===code||r.b===code).map(r=>({...r,originCountry:code,origin:r.a===code?r.from:r.to,destination:r.a===code?r.to:r.from,destinationCountry:r.a===code?r.b:r.a}));}
railRoutes.find(r=>r.id==='rail-14').to='Bratislava (Petržalka / hlavná stanica)';
const trainCompanies={ 'rail-2':'Trenitalia France · Frecciarossa','rail-3':'SNCF Voyageurs · TGV INOUI','rail-8':'DB / Eurostar','rail-9':'DB / NS International · ICE','rail-10':'TGV Lyria (SNCF / SBB)','rail-11':'SBB / Trenitalia · EuroCity','rail-12':'SBB / DB · EuroCity','rail-13':'SBB / ÖBB · Railjet','rail-14':'ÖBB / ZSSK · REX / Railjet','rail-15':'ÖBB / MÁV · Railjet','rail-16':'ČD / ÖBB · Railjet','rail-17':'DB / ČD','rail-18':'DSB / DB','rail-20':'SNCF Voyageurs · TER','rail-21':'Iarnród Éireann / NI Railways · Enterprise'};
for(const route of railRoutes)route.company=trainCompanies[route.id]||route.operator;
