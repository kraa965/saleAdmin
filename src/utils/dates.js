
export function setDateForCalendarMonth(monthNum) {
  const date = new Date();
  //даты при выборе 2 недель
  const dateStart = new Date();
  const dateEnd = new Date();
  dateStart.setDate(date.getDate() - 6);
  dateEnd.setDate(date.getDate() + 7);


  date.setMonth(date.getMonth() + (monthNum == 12 ? 0 : monthNum));
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayStart = dateStart.getDate();
  const dayInMonth = 33 - new Date(year, month, 33).getDate();

  let fMonth;
  switch (month) {
    case 0: fMonth = "январь"; break;
    case 1: fMonth = "февраль"; break;
    case 2: fMonth = "март"; break;
    case 3: fMonth = "апрель"; break;
    case 4: fMonth = "май"; break;
    case 5: fMonth = "июнь"; break;
    case 6: fMonth = "июль"; break;
    case 7: fMonth = "август"; break;
    case 8: fMonth = "сентябрь"; break;
    case 9: fMonth = "октябрь"; break;
    case 10: fMonth = "ноябрь"; break;
    case 11: fMonth = "декабрь"; break;
    default:
  }

  let fMonth2;
  switch (month) {
    case 0: fMonth2 = "января"; break;
    case 1: fMonth2 = "февраля"; break;
    case 2: fMonth2 = "марта"; break;
    case 3: fMonth2 = "апреля"; break;
    case 4: fMonth2 = "мая"; break;
    case 5: fMonth2 = "июнья"; break;
    case 6: fMonth2 = "июлья"; break;
    case 7: fMonth2 = "августа"; break;
    case 8: fMonth2 = "сентября"; break;
    case 9: fMonth2 = "октября"; break;
    case 10: fMonth2 = "ноября"; break;
    case 11: fMonth2 = "декабря"; break;
    default:
  }

  const dateSend = {
    date: `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`,
    dateStart: monthNum === 12 ? dateStart.toISOString().slice(0, 10)
      :
      `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-01`,
    dateEnd: monthNum === 12 ? dateEnd.toISOString().slice(0, 10)
      :
      `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${dayInMonth}`,
    dateStartNum: monthNum === 12 ? dayStart : 1,
    dateStartDefault: year ? `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-01` : '',
    dateEndDefault: `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${dayInMonth}`,
    month: fMonth,
    month2: monthNum == 12 ? '' : fMonth2,
    day: day,
    dayInMonth: dayInMonth
  };
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
  const dayNum = date.getDate();
  date.setDate(dayNum - dayr);
  const year = date.getFullYear();
  const month = date.getMonth();

  const day = date.getDate();

  const dateSend = `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`;
  return dateSend;
}

export function setDayOfWeek(data) {
  const date = new Date(data);
  const month = date.getMonth();
  const day = date.getDate();

  const dayWeek = date.getDay();
  let fDay;
  switch (dayWeek) {
    case 1: fDay = "Пн"; break;
    case 2: fDay = "Вт"; break;
    case 3: fDay = "Ср"; break;
    case 4: fDay = "Чт"; break;
    case 5: fDay = "Пт"; break;
    case 6: fDay = "Сб"; break;
    default: fDay = "Вс";
  }

  let fDay2;
  switch (dayWeek) {
    case 1: fDay2 = "Понедельник"; break;
    case 2: fDay2 = "Вторник"; break;
    case 3: fDay2 = "Среда"; break;
    case 4: fDay2 = "Четверг"; break;
    case 5: fDay2 = "Пятница"; break;
    case 6: fDay2 = "Суббота"; break;
    default: fDay2 = "Воскресение";
  }

  let fMonth2;
  switch (month) {
    case 0: fMonth2 = "января"; break;
    case 1: fMonth2 = "февраля"; break;
    case 2: fMonth2 = "марта"; break;
    case 3: fMonth2 = "апреля"; break;
    case 4: fMonth2 = "мая"; break;
    case 5: fMonth2 = "июнья"; break;
    case 6: fMonth2 = "июлья"; break;
    case 7: fMonth2 = "августа"; break;
    case 8: fMonth2 = "сентября"; break;
    case 9: fMonth2 = "октября"; break;
    case 10: fMonth2 = "ноября"; break;
    case 11: fMonth2 = "декабря"; break;
    default:
  }

  return { day, fMonth2, fDay, fDay2 };
};

