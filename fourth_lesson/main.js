'use strict';
let money = +prompt('Ваш месячный доход?');
let income = 'rent';
let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запяту.');
let deposit = confirm('У вас есть депозит в банке?');
let mission = 320000;
let period = 6;
let optional1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let cost1 = +prompt('Во сколько это обойдётся?');
let optional2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let cost2 = +prompt('Во сколько это обойдётся?');
let budgetMonth = money - cost1 - cost2;
let showTypeOf = function(data){
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
let budgetDay;
budgetDay = Math.floor(budgetMonth / 30);
console.log(budgetDay);
let getStatusIncome = function (){
  if (budgetDay > 800) console.log('Высокий уровень дохода');
  else if (budgetDay >300 && budgetDay < 800) console.log('Средний уровень дохода');
  else if (budgetDay > 0 && budgetDay < 300) console.log('Низкий уровень дохода');
  else if (0 > budgetDay) console.log('Что-то пошло не так');
alert('Вам нужно '+ period+ ' месяцев, чтобы накопить '+ mission+ 'денег. Но если вы откажитесь от '+ optional2+ ', то можете сделать это быстрее. =)')

};