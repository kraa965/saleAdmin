export const timeNow = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seeconds = date.getSeconds();
    const miliSeconds = date.getMilliseconds();
    return (hours + minutes + seeconds + miliSeconds)
}

export const handleDay = (n) => {
    const date = new Date();
    date.setDate(date.getDate() + n);
    const day = date.getDate();
    const fDay = date.getDay();

    let dayWeek;
    switch (fDay) {
        case 1: dayWeek = "Пн"; break;
        case 2: dayWeek = "Вт"; break;
        case 3: dayWeek = "Ср"; break;
        case 4: dayWeek = "Чт"; break;
        case 5: dayWeek = "Пт"; break;
        case 6: dayWeek = "Сб"; break;
        default: dayWeek = "Вс";
    }

    return { day, dayWeek, date }
}

export const handleTime = (n) => {
    const date = new Date();
    date.setHours(date.getHours() + n);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return { hour, minute }
}

export const handleTaskTime = (d) => {
    const date = new Date(d);
    const date2 = new Date();
    const year = date.getFullYear();
    const year2 = date2.getFullYear();
    const month = date.getMonth();
    const month2 = date2.getMonth();
    const day = date.getDate();
    const day2 = date2.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    let fMonth;
    switch (month) {
        case 0: fMonth = "января"; break;
        case 1: fMonth = "февраля"; break;
        case 2: fMonth = "марта"; break;
        case 3: fMonth = "апреля"; break;
        case 4: fMonth = "мая"; break;
        case 5: fMonth = "июня"; break;
        case 6: fMonth = "июля"; break;
        case 7: fMonth = "августа"; break;
        case 8: fMonth = "сентября"; break;
        case 9: fMonth = "октября"; break;
        case 10: fMonth = "ноября"; break;
        case 11: fMonth = "декабря"; break;
        default:
    }

    if (d == '0000-00-00 00:00:00') {
        return ''
    }

    if (month == month2 && day == day2) {
        return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`
    }

    if ((month !== month2 || day !== day2) && year == year2) {
        return `${day} ${fMonth}`
    }

    if (year !== year2) {
        return `${day < 10 ? `0${day}` : day}.${month < 9 ? `0${month + 1}` : month + 1}.${year}`
    }

}

export const handleStageTime = (d) => {
    const date = new Date(d);
    const date2 = new Date();
    const year = date.getFullYear();
    const year2 = date2.getFullYear();
    const month = date.getMonth();
    const month2 = date2.getMonth();
    const day = date.getDate();
    const day2 = date2.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    let fMonth;
    switch (month) {
        case 0: fMonth = "января"; break;
        case 1: fMonth = "февраля"; break;
        case 2: fMonth = "марта"; break;
        case 3: fMonth = "апреля"; break;
        case 4: fMonth = "мая"; break;
        case 5: fMonth = "июня"; break;
        case 6: fMonth = "июля"; break;
        case 7: fMonth = "августа"; break;
        case 8: fMonth = "сентября"; break;
        case 9: fMonth = "октября"; break;
        case 10: fMonth = "ноября"; break;
        case 11: fMonth = "декабря"; break;
        default:
    }

    if (d == '0000-00-00 00:00:00' || d == '0000-00-00') {
        return ''
    }

    if (month == month2 && day == day2 && year == year2 && month == month2) {
        return `${day} ${fMonth}`
    }

    if ((month !== month2 || day !== day2) && year == year2) {
        return `${day} ${fMonth}`
    }

    if (year !== year2) {
        return `${day < 10 ? `0${day}` : day}.${month < 9 ? `0${month + 1}` : month + 1}.${`${year}`.slice(-2)}`
    }

}

export const handleDateDifference = (d) => {
    const date = new Date();
    const date2 = new Date(d);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();
    const diffDays = Math.ceil((date - date2) / (1000 * 60 * 60 * 24));

    if (!d || d == '0000-00-00 00:00:00') {
        return ''
    }

    if (day == day2 && month == month2 && year == year2) {
        return 'Сегодня'
    }

    if ((day - day2 == 1 && month == month2 && year == year2)) {
        return 'Вчера'
    }

    if ((day - day2 > 1) || (month !== month2) || (year !== year2)) {
        return `${diffDays} дн`
    }
}

export const handleDateZoomDiff = (d1, d2) => {
    const date = new Date(d1);
    const date2 = new Date(d2);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const hour2 = date2.getHours();
    const minute2 = date2.getMinutes()

    if ((day == day2 && month == month2 && year == year2)) {
        return true
    } else {
        return false
    }
};




export const handleMonthList = () => {
    const date1 = new Date(`2023-05-01`);
    const date2 = new Date();
    const month = date1.getMonth() + 1;
    const year = date1.getFullYear();
    const monthNow = date2.getMonth() + 1;
    const yearNow = date2.getFullYear();
    const monthNum = ((yearNow - year - 1) * 12) + 8 + monthNow;

    const monthList = [...Array(monthNum)].map((el, index) => {
        const newMonth = index + month;
        if (newMonth <= 12) {
            const m = newMonth
            const y = year
            const dayNum = (new Date(y, m, 0)).getDate()

            let fMonth;
            switch (m) {
                case 1: fMonth = "январь"; break;
                case 2: fMonth = "февраль"; break;
                case 3: fMonth = "март"; break;
                case 4: fMonth = "апрель"; break;
                case 5: fMonth = "май"; break;
                case 6: fMonth = "июнь"; break;
                case 7: fMonth = "июль"; break;
                case 8: fMonth = "август"; break;
                case 9: fMonth = "сентябрь"; break;
                case 10: fMonth = "октябрь"; break;
                case 11: fMonth = "ноябрь"; break;
                case 12: fMonth = "декабрь"; break;
                default:
            }
            return {
                date: `${y}-${m < 10 ? `0${m}` : m}-01`,
                dateEnd: `${y}-${m < 10 ? `0${m}` : m}-${dayNum < 10 ? `0${dayNum}` : dayNum}`,
                dateText: `${fMonth} ${y}`
            }
        } else {
            const m = newMonth % 12
            const y = year + Math.floor(newMonth / 12)
            const dayNum = (new Date(y, m, 0)).getDate()

            let fMonth;
            switch (m) {
                case 1: fMonth = "январь"; break;
                case 2: fMonth = "февраль"; break;
                case 3: fMonth = "март"; break;
                case 4: fMonth = "апрель"; break;
                case 5: fMonth = "май"; break;
                case 6: fMonth = "июнь"; break;
                case 7: fMonth = "июль"; break;
                case 8: fMonth = "август"; break;
                case 9: fMonth = "сентябрь"; break;
                case 10: fMonth = "октябрь"; break;
                case 11: fMonth = "ноябрь"; break;
                case 12: fMonth = "декабрь"; break;
                default:
            }
            return {
                date: `${y}-${m < 10 ? `0${m}` : m}-01`,
                dateEnd: `${y}-${m < 10 ? `0${m}` : m}-${dayNum < 10 ? `0${dayNum}` : dayNum}`,
                dateText: `${fMonth} ${y}`
            }

        }
    })
    return monthList
}

export const handleEndDayMonth = (s) => {;
    const date = new Date(s);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayNum = (new Date(year, month, 0)).getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${dayNum < 10 ? `0${dayNum}` : dayNum}`
}

/* const dateFromString = new Date("mm/dd/yyyy"); */