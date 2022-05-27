var showCurrentTime = function () {
  var clock = document.getElementById("clock");
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var clockTime = hours + ":" + minutes + ":" + seconds;
  clock.innerText = clockTime;
};
var updateClock = function () {
  var time = new Date().getHours();
  var messageText;
  showCurrentTime();
};
updateClock();
var oneSecond = 1000;
setInterval(updateClock, oneSecond);