# Text-Mix.js

![](http://crccheck.github.io/text-mix.js/images/text-mix.jpg)

Smooth transitions for chunks of text.

## Intro

Traditional "crossfade" effects for text involve treating it like a block level
element and doing fades/slides/wipes. The problem is you have to temporarily
turn your inline element into a block element to do these transitions.

Text-Mix provides a way to smoothly transition from one chunk of text to
another.


## Demo

http://crccheck.github.io/text-mix.js/


## Usage

### Using it as a library

Load `text-mix.min.js`.

To get the a transition state between two chunks of text, run:
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

### Using it as a jQuery plugin

Load `jquery-text-mix.min.js`.

To transition the contents of an element, call the plugin using the jQuery
animation-style args:

```
.textMix( newText [, duration ][, easing ][, complete ])
```

- **newText**  *String*  The new text
- **duration**  *Number* or *String*  How long the transition should run
  (default: `400`)
- **easing**  *String*  Which easing function to use (default: `linear`)
- **complete**  *Function*  The function to run when the transition is complete

Example:

```JavaScript
$('#banner').textMix('Winter is coming');
```


## How it Works

Text is transitioned word by word. When two numbers are encountered, the script
just counts from one to another. Otherwise, a path is drawn based on the
[matrix] solution of the Levenshtein distance, or for new words, inserted
character by character. If you want to fudge words so that numbers are aligned,
you should just insert extra spaces. For example:

```JavaScript
textMix.textMix("I ate 12 cookies", "and  4 cupcakes", 0.2);
```

 [matrix]: http://en.wikipedia.org/wiki/Levenshtein_distance#Iterative_with_full_matrix


## For developers

To install what's needed for development and to run the test suite:

    npm install

To install what's needed to run the demo locally, run:

    grunt demo
