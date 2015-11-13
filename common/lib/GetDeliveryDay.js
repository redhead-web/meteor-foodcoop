Meteor.startup(function(){
  GetDeliveryDay = function() {
    nearestDeliveryDay = moment().day(Meteor.settings.public.deliveryDayOfWeek).startOf('day');
    shoppingStopDay = moment().day(Meteor.settings.public.shoppingStopDay).startOf('day');
    if (nearestDeliveryDay.isAfter(shoppingStopDay) ) {
      return nearestDeliveryDay.add(1, 'weeks').format()
    } else return nearestDeliveryDay.format()
  }
});
