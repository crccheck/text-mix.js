;(function (exports) {
  'use strict';

  var pick = function(text1, text2, idx, amount) {
    // assert idx < Math.max(text1.length, text2.length)
    if (idx >= text1.length) {
      return text2[idx];
    } else if (idx >= text2.length) {
      return text1[idx];
    }
    return (Math.random() < amount) ? text2[idx]: text1[idx];
  }

  var textMix = function(text1, text2, amount, noise) {
    var new_length = text1.length + Math.floor((text2.length - text1.length) * amount),
        out = '';
    for (var i = 0; i < new_length; i++) {
      out += pick(text1, text2, i, amount);
    }
    return out;
  };

  exports.textMix = textMix;

})(window);
