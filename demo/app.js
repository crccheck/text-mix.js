/* globals textMix */
var thing1 = document.getElementById('thing1'),
    thing2 = document.getElementById('thing2'),
    fader = document.getElementById('fader'),
    output = document.getElementById('output'),
    step = +fader.step,
    timer, lastVal,
    currentMix,
    ramp = function () {
      var val = +fader.value;
      var switchedDirection = false;
      val += step;
      if ((val > +fader.max) || (val < +fader.min)) {
        step = -step;
        val += step;
        switchedDirection = true;
      }
      fader.value = val;
      // output.value = textMix.textMix(thing1.value, thing2.value, val);
      output.value = currentMix(val);
      var timeout = switchedDirection ? 700 : Math.abs(2 / step);
      timer = setTimeout(ramp, timeout);
    },
    _faderCB = function () {
      if (timer) {
        clearTimeout(timer);
      }
      if (fader.value != lastVal) {
        // output.value = textMix.textMix(thing1.value, thing2.value, this.value);
        output.value = currentMix(this.value);
        lastVal = fader.value;
      }
    };


// Store the input state in the location hash
function _onInputChange () {
  currentMix = textMix.mix(thing1.value, thing2.value);
  document.location.hash = '/' + encodeURIComponent(thing1.value) + '/' + encodeURIComponent(thing2.value);
}


function loadInitialStateFromHash () {
  var state = document.location.hash;
  if (state[0] === '#') {
    state = state.substr(1);
  }
  var bits = state.substr(1).split('/');
  if (bits.length !== 2) {
    // invalid state
    return;
  }
  thing1.value = bits[0];
  thing2.value = bits[1];
}


function main () {
  loadInitialStateFromHash();
  currentMix = textMix.mix(thing1.value, thing2.value);
  fader.addEventListener('input', _faderCB, false);
  fader.addEventListener('change', _faderCB, false);
  thing1.addEventListener('change', _onInputChange, false);
  thing2.addEventListener('change', _onInputChange, false);
  ramp();
  _onInputChange();
}


main();
