// document.addEventListener('DOMContentLoaded', function () {
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

  inputText = document.querySelectorAll('input[type=text]');

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.expensesMonth = 0;
};

AppData.prototype.start = function () {
  
console.log(this);
  this.budget = salaryAmount.value;
  this.validationSalaryAmount();
  this.getIncome();
  this.getAddIncome();
  this.getExpenses();
  this.getAddExpenses();
  this.getExpensesMonth();
  this.getBudget();
  this.disableInput();
  this.showResult();


};

AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);

  for (let i = 0; i < cloneIncomeItem.children.length; i++) {
    cloneIncomeItem.children[i].value = '';
    cloneIncomeItem.children[i].setAttribute('autofocus', 'true');
  };

  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeBtnPlus);
  incomeItems = document.querySelectorAll('.income-items');

  if (start.style.display === 'none') {
    console.log(this);
    this.disableInput();
  };
  if (incomeItems.length === 3) {
    incomeBtnPlus.style.display = 'none';
  };
};

AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);

  for (let i = 0; i < cloneExpensesItem.children.length; i++) {
    cloneExpensesItem.children[i].value = '';
    cloneExpensesItem.children[0].setAttribute('autofocus', 'true');
  };
 

  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtnPlus);
  expensesItems = document.querySelectorAll('.expenses-items');

  if (start.style.display === 'none') {
    this.disableInput();
  };
  if (expensesItems.length === 3) {
    expensesBtnPlus.style.display = 'none';
  };
};

AppData.prototype.getIncome = function () {
  let _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = +item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '' && !isNaN(cashIncome)) {
      _this.income[itemIncome] = cashIncome;
    };
  });
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  };
};

AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '' && !isNaN(cashExpenses)) {
      _this.expenses[itemExpenses] = cashExpenses;
    };
  });
};

AppData.prototype.getAddExpenses = function () {
  let _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    };
  });
};

AppData.prototype.getAddIncome = function () {
  let _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    };
  });
};

AppData.prototype.getExpensesMonth = function () {
  let swap = 0;
  console.log(this);
  for (let key in this.expenses) {
    swap = this.expenses[key];
    this.expensesMonth = this.expensesMonth + Number(swap);
  };

};

AppData.prototype.getBudget = function () {
  this.budgetMonth = +this.budget + +this.incomeMonth - +this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;

};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;

};

AppData.prototype.disableInput = function () {
  start.style.display = 'none';
  cancel.style.display = 'inline-block';
  depositCheck.setAttribute('disabled', 'disabled');
  inputText = document.querySelectorAll('input[type=text]'),
    inputText.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
};

AppData.prototype.eventRange = function (elem) {
  periodAmount.textContent = elem.target.value;
  incomePeriodValue.value = this.budgetMonth * elem.target.value;
};
 

AppData.prototype.validationSalaryAmount = function () {
  if (salaryAmount.value === '' || isNaN(salaryAmount.value)) {
    start.setAttribute('disabled', 'disabled')
  } else {
    start.removeAttribute('disabled', 'disabled');
  };
};

AppData.prototype.showResult = function () {

  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
  
};

AppData.prototype.reset = function () {
  const _this = this;
  start.style.display = 'inline-block';
  cancel.style.display = 'none';
  inputText = document.querySelectorAll('input[type=text]');
  inputText.forEach(function (item) {
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
  this.budgetMonth = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.incomeMonth = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.expensesMonth = 0;
  this.income = {};
  this.expenses = {};
  this.addIncome = [];
  this.addExpenses = [];
  incomeItems = document.querySelectorAll('.income-items');
  for (let i = 0; i < incomeItems.length; i++) {
    if (i !== 0) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
    };
  };
  incomeBtnPlus.style.display = 'block';
  expensesItems = document.querySelectorAll('.expenses-items');
  for (let i = 0; i < expensesItems.length; i++) {
    if (i !== 0) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
    };
  };
  expensesBtnPlus.style.display = 'block';
};

AppData.prototype.eventsListeners = function(){
  console.log( 'event ', this);
  salaryAmount.addEventListener('input', this.validationSalaryAmount);
  periodSelect.addEventListener('change', this.eventRange);
  incomeBtnPlus.addEventListener('click', this.addIncomeBlock);
  expensesBtnPlus.addEventListener('click', this.addExpensesBlock);
  appData.validationSalaryAmount.bind(AppData)
  
  start.addEventListener('click', appData.start.bind(AppData));
  cancel.addEventListener('click', appData.reset);
    
};

const appData = new AppData();

appData.prototype = Object.create(AppData.prototype);
// appData.prototype.constructor = appData;

// console.log(appData.reset instanceof AppData) ;

console.dir(appData);
appData.eventsListeners();
// cancel.addEventListener('click', appData.reset.bind(appData));
// start.addEventListener('click', appData.start.bind(appData));

// });


// 4) Проверить чтобы все работало без ошибок