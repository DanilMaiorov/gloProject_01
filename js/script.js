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

/* ПРОДОЛЖИТЬ ОТСЮДА */
const cmsCheckbox = document.querySelector('#cms-open');
const cmsOptions = document.querySelector(".hidden-cms-variants");

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');
let firstClone = screens[0].cloneNode(true);

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


  // придумал ключ btnDisabled со значением false
  btnDisabled: false,

  init: function() {
    this.addTitle();


    startBtn.addEventListener('click', this.disableBtn.bind(this));
    buttonPlus.addEventListener('click', this.addScreenBlock.bind(this));


    cmsCheckbox.addEventListener('click', this.openCmsOptions.bind(this));

    resetBtn.addEventListener("click", this.reset.bind(this));


    // Слушатель на инпуте
    rollbackInput.addEventListener('input', this.addRollback.bind(this));

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
  disableBtn: function() {
    this.btnDisabled = false;
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if (select.value === "" || !this.isNumber(input.value)) {
        this.btnDisabled = true;
      }
    });
      if(!this.btnDisabled) {
        this.start()
      } else {
        alert("Вводи значения");
      }
  },
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

      if (select.value !== "" && this.isNumber(input.value)) {
        input.value = input.value.replace(/\s*/, "");
        this.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value
        });
        totalCount.value = +totalCount.value + +input.value
      } else {
        return
      }
    });
  },
  addServices: function(){
    otherItemsPercent.forEach(item => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    })
    otherItemsNumber.forEach(item => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    })
  },
  addScreenBlock: function() {
    screens = document.querySelectorAll('.screen');
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

      this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)))
    }
  },

  openCmsOptions: function(){
    if (cmsCheckbox.checked) {
      cmsOptions.style.display = "flex";
    } else {
      cmsOptions.style.display = "none";
    }


  },

  hideCmsOptions: function(){
    cmsOptions.style.display = "none";
  },





  disabler: function(bool, resetStatus, startStatus) {
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      select.disabled = bool;
      input.disabled = bool;
    });
    startBtn.style.display = startStatus;
    resetBtn.style.display = resetStatus;
  },

  start: function() {
    this.addScreens();
    this.addServices();
    this.addPrices();

  // метод disabler для блокировки полей ввода
    this.disabler(true, "block", "none");
    this.showResult();
    console.log(this);
  },

  // удаление блоков экранов, кроме исходного
  screensRemove: function() {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen, i) => {
      if (i !== 0) {
      screen.remove();
      }
    });
    let newScreen = screens[0];
      screens = [];
      screens.push(newScreen);
  },
  // очистка блоков экранов
  screensReset: function() {
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      select.options[select.selectedIndex] = select.options[select.selectedIndex][0];
      input.value = "";
    });
  },
  // очистка блоков экранов
  inputsReset: function() {
    const inputs = document.querySelectorAll('.total-input');
    inputs.forEach(input => {
      input.value = 0;
    });
    document.querySelectorAll("input[type=checkbox]").forEach(item => item.checked = false);
    rollbackInput.value = 0;
    rollbackValue.textContent = `${rollbackInput.value}%`;
  },
  // очистка всех данных объекта
  clear: function(){
    this.screens = [];
    this.servicesPercent = {};
    this.servicesNumber = {};
    for (const key in this) {
      if (typeof(this[key]) === "number") {
        this[key] = 0;
      }
    };
  },
// метод reset
  reset: function(){
    this.inputsReset();
    this.screensReset();
    this.screensRemove();

    this.hideCmsOptions();

    this.disabler(false, "none", "block");

    this.clear();

    console.log(this);
  },
}

appData.init();