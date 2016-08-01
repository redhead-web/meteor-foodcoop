// salesStats.js
import ngMaterial from 'angular-material'
import templateUrl from './salesStats.html'

import { Meteor } from 'meteor/meteor'
import { moment } from 'meteor/momentjs:moment'

const name = 'salesStats'



class SalesStatsController {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope)

    // setup default GST cycle for stats
    this.cycle = Meteor.user().profile.gstCycle || 2;

    this.subscribe('yearSales')

    // <img ng-src="{{product.img.url}}">

    this.helpers({
      yearSales() {
        let query = {
          dateCreated: {
            $gte: moment().startOf('year').toDate()
          },
        	producerId: Meteor.userId(),
        }
        if (this.product) {
          query.productId = this.product._id // 4
        }

        return Sales.find(query)
      },
      monthSales() {
        let query = {
          dateCreated: {
            $gte: moment().startOf('month').toDate()
          },
        	producerId: Meteor.userId(),
        }
        if (this.product) {
          query.productId = this.product._id // 4
        }

        return Sales.find(query)
      },

      weekSales() {
        let query = {
          dateCreated: {
            $gte: moment().startOf('week').toDate()
          },
        	producerId: Meteor.userId(),
        }
        if (this.product) {
          query.productId = this.product._id // 4
        }

    		return Sales.find(query)
      },
      cycleSales() {
    		const cycle = this.getReactively('cycle')
        let query = {
          dateCreated: {
            $gte: moment().startOf('month').subtract(cycle, 'months').toDate()
          },
        	producerId: Meteor.userId(),
        }
        if (this.product) {
          query.productId = this.product._id // 4
        }
        return Sales.find(query)
      }
    })

    // TODO: write the salesStats Meteor method to return a sales total for year, month, day and GST cycle

    this.call('salesStats', (err, result) => {
    	if (err) {
        console.log(err)
        return
      }

      this.lastYear = result.year;
      this.lastMonth = result.month;
      this.lastCycle = result.cycle;
      this.lastWeek = result.week;
    })

    this.autorun(()=>{
      console.log("autorun for sales stats just started")
      this.weekTotal = this.total(this.weekSales)
      this.yearTotal = this.total(this.yearSales)
      this.monthTotal = this.total(this.monthSales)
      this.cycleTotal = this.total(this.cycleSales)

    })

  }

  changeCycle(newCycle) { // - <a ng-click="changeCycle(6)"> {{cycle}}
  	this.cycle = newCycle;
    Meteor.users.update(Meteor.userId(), { $set: { 'profile.gstCycle': newCycle } });
  }

  total(sales) { // {{total(weekSales) | currency}} {{((total(weekSales) - lastWeek)/lastWeek) * 100}} ng-class="{'positive': total(weekSales) > lastWeek}"
  	let total = 0;
    for (let i = 0; i <= sales.length; i++) {
    	const sale = sales[i]
      total += sale.price * sale.qty;
    }
    return total;
    this.onUpdate()
  }

}

export default angular.module(name, [
  ngMaterial,
  'angular-meteor'
]).component(name, {
  templateUrl,
  controller: SalesStatsController,
  bindings: {
    product: "<"
  }
})
