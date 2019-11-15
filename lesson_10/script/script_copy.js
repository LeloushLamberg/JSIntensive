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
   

    appData.changeRange();
    salaryAmount.addEventListener('input', appData.validationSalaryAmount);
    start.addEventListener('click', bindStart);
    incomeBtnPlus.addEventListener('click', appData.addIncomeBlock);
    expensesBtnPlus.addEventListener('click', appData.addExpensesBlock);
    cancel.addEventListener('click', reset);
    
});



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
   

// // клон obj c тем же прототипом (с поверхностным копированием свойств)

// let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

// Такой вызов создаёт точную копию объекта obj, включая все свойства: 

// перечисляемые и неперечисляемые, геттеры/сеттеры для свойств – 

// и всё это с правильным свойством [[Prototype]].