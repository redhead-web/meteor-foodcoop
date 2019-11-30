
class ConnectionStatusController {
  constructor($scope, $reactive, $mdToast) {
    'ngInject';

    $reactive(this).attach($scope);

    let connectionDropped = false;

    const disconnected = $mdToast.simple()
      .textContent('Connection to server interrupted')
      .action('retry')
      .highlightAction(true)
      .position('bottom right');

    const connected = $mdToast.simple()
      .textContent('Reconnected')
      .position('bottom right');


    this.autorun(() => {
  		const status = Meteor.status();
      // console.log("status changed to: " + status.status)
  		if (!status.connected && status.status !== 'connecting') {
    connectionDropped = true;
    $mdToast.show(disconnected).then((response) => {
      if (response == 'ok') {
        Meteor.reconnect();
      }
    });
  } else if (status.status === 'connected' && connectionDropped) {
    $mdToast.show(connected);
  }
    });
  }

}


export const name = 'connectionStatus';


angular.module('food-coop').component(name, {
  template: '',
  controller: ConnectionStatusController,
});
