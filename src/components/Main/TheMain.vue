<template>
  <main class="main">
    <div class="card-main__wrapper">
      <CardMain :mainCurrency="mainCurrency" />
      <CardMonth :mainCurrency="mainCurrency.name" />
    </div>
    <div class="card-secondary__wrapper">
      <CardSecondary
        v-for="(rate, index) in mainRates"
        :key="index"
        :rate="rate"
        :index="index"
        :rates="rates"
        @update:secondary="updateMainRates"
      />
    </div>
    <CardGraphic />
    <CardRates
      :mainCurrencyName="mainCurrency.name"
      :rates="rates"
      @update:rates="changeRates"
    />
  </main>
</template>

<script>
import { getRates } from "@/services/index";

import CardMain from "@/components/Cards/CardMain.vue";
import CardSecondary from "@/components/Cards/CardSecondary.vue";
import CardRates from "@/components/Cards/CardRates.vue";
import CardMonth from "@/components/Cards/CardMonths/CardMonth.vue";
import CardGraphic from "@/components/Cards/CardGraphic/CardGraphic";

export default {
  data() {
    return {
      mainCurrency: {
        name: "USD",
        value: 1,
      },
      rates: [],
      mainRates: [],
    };
  },
  methods: {
    changeRates(value) {
      this.getRates(value);
    },
    updateMainRates(index, item) {
      let foundRate = this.rates.find((element) => item === element.name);
      this.mainRates.splice(index, 1, foundRate);
    },
    async getRates(value = "USD") {
      const { rates, historyRates } = await getRates(value);

      let arr = [];

      this.mainCurrency.name = value;

      // Формируем из объекта курса валют в массив объектов
      for (let key in rates) {
        arr.push({
          name: key,
          value: rates[key].toFixed(2),
          change: +(
            (rates[key] - historyRates[key]) /
            historyRates[key]
          ).toFixed(2),
        });
      }

      this.mainRates = arr.filter((item) => {
        return this.mainRates.some((elem) => item.name === elem.name);
      });

      this.rates = arr;
    },
  },
  async created() {
    await this.getRates();

    let baseMainRates = ["USD", "EUR", "RUB", "CAD"];
    // Заполняем массив валют
    this.mainRates = this.rates.filter((item) => {
      return baseMainRates.some((elem) => {
        return item.name === elem;
      });
    });
  },
  components: {
    CardSecondary,
    CardMain,
    CardRates,
    CardMonth,
    CardGraphic,
  },
};
</script>

<style>
@import "../../assets/stylesheets/Main/Main.css";
</style>
