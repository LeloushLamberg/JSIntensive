window.addEventListener(`DOMContentLoaded`, function () {
  'use strict';


  let dateNow = new Date()
  const timeOfDay = document.querySelector(`#time-of-day`);
  const timeHours = document.querySelector(`#time-hours`);
  const timeMinutes = document.querySelector(`#time-minutes`);
  const timeSeconds = document.querySelector(`#time-seconds`);
  const timing = document.querySelector(`#timing`);
  const countDay = document.querySelector(`#count-day`);
  // const countDay = document.querySelector(`#count-day`);

  // const hours = dateNow.getHours()
  // const hours = dateNow.getHours()
  // console.log(hours);
  // console.log(hours);
  
  
      function dayOf(newYear) {
        const dateNewYear = new Date(newYear).getTime();
        const dateNow = new Date().getTime();
        const action = Math.floor((dateNewYear - dateNow) / 1000 / 60 / 60 / 24);
        return action;
      };
      
      const count = dayOf(`01 january 2020`);
      countDay.textContent = count;
  
  const weekDay = document.querySelector(`#day-of-week`);
 const getWeekDay = dateNow.getDay();
 const weekDayArr = [`воскресенье`, `понедельник`, `вторник`, `среда`, `четверг`, `пятница`, `суббота`]
  weekDay.textContent = weekDayArr[getWeekDay]; 

  function updateClock() {
    dateNow = new Date();
    let hours = dateNow.getHours()
    const minutes = dateNow.getMinutes()
    const seconds = dateNow.getSeconds()
    // weekDay = 
    if (hours >= 18) {
      timeOfDay.textContent = `ый вечер`;
    }
    if (hours >= 12 && hours < 18) {
      timeOfDay.textContent = `ый день`;
    }
    if (hours >= 6 && hours < 12) {
      timeOfDay.textContent = `ое утро`;
    }
    if (hours >= 0 && hours < 6) {
      timeOfDay.textContent = `ой ночи`;
    };

    if (hours > 12) {
      hours = hours - 12;
      timeHours.textContent = hours;
      timing.textContent = ` PM `;
    };

    if (hours < 10) {
      timeHours.textContent = `0${hours}`;
    } else {
      timeHours.textContent = hours;
    };
    // console.log(hours, minutes, seconds);
    if (minutes < 10) {
      timeMinutes.textContent = `0${minutes}`;
    } else {
      timeMinutes.textContent = minutes;
    };
    
    if (seconds < 10) {
      timeSeconds.textContent = `0${seconds}`;
    } else {
      timeSeconds.textContent = seconds;
    };
    
    setTimeout(updateClock, 1000);
  };

  updateClock();

  //   function getClock() {
  //     const timeNow = dateNow / 1000;
  //     const seconds = Math.floor(timeNow % 60);
  //     const minutes = Math.floor(((timeNow - seconds) / 60) % 60);
  //     const hours = Math.floor((timeNow / 60 / 60) % 24);
  //     return {
  //       timeNow,
  //       hours,
  //       minutes,
  //       seconds
  //     };
  //   };

  //   getClock();
  //   function getTimeOfDay (){
  //     const clock = getClock();
  //     
  //   }
  //     if (action < 10) {
  //       countDay.textContent = `0${action}`;
  //     } else {
  //       countDay.textContent = `${action}`
  //     };


});