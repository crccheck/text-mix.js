var textMix = require('../src/text-mix'),
    assert = require('assert');
var _ = require('lodash');


describe('stringMix', function () {
  it('handles trivial cases', function () {
    assert.equal(textMix.stringMix('', '', 0), '');
    assert.equal(textMix.stringMix('', '', 1), '');
    assert.equal(textMix.stringMix('a', 'z', 0), 'a');
    assert.equal(textMix.stringMix('a', 'z', 1), 'z');
  });

  it('tweens', function () {
    assert.equal(textMix.stringMix('wasd', 'qwerty', 0), 'wasd');
    assert.equal(textMix.stringMix('wasd', 'qwerty', 0.5), 'qwedt');
    assert.equal(textMix.stringMix('wasd', 'qwerty', 0.8), 'qwert');
    assert.equal(textMix.stringMix('wasd', 'qwerty', 1), 'qwerty');
  });

  it('tweens rtl', function () {
    assert.equal(textMix.stringMix('accoutrements', 'sesquipedalian', 0), 'accoutrements');
    assert.equal(textMix.stringMix('accoutrements', 'sesquipedalian', -0.2), 'accoutremeian');
    assert.equal(textMix.stringMix('accoutrements', 'sesquipedalian', -0.5), 'accoutedalian');
    assert.equal(textMix.stringMix('accoutrements', 'sesquipedalian', -0.8), 'asquipedalian');
    assert.equal(textMix.stringMix('accoutrements', 'sesquipedalian', -1), 'sesquipedalian');
  });

  it('tweens null strings', function () {
    assert.equal(textMix.stringMix('0123456789', '', 0.0), '0123456789');
    assert.equal(textMix.stringMix('0123456789', '', 0.1), '012345678');
    assert.equal(textMix.stringMix('0123456789', '', 0.2), '01234567');
    assert.equal(textMix.stringMix('0123456789', '', 0.5), '01234');
    assert.equal(textMix.stringMix('0123456789', '', 0.9), '0');
    assert.equal(textMix.stringMix('0123456789', '', 1.0), '');

    assert.equal(textMix.stringMix('', '0123456789', 0.0), '');
    assert.equal(textMix.stringMix('', '0123456789', 0.1), '0');
    assert.equal(textMix.stringMix('', '0123456789', 0.2), '01');
    assert.equal(textMix.stringMix('', '0123456789', 0.5), '01234');
    assert.equal(textMix.stringMix('', '0123456789', 0.9), '012345678');
    assert.equal(textMix.stringMix('', '0123456789', 1.0), '0123456789');
  });
});


describe('numberMix', function () {
  it('handles trivial cases', function () {
    assert.equal(textMix.numberMix(0, 0, 0), 0);
    assert.equal(textMix.numberMix(0, 0, 1), 0);
    assert.equal(textMix.numberMix(1, 1, 0), 1);
    assert.equal(textMix.numberMix(1, 1, 1), 1);
  });

  it('tweens integers', function () {
    assert.equal(textMix.numberMix(0, 100, 0), 0);
    assert.equal(textMix.numberMix(0, 100, 0.25), 25);
    assert.equal(textMix.numberMix(0, 100, 0.5), 50);
    assert.equal(textMix.numberMix(1, 100, 1), 100);
  });

  it('cannot handle floats', function () {
    // the precise value is 2.5, but only 1 sigdig
    assert.equal(textMix.numberMix(0, 10, 0.25), 3);
    // the price value is 0.333, but only 1 sigdig, what to do?
    assert.equal(textMix.numberMix(0, 10, 0.333), 3);
  });
});


describe('traverse', function () {
  it('identity test', function () {
    assert.equal(textMix.traverse('hello', 'hello', 0), 'hello');
  });

  it('can traverse a path', function () {
    assert.equal(textMix.traverse('kitten','sitting', 0), 'sitting');
    assert.equal(textMix.traverse('kitten','sitting', 1), 'sittin');
    // assert.equal(textMix.traverse('kitten','sitting', 2), 'sittin');
    assert.equal(textMix.traverse('kitten','sitting', 2), 'sitten');
    // assert.equal(textMix.traverse('kitten','sitting', 4), 'sitten');
    // assert.equal(textMix.traverse('kitten','sitting', 5), 'sitten');
    // assert.equal(textMix.traverse('kitten','sitting', 6), 'sitten');
    assert.equal(textMix.traverse('kitten','sitting', 3), 'kitten');
    // assert.equal(textMix.traverse('kitten','sitting', 8), 'kitten');
  });

  it('can traverse another path', function () {
    assert.equal(textMix.traverse('elvis', 'washington', 0), 'washington');
    assert.equal(textMix.traverse('washington', 'elvis', 0), 'elvis');
    assert.equal(textMix.traverse('washington', 'elvis', 9), 'washington');
    assert.equal(textMix.traverse('elvis', 'washington', 9), 'elvis');
  });
});


describe('textMix', function () {
  it('traverses ltr by default', function () {
    assert.equal(
      textMix.textMix('levenshtein distance', 'rocket science', 0),
      'levenshtein distance'
    );
    assert.equal(
      textMix.textMix('levenshtein distance', 'rocket science', 1),
      'rocket science'
    );
    assert.equal(
      textMix.textMix('levenshtein distance', 'rocket science', 0.5),
      'rshtein sctance'
    );
  });
  it('can traverse rtl', function () {
    assert.equal(
      textMix.textMix('levenshtein distance', 'rocket science', 0, {rtl: true}),
      'levenshtein distance'
    );
    assert.equal(
      textMix.textMix('levenshtein distance', 'rocket science', 1, {rtl: true}),
      'rocket science'
    );
    assert.equal(
      textMix.textMix('levenshtein distance', 'rocket science', 0.5, {rtl: true}),
      'levenocket dicience'
    );
  });
});


describe('mix', function () {
  it('works', function () {
    var mix = textMix.mix('levenshtein distance', 'rocket science');
    assert.equal(mix(0), 'levenshtein distance');
    assert.equal(mix(1), 'rocket science');
    assert.equal(mix(0.5), 'rshtein sctance');
  });

  it('works with mismatched sentences', function () {
    var mix = textMix.mix('abcdefg 10000', 'never the same color');
    assert.equal(mix(0), 'abcdefg 10000  ');
    assert.equal(mix(1), 'never the same color');
    assert.equal(mix(0.5), 'nedefg t00 sa co');
  });

  it('rtl works', function () {
    var mix = textMix.mix('levenshtein distance', 'rocket science', {rtl: true});
    assert.equal(mix(0), 'levenshtein distance');
    assert.equal(mix(1), 'rocket science');
    assert.equal(mix(0.5), 'levenocket dicience');
  });
});


describe('feature parity between textMix and mix', function () {
  it('behaves the same', function () {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789   ';
    var sentence1 = _.shuffle(alphabet).join('');
    var sentence2 = _.shuffle(alphabet).join('');
    var amount = Math.random();
    var textMixOut = textMix.textMix(sentence1, sentence2, amount);
    var mixOut = textMix.mix(sentence1, sentence2)(amount);
    assert.equal(textMixOut, mixOut);
  });
});
