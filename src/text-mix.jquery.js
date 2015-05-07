// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
//
// https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery', 'text-mix'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('text-mix'));
  } else {
    // Browser globals
    factory(jQuery, textMix);
  }
}(function ($, textMix) {

  $.fn.textMix = function (newText, duration, easing, complete) {
    var self = this,
        oldText = this.text(),
        options = {
          easing: 'linear',
          step: function (now, tween) {
            self.text(textMix.textMix(oldText, newText, now));
          }
        };
    if (duration) {
      options.duration = duration;
    }
    if (easing) {
      options.easing = easing;
    }
    if (complete) {
      options.complete = complete;
    }

    $({foo: 0}).animate({foo: 1}, options);
  };

}));
