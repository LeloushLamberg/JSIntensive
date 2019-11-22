window.addEventListener(`DOMContentLoaded`, function () {
  'use strict';

  
  
  const dateNow = new Date().getTime();
  
  const timeOfDay = document.querySelector(`#time-of-day`);
  const timeHours = document.querySelector(`#time-hours`);
  const timeMinutes = document.querySelector(`#time-minutes`);
  const timeSeconds = document.querySelector(`#time-seconds`);
  const timing = document.querySelector(`#timing`);
  const countDay = document.querySelector(`#count-day`);

  function getClock() {
    const timeNow = dateNow / 1000;
    const seconds = Math.floor(timeNow % 60);
    const minutes = Math.floor(((timeNow - seconds) / 60) % 60);
    const hours = Math.floor((timeNow / 60 / 60) % 24);
    return {
      timeNow,
      hours,
      minutes,
      seconds
    };
  };
 
  getClock();
  function getTimeOfDay (){
    const clock = getClock();
    if (clock.hours > 18){
      timeOfDay.textContent = `ый вечер`;
    }
    if (clock.hours > 12 && clock.hours < 18){
      timeOfDay.textContent = `ый день`;
    }
    if (clock.hours > 6 && clock.hours < 12){
      timeOfDay.textContent = `ое утро`;
    }else{
      timeOfDay.textContent = `ой ночи`;
    }
  }

  function updateClock() {
    const dateNow = new Date().getTime();
    const clock = getClock();
   

    if (clock.hours > 12) {
      clock.hours -= 12;
      // console.log(clock.hours);
      timeHours.textContent = clock.hours;
      timing.textContent = ` PM `;
    };
    
    if (clock.hours < 10) {
      timeHours.textContent = `0${clock.hours}`;
    } else {
      timeHours.textContent = clock.hours;
    };
    console.log(clock.hours, clock.minutes, clock.seconds);
    if (clock.minutes < 10) {
      timeMinutes.textContent = `0${clock.minutes}`;
    } else {
      timeMinutes.textContent = clock.minutes;
    };
    // console.log();
    if (clock.seconds < 10) {
      timeSeconds.textContent = `0${clock.seconds}`;
    } else {
      timeSeconds.textContent = clock.seconds;
    };

    setTimeout(updateClock, 10000);
  };

  function clockOf(newYear) {
    const dateNewYear = new Date(newYear).getTime();
    const action = Math.floor((dateNewYear - dateNow)/1000 / 24);
    if (action < 10) {
      countDay.textContent = `0${action}`;
    } else {
      countDay.textContent = `${action}`
    };
  };
  
  clockOf(`01 january 2020`)
updateClock();

});