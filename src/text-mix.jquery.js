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
    // Built on http://api.jquery.com/animate/
    var self = this,
        oldText = this.text(),
        mix = textMix.mix(oldText, newText),
        options = {
          easing: 'linear',
          step: function (now) {
            self.text(mix(now));
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

    return $({foo: 0}).animate({foo: 1}, options);
  };

}));
