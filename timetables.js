"use strict";
var timeTable;
// Read data
let schedules = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];
let meetingDuration = 60;



// Create matrix a which would be with 1 when busy an 0 when free 
// Fill the matrix with zeros
// For every minute in the day we have a square
// 9:00 is 0 and 19:00 is 600 minutes
var numberOfPeople = schedules.length;
var matrix = new Array(numberOfPeople);
for (var i = 0; i < numberOfPeople; i++) {
  matrix[i] = new Array(600);
}
for (var i=0;i<matrix.length;i++)
{
	for (var j = 0; j< 600;j++)
	{
		matrix[i][j] = 0;
	}
}








// Function converts time given in string to time in minutes where 0 is 9:00 and 19:00 is 600
function convert(strTime)
{
	var hours = [];
	var minutes = [];
	var timeInMinutes = 0;
	hours[0]=strTime[0];
	hours[1]=strTime[1];
	minutes[0]=strTime[3];
	minutes[1]=strTime[4];
	timeInMinutes = hours[0]*1*10*60+hours[1]*1*60+minutes[0]*1*10+minutes[1]*1-9*60;
	return timeInMinutes;
}

// Now we write 1 when a person is busy
var numberOfTimeUnits = 0;
var timeUnit = [];
var timeStart;
var timeEnd;
// We start going throgh 2D array checking every person
for (var i = 0; i < numberOfPeople; i++)
{
	// We get persons number of given time slots and iterate to write 1 when the person is busy
	numberOfTimeUnits = schedules[i].length;
	for (var j = 0; j < numberOfTimeUnits; j++)
	{
		timeStart = schedules[i][j][0];
		timeEnd = schedules[i][j][1];
		// We convert time to our chosen and write 1 to matrix
		for (var b = convert(timeStart); b <= convert(timeEnd); b++)
		{
			matrix[i][b] = 1;
		}


	}
}





// Function checks when all persons are free
function findTime()
{
	var i = 0;
	var j = 0;
	var t = 0;
	var found = false;
	// Time area is when we start next iteration with integer i. Time are is of size of meeting duration
	var endTimeAreaCheck = false;
	// Free count is a square size of which is numberOfPeople multiplied with meetingDuration. Its is how much minutes should be free
	var freeCount = 0;
	for (var i = 0; i < 600; i++)
	{

		freeCount = 0;
		// We iterate checking for time area that is free with every minute
		for (var j=i; j < i + meetingDuration; j++)
			{

				
				if (endTimeAreaCheck === true) {
					endTimeAreaCheck = false;
					break;
				}
				for (var p = 0; p < numberOfPeople; p++)
				{
					if (matrix[p][j] === 1)
					{

						found = false;
						endTimeAreaCheck = true;
						break;
					}
					else
					{
						freeCount++;
						if (freeCount === numberOfPeople*meetingDuration)
						{
							found = true;
							return j-60;							
						}
					}
				}
			}
	}
}

var rightTime = findTime();
var i = 0;
var h = 9;
var mins = 0;

h = h + (Math.floor(rightTime/60));
mins = rightTime - Math.floor(rightTime/60)*60;

console.log(h + ':' + mins);


