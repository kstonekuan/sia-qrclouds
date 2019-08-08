export function getRelativeTime(now, then) {
  function getRelativeDay(bigger, smaller) {
    yearOffset = bigger[2] - smaller[2];
    monthOffset = bigger[1] - smaller[1] + 12 * yearOffset;
    if (monthOffset < 2) {
      dayOffset = new Date(smaller[2], smaller[1] + 1, 0);
      dayDifference = bigger[0] - smaller[0] + dayOffset * monthOffset;
      return dayDifference;
    }
  }
  function formatDigits(time) {
    if (time < 10) {
      return `0${time}`;
    } return `${time}`;
  }
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  oneMin = 60 * 1000;
  oneHour = 60 * oneMin;
  oneDay = 24 * oneHour;
  oneWeek = 7 * oneDay;
  oneMonth = 4 * oneWeek;
  nowDate = [now.getDate(), now.getMonth(), now.getFullYear()];
  thenDate = [then.getDate(), then.getMonth(), then.getFullYear()];
  buildTime = `${formatDigits(then.getHours())}:${formatDigits(then.getMinutes())}`;
  msDifference = then.getTime() - now.getTime();
  if (msDifference > 0) {
    if (msDifference < oneHour) {
      minuteDifference = Math.floor(msDifference / oneMin);
      switch (minuteDifference) {
        case 1:
          return '1 minute';
          break;
        case 0:
          return '< 1 minute';
          break;
        default:
          return `${minuteDifference} minutes`;
      }
    } else if (msDifference < oneWeek) {
      if (dayDifference = getRelativeDay(thenDate, nowDate)) {
        switch (dayDifference) {
          case 0:
            return `Today ${buildTime}`;
            break;
          case 1:
            return `Tomorrow ${buildTime}`;
            break;
          default:
            prefix = '';
            if (then.getDay() < now.getDay()) {
              prefix = 'Next ';
            }
            return `${prefix + dayNames[then.getDay()]} ${buildTime}`;
        }
      } else {
        hourDifference = Math.floor(msDifference / oneHour);
        switch (hourDifference) {
          case 1:
            return '1 hour';
            break;
          default:
            return `${hourDifference} hours`;
        }
      }
    } else {
      buildDate = '';
      buildDate += thenDate[0];
      buildDate += '/';
      buildDate += thenDate[1];
      buildDate += '/';
      buildDate += thenDate[2];
      buildDate += ' ';
      buildDate += buildTime;
      return buildDate;
    }
  } else {
    msDifference = Math.abs(msDifference);
    if (msDifference < oneHour) {
      minuteDifference = Math.floor(msDifference / oneMin);
      switch (minuteDifference) {
        case 1:
          return '1 minute ago';
          break;
        case 0:
          return 'Just now';
          break;
        default:
          return `${minuteDifference} minutes ago`;
      }
    } else if (msDifference < oneDay) {
      hourDifference = Math.floor(msDifference / oneHour);
      switch (hourDifference) {
        case 1:
          return '1 hour ago';
          break;
        default:
          return `${hourDifference} hours ago`;
      }
    } else if (msDifference < oneWeek) {
      dayDifference = getRelativeDay(nowDate, thenDate);
      switch (dayDifference) {
        case 1:
          return 'Yesterday';
          break;
        default:
          prefix = '';
          if (then.getDay() > now.getDay()) {
            prefix = 'Last ';
          }
          return prefix + dayNames[then.getDay()];
      }
    } else if (msDifference < oneMonth) {
      weekDifference = Math.floor(msDifference / oneWeek);
      switch (weekDifference) {
        case 1:
          return '1 week ago';
          break;
        default:
          return `${weekDifference} weeks ago`;
      }
    } else {
      buildDate = '';
      buildDate += thenDate[0];
      buildDate += '/';
      buildDate += thenDate[1];
      buildDate += '/';
      buildDate += thenDate[2];
      return buildDate;
    }
  }
  return 'error';
}

