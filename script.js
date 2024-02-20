'use strict'
let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 15;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num)
};

const asking = function() {
  title = prompt("Как называется ваш проект?", "Калькулятор");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые");

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?", 10000);

    if (isNumber(screenPrice)) {
      screenPrice.trim();
    }

  } while (!isNumber(screenPrice))

  screenPrice = +screenPrice;

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function() {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if(i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?", "Попап");
    }
    let newSum = 0;

    do {
      newSum = prompt("Сколько это будет стоить?", 2000);

      if (isNumber(newSum)) {
        newSum.trim();
        sum += +newSum
      }
    } while(!isNumber(newSum));
  }
  return sum
};

function getFullPrice() {
  return +screenPrice + +allServicePrices;
}

function getServicePercentPrices() {
  return Math.ceil(fullPrice - (fullPrice * (rollback / 100)))
};

const getTitle = function(str) {
  let trimStr = str.trim();
  return trimStr.slice(0, 1).toUpperCase() + trimStr.substring(1).toLowerCase()
};

const showTypeOf = function(variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function(price) {
  if (price > 30000) {
    return "Даем скидку в 10%";
  } else if (price < 30000 && price >= 15000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price > 0) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
}
asking();

title = getTitle(title);
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

console.log('allServicePrices', allServicePrices);

showTypeOf(typeof title);
showTypeOf(typeof fullPrice);
showTypeOf(typeof adaptive);


console.log(fullPrice);
console.log(screenPrice);
console.log(allServicePrices);
console.log(servicePercentPrice);


let lowerCaseScreens = screens.toLowerCase().split(', ');

console.log(lowerCaseScreens);
console.log(getRollbackMessage(fullPrice));

