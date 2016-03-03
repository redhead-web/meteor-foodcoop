angular
  .module('food-coop')
  .filter('calendar', calendar)
  .filter('calendarTime', calendarTime)
  .filter('toNow', toNow)
  .filter('fromNow', fromNow)
;

function calendar () {
  return function (time) {
    if (!time) return;

    return moment(time).calendar(null, {
      lastDay : '[Yesterday]',
      nextDay : '[Tomorrow]',
      sameDay : '[Today]',
      nextWeek : '[on] dddd',
      lastWeek : '[Last] dddd',
      sameElse : 'dddd MMMM DD, YYYY'
    });
  };
}

function toNow () {
  return function (time) {
    if (!time) return;

    return moment(time).toNow();
  };
}

function fromNow () {
  return function (time) {
    if (!time) return;

    return moment(time).fromNow();
  };
}

function calendarTime () {
  return function (time) {
    if (!time) return;

    return moment(time).calendar(null, {
      lastDay : 'LT [Yesterday]',
      nextDay : 'LT [Tomorrow]',
      sameDay : 'LT',
      nextWeek : 'ddd LT',
      lastWeek : 'ddd LT',
      sameElse : 'll'
    });
  };
}