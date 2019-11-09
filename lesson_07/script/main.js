'use strict';

let money,
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?', 45000);
    }
    while (isNaN(money) || money <= 0 || money === null);
  };

start();
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  moneyDeposit: 0,
  percentDeposit: 0,
  mission: 320000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let swap;
    let howMuch;
    
    let addExpenses;
    let itemIncome;
    if (confirm('У Вас есть дополнительный доход?')) {      
      do{
        itemIncome = prompt('Какие дополнительные доходы у вас есть?', 'калым');
      }
      while (!isNaN(itemIncome) || itemIncome === null || itemIncome === '');      
      do {
        howMuch = +prompt('Как много?', 10000);
      }
      while (isNaN(howMuch) || howMuch === '' || howMuch === null);
      appData.income[itemIncome] = howMuch;
    };

    do{
      addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую.', 'жильё, кредит');
    }
      while (!isNaN(addExpenses) || addExpenses === null || addExpenses === '');  
    
    addExpenses = addExpenses.toLowerCase().split(',');
    getBigLetterArr(addExpenses);
    appData.addExpenses = addExpenses;
    addExpenses = addExpenses.join(', ')
    console.log('addExpenses ' + addExpenses);
    
    let addIncome;
    do{
      addIncome = prompt('Перечислите возможные доходы за расчитываемый период через запятую.', 'аренда, такси'); 
    } while (addIncome === null || !isNaN(addIncome) || addIncome === '');

    appData.addIncome = addIncome.toLowerCase().split(', ');
    
    let deposit 
    if (confirm('У вас есть депозит в банке?')) {
      do {
          appData.moneyDeposit = +prompt('какая сумма депозита?', 50000);
        }
        while (isNaN(appData.moneyDeposit) ||  appData.moneyDeposit === '' ||   appData.moneyDeposit === null);
        do {
          appData.percentDeposit = +prompt('какой процент?', 5);
        }
        while (isNaN(appData.percentDeposit) || appData.percentDeposit === null ||  appData.percentDeposit === '');
    };
    
    for (let i = 0; i < 2; i++) {
      do{
        swap = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'долги');
      }
      while (swap === null);      
      do {
        howMuch = +prompt('Сколько платите?', 10000);
      }
      while (isNaN(howMuch) || howMuch <=0 || howMuch === null);
      appData.expenses[swap] = howMuch;      
      }      
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
  calcSaveMoney: function (){
    return appData.budgetMonth * appData.period ;
  },
};

let getBigLetterArr = function(arr){
  let swap;
  let upperCase;
  let resultWord;
  for (let j=0; j < arr.length; j++){
      swap = arr[j];
      let i = 0;
      if (swap[0] === ' '){
        let noSpace = '';
        
        for (i=i+1; i < swap.length; i++ ){
          noSpace = noSpace + swap[i];
        }
        swap = noSpace;
      };
      i = 0;
      upperCase = swap[i].toUpperCase();
      let newSwap = '';
      for (i=i+1; i < swap.length; i++ ){
        newSwap = newSwap + swap[i];
      };
     
      resultWord = upperCase + newSwap;
      arr[j] = resultWord;
      
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.calcSaveMoney();
appData.period = Math.ceil(appData.mission / appData.budgetMonth);
if (appData.period <= 0){
  appData.period = 'никогда (то есть вечность)'
};
