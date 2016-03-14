Meteor.startup(function(){
  GetDeliveryDay = function(date) {
    // added a week to make match current co-op cycle
    let nearestDeliveryDay = moment(date)
    .day(Meteor.settings.public.deliveryDayOfWeek)
    .startOf('day')
    let shoppingStopDay = moment(date)
    .day(Meteor.settings.public.shoppingStopDay)
    .startOf('day');
    if (moment(date)
        .startOf('day')
        .isAfter(shoppingStopDay) 
    ) {
      return nearestDeliveryDay.add(1, 'weeks').format()
    } else return nearestDeliveryDay.format()
  };
});


