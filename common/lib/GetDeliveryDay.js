Meteor.startup(function(){
  GetNextDeliveryDay = function(date) {
    // get's the next delivery day even if after shoppingStopDay
    let nearestDeliveryDay = moment(date)
    .day(Meteor.settings.public.deliveryDayOfWeek)
    .startOf('day');

    if ( moment(date).startOf('day').isAfter(nearestDeliveryDay) ) {
      return nearestDeliveryDay.add(1, 'weeks')
    } else return nearestDeliveryDay
  };

  GetProductDeliveryDay = function(cutoffThreshold, date, deliveryDayOfWeek) {
    if (cutoffThreshold == null) {
      cutoffThreshold = Meteor.settings.public.shoppingThreshold // 1 day
    }

    if (deliveryDayOfWeek == null) {
      deliveryDayOfWeek = Meteor.settings.public.deliveryDayOfWeek
    }

    let dd = moment(date).day(deliveryDayOfWeek).startOf('day');
    let today = moment(date).startOf('day');
    while (today.isAfter( moment(dd).subtract(cutoffThreshold, 'days') ) ) {
      dd.add(1, 'weeks')
    }

    return dd
  }
});
