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

    for (let i = 0; i < 2; i++) {
      let name = "";
      let price = 0;

      do {
        name = prompt("Какие типы экранов нужно разработать?", "Простые");
        if (name !== null) {
          name = name.trim()
        }
      } while (!appData.isString(name));

      do {
        price = prompt("Сколько будет стоить данная работа?", 10000)
        if (price !== null) {
          price = price.trim()
        }
      } while (!appData.isNumber(price));

      this.screens.push({id: i, name: name, price: +price})
    }

    for (let i = 0; i < 2; i++) {
      let name = "";
      let price = 0;

      do {
        name = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
        if (name !== null) {
          name = name.trim()
        }
      } while (!appData.isString(name));

      do {
        price = prompt("Сколько это будет стоить?", '1500');
        if (price !== null) {
          price = price.trim()
        }
      } while(!appData.isNumber(price));

      this.services[`${name}_${i}`] = +price;
    }

    this.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function() {
/*     for(let screen of this.screens) {
      appData.screenPrice += +screen.price
    } */

    this.screens.reduce(function(sum, item) {
      return appData.screenPrice = sum + +item.price;
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
/*     for (const key in this) {
      console.log(key);
    } */
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


