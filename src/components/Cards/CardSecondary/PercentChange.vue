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
.secondary__percent {
  font-size: 14px;
}
.secondary__percent--green {
  color: #00bb75;
}
.secondary__percent--red {
  color: #e84166;
}
.secondary__percent-icon {
  margin-right: 5px;
}
</style>
