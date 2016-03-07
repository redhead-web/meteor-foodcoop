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
<!--  user may be an object with the _id property of the user to lookup or may be the user id string itself  -->
<multi-avatar 
    user="user"
```


In your Javascript (coffee):

```js
angular.module("yourmodule", ["multi-avatar"]);
```

We use a publish method called basic-user to find the user. Write your own to overwrite ours with custom data for your user subscription for their avatar.
