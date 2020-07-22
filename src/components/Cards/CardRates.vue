<template>
  <article class="rates">
    <input
      type="text"
      v-model="search"
      placeholder="Поиск по валюте..."
      class="rates__search"
    />
    <div class="rates__header">
      <span class="rates__header-name">Валюта</span>
      <span class="rates__header-curse">Курс</span>
    </div>
    <ul class="rates__list">
      <li
        class="rates__item"
        v-for="(item, name) in filterRates"
        :key="name"
        :class="classItemActive(item.name)"
        @click="changeRate(item.name)"
      >
        <span>{{ item.name }}</span>
        <span class="rates__item-value" :class="classValue(item.change)">{{
          item.value
        }}</span>
      </li>
    </ul>
  </article>
</template>

<script>
import axios from "axios";

export default {
  props: {
    rates: Array,
    mainCurrencyName: String,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    classValue(value) {
      return value > 0
        ? "rates__item-value--green"
        : value < 0
        ? "rates__item-value--red"
        : "";
    },
    classItemActive(value) {
      return this.mainCurrencyName === value ? "rates__item--active" : "";
    },
    changeRate(value) {
      this.$emit("update:rates", value);
    },
  },
  computed: {
    filterRates() {
      return this.rates.filter(
        (item) =>
          item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
  },
};
</script>

<style>
/* Блок всех курсов валют */
.rates {
  grid-column: span 4;
  grid-row: span 4;
  padding: 30px 40px;
  border-radius: 10px;
  background-color: white;
  overflow-y: scroll;
}
.rates__search {
  width: 100%;
  padding: 10px 5px;
  font-size: 14px;
}
.rates__header {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: var(--main-black-color);
  margin-top: 10px;
}
.rates__list {
  margin: 20px -10px;
  padding: 0;
  list-style: none;
}
.rates__item {
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 10px;
}
.rates__item:hover {
  cursor: pointer;
  background-color: #edeff7;
}
.rates__item:not(:first-of-type) {
  margin-top: 25px;
}
.rates__item--active {
  background-color: #d8dae2;
}
.rates__item--active:hover {
  background-color: #d8dae2;
}
.rates__item-value--green {
  color: #00bb75;
}
.rates__item-value--red {
  color: #e84166;
}

@media screen and (max-width: 1265px) {
  .rates {
    grid-row: span 5;
    padding: 20px;
  }
}
@media screen and (max-width: 955px) {
  .rates {
    grid-column: span 6;
    grid-row: span 4;
  }
}
</style>
