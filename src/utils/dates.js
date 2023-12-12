export function setDateForCalendarMonth(monthNum) {
    const date = new Date();
    const dayNum =  date.getDate();
   
    date.setDate(dayNum + monthNum * 30);
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