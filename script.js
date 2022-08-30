$(document).ready(function () {

	//setHours/Mins/Secs stores time used by resetTime()
	let setHours = 0;
	let setMins = 0;
	let setSecs = 10;

	//hours/mins/secs are use by runtimer 
	let hours = setHours;
	let mins = setMins;
	let secs = setSecs;

	//milliseconds is for our circle to know how much to change per millisecond. It's worked out using the setHours/Mins/Secs
	let millisecs;

	function millisecSet(){
		millisecs = setSecs*1000 + setMins*60*1000 + setHours*60*60*1000;
		}
	
	//isRunning just checks to see if the program is already going - without it, the program will run multiple times on multiple clicks
	let isRunning = false;
	
	let circ; //For the cirumference of the circle
	
	function setDesign() {
		//below code just grabs the radius from the string of "(NUM)px" and converts it to number
		let rad = $('#circle').css('r');
		rad = rad.match(/\d+/);
		rad = parseInt(rad);
		//circ is our circumference, to be used with css value "stroke-dasharray"
		circ = rad * 2 * Math.PI;
		$('#circle').css('stroke-dasharray', circ);
		$('#circle').css('stroke-dashoffset', circ);
	}
	//function for displaying the correct digits in the right display on screen
	function showTimer() {
		//Styling for hours - if its below 10, we need to add a zero in front of it.
			if (hours < 10) {
				$("#hours").text("0" + hours + ":");
			} else {
				$("#hours").text(hours + ":");
					}
			//Styling for minutes - if its below 10, we need to add a zero in front of it.
			if (mins < 10) {
				$("#mins").text("0" + mins + ":");
			} else {
				$("#mins").text(mins + ":");
				}
			//Styling for seconds - if its below 10, we need to add a zero in front of it.
			if (secs < 10) {
				$("#seconds").text("0" + secs);
			} else {
				$("#seconds").text(secs);
			}
		}
	//function that actually does the work to run the timer
	function runTimer() {
			timex = setTimeout(function () {
				if (secs > 0){
					secs--;
					runTimer();
				} else if (secs <= 0){
					if(mins > 0) {
						mins--;
						secs = 59;
						runTimer();
					} else if (mins <= 0){
						if(hours > 0){
							hours--;
							mins=59;
							secs=59;
							runTimer();
						} else if (hours <= 0){
							return;
						}
					}
				}
				 showTimer();
			}, 1000);
		} 
	//function that does the color and circle animations
	function animateDesign() {
	//	$('body').animate({backgroundColor:endColor}, millisecs, "linear");
		$('#circle').animate({strokeDashoffset:0}, millisecs, "linear");
}

	//Allows the user to customise the time from their end.
	function customTimer() {
		setHours = parseFloat(document.getElementById("custHour").value);
		setMins = parseFloat(document.getElementById("custMin").value);
		setSecs = parseFloat(document.getElementById("custSec").value);

		millisecSet();
		showTimer(setHours, setMins, setSecs);
		stopTime();
		setDesign();
	}
	$("#custUpdate").click(customTimer);
	
	//The three functions that run through each button
	function startTime () {
	if (isRunning == false) {
		runTimer();
		animateDesign();
	} else {
		return;
	}
		isRunning = true;
	}
	//stops any functions that are running during startTime()
	function stopTime () {
		clearTimeout(timex);
		$('#circle').stop();
		$('body').stop();
		isRunning = false;
	}
	//resetTime also calls the function stopTime() (this is just a personal preference, when I reset the timer I want it to stop as well)
	function resetTime () {
		hours = setHours;
		mins = setMins;
		seconds = setSecs;
		stopTime();
		showTimer();
		setDesign();
	}
	
	//The three buttons that run each function
	
	$("#startbtn").click(startTime);
	$("#stopbtn").click(stopTime);
	$("#resetbtn").click(resetTime);
	
	//Run these functions on load 
	millisecSet();
	showTimer();
	setDesign();
});