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
      activeMonth: 3
    };
  },
  methods: {
    setActiveMonth(index) {
      this.activeMonth = index;
    }
  },
  components: {
    ListOfMonths,
    ListOfRates
  }
};
</script>

<style>
.card-month {
  grid-column: span 2;
  grid-row: 3 / span 2;
  padding: 20px 40px;
  background: white;
  border-radius: 10px;
}
.card-month__name {
  margin: 0;
}
</style>
