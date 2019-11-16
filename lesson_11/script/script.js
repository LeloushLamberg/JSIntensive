// document.addEventListener(`DOMContentLoaded`, function () {
`use strict`;
const start = document.querySelector(`#start`),
  cancel = document.querySelector(`#cancel`),

  incomeBtnPlus = document.querySelector(`.income >.btn_plus`),
  incomeTitle = document.querySelector(`.income-title`),
  incomePeriodValue = document.querySelector(`.income_period-value`),
  additionalIncomeItem = document.querySelectorAll(`.additional_income-item`),
  additionalIncomeValue = document.querySelector(`.additional_income-value`),

  expensesBtnPlus = document.querySelector(`.expenses >.btn_plus`),
  expensesMonthValue = document.querySelector(`.expenses_month-value`),
  expensesTitle = document.querySelector(`.expenses-title`),
  additionalExpensesValue = document.querySelector(`.additional_expenses-value`),
  additionalExpensesItem = document.querySelector(`.additional_expenses-item`),

  budgetMonthValue = document.querySelector(`.budget_month-value`),
  budgetDayValue = document.querySelector(`.budget_day-value`),

  targetMonthValue = document.querySelector(`.target_month-value`),
  targetAmount = document.querySelector(`.target-amount`),

  salaryAmount = document.querySelector(`.salary-amount`),

  depositCheck = document.querySelector(`#deposit-check`),
  depositBank = document.querySelector(`.deposit-bank`),
  depositAmount = document.querySelector(`.deposit-amount`),
  depositPercent = document.querySelector(`.deposit-percent`),

  periodSelect = document.querySelector(`.period-select`),
  periodAmount = document.querySelector(`.period-amount`);

let inputText = document.querySelectorAll(`input[type=text]`),
  expensesItems = document.querySelectorAll(`.expenses-items`),
  incomeItems = document.querySelectorAll(`.income-items`);

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


  this.validationSalaryAmount();
  this.budget = salaryAmount.value;
  this.getDeposit();
  this.getIncome();
  this.getAddIncome();
  this.getExpenses();
  this.getAddExpenses();
  this.getExpensesMonth();
  this.getBudget();
  this.disableInput();
  this.showResult();
  console.dir(this.budgetMonth);

};

AppData.prototype.addIncomeBlock = function () {
  console.log(this);
  const _this = this;
  let cloneIncomeItem = incomeItems[0].cloneNode(true);

  for (let i = 0; i < cloneIncomeItem.children.length; i++) {
    cloneIncomeItem.children[i].value = ``;
    cloneIncomeItem.children[i].setAttribute(`autofocus`, `true`);
  };

  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeBtnPlus);
  incomeItems = document.querySelectorAll(`.income-items`);

  if (start.style.display === `none`) {

    this.disableInput();
  };
  if (incomeItems.length === 3) {
    incomeBtnPlus.style.display = `none`;
  };
};

AppData.prototype.addExpensesBlock = function () {
  console.log(this);
  const _this = this;
  let cloneExpensesItem = expensesItems[0].cloneNode(true);

  for (let i = 0; i < cloneExpensesItem.children.length; i++) {
    cloneExpensesItem.children[i].value = ``;
    cloneExpensesItem.children[0].setAttribute(`autofocus`, `true`);
  };


  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtnPlus);
  expensesItems = document.querySelectorAll(`.expenses-items`);

  if (start.style.display === `none`) {

    _this.disableInput();
  };
  if (expensesItems.length === 3) {
    expensesBtnPlus.style.display = `none`;
  };
};

AppData.prototype.getIncome = function () {
  let _this = this;
  incomeItems.forEach((item) => {
    const itemIncome = item.querySelector(`.income-title`).value;
    const cashIncome = +item.querySelector(`.income-amount`).value;
    if (itemIncome !== `` && cashIncome !== `` && !isNaN(cashIncome)) {
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
    const itemExpenses = item.querySelector(`.expenses-title`).value;
    const cashExpenses = item.querySelector(`.expenses-amount`).value;
    if (itemExpenses !== `` && cashExpenses !== `` && !isNaN(cashExpenses)) {
      _this.expenses[itemExpenses] = cashExpenses;
    };
  });
};

AppData.prototype.getAddExpenses = function () {
  const _this = this;
  const addExpenses = additionalExpensesItem.value.split(`,`);
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== ``) {
      _this.addExpenses.push(item);
    };
  });
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    const itemValue = item.value.trim();
    if (itemValue !== ``) {
      _this.addIncome.push(itemValue);
    };
  });
};

AppData.prototype.getExpensesMonth = function () {
  let swap = 0;

  for (let key in this.expenses) {
    swap = this.expenses[key];
    this.expensesMonth = this.expensesMonth + Number(swap);
  };

};

