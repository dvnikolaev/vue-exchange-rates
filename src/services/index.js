import axios from "axios";

// Получаем предыдущий день
function getPrevDay() {
  let prevMilliSeconds = Date.now() - 1000 * 60 * 60 * 24 * 4;
  let day = new Date(prevMilliSeconds).getDate();
  let month = new Date(prevMilliSeconds).getMonth();
  let year = new Date(prevMilliSeconds).getFullYear();

  return `${year}-${month}-${day}`;
}

// Получаем курс валют
export const getRates = async (value) => {
  // Определяем предыдущий день
  const prevDay = getPrevDay();
  // Запрашиваем курс валют
  const {
    data: { rates },
  } = await axios.get(
    `https://api.exchangerate.host/latest?base=${value}&places=2`
  );
  // Запрашиваем курс валют за предыдущий день
  const {
    data: { rates: historyRates },
  } = await axios.get(
    `https://api.exchangerate.host/${prevDay}?base=${value}&places=2`
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
// Получаем строку даты вида YYYY-MM-DD
export const getDateString = (num) => {
  let day = 30;
  let month = new Date().getMonth() - num < 0 ? 12 - num : new Date().getMonth() - num;
  month = month > 0 && month < 10 ? `0${month}` : month
  let year = new Date().getFullYear();

  return `${year}-${month}-${day}`
}