export function monthAndWeek(num) {

  const month = Math.floor(num > 30 ? num / 30 : 0);
  const week = Math.floor(num > 30 ? (num % 30) / 7 : num / 30);
  const day = week < 1 ? num % 30 : Math.floor(week % 7);
  const monthF = month >= 1 ? `${month} мес.` : '';
  const weekF = (week > 1 && month < 1) ? `${week} нед.` : '';
  const dayF = (week >= 1 || month >= 1 || day === 0) ? '' : `${day} д.`;
  const monthA = month >= 1 ? `${month} мес.` : '';
  const weekA = week > 1 ? `${week} нед.` : '';
  const dayA = day === 0 ? '' : `${day} д.`


  return { dateClient: `${monthF} ${weekF} ${dayF}`, dateStat: `${monthA} ${weekA} ${dayA}` }

}

export function handleTimeNow() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const percent = (((hours - 9) * 60 + minutes) / ((20 - 9) * 60) > 0) ? ((hours - 9) * 60 + minutes) / ((20 - 9) * 60) : 0;
  return hours > 20 ? 1 : percent
}

export function handleTimeNowExpert() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const percent = (((hours - 11) * 60 + minutes) / ((19 - 11) * 60) > 0) ? ((hours - 11) * 60 + minutes) / ((19 - 11) * 60) : 0;
  return hours > 19 ? 1 : percent

}

export function handleDiffDates(date) {
  const date1 = new Date(date);
  console.log(date)
  const date3 = new Date();
  return Math.floor((date3 - date1) / (60 * 60 * 24 * 1000));
}

export function setDateCalendar(n) {
  const date = new Date();
  const dayNum = date.getDate();
  date.setDate(dayNum - n);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate()


  const dateText = `${year}-${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}-${day < 10 ? `0${day}` : `${day}`}`;
  return dateText;
};


export function сompareDate(dateText2) {
  const date = new Date();
  const date2 = new Date(dateText2);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate()
  const dateText = `${year}-${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}-${day < 10 ? `0${day}` : `${day}`}`;
  let status
  if (dateText == dateText2) {
    status = 1
  } else if (date2 < date) {
    status = 0
  } else if (date2 > date) {
    status = 2
  }
  return status;
};

export function сompareDateStart(el1, el2) {
  const date = new Date(el1);
  const date2 = new Date(el2);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate()
  const dateText = `${year}-${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}-${day < 10 ? `0${day}` : `${day}`}`;
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();
  const day2 = date2.getDate()
  const dateText2 = `${year2}-${month2 + 1 < 10 ? `0${month2 + 1}` : `${month2 + 1}`}-${day2 < 10 ? `0${day2}` : `${day2}`}`;
  let status

  if ((date2 > date) || dateText2 === dateText) {
    status = 2
  } else {
    status = 0
  }
  return status;
};

export function dateForModal(n) {
  const date = new Date(n);
  const month = date.getMonth();
  const day = date.getDate();

  const dayWeek = date.getDay();
  let fDay;
  switch (dayWeek) {
    case 1: fDay = "пн"; break;
    case 2: fDay = "вт"; break;
    case 3: fDay = "ср"; break;
    case 4: fDay = "чт"; break;
    case 5: fDay = "пт"; break;
    case 6: fDay = "сб"; break;
    default: fDay = "вс";
  }

  let fDay2;
  switch (dayWeek) {
    case 1: fDay2 = "понедельник"; break;
    case 2: fDay2 = "вторник"; break;
    case 3: fDay2 = "среда"; break;
    case 4: fDay2 = "четверг"; break;
    case 5: fDay2 = "пятница"; break;
    case 6: fDay2 = "суббота"; break;
    default: fDay2 = "воскресение";
  }

  let fMonth2;
  switch (month) {
    case 0: fMonth2 = "января"; break;
    case 1: fMonth2 = "февраля"; break;
    case 2: fMonth2 = "марта"; break;
    case 3: fMonth2 = "апреля"; break;
    case 4: fMonth2 = "мая"; break;
    case 5: fMonth2 = "июнья"; break;
    case 6: fMonth2 = "июлья"; break;
    case 7: fMonth2 = "августа"; break;
    case 8: fMonth2 = "сентября"; break;
    case 9: fMonth2 = "октября"; break;
    case 10: fMonth2 = "ноября"; break;
    case 11: fMonth2 = "декабря"; break;
    default:
  }

  return {
    modal: `${day} ${fMonth2}, ${fDay}`,
    history: `${day} ${fMonth2}, ${fDay2}`
  }

}

