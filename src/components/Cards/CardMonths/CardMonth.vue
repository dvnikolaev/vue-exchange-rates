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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  grid-column: span 8;
  padding: 20px 20px;
  background: white;
  border-radius: 10px;
}
.card-month__name {
  margin: 0;
  text-align: center;
}

@media screen and (max-width: 1120px) {
  .card-month__name {
    font-size: 20px;
  }
}
@media screen and (max-width: 955px) {
  .card-month {
    grid-column: span 12;
  }
}
@media screen and (max-width: 840px) {
  .card-month__name {
    font-size: 16px;
  }
}
@media screen and (max-width: 682px) {
  .card-month__name {
    font-size: 20px; 
  }
}
</style>
