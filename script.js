'use strict'
const title = prompt("Как называется ваш проект?", "Калькулятор");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые");
let screenPrice = +prompt("Сколько будет стоить данная работа?", 10000);
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
let servicePrice1 = +prompt("Сколько это будет стоить?", 2000);
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Попап");
let servicePrice2 = +prompt("Сколько это будет стоить?", 1000);

const getAllServicePrices = function() {
  return servicePrice1 + servicePrice2;
};

let allServicePrices = getAllServicePrices()
let fullPrice = getFullPrice();
let rollback = 15;
let servicePercentPrice = getServicePercentPrices();
let adaptive = confirm("Нужен ли адаптив на сайте?");

function getFullPrice() {
  return screenPrice + allServicePrices;
}

function getServicePercentPrices(price) {
  return Math.round((price - (price * (rollback / 100))) / 100) * 100
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

console.log(getTitle(title));

showTypeOf(typeof title);
showTypeOf(typeof fullPrice);
showTypeOf(typeof adaptive);

let lowerCaseScreens = screens.toLowerCase().split(', ');

console.log(lowerCaseScreens);
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice));
