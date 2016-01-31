function calculate(str1,str2)
{
	function toDec(str)
	{
		sum = 0;
		for (i=str.length-1,j = 0;i>=0;i--,j++)
		{
			if (str.charAt(i) != 0) {
				sum += Math.pow(2,j);
			}
		}
		return sum;

	}
	return toDec(str1)+toDec(str2);

}


console.assert(calculate('10', '10') === 4);
console.assert(calculate('10', '0') === 2);
console.assert(calculate('101', '10') === 7);
