angular
  /**
   * Angular parallax module
   */
  .module('ngParallax', [])

  /**
   * Angular parallax directive
   */
  .directive('parallax', ['$window', function ($window)
  {
    return {
      restrict: 'A',
      link: function(scope, elm, attr)
      {
        var
          /**
           * CSS property that will be changed with scroll
           */
          cssProperty,

          /**
           * CSS value
           */
          cssFunction,

          /**
           * Is the CSS value a special value?
           */
          useCssFunction,

          /**
           * Parallax CSS value
           */
          parallaxCssVal,

          /**
           * Parallax scroll ratio
           */
          parallaxRatio,

          /**
           * Position value at initiation
           */
          parallaxInitVal,

          /**
           * CSS unit of measuremnt at initiation
           */
          parallaxInitUnit,

          /**
           * Array containing CSS property and special function
           */
          cssValArray,

          /**
           * CSS unit of measurement when scrolling
           */
          parallaxUseUnit;

        // Find out if parallax affects an element top position or CSS property
        parallaxCssVal = attr.parallaxCss ? attr.parallaxCss : 'top';

        // Set the CSS proprty and value
        cssValArray = parallaxCssVal.split(':');
        cssProperty = cssValArray[0];
        cssFunction = cssValArray[1];

        // Check if function is used
        useCssFunction = cssFunction ? true : false;
        if ( ! cssFunction) cssFunction = cssProperty;

        // Set parallax ratio
        parallaxRatio = attr.parallaxRatio ? +attr.parallaxRatio : 1.1;

        // Set parallax initial value
        parallaxInitVal = attr.parallaxInitVal ? +attr.parallaxInitVal : 0;

        // Set parallax initial unit
        parallaxInitUnit = attr.parallaxInitUnit;

        // Set paxallax calculated unit
        parallaxUseUnit = attr.parallaxUseUnit;

        // Call an initial update
        _update();

        /**
         * Function called by the scroll and touch move events
         */
        function _update()
        {
          // Don't update if element is not in fold or visible
          if( ! _isElementInFold() || elm[0].offsetParent === null)
          {
            return;
          }

          /**
           * Result value applied to element's style
           * @type string
           */
          var resultVal;

          if (useCssFunction)
          {
            // CSS property updated by CSS function
            if(cssFunction == 'calc')
            {
              var calcVal = $window.pageYOffset * parallaxRatio;
              resultVal = 'calc(' + parallaxInitVal + parallaxInitUnit + ' + ' + calcVal + parallaxUseUnit + ')';
            }
            else
            {
              var calcVal = $window.pageYOffset * parallaxRatio + parallaxInitVal;
              resultVal = '' + cssFunction + '(' + calcVal + parallaxUseUnit + ')';
            }
          }
          else
          {
            // CSS property updated by value
            var calcVal = $window.pageYOffset * parallaxRatio + parallaxInitVal;
            resultVal = (calcVal > parallaxInitVal) ? '' + calcVal + parallaxUseUnit : '' + parallaxInitVal + parallaxInitUnit;
          }

          // Apply CSS
          elm.css(cssProperty, resultVal);
        }

        /**
         * Checks if element is in the fold
         * @return {bool}
         */
        function _isElementInFold()
        {
          return ($window.pageYOffset + $window.innerHeight >= elm[0].offsetTop && $window.pageYOffset <= elm[0].offsetTop + elm[0].offsetHeight);
        }

        // Listen for scroll and touch move events
        $window.addEventListener('scroll', _update);
        $window.addEventListener('touchmove', _update);
      }
    };
  }]);
