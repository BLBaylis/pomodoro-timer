var box = document.getElementsByClassName("box"),
chimes = document.getElementsByClassName("chimes"),
adjusterUp = document.getElementsByClassName("adjuster-up"),
adjusterDown = document.getElementsByClassName("adjuster-down"),
toBeCovered = document.getElementsByClassName("to-be-covered"),
coverBox = document.getElementsByClassName("cover-box"),
workText = document.getElementsByClassName("work-text"),
workTime = document.getElementsByClassName("work-time"),
breakText = document.getElementsByClassName("break-text"),
breakTime = document.getElementsByClassName("break-time"),
volumeIcon = document.getElementsByClassName("volume-icon"),
questionCircleO = document.getElementsByClassName("fa-question-circle-o"),
timerObj = {workDuration : 60000, breakDuration : 60000, currentPhase : "work", started : false, running : false};

document.addEventListener("DOMContentLoaded", function(){
	document.getElementsByClassName("play")[0].addEventListener("click", timerObj.play);
  	document.getElementsByClassName("pause")[0].addEventListener("click", timerObj.pause);
 	document.getElementsByClassName("reset")[0].addEventListener("click", timerObj.stop);
  	adjusterUp[0].addEventListener("click", function(){
    	timerObj.changeTime("work", 60000);
  	});
  	adjusterDown[0].addEventListener("click", function(){
   		timerObj.changeTime("work", -60000);
  	});
  	adjusterUp[1].addEventListener("click", function(){
    	timerObj.changeTime("break", 60000);
  	});
  	adjusterDown[1].addEventListener("click", function(){
    	timerObj.changeTime("break", -60000);
  	});
  	document.getElementsByClassName("volume")[0].addEventListener("click", volume);
  	document.getElementsByClassName("info")[0].addEventListener("click", info);
  	document.getElementsByClassName("close")[0].addEventListener("click", info);
});

timerObj.changeTime = function(durationType, durationChange) {
  if (0 >= timerObj[durationType + "Duration"] + durationChange || timerObj[durationType + "Duration"] + durationChange >= 600000){
    console.log(timerObj.workDuration, timerObj.breakDuration);
    return;
  }
  timerObj[durationType + "Duration"] += durationChange;
  document.getElementsByClassName(durationType + "-time-span")[0].innerHTML = numberDecorator(timerObj[durationType + "Duration"] / 60000) 
  + " : 00";
};

timerObj.play = function() {
  	if (timerObj.running){
    	return;
  	}
  	if (!timerObj.started){
    	workPhaseCSSChanges();
    	chimes[0].play();
    	playAnimationWork();
  	}
  	timerObj.running = true;
  	timerObj.started = true;
    timerObj.startTime = new Date().getTime();
    if (timerObj.timeLeftOnPause === undefined){
      	timerObj.timeLeftOnPause = timerObj[timerObj.currentPhase + "Duration"];
    }
    timerObj.timerInterval = setInterval(timerObj.interval, 100);
    resumeAnimation();
};

timerObj.interval = function() {
  	var currentTime, minutesLeft, secondsLeft, displayTime;
    currentTime = new Date().getTime() - timerObj.startTime;
    timerObj.timeLeft = timerObj.timeLeftOnPause - currentTime;
    minutesLeft = numberDecorator(Math.floor(Math.ceil(timerObj.timeLeft / 100) / 600));
    secondsLeft = numberDecorator(Math.floor((Math.ceil(timerObj.timeLeft / 100) / 10) % 60));
    displayTime = minutesLeft + " : " + secondsLeft;
    document.getElementsByClassName(timerObj.currentPhase + "-time-span")[0].innerHTML = displayTime;
    if (currentTime >= timerObj.timeLeftOnPause) {
      	timerObj.stop();
      	timerObj.currentPhase === "work" ? timerObj.currentPhase = "break" : timerObj.currentPhase = "work"; 
      	if (timerObj.currentPhase === "break"){
        	timerObj.play();
        	allBreakChanges();
      	}
    return timerObj.timeLeft;
  	}
};

