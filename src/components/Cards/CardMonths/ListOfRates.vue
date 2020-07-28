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

import { getDateString } from '@/services/index';

export default {
  props: {
    activeMonth: Number
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
    let { data: { rates: firstMonth } } = await axios.get(`https://api.exchangerate.host/${getDateString(1)}?base=USD&symbols=CAD,EUR,RUB&places=2`);
    let { data: { rates: secondMonth } } = await axios.get(`https://api.exchangerate.host/${getDateString(2)}?base=USD&symbols=CAD,EUR,RUB&places=2`);
    let { data: { rates: thirdMonth } } = await axios.get(`https://api.exchangerate.host/${getDateString(3)}?base=USD&symbols=CAD,EUR,RUB&places=2`);
    let { data: { rates: fourthMonth } } = await axios.get(`https://api.exchangerate.host/${getDateString(4)}?base=USD&symbols=CAD,EUR,RUB&places=2`);

    for (let rate in firstMonth) {
      this.rates.push(
        {
          name: rate,
          values: [fourthMonth[rate], thirdMonth[rate], secondMonth[rate], firstMonth[rate]]
        }
      )
    }
  }
}
</script>

<style>
@import "../../../assets/stylesheets/CardMonth/ListOfRates.css";
</style>