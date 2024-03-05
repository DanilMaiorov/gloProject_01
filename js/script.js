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

const numCheck = function(numQuestion, num) {
  do {
    num = prompt(numQuestion)
    if (num !== null && appData.isNumber(num)) {
      num = num.trim()
    }
  } while (!appData.isNumber(num));
  return num
};

const strCheck = function(strQuestion, str) {
  do {
    str = prompt(strQuestion);
    if (str !== null && appData.isString(str)) {
      str = str.trim()
    }
  } while (!appData.isString(str))
  return str
};

const ask = function(promptName, promptPrice, amountQuestions) {
  for (let i = 0; i < amountQuestions; i++) {
    let name = "";
    let price = 0;

    name = strCheck(promptName, name);
    price = numCheck(promptPrice, price);

    if (appData.screens.length < amountQuestions) {
      appData.screens.push({id: i, name: name, price: +price})
    } else {
      appData.services[`${name}_${i}`] = +price;
    }
  }
};

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  isNumber: function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
  },
  isString: function(str) {
    return (typeof str === 'string' || str instanceof String) && str !== "" && str !== null && isNaN(str)
  },
  asking: function() {
    this.title = prompt("Как называется ваш проект?", "Калькулятор");

    ask("Какие типы экранов нужно разработать?", "Сколько будет стоить данная работа?", 2);
    ask("Какой дополнительный тип услуги нужен?", "Сколько это будет стоить?", 2);

    this.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function() {
    this.screenPrice = this.screens.reduce(function(sum, item) {
      return sum + +item.price;
    }, 0)

  },
  getAllServicePrices: function() {
    for (let key in this.services) {
      this.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function() {
    this.fullPrice = +appData.screenPrice + +appData.allServicePrices;
  },

  getServicePercentPrices: function() {
    this.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)))
  },

  getTitle: function(str) {
    let trimStr = str.trim();
    trimStr = trimStr.slice(0, 1).toUpperCase() + trimStr.substring(1).toLowerCase()
    this.title = trimStr
  },

  start: function() {
    appData.asking();
    appData.addPrices();
    appData.getTitle(appData.title);
    appData.getAllServicePrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();

    appData.logger();
  },

  logger: function(){
    console.log("fullprice", appData.fullPrice);
    console.log("servicePercentPrice", appData.servicePercentPrice);
    console.log("allServicePrices", appData.allServicePrices);
    console.log("getTitle", appData.title);
    console.log("services", appData.services);
    console.log("screens", appData.screens);
  }
}

appData.start();