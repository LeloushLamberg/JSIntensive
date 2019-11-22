window.addEventListener(`DOMContentLoaded`, function () {
  'use strict';

  function countTimer(deadline) {
    const timerHours = document.querySelector(`#timer-hours`),
      timerMinutes = document.querySelector(`#timer-minutes`),
      timerSeconds = document.querySelector(`#timer-seconds`);

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor(((timeRemaining - seconds) / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }

    function updateClock() {

      const timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
    };
    if (timer.timeRemaining > 0) {
      setTimeout(updateClock, 1000);
    };
  };

  countTimer(`01 december 2019`);

});