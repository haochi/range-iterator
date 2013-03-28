(function(){
  "use strict";
  // implements Python's range function
  // references CPython and Jython
  // constructor
  function Range(){
    var ilow
      , ihigh
      , istep = 1
      , argv = arguments
      , me = this
      , n
      , instanceProperties;

    switch(argv.length){
    case 2:
      ilow = argv[0];
      ihigh = argv[1];
      break;
    case 3:
      ilow = argv[0];
      ihigh = argv[1];
      istep = argv[2];
      break;
    default:
      ilow = 0;
      ihigh = argv[0];
      break;
    }

    if(istep === 0){
      throw new RangeError("Step must be non-zero");
    }

    if(istep > 0){
      n = getLenOfRange(ilow, ihigh, istep);
    }else{
      n = getLenOfRange(ihigh, ilow, -istep);
    }
    if(n < 0){
      throw new RangeError("Has too many items");
    }

    // instance properties
    instanceProperties = {
      start: ilow,
      length: n,
      step: istep
    };
    Object.keys(instanceProperties).forEach(function(key){
      Object.defineProperty(me, key, {
        value: instanceProperties[key]
      });
    });
  }

  // instance methods
  Range.prototype.forEach = function(callback, pthis){
    forEach(this, callback, pthis);
  };

  Range.prototype.map = function(callback, pthis){
    var out = [];
    this.forEach(function(item, i, range){
      out.push(callback.call(pthis, item, i, range));
    });
    return out;
  };

  Range.prototype.toArray = function(){
    var out = [];
    this.forEach(function(item){
      out.push(item);
    });
    return out;
  };

  Range.prototype.filter = function(callback, pthis){
    var out = [];
    this.forEach(function(item, i, range){
      if(callback.call(pthis, item, i, range)){
        out.push(item);
      }
    });
    return out;
  };

  Range.prototype.every = function(callback, pthis){
    for(var i=0; i<this.length; i++){
      if(!callback.call(pthis, this.start + (i%this.length) * this.step, i, this)){
        return false;
      }
    }
    return true;
  };

  Range.prototype.some = function(callback, pthis){
    for(var i=0; i<this.length; i++){
      if(callback.call(pthis, this.start + (i%this.length) * this.step, i, this)){
        return true;
      }
    }
    return false;
  };

  Range.prototype.reduce = function(callback, initialValue){
    if(arguments.length > 1){
      return reduce(false, this, callback, initialValue);
    }else{
      return reduce(false, this, callback);
    }
  };

  Range.prototype.reduceRight = function(callback, initialValue){
    if(arguments.length > 1){
      return reduce(true, this, callback, initialValue);
    }else{
      return reduce(true, this, callback);
    }
  };

  Range.prototype.get = function(index){
    return this.start + (index%this.length) * this.step;
  };

  // private functions

  function getLenOfRange(lo, hi, step) {
    var n = 0, diff;
    if (lo < hi) {
      diff = hi - lo - 1;
      n = Math.floor((diff / step) + 1);
    }
    return n;
  }

  function forEach(range, callback, pthis, internalReverse){
    var i;
    if(internalReverse){
      for(i=range.length-1; i>-1; i--){
        callback.call(pthis, range.get(i), i, range);
      }
    }else{
      for(i=0; i<range.length; i++){
        callback.call(pthis, range.get(i), i, range);
      }
    }
  }

  function reduce(internalReverse, range, callback, initialValue){
    var value
      , isValueSet = false;

    if(arguments.length > 3){
      value = initialValue;
      isValueSet = true;
    }

    forEach(range, function(currentValue, i, range){
      if(isValueSet){
        value = callback(value, currentValue, i, range);
      }else{
        value = currentValue;
        isValueSet = true;
      }
    }, undefined, internalReverse);
    return value;
  }
  // exports

  if(typeof exports !== "undefined" && exports !== null){
    exports.Range = Range;
  }else{
    this.Range = Range;
  }
}).call(this);
