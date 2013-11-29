var textMix = require('./text-mix'),
    assert = require('assert');


describe('TextMix', function () {
  it('identity test', function() {
    assert.equal(textMix.traverse('hello', 'hello', 0), 'hello');
  });

  it('can traverse a path', function() {
    assert.equal(textMix.traverse('kitten','sitting', 0), 'sitting');
    assert.equal(textMix.traverse('kitten','sitting', 1), 'sittin');
    assert.equal(textMix.traverse('kitten','sitting', 2), 'sittin');
    assert.equal(textMix.traverse('kitten','sitting', 3), 'sitten');
    assert.equal(textMix.traverse('kitten','sitting', 4), 'sitten');
    assert.equal(textMix.traverse('kitten','sitting', 5), 'sitten');
    assert.equal(textMix.traverse('kitten','sitting', 6), 'sitten');
    assert.equal(textMix.traverse('kitten','sitting', 7), 'kitten');
    assert.equal(textMix.traverse('kitten','sitting', 8), 'kitten');
  });
});
