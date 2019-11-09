// document.addEventListener('DOMContentLoaded', function(){
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
        
        this.budget = salaryAmount.value;
        this.getExpenses();
        this.getExpensesMonth();
        this.getIncome();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.disableInput();
        this.validationSalaryAmount();
        this.showResult();
        
        
      },
  
      addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeBtnPlus);
        incomeItems = document.querySelectorAll('.income-items');
        // if (start.style.display === 'none'){
        //   disableInput();
        // };
        if (incomeItems.length === 3){
          incomeBtnPlus.style.display = 'none';
        };
      },
  
      addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtnPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        // if (start.style.display === 'none'){
        //   disableInput();
        // };
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
          };
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
        inputText = document.querySelectorAll('input[type=text]'),
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
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        
      },
    };
  
    
    let bindStart = appData.begin.bind(appData),
      bindAddIncomeBlock = appData.addIncomeBlock.bind(appData),
      bindAddExpensesBlock = appData.addExpensesBlock.bind(appData),
      bindGetExpenses = appData.getExpenses.bind(appData),
      bindGetAddIncome = appData.getAddIncome.bind(appData),
      bindGetAddExpenses = appData.getAddExpenses.bind(appData),
      bindGetExpensesMonth = appData.getExpensesMonth.bind(appData),
      bindGetBudget = appData.getBudget.bind(appData),
      bindGetTargetMonth = appData.getTargetMonth.bind(appData),
      bindCalcPeriod = appData.calcPeriod.bind(appData),
      bindDisableInput = appData.disableInput.bind(appData),
      bindChangeRange = appData.changeRange.bind(appData),
      bindValidationSalaryAmount = appData.validationSalaryAmount.bind(appData),
      bindShowResult = appData.showResult.bind(appData);
   
    let reset = function(){
    
      start.style.display = 'inline-block';
      cancel.style.display = 'none';
      inputText = document.querySelectorAll('input[type=text]');
      inputText.forEach(function(item){
      item.removeAttribute('disabled');
      item.value = '';
      });
      budgetMonthValue.value = '';
      budgetDayValue.value = '';
      expensesMonthValue.value = '';
      additionalExpensesValue.value = '';
      additionalIncomeValue.value = '';
      targetMonthValue.value = '';
      incomePeriodValue.value = '';
      periodSelect.value = '1';
      periodAmount.textContent = '1'
      appData.budgetMonth = 0;
      appData.budget = 0;
      appData.budgetDay = 0;
      appData.budgetMonth = 0;
      appData.incomeMonth = 0;
      appData.deposit = false;
      appData.percentDeposit = 0;
      appData.moneyDeposit = 0;
      appData.expensesMonth = 0;
      appData.income = {};
      appData.expenses = {};
    };
    
    appData.changeRange();
    salaryAmount.addEventListener('input', appData.validationSalaryAmount);
    start.addEventListener('click', bindStart);
    incomeBtnPlus.addEventListener('click', appData.addIncomeBlock);
    expensesBtnPlus.addEventListener('click', appData.addExpensesBlock);
    cancel.addEventListener('click', reset);
// });

// 4) кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
// Метод reset должен всю программу возвращать в исходное состояние



