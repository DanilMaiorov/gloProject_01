const title = "Калькулятор"
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1000;
let rollback = 15;
let fullPrice = 1500;
let adaptive = true;

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

console.log(fullPrice * (rollback / 100));