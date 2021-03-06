/* globals Markup:true */
/* eslint-disable new-cap */
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { lodash as _ } from 'meteor/stevezhu:lodash';

Meteor.startup(() => {
  Markup = function (arg) {
    const productPattern = {
      price: Number,
    };

    const cartPattern = {
      details: Match.ObjectIncluding({ price: Number }),
      qty: Number,
    };

    const salePattern = {
      price: Number,
      qty: Number,
    };

    this.cart = undefined;
    this.sales = undefined;
    this.products = undefined;

    this.cartItem = undefined;
    this.saleItem = undefined;
    this.product = undefined;


    if (Match.test(arg, [Object])) {
      if (Match.test(arg, [Match.ObjectIncluding(cartPattern)])) {
        this.cart = arg;
      } else if (Match.test(arg, [Match.ObjectIncluding(salePattern)])) {
        this.sales = arg;
      } else if (Match.test(arg, [Match.ObjectIncluding(productPattern)])) {
        this.products = arg;
      } else {
        throw new Meteor.Error(404, `cannot calculate markup on ${arg}`);
      }
    } else if (Match.test(arg, Object)) {
      if (Match.test(arg, Match.ObjectIncluding(cartPattern))) {
        this.cartItem = arg;
      } else if (Match.test(arg, Match.ObjectIncluding(salePattern))) {
        this.saleItem = arg;
      } else if (Match.test(arg, Match.ObjectIncluding(productPattern))) {
        this.product = arg;
      }
    } else if (Match.test(arg, Number)) {
      this.product = {
        price: arg,
      };
      this.cartItem = {
        details: { price: arg },
      };
    }

    this.baseMarkup = Meteor.settings.public.markup;
    this.markupRatio = this.baseMarkup - 1;

    this.total = function total(price) {
      if (price) {
        return _.round(price * this.baseMarkup, 2);
      } else {
        let total = 0;

        if (this.products) {
          for (let i = 0; i < this.products.length; i++) {
            total += this.products[i].price * (this.baseMarkup + (this.products[i].extraMarkup || 0));
          }
        } else if (this.cartItem) {
          total = this.cartItem.details.price * (this.baseMarkup + (this.cartItem.details.extraMarkup || 0));
        } else if (this.saleItem) {
          total = this.saleItem.price * (this.baseMarkup + (this.saleItem.extraMarkup || 0));
        } else if (this.product) {
          total = this.product.price * (this.baseMarkup + (this.product.extraMarkup || 0));
        }

        return _.round(total, 2);
      }
    };

    this.cartTotal = function cartTotal() {
      let total = 0;
      if (this.cart) {
        for (let i = 0; i < this.cart.length; i++) {
          total += this.cart[i].details.price * this.cart[i].qty * (this.baseMarkup + (this.cart[i].details.extraMarkup || 0));
        }
      } else if (this.cartItem) {
        total = this.cartItem.details.price * this.cartItem.qty * (this.baseMarkup + (this.cartItem.details.extraMarkup || 0));
      }

      return _.round(total, 2);
    };

    this.saleTotal = function saleTotal() {
      let total = 0;
      if (this.sales) {
        for (let i = 0; i < this.sales.length; i++) {
          total += this.sales[i].price * this.sales[i].qty * (this.baseMarkup + (this.sales[i].extraMarkup || 0));
        }
      } else if (this.saleItem) {
        total = this.saleItem.price * this.saleItem.qty * (this.baseMarkup + (this.saleItem.extraMarkup || 0));
      }

      return _.round(total, 2);
    };

    this.withoutMarkup = function (amount) {
      return _.round(amount / this.baseMarkup, 2);
    };


    this.markup = function (amount) {
      // use markupRatio to multiply by 0.1 instead of 1.1 as set in settings.
      if (amount) {
        return _.round(amount * this.markupRatio, 2);
      } else {
        let amount = 0;

        if (this.cart) {
          for (let i = 0; i < this.cart.length; i++) {
            amount += this.cart[i].details.price * this.cart[i].qty * (this.markupRatio + (this.cart[i].details.extraMarkup || 0));
          }
        } else if (this.sales) {
          for (let i = 0; i < this.sales.length; i++) {
            amount += this.sales[i].price * this.sales[i].qty * (this.markupRatio + (this.sales[i].extraMarkup || 0));
          }
        } else if (this.products) {
          for (let i = 0; i < this.products.length; i++) {
            amount += this.products[i].price * (this.markupRatio + (this.products[i].extraMarkup || 0));
          }
        } else if (this.cartItem) {
          amount = this.cartItem.details.price * this.cartItem.qty * (this.markupRatio + (this.cartItem.details.extraMarkup || 0));
        } else if (this.saleItem) {
          amount = this.saleItem.price * this.saleItem.qty * (this.markupRatio + (this.saleItem.extraMarkup || 0));
        } else if (this.product) {
          amount = this.product.price * (this.markupRatio + (this.product.extraMarkup || 0));
        }

        return _.round(amount, 2);
      }
    };

    return this;
  };
});
