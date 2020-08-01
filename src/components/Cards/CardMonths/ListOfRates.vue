<template>
  <ul class="card-month-rates">
    <li v-for="(rate,i) in rates" :key="i" class="card-month-rates__item">
      <span>{{ rate.name }}</span>
      <span>{{ rateOfMonth(i) }}</span>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

import { getExchangeRatesForFourMonth } from '@/services/index';

export default {
  props: {
    activeMonth: Number,
    mainCurrency: String
  },
  data() {
    return {
      rates: []
    }
  },
  methods: {
    rateOfMonth(index) {
      return this.rates[index].values[this.activeMonth];
    }
  },
  async created() {
    this.rates = await getExchangeRatesForFourMonth();
  },
  watch: {
    async mainCurrency(val, oldVal) {
      this.rates = await getExchangeRatesForFourMonth(val);
    }
  }
}
</script>

<style>
@import "../../../assets/stylesheets/CardMonth/ListOfRates.css";
</style>