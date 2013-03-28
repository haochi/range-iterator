(function(){
"use strict";
// implements Python's range function
// references CPython and Jython
// constructor
function Range(){
  var ilow, ihigh, istep = 1; 
  var argv = arguments;
  var me = this;

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
    throw RangeError("Step must be non-zero");
  }

  var n;
  if(istep > 0){
    n = getLenOfRange(ilow, ihigh, istep);
  }else{
    n = getLenOfRange(ihigh, ilow, -istep);
  }
  if(n < 0){
    throw RangeError("Has too many items");
  }

  // instance properties
  var instanceProperties = {
    start: ilow,
    length: n,
    step: istep
  };
  Object.keys(instanceProperties).forEach(function(key){
    Object.defineProperty(me, key, {
      value: instanceProperties[key],
    });
  });
};

// instance methods
Range.prototype.forEach = function(callback, _this){
  forEach(this, callback, _this);
}

Range.prototype.map = function(callback, _this){
  var out = [];
  this.forEach(function(item, i, range){
    out.push(callback.call(_this, item, i, range));
  });
  return out;
}

Range.prototype.toArray = function(){
  var out = [];
  this.forEach(function(item){
    out.push(item);
  });
  return out;
}

Range.prototype.filter = function(callback, _this){
  var out = [];
  this.forEach(function(item, i, range){
    if(callback.call(_this, item, i, range)){
      out.push(item);
    }
  });
  return out;
}

Range.prototype.every = function(callback, _this){
  for(var i=0; i<this.length; i++){
    if(!callback.call(_this, this.start + (i%this.length) * this.step, i, this)){
      return false;
    }
  }
  return true;
}

Range.prototype.some = function(callback, _this){
  for(var i=0; i<this.length; i++){
    if(callback.call(_this, this.start + (i%this.length) * this.step, i, this)){
      return true;
    }
  }
  return false;
}

Range.prototype.reduce = function(callback, initialValue){
  if(arguments.length > 1){
    return reduce(false, this, callback, initialValue);
  }else{
    return reduce(false, this, callback);
  }
}

Range.prototype.reduceRight = function(callback, initialValue){
  if(arguments.length > 1){
    return reduce(true, this, callback, initialValue);
  }else{
    return reduce(true, this, callback);
  }
}

Range.prototype.get = function(index){
  return this.start + (index%this.length) * this.step;
}

// private functions

var int = Math.floor;
function getLenOfRange(lo, hi, step) {
  var n = 0, diff;
  if (lo < hi) {
    diff = hi - lo - 1;
    n = int((diff / step) + 1);
  }
  return n;
}

function forEach(range, callback, _this, _internalReverse){
  if(_internalReverse){
    for(var i=range.length-1; i>-1; i--){
      callback.call(_this, range.get(i), i, range);
    }
  }else{
    for(var i=0; i<range.length; i++){
      callback.call(_this, range.get(i), i, range);
    }
  }
}

function reduce(_internalReverse, range, callback, initialValue){
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
  }, undefined, _internalReverse);
  return value;
}
// exports

if(typeof exports !== "undefined" && exports !== null){
  exports.Range = Range;
}else{
  this.Range = Range;
}

}).call(this);
