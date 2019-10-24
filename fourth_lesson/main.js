'use strict';
let money = +prompt('Ваш месячный доход?'),
    income = 'rent',
    addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запяту.'),
    deposit = confirm('У вас есть депозит в банке?'),
    mission = 320000,
    period = 6,
    optional1 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    cost1 = +prompt('Во сколько это обойдётся?'),
    optional2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    cost2 = +prompt('Во сколько это обойдётся?');                           
showTypeOf = function(data){
  console.log(data, typeof(data))
};
showTypeOf (money)
showTypeOf (income)
showTypeOf (deposit)

console.log(budgetMonth);
period = Math.ceil(mission / budgetMonth);
console.log('Период ', period, ' месяцев');
console.log('Цель - заработать ', mission ,' рублей');
console.log(addExpenses.split(', '));


let getExpensesMonth = function(){
  return cost1 + cost2;
};

console.log('Расходы за месяц: ' + getExpensesMonth());

let getAccumulatedMonth = function(){
  return money - getExpensesMonth();
};

let getTargetMonth = function(){
  return mission / getExpensesMonth()
};

let budgetDay;

budgetDay = getAccumulatedMonth() / 30;

console.log('Цель будет достигнута за '+ Math.ceil(getTargetMonth()) + ' месяца.');

let getStatusIncome = function (){
  if (budgetDay > 800) {
    return ('Высокий уровень дохода');
  } else if (budgetDay >300 && budgetDay < 800) {
    return ('Средний уровень дохода');
  } else if (budgetDay > 0 && budgetDay < 300) {
    return ('Низкий уровень дохода');
  } else if (0 > budgetDay) {
    return ('Что-то пошло не так');
  };
};

console.log(getStatusIncome());