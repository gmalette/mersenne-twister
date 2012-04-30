<?php

class MersenneTwister
{
	const N 	= 624;
	const FF 	= 0xFFFFFFFF;
	
	protected $mt 		= array();
	protected $index 	= 0;
	
	public function __construct ($seed)
	{
		$this->mt[0] = $seed;
		for ($i = 1; $i < self::N; $i++)
		{
			$this->mt[$i] = (0x6C078965 * ($this->mt[$i-1] ^ ($this->mt[$i-1] >> 30)) + $i)  & self::FF;
		}
	}
	
	public function next ()
	{
		if ($this->index == 0)
		{
			$this->twist();
		}
		
		$y = $this->mt[$this->index];
		$y = $y ^ ($y >> 11);
		$y = $y ^ (($y << 7) & 0x9D2C5680) & self::FF;
		$y = $y ^ (($y << 15) & 0xEFC60000) & self::FF;
		$y = $y ^ ($y >> 18);
		$this->index = ($this->index + 1) % self::N;
		
		return $y;
	}
	
	
	private function twist ()
	{
		for ($i = 0; $i < self::N; $i++)
		{
			$y = ($this->mt[$i] & 0x80000000) | ($this->mt[($i + 1) % self::N] & 0x7FFFFFFF);
			
			$this->mt[$i] = $this->mt[($i + 397) % self::N] ^ ($y >> 1);
			if (($y & 1) != 0)
			{
				$this->mt[$i] = $this->mt[$i] ^ 0x9908B0DF;
			}
		}
	}	
}


