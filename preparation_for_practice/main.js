'use strict';
let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', '45000');
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
  percent: 0,
  mission: 320000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую.', 'жильё, кредит');
    
    console.log(addExpenses.toUpperCase().split(', '));
    
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    let addIncome = prompt('Перечислите возможные доходы за расчитываемый период через запятую.', 'аренда, такси');
    appData.addIncome = addIncome.toLowerCase().split(', ');
    let deposit 
    do {
      deposit = confirm('У вас есть депозит в банке?');
    };
    while (isNaN(deposit) || deposit === null);)
    if (deposit){
      appData.deposit = +prompt('какая сумма депозита?', 50000);
      appData.percent = +prompt('какой процент?', 5);
    };

    let howMuch;
    let swap;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        swap = prompt('Какие дополнительные доходы у вас есть?', 'аренда');
      };
      if (i === 1) {
        swap = prompt('Какие дополнительные доходы у вас есть?', 'такси');
      };
      do {
        howMuch = +prompt('Во сколько это обойдётся?', 10000);
      }
      while (isNaN(howMuch) || howMuch == '' || howMuch === null);
      appData.income[swap] = howMuch;
    };
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        swap = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'комуналка');
      };
      if (i === 1) {
        swap = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'кредит');
      };
      do {
        howMuch = +prompt('Во сколько это обойдётся?', 15000);
      }
      while (isNaN(howMuch) || howMuch == '' || howMuch === null);
      appData.expenses[swap] = howMuch;
    };
  },
  getExpensesMonth: function () {
    let swap = 0;
    for (let key in appData.expenses) {
      swap = appData.expenses[key]
      appData.expensesMonth = appData.expensesMonth + swap;
    };
  },
  getBudget: function () {
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30
  },
  getTargetMonth: function () {

    let freeMoney = appData.mission / appData.getBudget;
    return freeMoney
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 800) {
      return ('Высокий уровень дохода');
    } else if (appData.budgetDay >= 300 && appData.budgetDay < 800) {
      return ('Средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 300) {
      return ('Низкий уровень дохода');
    } else if (appData.budgetDay < 0) {
      return ('Нет никакого дохода')
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();

appData.period = Math.ceil(appData.mission / appData.budgetMonth);
if (appData.period <= 0){
  appData.period = 'никогда (то есть вечность)'
}

console.log('appData.income');
console.log(appData.income);

console.log('appData.addIncome');
console.log(appData.addIncome);

console.log('appData.expenses');
console.log(appData.expenses);

console.log('appData.addExpenses');
console.log(appData.addExpenses);

console.log('appData.deposit');
console.log(appData.deposit);

console.log('appData.mission');
console.log(appData.mission);

console.log('appData.period');
console.log(appData.period);

console.log('appData.budget');
console.log(appData.budget);

console.log('appData.budgetDay');
console.log(appData.budgetDay);

console.log('appData.budgetMonth');
console.log(appData.budgetMonth);

console.log('appData.expensesMonth');
console.log(appData.expensesMonth);

alert('У Вас ' + appData.getStatusIncome());

alert('С таким уровнем дохода Вы сможете достигнуть цели ' + appData.mission + ' за ' + appData.period + ' месяца.');
let expensesAmount = appData.getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);
console.log('Цель - заработать ', appData.mission ,' рублей');
console.log('Цель будет достигнута за '+ appData.period + ' месяца.');
console.log('наша программа включает в себя данные:');
for (let key in appData){
  
  console.log(key + ' : ' + appData[key])
};

console.log(appData.percent);