var textMix = require('./text-mix'),
    assert = require('assert');


// describe('Text Mix', function () {
it('hmm', function() {
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
// });
