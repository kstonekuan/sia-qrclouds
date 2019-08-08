import { getMidnight } from './getRelativeTime';

const isClaimedToday = lastClaimed => (lastClaimed > getMidnight());

const getComingDayOfTheWeek = (number) => {
  const date = new Date();
  const day = date.getDay();

  let comingDayOfTheWeek;

  if (day >= number) {
    comingDayOfTheWeek = new Date().setDate(date.getDate() - day + number + 7);
  } else {
    comingDayOfTheWeek = new Date().setDate(date.getDate() - day + number);
  }

  comingDayOfTheWeek = getMidnight(comingDayOfTheWeek);

  return comingDayOfTheWeek;
};

const getPastDayOfTheWeek = (number) => {
  const date = new Date();
  const day = date.getDay();

  let pastDayOfTheWeek;

  if (day > number) {
    pastDayOfTheWeek = new Date().setDate(date.getDate() - day + number);
  } else {
    pastDayOfTheWeek = new Date().setDate(date.getDate() - day + number - 7);
  }

  pastDayOfTheWeek = getMidnight(pastDayOfTheWeek);

  return pastDayOfTheWeek;
};

const isClaimedThisWeek = (lastClaimed, dayOfTheWeek) => lastClaimed > getPastDayOfTheWeek(dayOfTheWeek);

export { isClaimedToday, isClaimedThisWeek, getMidnight, getPastDayOfTheWeek, getComingDayOfTheWeek };
