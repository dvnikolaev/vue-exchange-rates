<template>
  <article class="card-month">
    <header class="card-month__header">
      <h2 class="card-month__name">Курс валют за предыщие месяцы</h2>
    </header>
    <ListOfMonths
      :activeMonth="activeMonth"
      @update:activeMonth="setActiveMonth"
    />
    <ListOfRates :activeMonth="activeMonth" />
  </article>
</template>

<script>
import ListOfMonths from "./ListOfMonths";
import ListOfRates from "./ListOfRates";

export default {
  data() {
    return {
      activeMonth: 3,
    };
  },
  methods: {
    setActiveMonth(index) {
      this.activeMonth = index;
    },
  },
  components: {
    ListOfMonths,
    ListOfRates,
  },
};
</script>

<style>
@import "../../../assets/stylesheets/CardMonth/CardMonth.css";
</style>
