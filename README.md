# Food Co-op Meteor Platform

This project contains everything you need to setup an online marketplace. It is intended for food items but can be adapted to include other items as well.

## How it works

Users can be approved as producers who then can sell items through the store. The store manages a single convenient checkout and has real-time stocklevels. Once items are checked out, producers get store credit for things bought from them and are obligated to deliver them to the food co-op distribution centre.

One day a week is the delivery time and sales get assigned to the next delivery day (default Tuesday). The admin has a list of all the sales for a particular week and makes sure the orders get delivered, sorted and collected/shipped to the correct customer.

## Customization

A bit of coding experience in AngularJS and Meteor will be helpful in customizing this project. Many settings acn be assigned through settings.json but other things (especially the styles) will require hard coding changes.

Please feel free to hire me for any customization work.

## Installation

Fork the distribution branch of this repo for maximum flexibility and only getting stable features.

Be sure to rename `settings.json.default` to `settings.json`

Then run `meteor npm install` followed by `meteor --settings settings.json`
