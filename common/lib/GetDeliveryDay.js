import moment from 'moment-timezone';

;

Meteor.startup(() => {
  GetDeliveryDay = function (date) {
    // added a week to make match current co-op cycle
    const nearestDeliveryDay = moment(date)
    .day(Meteor.settings.public.deliveryDayOfWeek)
    .startOf('day')
    .add(1, 'weeks');
    const shoppingStopDay = moment(date)
    .day(Meteor.settings.public.shoppingStopDay)
    .startOf('day');
    if (moment(date)
        .startOf('day')
        .isAfter(shoppingStopDay)
    ) {
      return nearestDeliveryDay.add(1, 'weeks').format();
    } return nearestDeliveryDay.format();
  };
  GetNextDeliveryDay = function (date) {
    // get's the next delivery day even if after shoppingStopDay
    const nearestDeliveryDay = moment(date)
    .day(Meteor.settings.public.deliveryDayOfWeek)
    .startOf('day');

    if (moment(date).startOf('day').isAfter(nearestDeliveryDay)) {
      return nearestDeliveryDay.add(1, 'weeks');
    } return nearestDeliveryDay;
  };

  GetProductDeliveryDay = function (cutoffThreshold, date, deliveryDayOfWeek) {
    if (cutoffThreshold == null) {
      cutoffThreshold = Meteor.settings.public.shoppingThreshold; // 1 day
    }

    if (deliveryDayOfWeek == null) {
      deliveryDayOfWeek = Meteor.settings.public.deliveryDayOfWeek;
    }

    const dd = moment(date).day(deliveryDayOfWeek).startOf('day');
    const today = moment(date).startOf('day');
    while (today.isAfter(moment(dd).subtract(cutoffThreshold, 'days'))) {
      dd.add(1, 'weeks');
    }

    return dd;
  };
});
