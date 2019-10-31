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
  mission: 320000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую.', 'аренда, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('У вас есть депозит в банке?');
    let howMuch;
    let swap;
    for (let i = 0; i < 2; i++) {

      if (i === 0) {
        swap = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'аренда');
      };
      if (i === 1) {
        swap = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'кредит');
      };
      do {
        howMuch = +prompt('Во сколько это обойдётся?', 15000);
      }
      while (isNaN(howMuch) || howMuch == '' || howMuch === null);
      
      this.expenses[swap] = howMuch;
    };

  },
  getExpensesMonth: function () {
    let swap = 0;
    for (let key in this.expenses) {
      swap = appData.expenses[key]
      this.expensesMonth = this.expensesMonth + swap;
    };
  },
  getBudget: function () {
    this.budgetMonth = money - appData.getExpensesMonth();
    this.budgetDay = this.budgetMonth / 30
  },
  getTargetMonth: function () {

    let freeMoney = this.mission / this.getBudget;
    return freeMoney
  },

  getStatusIncome: function () {
    if (this.budgetDay >= 800) {
      return ('Высокий уровень дохода');
    } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
      return ('Средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
      return ('Низкий уровень дохода');
    } else if (this.budgetDay < 0) {
      return ('Дохода нет')
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();

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







/*
let expensesAmount = appData.getExpensesMonth();

appData.period = Math.ceil(appData.mission / appData.budgetMonth);
if (appData.period <= 0){
  appData.period = 'никогда (то есть вечность)'
}

let freeMoney;
freeMoney = appData.getTargetMonth();
if (freeMoney < 0){
  freeMoney = 'Ваши финансы поют романсы.'
} ;



alert('getStatusIncome = ' + appData.getStatusIncome());
alert('С таким уровнем дохода Вы сможете достигнуть цели ' + appData.mission + ' за ' + appData.period + ' месяца.');

for (let key in appData){
  console.log('наша программа включает в себя данные: ' + key + ' : ' + appData[key])
};
console.log(appData.expenses);
console.log(appData.getExpensesMonth());
console.log('Расходы за месяц: ' + expensesAmount);
console.log(appData.budgetMonth);
console.log('Период ', appData.period, ' месяцев');
console.log('Цель - заработать ', appData.mission ,' рублей');
console.log('Цель будет достигнута за '+ appData.period + ' месяца.');*/