
class ConnectionStatusController {
  constructor($scope, $reactive, $mdToast) {
    "ngInject";
    $reactive(this).attach($scope)
    
    let connectionDropped = false
    
    let disconnected = $mdToast.simple()
      .textContent('Connection to server interrupted')
      .action('retry')
      .highlightAction(true)
    
    let connected = $mdToast.simple()
      .textContent('Reconnected')
      
      

    this.autorun(()=>{
  		let status = Meteor.status();
      // console.log("status changed to: " + status.status)
  		if (!status.connected && status.status !== 'connecting') {
        
        connectionDropped = true
        $mdToast.show(disconnected).then(function(response) {
          if ( response == 'ok' ) {
            Meteor.reconnect()
          }
        });
      } else if (status.status === 'connected' && connectionDropped){
        $mdToast.show(connected)
      }
    })
  }

}


const name = "connectionStatus"


angular.module('food-coop').component(name, {
  template: "",
  controller: ConnectionStatusController,
})
