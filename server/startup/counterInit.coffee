Meteor.startup ->
  if Counters.findOne('customerNumber')?
	  setCounter Counters, 'customerNumber', Counters.findOne('customerNumber').next_val
  else 
    setCounter Counters, 'customerNumber', 10
