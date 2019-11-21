document.addEventListener(`DOMContentLoaded`, function () {
'use strict';
const start = document.getElementById(`start`);
const cancel = document.getElementById(`cancel`);

const incomeBtnPlus = document.querySelector(`.income >.btn_plus`);
const incomeTitle = document.querySelector(`.income-title`);
const incomePeriodValue = document.querySelector(`.income_period-value`);
const additionalIncomeItem = document.querySelectorAll(`.additional_income-item`);
const additionalIncomeValue = document.querySelector(`.additional_income-value`);

const expensesBtnPlus = document.querySelector(`.expenses >.btn_plus`);
const expensesMonthValue = document.querySelector(`.expenses_month-value`);
const expensesTitle = document.querySelector(`.expenses-title`);
const additionalExpensesValue = document.querySelector(`.additional_expenses-value`);
const additionalExpensesItem = document.querySelector(`.additional_expenses-item`);

const budgetMonthValue = document.querySelector(`.budget_month-value`);
const budgetDayValue = document.querySelector(`.budget_day-value`);

const targetMonthValue = document.querySelector(`.target_month-value`);
const targetAmount = document.querySelector(`.target-amount`);

const salaryAmount = document.querySelector(`.salary-amount`);

const depositCheck = document.querySelector(`#deposit-check`);
const depositBank = document.querySelector(`.deposit-bank`);
const depositAmount = document.querySelector(`.deposit-amount`);
const depositPercent = document.querySelector(`.deposit-percent`);

const periodSelect = document.querySelector(`.period-select`);
const periodAmount = document.querySelector(`.period-amount`);

let inputText = null;
let expensesItems = null;
let incomeItems = null;

class AppData {
  constructor () {
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

    incomeItems = document.querySelectorAll(`.income-items`);
    expensesItems = document.querySelectorAll(`.expenses-items`);
  }

  getDeposit () {
    let _this = this;
    depositBank.options.selectedIndex = 0;
    
    if (depositCheck.checked) {
      this.deposit = true;
      depositBank.style.display = `inline-block`;
      depositAmount.style.display = `inline-block`;

      depositBank.addEventListener(`change`, () => {
        let selectIndex = depositBank[depositBank.options.selectedIndex].value;
        if (selectIndex !== `other`) {
          depositPercent.style.display = `none`;
          depositPercent.value = selectIndex;

        } else {
          depositPercent.value = ``;
          depositPercent.disabled = false;
          depositPercent.style.display = `inline-block`;
          +depositPercent.value;
        };
        +depositAmount.value;
      });
    } else {
      this.deposit = false;
      depositBank.style.display = `none`;
      depositAmount.style.display = `none`;
      depositPercent.style.display = `none`;
      depositAmount.value = ``;
    };
  };

  getInfoDeposit () {
    if (this.percentDeposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    };

  }

  eventsListeners () {
    salaryAmount.addEventListener(`input`, this.validationSalaryAmount);
    periodSelect.addEventListener(`change`, this.eventRange.bind(this));
    depositCheck.addEventListener(`change`, this.getDeposit.bind(this));
    incomeBtnPlus.addEventListener(`click`, this.getBlockPlus.bind(this));
    expensesBtnPlus.addEventListener(`click`, this.getBlockPlus.bind(this));
    depositCheck.addEventListener(`change`, this.getDeposit.bind(this));
  }

  getExpensesMonth () {
    
    return this.expensesMonth;
  }
  
  showResult () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(`, `);
    additionalIncomeValue.value = this.addIncome.join(`, `);
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
  }
  
  validationSalaryAmount () {
    if (salaryAmount.value !== `` || !isNaN(salaryAmount.value)) {
      start.disabled = false;
    };
  }
  
  getBlockPlus (event) {
    const count = item => {
      const enteres = item.className.split('-')[0];
      let itemsList = document.querySelectorAll(`.${enteres}-items`);
      const cloneItemBlock = itemsList[0].cloneNode(true);
      
      for (let i = 0; i < cloneItemBlock.children.length; i++) {
        cloneItemBlock.children[i].value = ``;
        cloneItemBlock.children[0].setAttribute('autofocus', true);
      };
      
      
      
      const btnPlus = document.querySelector(`.${enteres} > .btn_plus`);
      
      itemsList[0].parentNode.insertBefore(cloneItemBlock, btnPlus);
      
      itemsList = document.querySelectorAll(`.${enteres}-items`);
      
      if (start.style.display === 'none') {
        this.disableInput();
      };
      if (itemsList.length === 3) {
        btnPlus.style.display = 'none';
      };
    };
    
    if (event.target === incomeBtnPlus) {
      incomeItems.forEach(count);
    } else {
      expensesItems.forEach(count);
    };
  };
  
  calcExpensesAndIncomes () {
    const count = item => {
      const enteres = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${enteres}-title`).value;
      const itemAmount = item.querySelector(`.${enteres}-amount`).value;
      
      if (itemTitle[item] !== '' && itemAmount[item] !== '' && !isNaN(itemAmount)) {
        
        this[enteres][itemTitle] = Number(itemAmount);
      };
    };
    
    incomeItems.forEach(count);
    expensesItems.forEach(count);
    
    for (const key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    };
    
    for (const key in this.income) {
      this.incomeMonth += this.income[key];
    };    
  }
  
  getAddExpenses () {
    const addExpenses = additionalExpensesItem.value.split(`,`);
    addExpenses.forEach(item => {
      const itemValue = item.trim();
      if (item !== ``) {
        this.addExpenses.push(itemValue);
      };
    });
  }
  
  getAddIncome () {
    additionalIncomeItem.forEach(item => {
      const itemValue = item.value.trim();
      if (itemValue !== ``) {
        this.addIncome.push(itemValue);
      };
    });
  }
  
  getBudget () {
    this.budgetMonth = Number(this.budget) + Number(this.incomeMonth) - Number(this.expensesMonth) + (depositAmount.value * depositPercent.value) / 12;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  
  getTargetMonth () {
    return targetAmount.value / this.budgetMonth;
  }
  
  calcPeriod () {
   
    return this.budgetMonth * Number(periodSelect.value);
  }
  
  disableInput () {
    start.style.display = `none`;
    cancel.style.display = `inline-block`;
    depositCheck.disabled = true;
    inputText = document.querySelectorAll(`input[type=text]`);
    inputText.forEach(item => item.disabled = true);
    

  }
  
  eventRange (elem) {
    periodAmount.textContent = elem.target.value;
    
    incomePeriodValue.value = this.budgetMonth * elem.target.value;
   
  };
  
  start () {
    inputText = document.querySelectorAll(`input[type=text]`);
    expensesItems = document.querySelectorAll(`.expenses-items`);
    incomeItems = document.querySelectorAll(`.income-items`);
    
    this.validationSalaryAmount();
    this.budget = Number(salaryAmount.value);
    this.calcExpensesAndIncomes()
    this.getInfoDeposit();
    this.getAddIncome();
    this.getAddExpenses();
    this.getExpensesMonth();
    this.getBudget();
    this.disableInput();
    this.showResult();
    
  }
  
  reset () {
    start.disabled = true;
    start.style.display = 'inline-block';
    cancel.style.display = 'none';
    depositCheck.disabled = false;
    depositPercent.style.display = `inline-block`;
    inputText = document.querySelectorAll('input[type=text]');
    inputText.forEach(item => {
      item.removeAttribute(`disabled`);
      item.value = ``;
    });
    depositBank.options.selectedIndex = 0;
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
    depositBank.style.display = `none`;
    depositAmount.style.display = `none`;
    depositCheck.checked = false;
    depositPercent.style.display = `none`;
    budgetMonthValue.value = ``;
    budgetDayValue.value = ``;
    expensesMonthValue.value = ``;
    additionalExpensesValue.value = ``;
    additionalIncomeValue.value = ``;
    targetMonthValue.value = ``;
    incomePeriodValue.value = ``;
    periodSelect.value = `1`;
    periodAmount.textContent = `1`
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
  }
}

let appData = new AppData();

start.addEventListener(`click`, () => appData.start());
cancel.addEventListener(`click`, () => {
  appData.reset();
  appData = null;
  appData = new AppData();
 
});

appData.eventsListeners();
start.disabled = true;
});


