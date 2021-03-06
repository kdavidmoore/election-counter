// these variables only need to be set once
var voteIcon = document.getElementById("vote");
var endTime = new Date(1478606400000);
var endTimeStamp = Date.parse(endTime); // parses the time into Linux timestamp
/* var endTimeStamp = Date.now() + 10000; */

var timer = document.getElementById('countdown-wrapper');
var weeks = document.getElementById('weeks'); // can also use var weeks = timer.querySelector("#weeks");
var days = document.getElementById('days');
var hours = document.getElementById('hours');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');

// functions which will need to be called continuously
function timeTillDoomsday() {
	var now = new Date(); // gets the current date/time, because we didn't pass any arguments
	var nowTimeStamp = Date.parse(now);
	var timeDifference = endTimeStamp - nowTimeStamp;
	var timeStampInSeconds = timeDifference / 1000;

	var seconds = Math.floor(timeStampInSeconds % 60);
	var minutes = Math.floor((timeStampInSeconds / 60) % 60);
	var hours = Math.floor(timeStampInSeconds / (60*60) % 24);
	var days = Math.floor(timeStampInSeconds / (60*60*24) % 7);
	var weeks = Math.floor(timeStampInSeconds / (60*60*24*7));

	var timeObject = {
		weeks: weeks,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		remaining: timeDifference
	};

	return timeObject; // after a return statement, the function 'hangs up'
};

function initTimer() {
	var timeObjectReturned = timeTillDoomsday(); // gets the timeObject returned by timeTillDoomsday()
	if (timeObjectReturned.remaining > 1) { // stops updating when the end date is reached
		weeks.innerHTML = timeObjectReturned.weeks;
		days.innerHTML = timeObjectReturned.days;
		hours.innerHTML = timeObjectReturned.hours;
		minutes.innerHTML = timeObjectReturned.minutes;
		seconds.innerHTML = timeObjectReturned.seconds;
	} else {
		voteIcon.style.display = "block";
	}
};

// make the timer update every half-second
initTimer();
window.setInterval(initTimer, 500);
