'use strict';
const europeanCountries = [
['AL','Albânia'],['DE','Alemanha'],['AD','Andorra'],['AM','Armênia'],['AT','Áustria'],['AZ','Azerbaijão'],['BE','Bélgica'],['BY','Bielorrússia'],['BA','Bósnia e Herzegovina'],['BG','Bulgária'],['KZ','Cazaquistão'],['CY','Chipre'],['HR','Croácia'],['DK','Dinamarca'],['SK','Eslováquia'],['SI','Eslovênia'],['ES','Espanha'],['EE','Estônia'],['FI','Finlândia'],['FR','França'],['GE','Geórgia'],['GR','Grécia'],['HU','Hungria'],['IE','Irlanda'],['IS','Islândia'],['IT','Itália'],['XK','Kosovo'],['LV','Letônia'],['LI','Liechtenstein'],['LT','Lituânia'],['LU','Luxemburgo'],['MK','Macedônia do Norte'],['MT','Malta'],['MD','Moldávia'],['MC','Mônaco'],['ME','Montenegro'],['NO','Noruega'],['NL','Países Baixos'],['PL','Polônia'],['PT','Portugal'],['GB','Reino Unido'],['CZ','República Tcheca'],['RO','Romênia'],['RU','Rússia'],['SM','San Marino'],['RS','Sérvia'],['SE','Suécia'],['CH','Suíça'],['TR','Turquia'],['UA','Ucrânia'],['VA','Vaticano']
].map(([code,name])=>({code,name})).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
// Duração de referência por rota, na ida. Não representa tempo por companhia/data.
const directFlights = [
['DE','Frankfurt','FRA',['LATAM','Lufthansa'],'11h30','https://www.lufthansa.com/lhg/br/en/o-d/cy-cy/sao-paulo-frankfurt'],
['DE','Munique','MUC',['Lufthansa'],'11h25','https://www.lufthansa.com/lhg/br/en/o-d/cy-cy/sao-paulo-munich'],
['BE','Bruxelas','BRU',['LATAM'],'11h40–11h50','https://www.flightsfrom.com/GRU-BRU'],
['ES','Madri','MAD',['Air China','Air Europa','Iberia','LATAM'],'10h25','https://www.flightsfrom.com/GRU-MAD'],
['ES','Barcelona','BCN',['LATAM'],'10h40','https://www.flightsfrom.com/GRU-BCN'],
['FR','Paris','CDG',['Air France','LATAM'],'11h10–11h25','https://www.flightsfrom.com/GRU-CDG'],
['IT','Roma','FCO',['ITA Airways','LATAM'],'11h20–11h35','https://www.flightsfrom.com/GRU-FCO'],
['IT','Milão','MXP',['LATAM'],'11h20','https://www.flightsfrom.com/GRU-MXP'],
['NL','Amsterdã','AMS',['KLM','LATAM'],'11h35–12h00','https://www.flightsfrom.com/GRU-AMS'],
['PT','Lisboa','LIS',['TAP Air Portugal','LATAM'],'10h00','https://www.flightsfrom.com/GRU-LIS'],
['PT','Porto','OPO',['TAP Air Portugal'],'10h10','https://www.flightsfrom.com/GRU-OPO'],
['GB','Londres','LHR',['British Airways','LATAM'],'11h15–11h35','https://www.flightsfrom.com/GRU-LHR'],
['CH','Zurique','ZRH',['SWISS'],'11h15','https://www.swiss.com/lhg/ch/en/o-d/cy-cy/sao-paulo-zurich'],
['TR','Istambul','IST',['Turkish Airlines'],'12h50','https://www.flightsfrom.com/GRU-IST']
].map(([country,city,airport,airlines,duration,source])=>({country,city,airport,airlines,duration,source,origin:'GRU',nonstop:true,status:'published',checked:'2026-11-13',seasonal:null,weekdays:null,averageFare:null}));

// Dias de partida local de GRU na semana indicada, consultados em 13/11/2026.
// Cada companhia tem sua própria grade; não extrapolar para outras temporadas.
const daily=[1,2,3,4,5,6,7]; // segunda a domingo
const weeklySchedules={
 FRA:{LATAM:daily,Lufthansa:daily},
 MUC:{Lufthansa:[1,3,5,7]},
 BRU:{LATAM:[1,3,6]},
 MAD:{'Air China':[1,2,4,5],'Air Europa':daily,Iberia:daily,LATAM:daily},
 BCN:{LATAM:[1,4,5,7]},
 CDG:{'Air France':daily,LATAM:daily},
 FCO:{'ITA Airways':daily,LATAM:daily},
 MXP:{LATAM:daily},
 AMS:{KLM:daily,LATAM:[2,4,6]},
 LIS:{'TAP Air Portugal':daily,LATAM:daily},
 OPO:{'TAP Air Portugal':[3,4,6]},
 LHR:{'British Airways':daily,LATAM:daily},
 ZRH:{SWISS:daily},
 IST:{'Turkish Airlines':daily}
};
for(const flight of directFlights){
 flight.scheduleSource=`https://www.flightsfrom.com/GRU-${flight.airport}`;
 flight.schedulePeriod=flight.airport==='MUC'?{start:'2026-11-16',end:'2026-11-22',label:'16–22 nov 2026'}:flight.airport==='OPO'?{start:'2026-11-09',end:'2026-11-15',label:'9–15 nov 2026'}:{start:'2026-11-23',end:'2026-11-29',label:'23–29 nov 2026'};
 flight.weekdays=flight.airlines.map(airline=>({airline,days:[...weeklySchedules[flight.airport][airline]]}));
}
