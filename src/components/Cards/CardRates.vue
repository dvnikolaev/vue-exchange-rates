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
@import '../../assets/stylesheets/CardRates/CardRates.css';
</style>
