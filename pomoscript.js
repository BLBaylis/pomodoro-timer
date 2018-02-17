document.addEventListener("DOMContentLoaded", function() {
  document.getElementsByClassName("play")[0].addEventListener("click", function(){
    playAnimationWork();
    workPhaseCSSChanges();
    if (!started && !running) {
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
  document.getElementsByClassName("adjuster-up")[0].addEventListener("click", function(){
    adjustersObj.up("work");
  });
  document.getElementsByClassName("adjuster-down")[0].addEventListener("click", function(){
    adjustersObj.down("work");
  });
  document.getElementsByClassName("adjuster-up")[1].addEventListener("click", function(){
    adjustersObj.up("break");
  });
  document.getElementsByClassName("adjuster-down")[1].addEventListener("click", function(){
    adjustersObj.down("break");
  });
});

var timerInterval,
adjustersObj = adjusters(),
workDuration = 60000,
breakDuration = 60000;
started = false,
running = false,
box = document.getElementsByClassName("box");


function playAnimationWork(){
  console.log("play called");
  box[0].classList.add("deg90-green-to-red");
  box[1].classList.add("deg180-green-to-red");
  box[2].classList.add("deg270-green-to-red");
  box[3].classList.add("deg360-green-to-red");
  for (var i = 0; i < box.length; i++){
    box[i].classList.remove("paused");
    box[i].classList.add("green");
    box[i].style.animationDuration = workDuration + "ms";
  }
  document.getElementsByClassName("to-be-covered")[0].classList.remove("paused");
  document.getElementsByClassName("to-be-covered")[0].classList.add("green");
  document.getElementsByClassName("to-be-covered")[0].classList.add("green-to-red-end");
  document.getElementsByClassName("to-be-covered")[0].style.animationDuration = workDuration + "ms";
  document.getElementsByClassName("cover-box")[0].classList.remove("paused");
  document.getElementsByClassName("cover-box")[0].classList.add("green");
  document.getElementsByClassName("cover-box")[0].classList.add("green-to-red-end");
  document.getElementsByClassName("cover-box")[0].style.animationDuration = workDuration + "ms";
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
    box[i].classList.add("red");
    box[i].style.animationDuration = breakDuration + "ms";
  }
  document.getElementsByClassName("to-be-covered")[0].classList.remove("paused");
  document.getElementsByClassName("to-be-covered")[0].classList.add("red");
  document.getElementsByClassName("to-be-covered")[0].classList.add("red-to-blue-end");
  document.getElementsByClassName("to-be-covered")[0].style.animationDuration = breakDuration + "ms";
  document.getElementsByClassName("cover-box")[0].classList.remove("paused");
  document.getElementsByClassName("cover-box")[0].classList.add("red");
  document.getElementsByClassName("cover-box")[0].classList.add("red-to-blue-end");
  document.getElementsByClassName("cover-box")[0].style.animationDuration = breakDuration + "ms";
}

function pauseAnimation(){
  for (var i = 0; i < box.length; i++){
    box[i].classList.add("paused");
  }
  document.getElementsByClassName("to-be-covered")[0].classList.add("paused");
  document.getElementsByClassName("cover-box")[0].classList.add("paused");
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
    document.getElementsByClassName("to-be-covered")[0].classList.remove("green-to-red-end");
    document.getElementsByClassName("to-be-covered")[0].classList.remove("green");
    document.getElementsByClassName("to-be-covered")[0].classList.remove("red-to-blue-end");
    document.getElementsByClassName("to-be-covered")[0].classList.remove("red");
    document.getElementsByClassName("cover-box")[0].classList.remove("green-to-red-end");
    document.getElementsByClassName("cover-box")[0].classList.remove("green");
    document.getElementsByClassName("cover-box")[0].classList.remove("red-to-blue-end");
    document.getElementsByClassName("cover-box")[0].classList.remove("red");
    for (var i = 0; i < box.length; i++){
      box[i].classList.add("paused");
      box[i].classList.remove("green");
      box[i].classList.remove("red");
    }
}

function workPhaseCSSChanges() {
  document.getElementsByClassName("break-text")[0].classList.add("hide");
  document.getElementsByClassName("break-time")[0].classList.add("hide");
  document.getElementsByClassName("adjuster-down")[0].classList.add("hide");
  document.getElementsByClassName("adjuster-up")[0].classList.add("hide");
  document.getElementsByClassName("work-text")[0].classList.add("text-timer-phase");
  document.getElementsByClassName("work-time")[0].classList.add("time-timer-phase");
  document.getElementsByClassName("fa-volume-up")[0].classList.add("fa-timer-phase");
  document.getElementsByClassName("fa-question-circle-o")[0].classList.add("fa-timer-phase");
}

function breakPhaseCSSChanges() {
  document.getElementsByClassName("break-text")[0].classList.remove("hide");
  document.getElementsByClassName("break-text")[0].classList.add("text-timer-phase");
  document.getElementsByClassName("break-time")[0].classList.remove("hide");
  document.getElementsByClassName("break-time")[0].classList.add("timer-timer-phase");
  document.getElementsByClassName("adjuster-down")[1].classList.add("hide");
  document.getElementsByClassName("adjuster-up")[1].classList.add("hide");
  document.getElementsByClassName("work-text")[0].classList.remove("text-timer-phase");
  document.getElementsByClassName("work-text")[0].classList.add("hide");
  document.getElementsByClassName("work-time")[0].classList.remove("time-timer-phase");
  document.getElementsByClassName("work-time")[0].classList.add("hide");
}

function undoCSSChanges() {
  document.getElementsByClassName("work-text")[0].classList.remove("hide");
  document.getElementsByClassName("work-text")[0].classList.remove("text-timer-phase");
  document.getElementsByClassName("work-time")[0].classList.remove("hide");
  document.getElementsByClassName("work-time")[0].classList.remove("time-timer-phase");
  document.getElementsByClassName("adjuster-down")[0].classList.remove("hide");
  document.getElementsByClassName("adjuster-up")[0].classList.remove("hide");
  document.getElementsByClassName("adjuster-down")[1].classList.remove("hide");
  document.getElementsByClassName("adjuster-up")[1].classList.remove("hide");
  document.getElementsByClassName("break-text")[0].classList.remove("text-timer-phase");
  document.getElementsByClassName("break-text")[0].classList.remove("hide");
  document.getElementsByClassName("break-time")[0].classList.remove("time-timer-phase");
  document.getElementsByClassName("break-time")[0].classList.remove("hide");
  document.getElementsByClassName("fa-volume-up")[0].classList.remove("fa-timer-phase");
  document.getElementsByClassName("fa-question-circle-o")[0].classList.remove("fa-timer-phase");
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
        breakPhaseCSSChanges();
        resetAnimation();
        playAnimationBreak();
        duration = breakDuration;
        whichPhase = "break";
        timerObj.start();
      } else if (whichPhase === "break"){
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
    if (whichPhase === "work"){
      workDuration -= 60000;
      document.getElementsByClassName(whichPhase + "-time-span")[0].innerHTML = numberDecorator(workDuration / 60000) + " : 00";
    } else if (whichPhase === "break") {
      breakDuration -= 60000;
      document.getElementsByClassName(whichPhase + "-time-span")[0].innerHTML = numberDecorator(breakDuration / 60000) + " : 00";
    } else {
      console.log("adjustersObj.down() received incorrect variable");
    }
  }

  return adjustersObj;
}