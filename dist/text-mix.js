/* text-mix - v0.1.0 - 2013-11-29 */
// Uses Node, AMD or browser globals to create a module.
//
// https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['levenshtein'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('levenshtein'));
  } else {
    // Browser globals (root is window)
    root.textMix = factory(root.Levenshtein);
  }
}(this, function (Levenshtein) {
  'use strict';

  var utils = {
    // from jQuery, MIT license
    isNumeric: function( obj ) {
      return !isNaN( parseFloat(obj) ) && isFinite( obj );
    }
  };

  var debug = function() {
    if (false)
    console.log.apply(console, arguments);
  };


  var NOOP = 'noop',
      SUB = 'sub',
      INSERT = 'ins',
      DELETION = 'del';

  // cache creation of Levenshtein matrix
  var matrixMemory = {},
      cachedLevenshtein = function (text1, text2) {
        var mmKey = text1 + ' ' + text2;
        if (!matrixMemory[mmKey]) {
          matrixMemory[mmKey] = (new Levenshtein(text1, text2));
        }
        return matrixMemory[mmKey];
      };

  // An iteration step through a Levenshtein matrix (reverse backwards)
  var next = function (matrix, startX, startY) {
    // http://stackoverflow.com/questions/5849139/levenshtein-distance-inferring-the-edit-operations-from-the-matrix
    // assert startY > matrix.length
    // assert startX > matrix[0].length
    var val = matrix[startY][startX],
        nextX = startX, nextY = startY, operation,
        diag = Infinity,
        up = Infinity,
        left = Infinity;
    if (startY > 0) {
      up = matrix[startY - 1][startX];
    }
    if (startX > 0) {
      left = matrix[startY][startX - 1];
    }
    if (startX > 0 && startY > 0) {
      diag = matrix[startY - 1][startX - 1];
      }
    var min = Math.min(up, left, diag);
    // console.log('val:', val, 'up:', up, 'diag:', diag, 'left:', left, 'min:', min);
    if (diag === 0 || diag <= min) {
      nextX = startX - 1;
      nextY = startY - 1;
      if (diag < val) {
        operation = SUB;
      } else if (diag === val) {
        // NOOP sometimes should be SUB
        operation = NOOP;
      }
    } else if (left === 0 || left <= min) {
      operation = INSERT;
      nextX = startX - 1;
    } else {
      operation = DELETION;
      nextY = startY -1;
    }
    return [min, operation, nextX, nextY];
  };

  // Traverse a path through the Levenshtein matrix
  var traverse = function(text1, text2, iterations) {
    var lev = cachedLevenshtein(text1, text2);
    if (lev.distance === 0) {
      // text1 == text2
      return text1;
    }
    var matrix = lev.getMatrix(),
        startY = matrix.length - 1,
        startX = matrix[0].length - 1,
        out,
        ret = text2.split('');

    debug('traverse', text1, text2, iterations);
    debug(lev.inspect());
    while (iterations-- && (startX || startY)) {
      out = next(matrix, startX, startY);
      debug('.next', 'iterations:', iterations, 'startX:', startX, 'startY:', startY);
      debug('..out:', out);
      startX = out[2];
      startY = out[3];
      switch (out[1]) {
        case NOOP:
          ++iterations;
          // NOOP sometimes should be SUB
          /* falls through */
        case SUB:
          ret[startY] = text1[startX];
        break;
        case INSERT:
          ret.splice(startY, 0, text1[startX]);
        break;
        case DELETION:
          ret.splice(startX, 1);
        break;
      }
      debug('..ret:', ret.join(''));
    }
    return ret.join('');
  };

  // helper for `stringMix`
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

  // Basic tween between two strings starting from the left
  var stringMix = function(text1, text2, amount) {
    var new_length = text1.length + Math.floor((text2.length - text1.length) * amount),
        out = '';
    for (var i = 0; i < new_length; i++) {
      out += pick(text1, text2, i, amount);
    }
    return out;
  };

  // Tween between two numbers
  var numberMix = function(num1, num2, amount) {
    // FIXME sig digs
    return Math.round(num1 + (num2 - num1) * amount);
  };

  var textMix = function(text1, text2, amount) {
    var words1 = text1.split(' '),
        words2 = text2.split(' '),
        n_max = Math.max(words1.length, words2.length),
        out = [],
        w1, w2;
    for (var i = 0; i < n_max; i++) {
      w1 = words1[i];
      w2 = words2[i];
      if (utils.isNumeric(w1) && utils.isNumeric(w2)) {
        out.push(numberMix(parseFloat(w1), parseFloat(w2), amount));
      } else if (!w1 || !w1.length || !w2 || !w2.length) {
        out.push(stringMix(w1 || '', w2 || '', amount));
      } else {
        var d = (cachedLevenshtein(w1, w2)).distance;
        out.push(traverse(w2, w1, Math.round(amount * d)));
      }
    }
    return out.join(' ');
  };

  return {
    traverse: traverse,
    textMix: textMix
  };
}));