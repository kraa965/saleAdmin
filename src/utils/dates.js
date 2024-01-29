export function setDateForCalendarMonth(monthNum) {
    const date = new Date();
    const dayNum =  date.getDate();
   
    /* date.setDate(dayNum + monthNum * 30); */
    date.setMonth(date.getMonth() + monthNum);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayInMonth = 33 - new Date(year, month, 33).getDate();

    let fMonth;
    switch (month){
      case 0: fMonth = "январь"; break;
      case 1: fMonth="февраль"; break;
      case 2: fMonth="март"; break;
      case 3: fMonth="апрель"; break;
      case 4: fMonth="май"; break;
      case 5: fMonth="июнь"; break;
      case 6: fMonth="июль"; break;
      case 7: fMonth="август"; break;
      case 8: fMonth="сентябрь"; break;
      case 9: fMonth="октябрь"; break;
      case 10: fMonth="ноябрь"; break;
      case 11: fMonth="декабрь"; break;
      default:
  }

  let fMonth2;
    switch (month){
      case 0: fMonth2 = "января"; break;
      case 1: fMonth2="февраля"; break;
      case 2: fMonth2="марта"; break;
      case 3: fMonth2="апреля"; break;
      case 4: fMonth2="мая"; break;
      case 5: fMonth2="июнья"; break;
      case 6: fMonth2="июлья"; break;
      case 7: fMonth2="августа"; break;
      case 8: fMonth2="сентября"; break;
      case 9: fMonth2="октября"; break;
      case 10: fMonth2="ноября"; break;
      case 11: fMonth2="декабря"; break;
      default:
  }
  
     const dateSend = {date:`${year}-${month + 1 < 10 ? '0': ''}${month + 1}-${day < 10 ? '0': ''}${day}`,
                       month: fMonth,
                       month2: fMonth2,
                       day: day,
                       dayInMonth: dayInMonth};
     return dateSend;
  }

  export function setDate() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate()
    
   
    const dateText = `${day < 10 ? `0${day}` : `${day}`}.${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}.${year}`;
    return dateText;
  };

  export function setDateDay(dayr) {
    const date = new Date();
    const dayNum =  date.getDate();
     date.setDate(dayNum - dayr);
    const year = date.getFullYear();
    const month = date.getMonth();
   
    const day = date.getDate();
  
     const dateSend = `${year}-${month + 1 < 10 ? '0': ''}${month + 1}-${day < 10 ? '0': ''}${day}`;
     return dateSend;
  }

  export function setDayOfWeek(data) {
    const date = new Date(data);
    const month = date.getMonth();
    const day = date.getDate();
  
    const dayWeek = date.getDay();
    let fDay;
    switch (dayWeek){
      case 1: fDay = "Пн"; break;
      case 2: fDay = "Вт"; break;
      case 3: fDay = "Ср"; break;
      case 4: fDay = "Чт"; break;
      case 5: fDay = "Пт"; break;
      case 6: fDay = "Сб"; break;
      default: fDay = "Вс";
  }

  let fMonth2;
  switch (month){
    case 0: fMonth2 = "января"; break;
    case 1: fMonth2="февраля"; break;
    case 2: fMonth2="марта"; break;
    case 3: fMonth2="апреля"; break;
    case 4: fMonth2="мая"; break;
    case 5: fMonth2="июнья"; break;
    case 6: fMonth2="июлья"; break;
    case 7: fMonth2="августа"; break;
    case 8: fMonth2="сентября"; break;
    case 9: fMonth2="октября"; break;
    case 10: fMonth2="ноября"; break;
    case 11: fMonth2="декабря"; break;
    default:
}
 
    return {day, fMonth2, fDay};
  };

  export function monthAndWeek(num) {
   
    const month = Math.floor(num/30);
    const week = Math.floor((num%30)/7);
    const day = week < 1 ? num%30  : Math.floor(week%7);
    const monthF = month >= 1 ? `${month} мес.` : '';
    const weekF = (week > 1 && month < 1) ? `${week} нед.`: '';
    const dayF =  (week >= 1 || month >= 1 || day === 0) ? '' : `${day} д.`;

    const monthA = month >= 1 ? `${month} мес.` : '';
    const weekA = week > 1  ? `${week} нед.`: '';
    const dayA = day === 0 ? '' : `${day} д.`


    return {dateClient: `${monthF} ${weekF} ${dayF}`, dateStat: `${monthA} ${weekA} ${dayA}`}
    
  }

  export function handleTimeNow() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const percent = (((hours - 10) * 60 + minutes)/((19-10)*60) > 0 || hours > 19) ? ((hours - 10) * 60 + minutes)/((19-10)*60) : 1;
    return percent

  }