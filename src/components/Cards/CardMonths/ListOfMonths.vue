<template>
  <ul class="month-list">
    <li 
      class="month-list__item"
      :class="activeMonth === index ? 'month-list__item--active' : ''"
      v-for="(month, index) in months"
      :key="index"
      @click="setActiveMonth(index)">
      <span class="month__name">{{ month }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    activeMonth: Number
  },
  data() {
    return {
      months: []
    }
  },
  methods: {
    setActiveMonth(index) {
      this.$emit('update:activeMonth', index);
    }
  },
  created() {
    for (let i = 0; i <= 3;i++) {
      this.months[i] = getNamePrevMonths(new Date().getMonth() - i - 1);
    }
    this.months.reverse();
  }
}
function getNamePrevMonths(num) {
  return new Date(new Date().setMonth(num)).toLocaleString('ru', { month: 'long' });
}
</script>

<style>
@import "../../../assets/stylesheets/CardMonth/ListOfMonths.css";
</style>
