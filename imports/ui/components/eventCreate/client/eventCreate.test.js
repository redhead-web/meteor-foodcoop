import 'angular-mocks'
import {name as eventCreate} from '../eventCreate'

import {moment} from "meteor/momentjs:moment"

import { expect } from 'meteor/practicalmeteor:chai';

describe('eventCreate', () => {
  beforeEach(() => {
    window.module(eventCreate);
  });

  describe('controller', () => {
    let controller;

    beforeEach(() => {
      angular.mock.inject(($rootScope, $componentController) => {
        controller = $componentController(eventCreate, {
          $scope: $rootScope.$new(true)
        });
      });
    });

    it("should have 'event' be an empty object", () => {
      expect(controller.event).to.be.empty
      expect(controller.event.ticketPrice).to.be.undefined
    })

    it("should be able to assign an image after calling `imgSelected`", () => {
      controller.imgSelected({data: {
        public_id: "hello",
        secure_url: "test"
      }})
      expect(controller.event.img).to.exist
      expect(controller.event.img.result)
      .to.equal("hello")
      expect(controller.event.img.url).to.equal("test")
    })

    it("should be able to update the date of the event when the time is changed", () => {
      controller.time = new Date(1970, 0, 1, 5)
      controller.timeChange()
      expect(controller.event.date.toISOString())
      .to.equal(
        moment()
        .hour(5).startOf('hour')
        .toISOString()
      )
    })

    // it("should reset this.event after submitting", () => {
    //   controller.event = {
    //     title: "an event"
    //   }
    //   expect(controller.event).not.to.be.empty
    //
    //   controller.onSubmit()
    //   expect(controller.event).to.be.empty
    // })

  })
})