AppData.prototype.getBudget = function () {
  console.log(this.getDeposit)
  this.budgetMonth = +this.budget + +this.incomeMonth + this.getDeposit - +this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;

};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;

};

AppData.prototype.disableInput = function () {

  start.style.display = `none`;
  cancel.style.display = `inline-block`;
  depositCheck.setAttribute(`disabled`, `disabled`);
  inputText = document.querySelectorAll(`input[type=text]`),
    inputText.forEach((item) => {
      item.setAttribute(`disabled`, `disabled`);
    });
};

AppData.prototype.eventRange = (elem) => {
  periodAmount.textContent = elem.target.value;

  incomePeriodValue.value = this.budgetMonth * elem.target.value;
};

AppData.prototype.validationSalaryAmount = function () {
  if (salaryAmount.value !== `` || !isNaN(salaryAmount.value)) {
    start.disabled = false;
  };
};

AppData.prototype.showResult = function () {

  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(`, `);
  additionalIncomeValue.value = this.addIncome.join(`, `);
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();

};

AppData.prototype.reset = function () {
  start.disabled = true;
  start.style.display = `inline-block`;
  cancel.style.display = `none`;
  inputText = document.querySelectorAll(`input[type=text]`);
  inputText.forEach((item) => {
    item.removeAttribute(`disabled`);
    item.value = ``;
  });

  depositCheck.checked = false;
  budgetMonthValue.value = ``;
  budgetDayValue.value = ``;
  expensesMonthValue.value = ``;
  additionalExpensesValue.value = ``;
  additionalIncomeValue.value = ``;
  targetMonthValue.value = ``;
  incomePeriodValue.value = ``;
  periodSelect.value = `1`;
  periodAmount.textContent = `1`
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
  incomeItems = document.querySelectorAll(`.income-items`);
  for (let i = 0; i < incomeItems.length; i++) {
    if (i !== 0) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
    };
  };
  incomeBtnPlus.style.display = `block`;
  expensesItems = document.querySelectorAll(`.expenses-items`);
  for (let i = 0; i < expensesItems.length; i++) {
    if (i !== 0) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
    };
  };
  expensesBtnPlus.style.display = `block`;
};

AppData.prototype.eventsListeners = function () {

  salaryAmount.addEventListener(`input`, this.validationSalaryAmount);
  periodSelect.addEventListener(`change`, this.eventRange.bind(appData));
  depositCheck.addEventListener(`change`, this.getDeposit.bind(appData));
  incomeBtnPlus.addEventListener(`click`, this.addIncomeBlock.bind(appData));
  expensesBtnPlus.addEventListener(`click`, this.addExpensesBlock.bind(appData));
  depositBank.addEventListener(`change`, this.choiceBank.bind(appData));
  start.addEventListener(`click`, appData.start.bind(appData));
  cancel.addEventListener(`click`, appData.reset.bind(appData));

};

AppData.prototype.getDeposit = function () {
  if (depositCheck.checked) {
    this.deposit = true;
    depositBank.style.display = `inline-block`;
    depositAmount.style.display = `inline-block`;
    depositPercent.style.display = `inline-block`;
  } else {
    this.deposit = false;
    depositBank.style.display = `none`;
    depositAmount.style.display = `none`;
    depositPercent.style.display = `none`;
    depositAmount.value = ``;
  };
};
AppData.prototype.choiceBank = function () {
  console.dir(depositBank);
  let accumulation = 0;
  if (depositBank[depositBank.options.selectedIndex].value !== `other`) {
    depositPercent.value = `${depositBank[depositBank.options.selectedIndex].value * 100}%`;
    depositPercent.disabled = true;
    accumulation = +depositAmount.value * depositBank[depositBank.options.selectedIndex].value / 12;
  } else {
    depositPercent.value = ``;
    depositPercent.disabled = false;
    accumulation = +depositAmount.value * depositPercent.value / 12;
  };
  
  console.log(accumulation);
  return accumulation;
};



const appData = new AppData();
Object.setPrototypeOf(appData, AppData.prototype)


appData.eventsListeners();
start.disabled = true;
// });


// 2) Для выполнения данного пункта необходимо посмотреть дополнительное видео!
// Мы сделали 1 универсальный метод getExpInc на основе 2 предыдущих(getExpenses/getIncome), но у нас остались еще 2 пары методов, которые дублируют один и тот же код (addExpensesBlock/addIncomeBlock и getAddIncome/getAddExpenses).
// Нужно создать 2 универсальных метода, которые будут принимать параметры, в зависимости от которых будут происходить нужные нам действия. 
// 4) Добавить папку с уроком на свой GitHub