export function getSimpleRelativeTime(now, then) {
  function getRelativeDay(bigger, smaller) {
    yearOffset = bigger[2] - smaller[2];
    monthOffset = bigger[1] - smaller[1] + 12 * yearOffset;
    if (monthOffset < 2) {
      dayOffset = new Date(smaller[2], smaller[1] + 1, 0);
      dayDifference = bigger[0] - smaller[0] + dayOffset * monthOffset;
      return dayDifference;
    }
  }
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  oneMin = 60 * 1000;
  oneHour = 60 * oneMin;
  oneDay = 24 * oneHour;
  oneWeek = 7 * oneDay;
  oneMonth = 4 * oneWeek;
  nowDate = [now.getDate(), now.getMonth(), now.getFullYear()];
  thenDate = [then.getDate(), then.getMonth(), then.getFullYear()];
  msDifference = then.getTime() - now.getTime();
  if (msDifference > 0) {
    if (msDifference < oneWeek) {
      dayDifference = getRelativeDay(thenDate, nowDate);
      switch (dayDifference) {
        case 1:
          return 'Tomorrow';
          break;
        default:
          prefix = '';
          if (then.getDay() < now.getDay()) {
            prefix = 'Next ';
          }
          return prefix + dayNames[then.getDay()];
      }
    }
  } else {
    msDifference = Math.abs(msDifference);
    if (msDifference < oneHour) {
      minuteDifference = Math.floor(msDifference / oneMin);
      switch (minuteDifference) {
        case 1:
          return '1 minute ago';
          break;
        case 0:
          return 'Just now';
          break;
        default:
          return `${minuteDifference} minutes ago`;
      }
    } else if (msDifference < oneDay) {
      hourDifference = Math.floor(msDifference / oneHour);
      switch (hourDifference) {
        case 1:
          return '1 hour ago';
          break;
        default:
          return `${hourDifference} hours ago`;
      }
    } else if (msDifference < oneWeek) {
      dayDifference = getRelativeDay(nowDate, thenDate);
      switch (dayDifference) {
        case 1:
          return 'Yesterday';
          break;
        default:
          prefix = '';
          if (then.getDay() > now.getDay()) {
            prefix = 'Last ';
          }
          return prefix + dayNames[then.getDay()];
      }
    } else if (msDifference < oneMonth) {
      weekDifference = Math.floor(msDifference / oneWeek);
      switch (weekDifference) {
        case 1:
          return '1 week ago';
          break;
        default:
          return `${weekDifference} weeks ago`;
      }
    } else {
      buildDate = '';
      buildDate += thenDate[0];
      buildDate += '/';
      buildDate += thenDate[1];
      buildDate += '/';
      buildDate += thenDate[2];
      return buildDate;
    }
  }
  return 'error';
}

export function isPast(then) {
  now = new Date();
  msDifference = then.getTime() - now.getTime();
  if (msDifference > 0) {
    return false;
  }
  return true;
}

export function getSimpleDate(then) {
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  thenDate = [then.getDate(), then.getMonth(), then.getFullYear()];
  buildDate = '';
  buildDate += thenDate[0];
  buildDate += ' ';
  buildDate += monthNames[thenDate[1]];
  buildDate += ' ';
  buildDate += thenDate[2];
  return buildDate;
}

export function getSimpleDateTime(then) {
  function formatDigits(time) {
    if (time < 10) {
      return `0${time}`;
    } return `${time}`;
  }
  buildTime = `${formatDigits(then.getHours())}:${formatDigits(then.getMinutes())}`;
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  thenDate = [then.getDate(), then.getMonth(), then.getFullYear()];
  buildDate = '';
  buildDate += thenDate[0];
  buildDate += ' ';
  buildDate += monthNames[thenDate[1]];
  buildDate += ' ';
  buildDate += thenDate[2];
  return `${buildDate} ${buildTime}`;
}

export const getDayCountdown = (date) => {
  const now = new Date();
  if (date > now) {
    const msDiff = date.getTime() - now.getTime();
    const dayDiff = msDiff / 86400000;
    if (dayDiff > 1.125) {
      return `${Math.round(dayDiff).toString()} days`;
    }

    if (dayDiff > 0.125) {
      return '1 day';
    }
    return 'a few hours';
  }
  return null;
};
export const getMonthText = (month) => {
  if(month){
     const newMonth = new Date(month).getMonth();
     switch(newMonth){
        case 0:
          return 'January';
        break;
        case 1:
          return 'February';
        break;
        case 2:
          return 'March';
        break;
        case 3:
          return 'April';
        break;
        case 4:
          return 'May';
        break;
        case 5:
          return 'June';
        break;
        case 6:
          return 'July';
        break;
        case 7:
          return 'August';
        break;
        case 8:
          return 'September';
        break;
        case 9:
          return 'October';
        break;
        case 10:
          return 'November';
        break;
        case 11:
          return 'December';
        break;

     }
  } else {
      return '';
  }
}
export const getMidnight = (date) => {
  let dateOnly;

  if (date) {
    dateOnly = new Date(date);
  } else {
    dateOnly = new Date();
  }

  dateOnly.setHours(0);
  dateOnly.setMinutes(0);
  dateOnly.setSeconds(0);

  return dateOnly;
};
