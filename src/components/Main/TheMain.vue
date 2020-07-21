<template>
  <main class="main">
    <div class="card-main__wrapper">
      <CardMain :mainCurrency="mainCurrency" />
      
    <CardMonth />
    </div>
    <CardSecondary 
      v-for="(rate,index) in mainRates"
      :key="index"
      :rate="rate"
      :index="index"
      :rates="rates" 
      @update:secondary="updateMainRates" 
    />
    
      <CardGraphic />
    <CardRates 
      :mainCurrencyName="mainCurrency.name"
      :rates="rates"
      @update:rates="changeRates"/>
  </main>
</template>

<script>
import CardMain from "@/components/Cards/CardMain.vue";
import CardSecondary from "@/components/Cards/CardSecondary.vue";
import CardRates from "@/components/Cards/CardRates.vue";
import CardMonth from "@/components/Cards/CardMonths/CardMonth.vue";

import CardGraphic from "@/components/Cards/CardGraphic/CardGraphic";

import axios from "axios";

export default {
  data() {
    return {
      mainCurrency: {
        name: "USD",
        value: 1,
      },
      rates: [],
      mainRates: [
      ]
    };
  },
  methods: {
    changeRates(value) {
      this.getRates(value)
    },
    updateMainRates(index, item) {
      let foundRate = this.rates.find(element => item === element.name);
      this.mainRates.splice(index,1,foundRate);
    },
    async getRates(value = 'USD') {

      const { rates, historyRates } = await getRates(value);

      let arr = [];

      this.mainCurrency.name = value;

      // Формируем из объекта курса валют в массив объектов
      for (let key in rates) {
        arr.push({
          name: key,
          value: rates[key].toFixed(2),
          change: ((rates[key] - historyRates[key]).toFixed(2) / historyRates[key].toFixed(2)).toFixed(2)
        })
      }


      this.mainRates = arr.filter(item => {
        return this.mainRates.some(elem => item.name === elem.name)
      })

      this.rates = arr;
    }
  },
  async created() {
    await this.getRates();

    let baseMainRates = ["USD", "EUR", "RUB", "CAD"];

    this.mainRates = this.rates.filter(item => {
      return baseMainRates.some(elem => {
        return item.name === elem;
      })
    })
  },
  components: {
    CardSecondary,
    CardMain,
    CardRates,
    CardMonth,
    CardGraphic
  },
};

function getPrevDay() {
  let prevMilliSeconds = Date.now() - (1000 * 60 * 60 * 24 * 4);
  let day = new Date(prevMilliSeconds).getDate();
  let month = new Date(prevMilliSeconds).getMonth();
  let year = new Date(prevMilliSeconds).getFullYear();

  return `${year}-${month}-${day}`
}

async function getRates(value) {
  // Определяем предыдущий день
  const prevDay = getPrevDay();
  // Запрашиваем курс валют
  const { data: { rates }} = await axios.get(`https://api.exchangerate.host/latest?base=${value}`);
  // Запрашиваем курс валют за предыдущий день
  const { data: { rates: historyRates }} = await axios.get(`https://api.exchangerate.host/${prevDay}?base=${value}`);

  return {
    rates,
    historyRates
  }
}

</script>

<style>
.main {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 250px repeat(3, 140px);
  padding: 35px;
}
.card-main__wrapper {
  display: grid;
  gap: 30px;
  grid-column: span 8;
  grid-template-columns: repeat(12, 1fr);
}

@media screen and (max-width: 1250px) {
.main {
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(5, 140px);
}
}
</style>
