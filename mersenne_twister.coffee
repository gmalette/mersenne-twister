# Thanks to https://gist.github.com/300494
class @MersenneTwister
  N: 624
  FF: 0xFFFFFFFF
    
  constructor: (seed) ->
    @mt = []
    @index = 0
    
    @mt[0] = seed
    
    for i in [1...@N]
      s = (@mt[i-1] ^ (@mt[i-1] >>> 30))
      @mt[i] = ((((((s & 0xffff0000) >>> 16) * 0x6C078965) << 16) + (s & 0xffff) * 0x6C078965) + i) >>> 0
  
  
  next: ->
    @twist() if @index == 0
    
    y = @mt[@index]
    y = y ^ (y >>> 11)
    y = (y ^ ((y << 7) & 0x9D2C5680)) & @FF
    y = (y ^ ((y << 15) & 0xEFC60000)) & @FF
    y = y ^ (y >>> 18)
    
    @index = (@index + 1) % @N
    
    y >>> 0
  
  
  twist: ->
    for i in [0...@N]
      y = (@mt[i] & 0x80000000) | (@mt[(i+1) % @N] & 0x7FFFFFFF)
      @mt[i] = (@mt[(i+397) % @N] ^ (y >>> 1)) >>> 0
      
      if (y & 1) != 0
        @mt[i] = (@mt[i] ^ 0x9908B0DF) >>> 0
    null
      
    