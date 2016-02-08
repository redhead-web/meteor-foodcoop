Meteor.startup(function(){
  GetDeliveryDay = function() {
    let nearestDeliveryDay = moment().day(Meteor.settings.public.deliveryDayOfWeek).startOf('day');
    let shoppingStopDay = moment().day(Meteor.settings.public.shoppingStopDay).startOf('day');
    if (moment().startOf('day').isAfter(shoppingStopDay) ) {
      return nearestDeliveryDay.add(1, 'weeks').format()
    } else return nearestDeliveryDay.format()
  };
});
