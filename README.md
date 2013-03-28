Range iterator that behaves like an Array
=========================================

Code Sample
-----------

    var Range = require('range-iterator').Range
      , iterator = new Range(12, 20, 3);

    iterator.forEach(function(i){
      console.log(i);
    });

    // outputs:
    // 12
    // 15
    // 18

Constructor
-----------
The constructor takes the same parameters as [Python's xrange function](http://docs.python.org/2/library/functions.html#xrange).

* `new Range(start, end, step)`
* `new Range(start, end)` &equiv; `new Range(start, end, 1)`
* `new Range(end)` &equiv; `new Range(0, end, 1)`

Methods
-------
Comes with [all iteration methods](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array#Iteration_methods) that `Array` instances have.

* [\#forEach()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach)
* [\#every()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every)
* [\#some()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some)
* [\#filter()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter)
* [\#map()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map)
* [\#reduce()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reduce)
* [\#reduceRight()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reduceRight)

As well as:

* `#get(n)`: obtain the value at step `n`
* `#toArray()`: obtain the array of the `Range` instance

Properties
----------
* `#length`
* `#start`
* `#step`
