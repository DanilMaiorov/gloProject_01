'use strict'


const h1 = document.getElementsByTagName('h1')[0];
const buttons = document.getElementsByClassName('handler_btn');
const plusBtn = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const rollbackInput = document.querySelector('.rollback [type=range] ');
const rollbackValue = document.querySelector('.rollback .range-value');
const totalInput = document.getElementsByClassName('total-input')[0];
const totalInput1 = document.getElementsByClassName('total-input')[1];
const totalInput2 = document.getElementsByClassName('total-input')[2];
const totalInput3 = document.getElementsByClassName('total-input')[3];
const totalInput4 = document.getElementsByClassName('total-input')[4];
let screens = document.querySelectorAll('.screen');


console.log(h1);
console.log(buttons);
console.log(plusBtn);
console.log(percentItems);
console.log(numberItems);
console.log(rollbackInput);
console.log(rollbackValue);
console.log(totalInput);
console.log(totalInput1);
console.log(totalInput2);
console.log(totalInput3);
console.log(totalInput4);
console.log(screens);


const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 15,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",
  isNumber: function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
  },
  asking: function() {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые");

    let price = 0;
    do {
      price = prompt("Сколько будет стоить данная работа?", 10000)
      if (price !== null) {
        appData.screenPrice = price.trim()
      }
    } while (!appData.isNumber(price))

    appData.screenPrice = +appData.screenPrice;
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      if(i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Попап");
      }

      let newSum = 0;
      do {
        newSum = prompt("Сколько это будет стоить?", '1500');
        if (newSum !== null) {
          newSum = newSum.trim()
        }
      } while(!appData.isNumber(newSum));
      sum += +newSum
    }
    return sum
  },
  getFullPrice: function() {
    return +appData.screenPrice + +appData.allServicePrices;
  },
  getServicePercentPrices: function() {
    return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)))
  },
  getTitle: function(str) {
    let trimStr = str.trim();
    return trimStr.slice(0, 1).toUpperCase() + trimStr.substring(1).toLowerCase()
  },
  start: function() {
    appData.asking();
    appData.title = appData.getTitle(appData.title);
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.logger();
  },
  logger: function(){
    console.log("fullprice", appData.fullPrice);
    console.log("servicePercentPrice", appData.servicePercentPrice);
    console.log("allServicePrices", appData.allServicePrices);

    for (const key in this) {
      console.log(key);
    }
  }
}

/* const getRollbackMessage = function(price) {
  if (price > 30000) {
    return "Даем скидку в 10%";
  } else if (price < 30000 && price >= 15000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price > 0) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
} */

appData.start();


