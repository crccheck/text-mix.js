;(function ($, textMix) {

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

})(window.jQuery, window.textMix);
