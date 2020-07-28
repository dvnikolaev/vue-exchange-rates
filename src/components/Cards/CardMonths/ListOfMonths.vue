<template>
  <ul class="month-list">
    <li
      class="month-list__item"
      :class="activeMonth === index ? 'month-list__item--active' : ''"
      v-for="(month, index) in months"
      :key="index"
      @click="setActiveMonth(index)"
    >
      <span class="month__name">{{ month }}</span>
    </li>
  </ul>
</template>

<script>
import { getNamePrevMonth } from "@/services/index";

export default {
  props: {
    activeMonth: Number,
  },
  data() {
    return {
      months: [],
    };
  },
  methods: {
    setActiveMonth(index) {
      this.$emit("update:activeMonth", index);
    },
  },
  created() {
    for (let i = 0; i <= 3; i++) {
      this.months[i] = getNamePrevMonth(new Date().getMonth() - i - 1);
    }
    this.months.reverse();
  },
};
</script>

<style>
@import "../../../assets/stylesheets/CardMonth/ListOfMonths.css";
</style>
