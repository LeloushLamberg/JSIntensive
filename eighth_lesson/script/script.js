// document.addEventListener('DOMContentLoaded', function(){
'use strict';
let start = document.querySelector('#start'),
  incomeBtnPlus = document.querySelector('.income >.btn_plus'),
  expensesBtnPlus = document.querySelector('.expenses >.btn_plus'),
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeItems = document.querySelectorAll('.income-items'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  inputSectors = document.querySelectorAll('input'),
  
  appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    expensesMonth: 0,
    start: function () {
      if (salaryAmount.value === '' || isNaN(salaryAmount.value)){
        alert('Не корректное значеие поля \"месячный доход\"');
        return;
      }
      appData.budget = salaryAmount.value;
      appData.getExpenses();
      appData.getExpensesMonth();
      appData.getIncome();
      appData.getBudget();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.changeRange();
      appData.showResult();
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
        if(itemExpenses !== '' && cashExpenses !== '' && isNaN(itemExpenses) && !isNaN(cashExpenses)){
          appData.expenses[itemExpenses] = cashExpenses;
        };                
      });
    }, 
    
    getIncome: function(){
      incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '' && isNaN(itemIncome) && !isNaN(cashIncome)){
          appData.income[itemIncome] = cashIncome;
        };
        for (let key in appData.income){
          appData.incomeMonth += +appData.income[key];
        };
      });
    },

    getAddExpenses: function(){
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        item =item.trim();
        if(item !== ''){
          appData.addExpenses.push(item);
        }
      });
    },
    
    getAddIncome: function(){
      additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
          appData.addIncome.push(itemValue);
        };
      });
    },

    getExpensesMonth: function () {
      let swap = 0;
      for (let key in appData.expenses) {
        swap = appData.expenses[key];
        appData.expensesMonth = appData.expensesMonth + Number(swap);
        };
      
    },
    
    getBudget: function () {
      appData.budgetMonth = +appData.budget + +appData.incomeMonth - +appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      console.log(appData.budget, appData.budgetMonth, appData.budgetDay)
    },
    
    getTargetMonth: function () {
      return targetAmount.value / appData.budgetMonth;
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
     
    

    calcPeriod: function (){
      return appData.budgetMonth * periodSelect.value ;
    },
    
    showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcPeriod();
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
  let changeRange = function(){
    let eventRange = function(event){
      console.log(event.type);
      console.log(event.target.value);
      document.querySelector('.period-amount').textContent = event.target.value;
    };
    periodSelect.addEventListener('change', eventRange);
  };

  start.addEventListener('click', appData.start);
  incomeBtnPlus.addEventListener('click', appData.addIncomeBlock);
  expensesBtnPlus.addEventListener('click', appData.addExpensesBlock);
 
  
// 4) Число под полоской (range) должно меняться в зависимости от позиции range
// 5) Добавить обработчик события внутри метода showResult, который будет отслеживать период и сразу менять значение в поле “Накопления за период”
// 6) Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать, после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить (есть в верстке) на кнопку сбросить пока ничего не навешиваем
// 7) Вместо проверки поля Месячный доход в методе Start, запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой*/
// });