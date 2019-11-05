document.addEventListener('DOMContentLoaded', function(){
'use strict';
let start = document.querySelector('#start'),
  incomeBtnPlus = document.querySelector('.income >.btn_plus'),
  expensesBtnPlus = document.querySelector('.expenses >.btn_plus'),
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonth = document.querySelector('.budget_month-value'),
  budgetDay = document.querySelector('.budget_day-value'),
  expensesMonth = document.querySelector('.expenses_month-value'),
  additionalIncome = document.querySelector('.additional_income-value'),
  additionalExpenses = document.querySelector('.additional_expenses-value'),
  incomePeriod = document.querySelector('.income_period-value'),
  targetMonth = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeItems = document.querySelectorAll('.income-items'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPersent = document.querySelector('.deposit-persent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  
  appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 320000,
    period: 6,
    // expensesMonth: 0,
    start: function () {
      if (salaryAmount.value === '' || isNaN(salaryAmount.value)){
        alert('Не корректное значеие поля \"месячный доход\"');
        return;
      }
      appData.budget = salaryAmount.value;
      appData.getExpenses();
      // appData.asking();
      // appData.getExpensesMonth();
      // appData.getBudget();
    },
    addIncomeBlock: function(){
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeBtnPlus);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3){
        incomeBtnPlus.style.display = 'none';
      };
        
      },

    addExpensesBlock: function(){
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtnPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3){
        expensesBtnPlus.style.display = 'none';
      };    
      },
    
    getExpenses: function(){
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '' ){
          appData.expenses[itemExpenses] = cashExpenses;
        };

        
      });
    }, 
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
  },

  getBigLetterArr = function(arr){
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
    };

  };

  start.addEventListener('click', appData.start);
  incomeBtnPlus.addEventListener('click', appData.addIncomeBlock);
  expensesBtnPlus.addEventListener('click', appData.addExpensesBlock);
 
  // appData.getStatusIncome();
  // appData.calcSaveMoney();
  // appData.period = Math.ceil(appData.mission / appData.budgetMonth);
  // if (appData.period <= 0){
  //   appData.period = 'никогда (то есть вечность)'
  //&& isNaN(itemExpenses) && !isNaN(cashExpenses) };
});