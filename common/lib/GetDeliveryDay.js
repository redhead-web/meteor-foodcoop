Meteor.startup(function(){
  GetDeliveryDay = function() {
    // added a week to make match current co-op cycle
    let nearestDeliveryDay = moment().day(Meteor.settings.public.deliveryDayOfWeek).startOf('day').add(1, 'weeks'); 
    let shoppingStopDay = moment().day(Meteor.settings.public.shoppingStopDay).startOf('day');
    if (moment().startOf('day').isAfter(shoppingStopDay) ) {
      return nearestDeliveryDay.add(1, 'weeks').format()
    } else return nearestDeliveryDay.format()
  };
});
