'use strict';
let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую.','аренда, кредит'),
    deposit = confirm('У вас есть депозит в банке?'),
    mission = 320000,
    howMuch,
    period = 6;

let start = function(){
  do money = prompt('Ваш месячный доход?','45000');
  while (isNaN(money) || money == '' || money === null)
};

start();

let showTypeOf = function(data){
  console.log(data, typeof(data))
  };

  showTypeOf (money)
  showTypeOf (income)
  showTypeOf (deposit)
  
let optional1,
    optional2;

console.log(addExpenses.toLowerCase().split(','));

let getExpensesMonth = function(){
  let sum = 0;
  for (let i = 0; i < 2; i++){
    if (i === 0){
      optional1 = prompt('Какие обязательные ежемесячные расходы у вас есть?','аренда')
    };
    if (i === 1){
      optional2 = prompt('Какие обязательные ежемесячные расходы у вас есть?','кредит')
    };
    howMuch = +prompt('Во сколько это обойдётся?', 15000);
    while (isNaN(howMuch) || howMuch == '' || howMuch === null){
      howMuch = +prompt('Во сколько это обойдётся?', 15000);
    };
    sum += howMuch;
  };
  return sum;
};
 
let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function(){
  return money - expensesAmount;
};

console.log(getAccumulatedMonth());
console.log('посмотри что получилось');
period = Math.ceil(mission / getAccumulatedMonth());
if (period <= 0) { 
  period = 'бесконечность';
  console.log('Цель не будет достигнута.');
} else {
  console.log('Период ', period, ' месяцев');
};

console.log('Цель - заработать ', mission ,' рублей');
console.log(addExpenses.split(', '));
let freeMoney;
let getTargetMonth = function(){
  
  freeMoney = mission / getAccumulatedMonth();
  return freeMoney
};
freeMoney = getTargetMonth();
if (freeMoney < 0){
  freeMoney = 'вечность'
} ;
let budgetDay;
budgetDay = getAccumulatedMonth() / 30;


console.log('Цель будет достигнута за '+ period + ' месяца.');

let getStatusIncome = function (){
  if (budgetDay >= 800) {
    return ('Высокий уровень дохода');
  } else if (budgetDay >= 300 && budgetDay < 800) {
    return ('Средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 300) {
    return ('Низкий уровень дохода');
  } else if (budgetDay < 0) {
    return ('Дохода нет')
  }
};

alert(getStatusIncome());
alert('С таким уровнем дохода Вы сможете достигнуть цели ' + mission + 'за ' + freeMoney + ' месяца.');