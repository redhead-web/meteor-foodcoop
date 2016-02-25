angular-markdown-filter
=======================

Markdown filter for Angular

## Installation
```bash

# As an npm package:
$ meteor add redhead:angular-remarkable
```
It's recomended to also use [ngSanitize](https://docs.angularjs.org/api/ngSanitize) if you plan to bind the output using [ngBindHtml](https://docs.angularjs.org/api/ng/directive/ngBindHtml) to pervent [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29).
```bash
$ meteor add angular:angular-sanitize
```


## Configuration
The underlying Remarkable converter can be configured through the `remarkable` provider
```javascript
angular.module('remarkable')
  .config(function(markdownProvider) {
    markdownProvider.set({
      extensions: ['table']
    });
  });
``` 
see the [Remarkable documentation](https://github.com/jonschlinkert/remarkable)
for details on how to specify options and create extensions.

## Usage
```javascript
angular.module('myApp')
  // Optional Config
  .config(function ($compileProvider) {
    // Add optional support for custom schema links: "herp://" and "derp://"
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(herp|derp):/);
  })
  .controller('MainCtrl', function ($scope) {
    $scope.text = '# Heading 1\n- [Link](http://example.com)\n- [Custom Link 1](herp://is.this.working?)\n- [Custom Link 2](derp://is.this.working?)';
  });
```
```html
<div class="container" ng-bind-html="text | md"></div>
```
