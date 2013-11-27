;(function (exports) {
  'use strict';

  var utils = {
    // from jQuery, MIT license
    isNumeric: function( obj ) {
      return !isNaN( parseFloat(obj) ) && isFinite( obj );
    }
  };

  var pick = function(text1, text2, idx, amount) {
    // assert idx < Math.max(text1.length, text2.length)
    var n_max = Math.max(text1.length, text2.length);
    if (idx >= text1.length) {
      return text2[idx];
    } else if (idx >= text2.length) {
      return text1[idx];
    }
    // left to right:
    return (idx < amount * n_max) ? text2[idx]: text1[idx];
    // random method:
    // return (Math.random() < amount) ? text2[idx]: text1[idx];
  };

  var stringMix = function(text1, text2, amount) {
    var new_length = text1.length + Math.floor((text2.length - text1.length) * amount),
        out = '';
    for (var i = 0; i < new_length; i++) {
      out += pick(text1, text2, i, amount);
    }
    return out;
  };

  var numberMix = function(num1, num2, amount) {
    // FIXME sig digs
    return Math.round(num1 + (num2 - num1) * amount);
  };

  var textMix = function(text1, text2, amount) {
    var words1 = text1.split(' '),
        words2 = text2.split(' '),
        n_max = Math.max(words1.length, words2.length),
        out = [];
    for (var i = 0; i < n_max; i++) {
      if (utils.isNumeric(words1[i]) && utils.isNumeric(words2[i])) {
        out.push(numberMix(parseFloat(words1[i]), parseFloat(words2[i]), amount));
      } else {
        out.push(stringMix(words1[i] || '', words2[i] || '', amount));
      }
    }
    return out.join(' ');
  };

  exports.textMix = textMix;

})(window);
