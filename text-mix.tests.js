var textMix = require('./text-mix'),
    assert = require('assert');


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
  it('identity test', function() {
    assert.equal(textMix.traverse('hello', 'hello', 0), 'hello');
  });

  it('can traverse a path', function() {
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

  it('can traverse another path', function() {
    assert.equal(textMix.traverse('elvis', 'washington', 0), 'washington');
    assert.equal(textMix.traverse('washington', 'elvis', 0), 'elvis');
    assert.equal(textMix.traverse('washington', 'elvis', 9), 'washington');
    assert.equal(textMix.traverse('elvis', 'washington', 9), 'elvis');
  });
});
