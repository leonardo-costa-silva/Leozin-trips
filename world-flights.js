'use strict';
// Seleção de cidades/companhias com serviço publicado; não é inventário completo.
// Partida local de GRU. Semana de referência explícita para cada rota.
const worldFlightRows=[
['AO','Luanda','NBJ','8h35',{'TAAG':[1,3,5,7]}],
['ET','Adis Abeba','ADD','12h00',{'Ethiopian Airlines':daily}],
['MA','Casablanca','CMN','8h55',{'Royal Air Maroc':[2,3,4,5,7]},'2026-10-26','2026-11-01','26 out–1 nov 2026'],
['ZA','Joanesburgo','JNB','8h30–9h00',{'South African Airways':[1,4],LATAM:[1,2,6]}],
['ZA','Cidade do Cabo','CPT','7h10–8h20',{'South African Airways':[2,6],LATAM:[3,5,7]}],
['AE','Dubai','DXB','14h05–14h55',{Emirates:daily},'2026-11-16','2026-11-22','16–22 nov 2026'],
['QA','Doha','DOH','13h30–14h25',{'Qatar Airways':daily},'2026-11-16','2026-11-22','16–22 nov 2026'],
['PA','Cidade do Panamá','PTY','6h46–7h02',{'Copa Airlines':daily},'2026-11-16','2026-11-22','16–22 nov 2026'],
['DO','Punta Cana','PUJ','7h00–7h10',{GOL:[1,6,7],Arajet:[1,2,3,4,5,7],LATAM:[1,3,5,6,7]}],
['MX','Cidade do México','MEX','9h20–9h40',{Aeroméxico:daily,LATAM:daily}],
['CA','Toronto','YYZ','10h05–10h20',{'Air Canada':daily},'2026-11-09','2026-11-15','9–15 nov 2026'],
['US','Miami','MIA','8h20–8h45',{'American Airlines':daily,LATAM:daily}],
['AR','Buenos Aires','EZE','2h50–3h21',{LATAM:daily,'Ethiopian Airlines':daily}],
['BO','Santa Cruz de la Sierra','VVI','2h50–3h05',{GOL:daily,'Boliviana de Aviación':daily},'2026-11-16','2026-11-22','16–22 nov 2026'],
['BR','Rio de Janeiro','GIG','0h55–1h10',{GOL:daily,LATAM:daily}],
['CL','Santiago','SCL','4h05–4h30',{LATAM:daily,'Turkish Airlines':daily}],
['CO','Bogotá','BOG','5h50–6h35',{Avianca:daily,LATAM:daily}],
['PE','Lima','LIM','5h00–5h30',{LATAM:daily,'Sky Airline':[1,3,4,5,6,7]},'2026-11-16','2026-11-22','16–22 nov 2026'],
['PY','Assunção','ASU','2h05–2h15',{GOL:[1,3,4,5],LATAM:daily}],
['UY','Montevidéu','MVD','2h35–2h55',{GOL:daily,LATAM:daily,'Sky Airline':[5,7]}],
['VE','Caracas','CCS','6h05–6h10',{GOL:[2,4,7]},'2026-11-16','2026-11-22','16–22 nov 2026']
];
directFlights.push(...worldFlightRows.map(([country,city,airport,duration,schedules,start='2026-11-23',end='2026-11-29',label='23–29 nov 2026'])=>({country,city,airport,duration,airlines:Object.keys(schedules),weekdays:Object.entries(schedules).map(([airline,days])=>({airline,days:[...days]})),schedulePeriod:{start,end,label},source:`https://www.flightsfrom.com/GRU-${airport}`,scheduleSource:`https://www.flightsfrom.com/GRU-${airport}`,origin:'GRU',nonstop:true,status:'published',checked:'2026-11-13',seasonal:null,averageFare:null})));
directFlights.find(f=>f.airport==='PUJ').seasonalAirlines=['GOL'];
