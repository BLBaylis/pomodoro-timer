document.addEventListener("DOMContentLoaded", function() {
  document.getElementsByClassName("play")[0].addEventListener("click", play);
  document.getElementsByClassName("pause")[0].addEventListener("click", pause);
  document.getElementsByClassName("reset")[0].addEventListener("click", reset);
  document.addEventListener("click", function(event) {
    console.log(event);
  });
});

var box = document.getElementsByClassName("box");

function play(){
  console.log("play called");
  box[0].classList.add("deg90");
  box[1].classList.add("deg180");
  box[2].classList.add("deg270");
  box[3].classList.add("deg360");
  for (var i = 0; i < box.length; i++){
    box[i].classList.remove("paused");
  }
  document.getElementsByClassName("to-be-covered")[0].classList.add("colour-change");
  document.getElementsByClassName("cover-box")[0].classList.add("colour-change");
}

function pause(){
  for (var i = 0; i < box.length; i++){
    box[i].classList.add("paused");
  }
}

function reset() {
    document.getElementsByClassName("deg90")[0].classList.remove("deg90");
    document.getElementsByClassName("deg180")[0].classList.remove("deg180");
    document.getElementsByClassName("deg270")[0].classList.remove("deg270");
    document.getElementsByClassName("deg360")[0].classList.remove("deg360");
    document.getElementsByClassName("to-be-covered")[0].classList.remove("colour-change");
    document.getElementsByClassName("cover-box")[0].classList.remove("colour-change");
    for (var i = 0; i < box.length; i++){
      box[i].classList.add("paused");
  }
}