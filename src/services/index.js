import axios from "axios";

// Получаем предыдущий день
function getPrevDay() {
  let prevMilliSeconds = Date.now() - 1000 * 60 * 60 * 24;
  // Формат YYYY-MM-DD
  let date = new Date(prevMilliSeconds).toISOString().substr(0,10);
  return date;
}
// Получаем строку даты вида YYYY-MM-DD
function getDateStringForPrevMonths(num) {
  let date = new Date(new Date().getFullYear(), new Date().getMonth() - num + 1, 1).toISOString().substr(0,10);
  
  return date;
}

// Получаем курс валют
export const getRates = async (value) => {
  // Определяем предыдущий день
  const prevDay = getPrevDay();
  // Запрашиваем курс валют
  const {
    data: { rates },
  } = await axios.get(
    `https://api.exchangerate.host/latest?base=${value}`
  );
  // Запрашиваем курс валют за предыдущий день
  const {
    data: { rates: historyRates },
  } = await axios.get(
    `https://api.exchangerate.host/${prevDay}?base=${value}`
  );

  return {
    rates,
    historyRates,
  };
};
// Получаем имя месяца
export const getNamePrevMonth = (num) => {
  return new Date(new Date().setMonth(num)).toLocaleString("ru", {
    month: "long",
  });
};

// Получаем курс валют за последние 4 месяца 

export const getExchangeRatesForFourMonth = async (currency = 'USD') => {
  const { data: { rates: firstMonth } } = await axios.get(`https://api.exchangerate.host/${getDateStringForPrevMonths(1)}?base=${currency}&symbols=USD,EUR,RUB`);
  const { data: { rates: secondMonth } } = await axios.get(`https://api.exchangerate.host/${getDateStringForPrevMonths(2)}?base=${currency}&symbols=USD,EUR,RUB`);
  const { data: { rates: thirdMonth } } = await axios.get(`https://api.exchangerate.host/${getDateStringForPrevMonths(3)}?base=${currency}&symbols=USD,EUR,RUB`);
  const { data: { rates: fourthMonth } } = await axios.get(`https://api.exchangerate.host/${getDateStringForPrevMonths(4)}?base=${currency}&symbols=USD,EUR,RUB`);

  let rates = [];

  for (let rate in firstMonth) {
    rates.push(
      {
        name: rate,
        values: [fourthMonth[rate].toFixed(2), thirdMonth[rate].toFixed(2), secondMonth[rate].toFixed(2), firstMonth[rate].toFixed(2)]
      }
    )
  }

  return rates;
}

// Получаем курс валют для графика
export const getExchangeRatesForMonth = async (currency) => {
  let currentMonthExchange = [];
  let prevMonthExchange = [];

  const currentMonth = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().substr(0,10),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().substr(0,10)
  }

  const prevMonth = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 2).toISOString().substr(0,10),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().substr(0,10) 
  }
  
  const { data: { rates: currentMonthRates } } = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${currentMonth.startDate}&end_date=${currentMonth.endDate}&base=${currency}&symbols=RUB`);
  const { data: { rates: prevMonthRates } } = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${prevMonth.startDate}&end_date=${prevMonth.endDate}&base=${currency}&symbols=RUB`);
  
  for (let key in currentMonthRates) {
    for (let key2 in currentMonthRates[key]) {
      currentMonthExchange.push(+currentMonthRates[key][key2].toFixed(2));
    }
  }

  for (let key in prevMonthRates) {
    for (let key2 in prevMonthRates[key]) {
      prevMonthExchange.push(+prevMonthRates[key][key2].toFixed(2));
    }
  }

  return {
    currentMonthExchange,
    prevMonthExchange
  }
}