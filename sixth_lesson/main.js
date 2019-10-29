'use strict';
let money,
    start = function(){
      do{ 
        money = prompt('Ваш месячный доход?','45000');
      }
      while (isNaN(money) || money == '' || money === null);
    };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission:320000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  ExpensesMonth: 0,
  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую.','аренда, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(',');  
    appData.deposit = confirm('У вас есть депозит в банке?');
  },
  getExpensesMonth: function(){
    let sum = 0;
    for (let i = 0; i < 2; i++){
      if (i === 0){
        optional1 = prompt('Какие обязательные ежемесячные расходы у вас есть?','аренда')
      };
      if (i === 1){
        optional2 = prompt('Какие обязательные ежемесячные расходы у вас есть?','кредит')
      };
  
      do{ 
        howMuch = +prompt('Во сколько это обойдётся?', 15000);
      }
      while (isNaN(howMuch) || howMuch == '' || howMuch === null);
      sum += howMuch;
    };
    return sum;
  },
  getAccumulatedMonth: function(){
    return money - expensesAmount;
  },
  getTargetMonth: function(){
    let freeMoney;
    freeMoney = appData.mission / getAccumulatedMonth();
    if (freeMoney <= 0){
      return alert ('Цель не будет достигнута.')
    };
    return freeMoney
  },
  getStatusIncome: function (){
    if (budgetDay >= 800) {
      return ('Высокий уровень дохода');
    } else if (budgetDay >= 300 && budgetDay < 800) {
      return ('Средний уровень дохода');
    } else if (budgetDay >= 0 && budgetDay < 300) {
      return ('Низкий уровень дохода');
    };
  },
};

let howMuch;
  
let optional1,
    optional2;

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

console.log(getAccumulatedMonth());
console.log('посмотри что получилось')
appData.period = Math.ceil(appData.mission / getAccumulatedMonth());
console.log('Период ', appData.period, ' месяцев');
console.log('Цель - заработать ', appData.mission ,' рублей');

let budgetDay;

budgetDay = getAccumulatedMonth() / 30;

console.log('Цель будет достигнута за '+ appData.period + ' месяца.');

alert(getStatusIncome());
alert('С таким уровнем дохода Вы сможете достигнуть цели ' + appData.mission + 'за ' + Math.ceil(getTargetMonth()) + ' месяца.')