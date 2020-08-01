import axios from "axios";

// Получаем предыдущий день
function getPrevDay() {
  let prevMilliSeconds = Date.now() - 1000 * 60 * 60 * 24;
  // Формат YYYY-MM-DD
  let date = new Date(prevMilliSeconds).toISOString().substr(0,10);
  return date;
}
// Получаем строку даты вида YYYY-MM-DD
function getDateString(num) {
  let day = 30;
  let month = new Date().getMonth() - num < 0 ? 12 - num : new Date().getMonth() - num;
  month = month > 0 && month < 10 ? `0${month}` : month
  let year = new Date().getFullYear();

  return `${year}-${month}-${day}`
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
  const { data: { rates: firstMonth } } = await axios.get(`https://api.exchangerate.host/${getDateString(1)}?base=${currency}&symbols=USD,EUR,RUB`);
  const { data: { rates: secondMonth } } = await axios.get(`https://api.exchangerate.host/${getDateString(2)}?base=${currency}&symbols=USD,EUR,RUB`);
  const { data: { rates: thirdMonth } } = await axios.get(`https://api.exchangerate.host/${getDateString(3)}?base=${currency}&symbols=USD,EUR,RUB`);
  const { data: { rates: fourthMonth } } = await axios.get(`https://api.exchangerate.host/${getDateString(4)}?base=${currency}&symbols=USD,EUR,RUB`);

  let rates = [];

  for (let rate in firstMonth) {
    rates.push(
      {
        name: rate,
        values: [fourthMonth[rate].toFixed(2), thirdMonth[rate].toFixed(2), secondMonth[rate].toFixed(2), firstMonth[rate].toFixed(2)]
      }
    )
  }
  console.log(rates);
  return rates;
}