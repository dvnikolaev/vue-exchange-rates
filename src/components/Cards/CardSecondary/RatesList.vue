<template>
  <div class="secondary-rates">
    <span class="secondary__name">{{ rateName }}</span>
    <i class="fas fa-chevron-down secondary-rates__icon"></i>
    <ul class="secondary-rates__list">
      <li
        class="secondary-rates__item"
        v-for="item in filteredRates"
        :key="item.name"
        @click="updateRate(item.name)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    rateName: String,
    rates: Array,
  },
  computed: {
    filteredRates() {
      return this.rates.filter((item) => item.name !== this.rateName);
    },
  },
  methods: {
    updateRate(item) {
      this.$emit('update:secondary', item);
    }
  }
};
</script>

<style>
@import "../../../assets/stylesheets/CardSecondary/RatesList.css";
</style>
