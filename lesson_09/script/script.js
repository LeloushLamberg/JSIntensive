document.addEventListener('DOMContentLoaded', function(){
  'use strict';
  let start = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),

    incomeBtnPlus = document.querySelector('.income >.btn_plus'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    
    expensesBtnPlus = document.querySelector('.expenses >.btn_plus'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    
    targetMonthValue = document.querySelector('.target_month-value'),
    targetAmount = document.querySelector('.target-amount'),
    
    salaryAmount = document.querySelector('.salary-amount'),
    
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositCheck = document.querySelector('#deposit-check'),
    
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    
    inputText = document.querySelectorAll('input[type=text]'),
  
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
       
        for (let i = 0; i < cloneIncomeItem.children.length; i++){
          cloneIncomeItem.children[i].value = '';
          cloneIncomeItem.children[i].setAttribute('autofocus', 'true');
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
        cloneExpensesItem.children[0].setAttribute('autofocus', 'true');
  
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
        depositCheck.setAttribute('disabled', 'disabled');
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
        console.log('депозит чек расчитать ', depositCheck)
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
      depositCheck.removeAttribute('disabled');
      depositCheck.checked = false;
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
      appData.addIncome = [];
      appData.addExpenses = [];
      incomeItems = document.querySelectorAll('.income-items');
        for(let i = 0; i < incomeItems.length; i++){
          if (i !== 0){
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
          };
        };
      incomeBtnPlus.style.display = 'block';
      expensesItems = document.querySelectorAll('.expenses-items');
      for(let i = 0; i < expensesItems.length; i++){
        if (i !== 0){
          expensesItems[i].parentNode.removeChild(expensesItems[i]);
        };
      };
      expensesBtnPlus.style.display = 'block';
    };
    
    appData.changeRange();
    salaryAmount.addEventListener('input', appData.validationSalaryAmount);
    start.addEventListener('click', bindStart);
    incomeBtnPlus.addEventListener('click', appData.addIncomeBlock);
    expensesBtnPlus.addEventListener('click', appData.addExpensesBlock);
    cancel.addEventListener('click', reset);
    
});



