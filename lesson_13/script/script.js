window.addEventListener(`DOMContentLoaded`, function () {
  'use strict';
  // Меню
const toggleMenu = () => {
  const btnMenu = document.querySelector(`.menu`);
  const menu = document.querySelector(`menu`);
  const menuItems = menu.querySelectorAll(`ul > li`);
  const closeBtn = menu.querySelector(`.close-btn`);
  
  
  const actionMenu = () => {
    if (menu.style.transform !== `translate(100%)`){
      menu.style.transform = `translate(100%)`
    }else{
      menu.style.transform = `translate(-100%)`
    };
  };

  btnMenu.addEventListener(`click`, actionMenu);
  closeBtn.addEventListener(`click`, actionMenu);
  for (let i = 0; i < menuItems.length; i++){
    menuItems[i].addEventListener(`click`, actionMenu);
  }
};
toggleMenu();


  // Таймер
  function countTimer(deadline) {
    const timerHours = document.querySelector(`#timer-hours`),
      timerMinutes = document.querySelector(`#timer-minutes`),
      timerSeconds = document.querySelector(`#timer-seconds`);

    const getTimeRemaining = () => {
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

    const updateClock = () => {

      const timer = getTimeRemaining();
      if (timer.hours < 10) {
        timerHours.textContent = `0${timer.hours}`;
      } else {
        timerHours.textContent = timer.hours;
      } if (timer.minutes < 10) {
        timerMinutes.textContent = `0${timer.minutes}`;
      } else {
        timerMinutes.textContent = timer.minutes;
      } if (timer.seconds < 10) {
        timerSeconds.textContent = `0${timer.seconds}`;
      } else {
        timerSeconds.textContent = timer.seconds;
      };

      if (timer.timeRemaining > 0) {
        // setTimeout(updateClock, 1000);
        setInterval(updateClock, 1000);
      };
      if (timer.timeRemaining < 0) {
        timerHours.textContent = `00`;
        timerMinutes.textContent = `00`;
        timerSeconds.textContent = `00`;
      }
    };
    updateClock();
  };

  countTimer(`24 november 2019`);

});