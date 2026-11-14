// Grade-base KTMB: 5 minutos por sentido; confirmações específicas de obra/dia continuam necessárias.
const tebrauWeekDates=['2026-11-16','2026-11-17','2026-11-18','2026-11-19','2026-11-20','2026-11-21','2026-11-22'];
for(const [origin,departures,firstTrain,from,to]of [
 ['MY',['05:00','05:30','06:00','06:30','07:00','07:30','08:45','10:00','11:30','12:45','14:00','15:15','16:30','17:45','19:00','20:15','21:30','22:45'],61,'JB Sentral','Woodlands'],
 ['SG',['08:30','09:45','11:00','12:30','13:45','15:00','16:15','17:30','18:45','20:00','21:15','22:30','23:45'],72,'Woodlands','JB Sentral']
])railWeek.entries['world-rail-8:'+origin]={source:'https://www.ktmb.com.my/assets/pdf/2026/03%20Jadual%20Tren%20Intercity%201%20Jan%202026_Fasa2_Rev.1.pdf',baseTimetable:true,rows:departures.map((time,index)=>{const [h,m]=time.split(':').map(Number),departure=h*60+m;return {departure,arrival:departure+5,arrivalDay:0,duration:5,train:'ST'+(firstTrain+index*2),operator:'KTMB · Shuttle Tebrau',from,to,dates:tebrauWeekDates};})};
const tazaraRoute=worldRailRoutes.find(r=>r.id==='world-rail-5');tazaraRoute.departureReference={TZ:'Sextas · 15:50 (EAT)',ZM:'Terças · 14:00 (CAT)'};