timerObj.pause = function(){
  	if (!timerObj.started || !timerObj.running){
    	return;
  	}
  	pauseAnimation();
  	timerObj.running = false;
 	timerObj.timeLeftOnPause = timerObj.timeLeft;
  	clearInterval(timerObj.timerInterval);
}

timerObj.stop = function() {
    clearInterval(timerObj.timerInterval);
    document.getElementsByClassName(timerObj.currentPhase + "-time-span")[0].innerHTML = numberDecorator(timerObj[timerObj.currentPhase +
     "Duration"] / 60000) + " : 00";
    resetAnimation();
    undoCSSChanges();
    chimes[0].play();
    timerObj.currentPhase === "work";
    timerObj.timeLeftOnPause = timerObj[timerObj.currentPhase + "Duration"];
    timerObj.running = false;
    timerObj.started = false;
};

function numberDecorator(number) {
  if (isNaN(number)) {
    console.log(
      "number wasn't a number in numberDecorator",
      "number is : " + number
    );
  } else {
    if (number < 10) {
      number = "0" + number;
    }
  }
  return number;
}

function playAnimationWork(){
  	box[0].classList.add("deg90-green-to-red");
  	box[1].classList.add("deg180-green-to-red");
  	box[2].classList.add("deg270-green-to-red");
  	box[3].classList.add("deg360-green-to-red");
  	for (var i = 0; i < box.length; i++){
    	box[i].classList.remove("paused");
    	box[i].style.animationDuration = timerObj.workDuration + "ms";
  	}
  	toBeCovered[0].classList.remove("paused");
  	toBeCovered[0].classList.add("green-to-red-end");
  	toBeCovered[0].style.animationDuration = timerObj.workDuration + "ms";
  	coverBox[0].classList.remove("paused");
  	coverBox[0].classList.add("green-to-red-end");
  	coverBox[0].style.animationDuration = timerObj.workDuration + "ms";
}

function playAnimationBreak() {
  	setTimeout(function(){
    	box[0].classList.add("deg90-red-to-blue");
    	box[1].classList.add("deg180-red-to-blue");
    	box[2].classList.add("deg270-red-to-blue");
    	box[3].classList.add("deg360-red-to-blue");
  	}, 100);
  	for (var i = 0; i < box.length; i++){
    	box[i].classList.remove("paused");
    	box[i].style.animationDuration = timerObj.breakDuration + "ms";
  	}
  	toBeCovered[0].classList.remove("paused");
  	toBeCovered[0].classList.add("red-to-blue-end");
  	toBeCovered[0].style.animationDuration = timerObj.breakDuration + "ms";
  	coverBox[0].classList.remove("paused");
  	coverBox[0].classList.add("red-to-blue-end");
  	coverBox[0].style.animationDuration = timerObj.breakDuration + "ms";
}

function pauseAnimation(){
  	for (var i = 0; i < box.length; i++){
    	box[i].classList.add("paused");
  	}
  	toBeCovered[0].classList.add("paused");
  	coverBox[0].classList.add("paused");
}

function resumeAnimation(){
  	for (var i = 0; i < box.length; i++){
    	box[i].classList.remove("paused");
  	}
  	toBeCovered[0].classList.remove("paused");
 	coverBox[0].classList.remove("paused");  
}

function resetAnimation() {
    box[0].classList.remove("deg90-green-to-red");
    box[1].classList.remove("deg180-green-to-red");
    box[2].classList.remove("deg270-green-to-red");
    box[3].classList.remove("deg360-green-to-red");
    box[0].classList.remove("deg90-red-to-blue");
    box[1].classList.remove("deg180-red-to-blue");
    box[2].classList.remove("deg270-red-to-blue");
    box[3].classList.remove("deg360-red-to-blue");
    toBeCovered[0].classList.remove("green-to-red-end");
    toBeCovered[0].classList.remove("red-to-blue-end");
    coverBox[0].classList.remove("green-to-red-end");
    coverBox[0].classList.remove("red-to-blue-end");
    for (var i = 0; i < box.length; i++){
      	box[i].classList.add("paused");
    }
}

