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
    cost2 = +prompt('Во сколько это обойдётся?'),
    budgetMonth = money - cost1 - cost2;                               
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

