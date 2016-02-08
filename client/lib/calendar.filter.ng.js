angular
  .module('food-coop')
  .filter('calendar', calendar);

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
