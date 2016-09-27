# AngularJS Multi-Avatar Directive

## How to Use

Will apply in the following order:

0. Facebook ID
0. Twitter ID
0. Github ID
0. Gravatar Email or Hash
0. use an NgLetterAvatar from https://github.com/sean-stanley/ngletteravatar

In your HTML, use the following. Depending on what your user has defined, it'll
display an avatar:

```html
<multi-avatar 
    user="userObjectOr_idString"
    name="Peter Parker"
    email="spiderman@avengers.org"
    width="60"
    height="60"
>
</multi-avatar>
```

In your Javascript (coffee):

```js
angular.module("yourmodule", ["multi-avatar"]);
```

We use a publish method called basic-user to find the user. Write your own to overwrite ours with custom data for your user subscription for their avatar.

### Attributes 

##### User @Meteor.user()Object or @String
The user tag takes either an _id string or a Meteor.user() object and will look for the _id from the object. Then we use our meteor method to fetch the services and emails for that user.

This field uses one-way data-binding introduced in AngularJS 1.5

#### width/height @Integer in pixel units -- default is 50px
Supply a width and height to use something other than the default 50px. The font for the ngLetterAvatar will scale proportionally with the height and width of your avatar.

#### name/email @String 
Supply a static string for gravatar and ngLetterAvatar to use. To use a scope variable in these tags wrap them in {{ }}.
