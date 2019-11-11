document.addEventListener('DOMContentLoaded', function(){
'use strict';
let start = document.querySelector('#start'),
  cancel = document.querySelector('#cancel'),
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
  inputText = document.querySelectorAll('input[type=text]'),
  periodAmount = document.querySelector('.period-amount'),
  
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
    begin: function () {
      
      appData.budget = salaryAmount.value;
      appData.getExpenses();
      appData.getExpensesMonth();
      appData.getIncome();
      appData.getBudget();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.disableInput();
      appData.showResult();
    },

    addIncomeBlock: function(){
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
     
        for (let i = 0; i < cloneIncomeItem.children.length; i++){
          cloneIncomeItem.children[i].value = '';
        };

      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeBtnPlus);
      incomeItems = document.querySelectorAll('.income-items');
      
      if (start.style.display === 'none'){
        disableInput();
      };
      if (incomeItems.length === 3){
        incomeBtnPlus.style.display = 'none';
      };
    },

    addExpensesBlock: function(){
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      
      for (let i = 0; i < cloneExpensesItem.children.length; i++){
        cloneExpensesItem.children[i].value = '';
      };

      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtnPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      
      if (start.style.display === 'none'){
        disableInput();
      };
      if (expensesItems.length === 3){
        expensesBtnPlus.style.display = 'none';
      };    
    },
    
    getIncome: function(){
      incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = +item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '' && !isNaN(cashIncome)){
          appData.income[itemIncome] = cashIncome;
        };
      });
      for (let key in appData.income){
        appData.incomeMonth += +appData.income[key];
      };
    },
    
    getExpenses: function(){
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '' && !isNaN(cashExpenses)){
          appData.expenses[itemExpenses] = cashExpenses;
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
    },
    
    getTargetMonth: function () {
      return targetAmount.value / appData.budgetMonth;
    },
  
    calcPeriod: function (){
      return appData.budgetMonth * periodSelect.value ;
    },

    disableInput: function(){
      start.style.display = 'none';
      cancel.style.display = 'inline-block';
      inputText = document.querySelectorAll('input[type=text]');
      inputText.forEach(function(item){
      item.setAttribute('disabled', 'disabled');
      });
    },  

    changeRange: function(){
    
      let eventRange = function(event){
        periodAmount.textContent = event.target.value;
        incomePeriodValue.value = appData.budgetMonth * event.target.value;
      };
      periodSelect.addEventListener('change', eventRange);
    },
    
    validationSalaryAmount: function(){
          if (salaryAmount.value === '' || isNaN(salaryAmount.value)){
            start.setAttribute('disabled', 'disabled')}         
            else {
              start.removeAttribute('disabled', 'disabled');
            };
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
  
  appData.changeRange();
  appData.validationSalaryAmount();
  salaryAmount.addEventListener('input', appData.validationSalaryAmount);
  start.addEventListener('click', appData.begin);
  incomeBtnPlus.addEventListener('click', appData.addIncomeBlock);
  expensesBtnPlus.addEventListener('click', appData.addExpensesBlock);

});

