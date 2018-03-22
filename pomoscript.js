document.addEventListener("DOMContentLoaded", function() {
  document.getElementsByClassName("play")[0].addEventListener("click", function(){
    playAnimationWork();
    if (!started && !running) {
      workPhaseCSSChanges();
      chimes[0].play();
      timerInterval = timerFunction(workDuration, "work");
    } else if (started && !running) {
      timerInterval.start();
    }
  });
  document.getElementsByClassName("pause")[0].addEventListener("click", function(){
    pauseAnimation();
    if (running && started) {
        timerInterval.pause();
      }
    });
  document.getElementsByClassName("reset")[0].addEventListener("click", function(){
    resetAnimation();
    undoCSSChanges();
    timerInterval.stop();
  });
  adjusterUp[0].addEventListener("click", function(){
    adjustersObj.up("work");
  });
  adjusterDown[0].addEventListener("click", function(){
    adjustersObj.down("work");
  });
  adjusterUp[1].addEventListener("click", function(){
    adjustersObj.up("break");
  });
  adjusterDown[1].addEventListener("click", function(){
    adjustersObj.down("break");
  });
  document.getElementsByClassName("volume")[0].addEventListener("click", volume);
  document.getElementsByClassName("info")[0].addEventListener("click", info);
  document.getElementsByClassName("close")[0].addEventListener("click", info);
});

var timerInterval,
adjustersObj = adjusters(),
workDuration = 60000,
breakDuration = 60000;
started = false,
running = false,
box = document.getElementsByClassName("box"),
chimes = document.getElementsByClassName("chimes"),
adjusterUp = document.getElementsByClassName("adjuster-up"),
adjusterDown = document.getElementsByClassName("adjuster-down"),
toBeCovered = document.getElementsByClassName("to-be-covered"),
coverBox = document.getElementsByClassName("cover-box"),
workText = document.getElementsByClassName("work-text"),
workTime = document.getElementsByClassName("work-time"),
breakText = document.getElementsByClassName("break-text"),
breakTime = document.getElementsByClassName("break-time"),
volumeUp = document.getElementsByClassName("fa-volume-up"),
questionCircleO = document.getElementsByClassName("fa-question-circle-o");


function playAnimationWork(){
  console.log("play called");
  box[0].classList.add("deg90-green-to-red");
  box[1].classList.add("deg180-green-to-red");
  box[2].classList.add("deg270-green-to-red");
  box[3].classList.add("deg360-green-to-red");
  for (var i = 0; i < box.length; i++){
    box[i].classList.remove("paused");
    box[i].style.animationDuration = workDuration + "ms";
  }
  toBeCovered[0].classList.remove("paused");
  toBeCovered[0].classList.add("green-to-red-end");
  toBeCovered[0].style.animationDuration = workDuration + "ms";
  coverBox[0].classList.remove("paused");
  coverBox[0].classList.add("green-to-red-end");
  coverBox[0].style.animationDuration = workDuration + "ms";
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
    box[i].style.animationDuration = breakDuration + "ms";
  }
  toBeCovered[0].classList.remove("paused");
  toBeCovered[0].classList.add("red-to-blue-end");
  toBeCovered[0].style.animationDuration = breakDuration + "ms";
  coverBox[0].classList.remove("paused");
  coverBox[0].classList.add("red-to-blue-end");
  coverBox[0].style.animationDuration = breakDuration + "ms";
}

function pauseAnimation(){
  for (var i = 0; i < box.length; i++){
    box[i].classList.add("paused");
  }
  toBeCovered[0].classList.add("paused");
  coverBox[0].classList.add("paused");
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
  volumeUp[0].classList.add("fa-timer-phase");
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
  volumeUp[0].classList.remove("fa-timer-phase");
  questionCircleO[0].classList.remove("fa-timer-phase");
}

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

function timerFunction(duration, whichPhase) {
  var timerObj,
    startTime,
    currentTime,
    timeLeft,
    minutesLeft,
    secondsLeft,
    timerInterval,
    timerInterval2,
    displayTime;

  timerObj = {};

  timerObj.start = function() {
    started = true;
    running = true;
    startTime = new Date().getTime();
    timerInterval = setInterval(timerObj.interval, 100);
  };

  timerObj.pause = function() {
    running = !running;
    duration = timerObj.interval();
    clearInterval(timerInterval);
    clearInterval(timerInterval2);
  };

  timerObj.interval = function() {
    currentTime = new Date().getTime() - startTime;
    timeLeft = duration - currentTime;
    minutesLeft = numberDecorator(Math.floor(Math.ceil(timeLeft / 100) / 600));
    secondsLeft = numberDecorator(
      Math.floor((Math.ceil(timeLeft / 100) / 10) % 60)
    );
    displayTime = minutesLeft + " : " + secondsLeft;
    console.log(whichPhase);
    document.getElementsByClassName(whichPhase + "-time-span")[0].innerHTML = displayTime;
    if (currentTime >= duration) {
      timerObj.stop();
      if (whichPhase === "work"){
        chimes[0].play();
        breakPhaseCSSChanges();
        resetAnimation();
        playAnimationBreak();
        duration = breakDuration;
        whichPhase = "break";
        timerObj.start();
      } else if (whichPhase === "break"){
        chimes[0].play();
        undoCSSChanges();
        resetAnimation();
      }
    }
    return timeLeft;
  };

  timerObj.stop = function() {
    console.log("stop");
    clearInterval(timerInterval);
    started = !started;
    running = false;
    timeLeft = duration;
    if (whichPhase === "work"){
      document.getElementsByClassName(whichPhase + "-time-span")[0].innerHTML = numberDecorator(workDuration / 60000) + " : 00";
    } else if (whichPhase === "break") {
      document.getElementsByClassName(whichPhase + "-time-span")[0].innerHTML = numberDecorator(breakDuration / 60000) + " : 00";
    }
  };

  timerObj.start();
  console.log(timerObj);
  return timerObj;
}

function adjusters(){
  var adjustersObj = {};

  adjustersObj.up = function(whichPhase) {
    if (whichPhase === "work"){
      workDuration += 60000;
      document.getElementsByClassName(whichPhase + "-time-span")[0].innerHTML = numberDecorator(workDuration / 60000) + " : 00";
    } else if (whichPhase === "break") {
      breakDuration += 60000;
      document.getElementsByClassName(whichPhase + "-time-span")[0].innerHTML = numberDecorator(breakDuration / 60000) + " : 00";
    } else {
      console.log("adjustersObj.up() received incorrect variable");
    }
  }

  adjustersObj.down = function(whichPhase) {
    if (whichPhase === "work" && workDuration >= 120000){
      workDuration -= 60000;
      document.getElementsByClassName(whichPhase + "-time-span")[0].innerHTML = numberDecorator(workDuration / 60000) + " : 00";
    } else if (whichPhase === "break" && breakDuration >= 120000) {
      breakDuration -= 60000;
      document.getElementsByClassName(whichPhase + "-time-span")[0].innerHTML = numberDecorator(breakDuration / 60000) + " : 00";
    }
  }

  return adjustersObj;
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