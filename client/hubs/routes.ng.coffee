isAdmin = (user) ->
  Roles.userIsInRole user, 'admin'

angular.module('food-collective').config ($stateProvider) ->
  $stateProvider
  	.state 'hubs',
    	url: '/pickup'
   		templateUrl: 'client/hubs/views/hubs-list.ng.html'
    	controller: 'HubsListCtrl'
    .state 'newHub',
      url: '/pickup/new'
      templateUrl: 'client/hubs/views/hub-new.ng.html'
      controller: "HubCreateCtrl"
  	.state 'hubDetails',
    	url: '/pickup/:hubId'
    	templateUrl: 'client/hubs/views/hub-detail.ng.html'
    	controller: 'HubDetailsCtrl'
    	resolve: 'admin': ($meteor) ->
     		$meteor.requireValidUser isAdmin

  return
