<template>
  <span class="secondary__percent" :class="classChangePercent(percent)">
    <i
      class="fas secondary__percent-icon"
      :class="classArrow(percent)"
      v-if="percent !== 0"
    >
    </i>
    {{ percent }} %
  </span>
</template>

<script>
export default {
  props: {
    percent: String,
  },
  methods: {
    classChangePercent(value) {
      return value > 0
        ? "secondary__percent--green"
        : value < 0
        ? "secondary__percent--red"
        : "";
    },
    classArrow(value) {
      return value > 0 ? "fa-arrow-up" : value < 0 ? "fa-arrow-down" : "";
    },
  },
};
</script>

<style>
@import "../../../assets/stylesheets/CardSecondary/PercentChange.css";
</style>
