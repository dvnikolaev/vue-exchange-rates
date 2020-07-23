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
.card-secondary {
  grid-row: 2;
  grid-column: span 3;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  max-width: 252px;
  position: relative;
}
.secondary__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.secondary__value {
  display: block;
  margin-top: 30px;
  font-size: 36px;
  font-weight: bold;
}

@media screen and (max-width: 1265px) {
  .card-secondary {
    grid-column: span 6;
    grid-row: auto;
    max-width: none;
  }
}
@media screen and (max-width: 955px) {
  .secondary__value {
    text-align: center;
  }
}
@media screen and (max-width: 421px) {
  .card-secondary {
    grid-column: span 12;
  }
}
</style>
