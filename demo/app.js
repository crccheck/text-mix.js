/* globals textMix */
var thing1 = document.getElementById('thing1'),
    thing2 = document.getElementById('thing2'),
    fader = document.getElementById('fader'),
    output = document.getElementById('output'),
    step = +fader.step,
    timer, lastVal,
    ramp = function () {
      var val = +fader.value;
      val += step;
      if ((val > +fader.max) || (val < +fader.min)) {
        step = -step;
        val += step;
      }
      fader.value = val;
      output.value = textMix.textMix(thing1.value, thing2.value, val);
      timer = setTimeout(ramp, Math.abs(2 / step));
    },
    _faderCB = function (e) {
      if (timer) {
        clearTimeout(timer);
      }
      if (fader.value != lastVal) {
        output.value = textMix.textMix(thing1.value, thing2.value, this.value);
        lastVal = fader.value;
      }
    };


// Store the input state in the location hash
function _onInputChange () {
  document.location.hash = '/' + encodeURIComponent(thing1.value) + '/' + encodeURIComponent(thing2.value);
}


function main () {
  fader.addEventListener('input', _faderCB, false);
  fader.addEventListener('change', _faderCB, false);
  thing1.addEventListener('change', _onInputChange, false);
  thing2.addEventListener('change', _onInputChange, false);
  ramp();
  _onInputChange();
}


main();