function workPhaseCSSChanges() {
  	breakText[0].classList.add("hide");
  	breakTime[0].classList.add("hide");
  	adjusterDown[0].classList.add("hide");
  	adjusterUp[0].classList.add("hide");
  	workText[0].classList.add("text-timer-phase");
  	workTime[0].classList.add("time-timer-phase");
  	volumeIcon[0].classList.add("fa-timer-phase");
  	questionCircleO[0].classList.add("fa-timer-phase");
}

function breakPhaseCSSChanges() {
  	breakText[0].classList.remove("hide");
  	breakText[0].classList.add("text-timer-phase");
  	breakTime[0].classList.remove("hide");
  	breakTime[0].classList.add("time-timer-phase");
  	adjusterDown[1].classList.add("hide");
  	adjusterUp[1].classList.add("hide");
  	workText[0].classList.remove("text-timer-phase");
  	workText[0].classList.add("hide");
  	workTime[0].classList.remove("time-timer-phase");
  	workTime[0].classList.add("hide");
}

function undoCSSChanges() {
  	workText[0].classList.remove("hide");
  	workText[0].classList.remove("text-timer-phase");
  	workTime[0].classList.remove("hide");
  	workTime[0].classList.remove("time-timer-phase");
  	adjusterDown[0].classList.remove("hide");
  	adjusterUp[0].classList.remove("hide");
  	adjusterDown[1].classList.remove("hide");
  	adjusterUp[1].classList.remove("hide");
  	breakText[0].classList.remove("text-timer-phase");
  	breakText[0].classList.remove("hide");
  	breakTime[0].classList.remove("time-timer-phase");
  	breakTime[0].classList.remove("hide");
  	volumeIcon[0].classList.remove("fa-timer-phase");
  	questionCircleO[0].classList.remove("fa-timer-phase");
}

function allBreakChanges(){
    breakPhaseCSSChanges();
    resetAnimation();
    playAnimationBreak();
}

function resetAllCSS() {
  	undoCSSChanges();
  	resetAnimation();
}

function volume(event) {
  	var eventTargetClassList = event.target.classList;
  	if (eventTargetClassList.contains("center-btn")){
    	eventTargetClassList = event.target.children[0].classList;
  	}
  	if (eventTargetClassList.contains("fa-volume-up")){
    	chimes[0].volume = 0.5;
    	eventTargetClassList.remove("fa-volume-up");
    	eventTargetClassList.add("fa-volume-down");
  	} else if (eventTargetClassList.contains("fa-volume-down")){
    	chimes[0].volume = 0;
    	eventTargetClassList.remove("fa-volume-down");
    	eventTargetClassList.add("fa-volume-off");
  	} else if (eventTargetClassList.contains("fa-volume-off")){
    	chimes[0].volume = 1;
    	eventTargetClassList.remove("fa-volume-off");
    	eventTargetClassList.add("fa-volume-up");
  	}
  	chimes[0].play();
}

function info(event){
  	var circleWrapper = document.getElementsByClassName("circle-wrapper")[0],
  	infoDiv = document.getElementsByClassName("info-div");
  	if (event.target.classList.contains("center-btn") || event.target.classList.contains("fa-question-circle-o")){
    	var height = window.getComputedStyle(circleWrapper, null).getPropertyValue("height");
    	var width = window.getComputedStyle(circleWrapper, null).getPropertyValue("width");
    	infoDiv[0].style.height = height;
    	infoDiv[0].style.width = width;
    	infoDiv[0].classList.add("show-info");
    	circleWrapper.classList.add("hide");
  	} else if (event.target.classList.contains("close")) {
    	infoDiv[0].classList.remove("show-info");
    	circleWrapper.classList.remove("hide");
  	}
}