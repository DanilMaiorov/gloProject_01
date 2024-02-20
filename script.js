'use strict'
const title = prompt("Как называется ваш проект?", "Калькулятор");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые");
let screenPrice = +prompt("Сколько будет стоить данная работа?", 10000);
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
let servicePrice1 = +prompt("Сколько это будет стоить?", 2000);
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Попап");
let servicePrice2 = +prompt("Сколько это будет стоить?", 1000);
let fullPrice = calcFullPrice(screenPrice, servicePrice1, servicePrice2);
let rollback = 15;
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
let adaptive = confirm("Нужен ли адаптив на сайте?");

function calcFullPrice(arg1, arg2, arg3) {
  let sum = arg1 + arg2 + arg3;
  console.log(sum);
  return sum;
}

const geRollbackMessage = function(price) {
  if (price > 30000) {
    return "Даем скидку в 10%";
  } else if (price < 30000 && price >= 15000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price > 0) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};

console.log(fullPrice);
console.log(servicePercentPrice);
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей/долларов/гривен/юани`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей/долларов/гривен/юани`);
console.log("Стоимость верстки экранов " + screenPrice + " рублей/долларов/гривен/юани");
console.log("Стоимость разработки сайта " + fullPrice + " рублей/долларов/гривен/юани");

let lowerCaseScreens = screens.toLowerCase().split(', ');
console.log(lowerCaseScreens);

console.log(geRollbackMessage(fullPrice));
console.log(servicePercentPrice);