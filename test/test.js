var Range = require('../lib/range').Range;

var assert = require("assert")
describe('Range', function(){
  var range = new Range(100);
  describe('Range(100)#length', function(){
    it('should be 100', function(){
      assert.equal(100, range.length);
    })
    it("shouldn't be writable", function(){
      range.length = 101;
      assert.equal(100, range.length);
    })
  })

  describe('Range(1, 10)#length', function(){
    it('should be 9', function(){
      assert.equal(9, (new Range(1, 10)).length);
    })
  })

  describe('Range(1, 100, 2)#length', function(){
    it('should be 50', function(){
      assert.equal(50, (new Range(1, 100, 2)).length);
    })
  })

  describe('Range(100, 1, -2)#length', function(){
    it('should be 50', function(){
      assert.equal(50, (new Range(100, 1, -2)).length);
    })
  })

  describe('Range(100, 1, -2)#get', function(){
    it('should be 100', function(){
      assert.equal(100, (new Range(100, 1, -2)).get(0));
    })
  })

  describe('#forEach()', function(){
    it('should run 100 times', function(){
      var count = 0;
      range.forEach(function(i){
        count++;
      })
      assert.equal(100, count);
    })
  })

  describe('#reduce()', function(){
    it('should return -(sum from 1 to 99)', function(){
      var diff = range.reduce(function(a, b){
        return a - b;
      })
      assert.equal(-4950, diff);
    })
  })

  describe('#reduceRight()', function(){
    it('should return 99-(sum from 1 to 98)', function(){
      var diff = range.reduceRight(function(a, b){
        return a - b;
      })
      assert.equal(-4752, diff)
    })
  })

  describe('#map()', function(){
    var map = range.map(function(i){
      return i+1;
    })
    it('should have 1 as the first element', function(){
      assert.equal(1, map[0]);
    })
    it('should have 100 as the last element', function(){
      assert.equal(100, map[map.length-1]);
    })
  })

  describe('#filter()', function(){
    var filter = range.filter(function(i){
      return i >= 50;
    })
    it('should have length of 50', function(){
      assert.equal(50, filter.length);
    })
    it('should have 50 as the first element', function(){
      assert.equal(50, filter[0]);
    })
  })

  describe('#every()', function(){
    it('should return true', function(){
      assert.equal(true, range.every(function(i){
        return i < 100 && i >= 0;
      }));
    })
  })

  describe('#some()', function(){
    it('should return true', function(){
      assert.equal(true, range.some(function(i){
        return i % 2 === 0;
      }));
    })
  })
})
