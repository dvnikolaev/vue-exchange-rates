<template>
  <ul class="card-month-rates">
    <div v-if="rates.length">
      <li v-for="(rate, i) in rates" :key="i" class="card-month-rates__item">
        <span>{{ rate.name }}</span>
        <span>{{ rateOfMonth(i) }}</span>
      </li>
    </div>
    <Spinner v-else/>
  </ul>
</template>

<script>
import { getExchangeRatesForFourMonth } from "@/services/index";

import Spinner from "@/components/Spinner";

export default {
  props: {
    activeMonth: Number,
    mainCurrency: String,
  },
  data() {
    return {
      rates: [],
    };
  },
  methods: {
    rateOfMonth(index) {
      return this.rates[index].values[this.activeMonth];
    },
  },
  async created() {
    this.rates = await getExchangeRatesForFourMonth();
  },
  watch: {
    async mainCurrency(val, oldVal) {
      this.rates = [];
      this.rates = await getExchangeRatesForFourMonth(val);
    },
  },
  components: {
    Spinner,
  },
};
</script>

<style>
@import "../../../assets/stylesheets/CardMonth/ListOfRates.css";
</style>