export function historyTime(n) {
  const date = new Date(n);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`
}

export function handleFirstShift(n) {
  const date = new Date(n);
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = year ? `${year}-${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}-01` : '';
  const second = year ? `${year}-${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}-02` : '';

  return [first, second]
}

export function handelNewManagerMonth(data) {
  const date = new Date(data);
  const date2 = new Date();
  const month = date.getMonth();
  const month2 = date2.getMonth();
  const result = month === month2 ? true : false;
  return result
}

export function handleRangeDate(n) {
  const date = new Date(n);
  console.log(date)
  const day = date.getDate();
  const month = date.getMonth();
  return `${day < 10 ? `0${day}` : `${day}`}.${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}`;
}

export function handleRangeDateYear(n) {
  const date = new Date(n);
  console.log(date)
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day < 10 ? `0${day}` : `${day}`}.${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}.${year}`;
}

export const handleDateLog = (n) => {
  const date = new Date(n);
  const day = date.getDate();
  const month = date.getMonth();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let fMonth2;
  switch (month) {
    case 0: fMonth2 = "января"; break;
    case 1: fMonth2 = "февраля"; break;
    case 2: fMonth2 = "марта"; break;
    case 3: fMonth2 = "апреля"; break;
    case 4: fMonth2 = "мая"; break;
    case 5: fMonth2 = "июнья"; break;
    case 6: fMonth2 = "июлья"; break;
    case 7: fMonth2 = "августа"; break;
    case 8: fMonth2 = "сентября"; break;
    case 9: fMonth2 = "октября"; break;
    case 10: fMonth2 = "ноября"; break;
    case 11: fMonth2 = "декабря"; break;
    default:
  }

  return {
    sub: `${day} ${fMonth2} в ${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}`,
    main: `${day} ${fMonth2}`
  }
}

export const handleDateStudy = (n) => {
  const m = `${n.slice(4, 6)}-${n.slice(1, 3)}-${n.slice(7, 11)}`;
  const date = new Date(m);
  const day = date.getDate();
  const month = date.getMonth();

  let fMonth2;
  switch (month) {
    case 0: fMonth2 = "января"; break;
    case 1: fMonth2 = "февраля"; break;
    case 2: fMonth2 = "марта"; break;
    case 3: fMonth2 = "апреля"; break;
    case 4: fMonth2 = "мая"; break;
    case 5: fMonth2 = "июнья"; break;
    case 6: fMonth2 = "июлья"; break;
    case 7: fMonth2 = "августа"; break;
    case 8: fMonth2 = "сентября"; break;
    case 9: fMonth2 = "октября"; break;
    case 10: fMonth2 = "ноября"; break;
    case 11: fMonth2 = "декабря"; break;
    default:
  }

  return `${day} ${fMonth2}`;
}

export const handleCompareDate = (n) => {
  const m = `${n.slice(4, 6)}-${n.slice(1, 3)}-${n.slice(7, 11)}`;
  const date = new Date(m);
  const date2 = new Date();
  const result = date2 < date ? true : false;
  return result;
}

export const handleCompareTime = (n) => {
  const date = new Date();
  date.setHours(n);
  date.setMinutes(0);
  const date2 = new Date();
  const result = date2 > date ? false : true;
  return result;
}

export const handleMonth = (n) => {
  const date = new Date();
  const month = date.getMonth() + n;

  let fMonth2;
  switch (month) {
    case 0: fMonth2 = "январь"; break;
    case 1: fMonth2 = "февраль"; break;
    case 2: fMonth2 = "март"; break;
    case 3: fMonth2 = "апрель"; break;
    case 4: fMonth2 = "май"; break;
    case 5: fMonth2 = "июнь"; break;
    case 6: fMonth2 = "июль"; break;
    case 7: fMonth2 = "август"; break;
    case 8: fMonth2 = "сентябрь"; break;
    case 9: fMonth2 = "октябрь"; break;
    case 10: fMonth2 = "ноябрь"; break;
    case 11: fMonth2 = "декабрь"; break;
    default:
  }

  return fMonth2;
}