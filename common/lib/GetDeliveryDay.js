Meteor.startup(function(){
  GetDeliveryDay = function() {
    nearestDeliveryDay = moment().day(Meteor.settings.deliveryDayOfWeek).startOf('day');
    shoppingStopDay = moment().day(Meteor.settings.shoppingStopDay).startOf('day');
    if (nearestDeliveryDay.isAfter(shoppingStopDay) ) {
      return nearestDeliveryDay.add(1, 'weeks').format()
    } else return nearestDeliveryDay.format()
  }
});
