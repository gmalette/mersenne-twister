(function() {

  this.MersenneTwister = (function() {

    MersenneTwister.prototype.N = 624;

    MersenneTwister.prototype.FF = 0xFFFFFFFF;

    function MersenneTwister(seed) {
      var i, s, _ref;
      this.mt = [];
      this.index = 0;
      this.mt[0] = seed;
      for (i = 1, _ref = this.N; 1 <= _ref ? i < _ref : i > _ref; 1 <= _ref ? i++ : i--) {
        s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
        this.mt[i] = ((((((s & 0xffff0000) >>> 16) * 0x6C078965) << 16) + (s & 0xffff) * 0x6C078965) + i) >>> 0;
      }
    }

    MersenneTwister.prototype.next = function() {
      var y;
      if (this.index === 0) this.twist();
      y = this.mt[this.index];
      y = y ^ (y >>> 11);
      y = (y ^ ((y << 7) & 0x9D2C5680)) & this.FF;
      y = (y ^ ((y << 15) & 0xEFC60000)) & this.FF;
      y = y ^ (y >>> 18);
      this.index = (this.index + 1) % this.N;
      return y >>> 0;
    };

    MersenneTwister.prototype.twist = function() {
      var i, y, _ref;
      for (i = 0, _ref = this.N; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        y = (this.mt[i] & 0x80000000) | (this.mt[(i + 1) % this.N] & 0x7FFFFFFF);
        this.mt[i] = (this.mt[(i + 397) % this.N] ^ (y >>> 1)) >>> 0;
        if ((y & 1) !== 0) this.mt[i] = (this.mt[i] ^ 0x9908B0DF) >>> 0;
      }
      return null;
    };

    return MersenneTwister;

  })();

}).call(this);
