'use strict'


const title = document.getElementsByTagName('h1')[0];
const buttons = document.getElementsByClassName('handler_btn');
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');


const rollbackInput = document.querySelector('.rollback [type=range]');
const rollbackValue = document.querySelector('.rollback .range-value');

const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');
let firstClone = screens[0].cloneNode(true);

/* console.log(buttons);
console.log(buttonPlus);
console.log(otherItemsPercent);
console.log(otherItemsNumber);
console.log(rollbackInput);
console.log(rollbackValue);
console.log(total);
console.log(totalCount);
console.log(totalCountOther);
console.log(fullTotalCount);
console.log(totalCountRollback);
console.log(screens); */

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function() {
    this.addTitle();

    startBtn.addEventListener('click', this.start.bind(appData));
    buttonPlus.addEventListener('click', this.addScreenBlock.bind(appData));

    // Слушатель на инпуте
    rollbackInput.addEventListener('input', this.addRollback.bind(appData));

  },
  addTitle: function () {
    document.title = title.textContent
  },
  isNumber: function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
  },
  isString: function(str) {
    return (typeof str === 'string' || str instanceof String) && str !== "" && str !== null && isNaN(str)
  },

  // Слушатель на инпуте
  addRollback: function(elem){
    rollbackValue.textContent = `${elem.target.value}%`;
    this.rollback = +elem.target.value;
    totalCountRollback.value = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
  },

  addScreens: function(){
    screens = document.querySelectorAll('.screen');
    totalCount.value = 0;
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      // Запрет нажатия кнопки 1 вариант
      if (select.value !== "" && this.isNumber(input.value)) {

        input.value = input.value.replace(/\s*/, "");
        this.screens.push({
          id: index, 
          name: selectName, 
          price: +select.value * +input.value
        });

        // фильтр для корректного сложения суммы (но не совсем понимаю как работает, взял со стаковерфлоу)
        // this.screens = this.screens.filter((value, index, self) =>
        // index === self.findIndex((item) => (
        //   item.name === value.name
        // )))
        
        totalCount.value = +totalCount.value + +input.value
      } else {
        return
      }
    }); 
  },
  addServices: function(){
    otherItemsPercent.forEach((item, index) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    })
    otherItemsNumber.forEach((item, index) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    })
  },
  addScreenBlock: function() {
    let screens = document.querySelectorAll('.screen');
    let cloneScreen = firstClone.cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  showResult: function(){
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  addPrices: function() {
    let selectArr = [];
    let inputArr = [];
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      selectArr.push(select.value);
      inputArr.push(this.isNumber(input.value))
    });

    // Запрет нажатия кнопки 2 вариант
    if(selectArr.every(item => item) && inputArr.every(item => item === true)){
      this.screenPrice = this.screens.reduce(function(sum, item) {
        return sum + +item.price;
      }, 0)

      for (let key in this.servicesNumber) {
        this.servicePricesNumber += this.servicesNumber[key];
      }
      for (let key in this.servicesPercent) {
        this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
      }
      this.fullPrice = +this.screenPrice + +this.servicePricesNumber + this.servicePricesPercent;

      // Перенос логики this.getServicePercentPrice 
      this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)))
    }
  },

  start: function() {
    this.addScreens();
    this.addServices();
    this.addPrices();

    console.log(this);
    // appData.getAllServicePrices();
    // appData.logger();
    this.showResult();
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

appData.init();