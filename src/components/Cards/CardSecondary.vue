<template>
  <article class="card-secondary">
    <div class="secondary__header">
      <RatesList
        :rateName="rate.name"
        :rates="rates"
        @update:secondary="updateRate"
      />
      <PercentChange :percent="rate.change" />
    </div>
    <span class="secondary__value">{{ rate.value }}</span>
  </article>
</template>

<script>
import RatesList from "./CardSecondary/RatesList";
import PercentChange from "./CardSecondary/PercentChange";

export default {
  props: {
    rate: Object,
    index: Number,
    rates: Array,
  },
  components: {
    RatesList,
    PercentChange,
  },
  methods: {
    updateRate(item) {
      this.$emit("update:secondary", this.index, item);
    },
  },
};
</script>

<style>
@import "../../assets/stylesheets/CardSecondary/CardSecondary.css";
</style>
