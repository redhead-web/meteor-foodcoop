## 0.1.9rc_1 (27-6-2016)
- added registration welcome email template
- fixed admin products list being difficult to use
- added ssr pages for facebook bots to get nice rendered products, events and store (users coming soon)
- fix quick-link to profile from edit me page
- server connection status component added and tested
- basic events components completed
  - admin can create events
  - members of the public can read about event and buy tickets
  - members get an email with tickets
  - event can be shared on facebook and looks nice
  - email drafted for reminder of the event the day it happens



## 0.1.8 (2-6-2016)
- added colourful statuses to customer's sales and purchases like the admin has. This feature may need some refining in the near future.
- added facebook link to navigation
- fixed cash payment tracker for admin to know how much cash to deposit to bank account and can track long term deposits with permanent storage of the data
- fixed automatic emails to show price with markup rather than producer price by writing server helpers for the Markup function.
- always round prices to decimal places in emails with currency helper.
- changed fonts in emails to use sans-serif family

## 0.1.7_1 (17-5-2016)
- fixed bug with sending targeted ordering reminder emails and producer order summary emails.

## 0.1.7 (11-5-2016)
- changelog started
- using meteor 1.3 well
- moved navigation into imports components (0.2 will have all code in imports)
- fixed stocklevel checkout bug
- initial release of targeted emails (needs testing still though)
- fixed some styles being overrided by material design css being brought in by cdn.
- updated ng-file-upload to 12 and imported with npm
