# Text-Mix.js

Smooth transitions for chunks of text.

![](http://crccheck.github.io/text-mix.js/images/textmix.jpg)

## Intro

Traditional "crossfade" effects for text involve treating it like a block level
element and doing fades/slides/wipes. The problem with that is you have to
temporarily turn your inline element into a block element to do the transition.

Text-Mix provides a way to smoothly transition from one chunk of text to
another.


## Demo

http://crccheck.github.io/text-mix.js/


## Usage

### Library

To get the half-way transition between two chunks of text, run:
```
textMix.textMix(text1, text2, amount)
```

- **text1**  *String*  One chunk of text
- **text2**  *String*  Another chunk of text
- **amount**  *Float*  The amount between 0 and 1 to tween between text1 and
  text2


Example:

```JavaScript
textMix.textMix("Winter is coming", "Where did summer go?", 0.5);
```

### jQuery animation

To transition the contents of an element, call the plugin using the the jQuery
animation-style args:
```JavaScript
$('#start').textMix('Where did summer go?', 750)
```

```
.textMix( newText [, duration ][, easing ][, complete ])
```

- **newText**  *String*  The new text you want you want instead
- **duration**  *Number* or *String*  How long the transition should run
  (default: 400)
- **easing**  *String*  Which easing function to use (default: linear)
- **complete**  *Function*  The function to run when the transition is complete

Example:

```JavaScript
$('#banner').textMix('Winter is coming');
```
