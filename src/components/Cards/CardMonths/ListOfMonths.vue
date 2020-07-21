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
.month-list {
  display: flex;
  list-style: none;
  border-radius: 10px;
  padding: 5px;
  margin: 10px auto;
  max-width: max-content;
  background-color: #f7f8fc;
  padding: 5px 10px;
}
.month-list__item {
  padding: 14px 27px;
  cursor: pointer;
  color: #0e1731;
}
.month-list__item--active {
  background-color: white;
  font-weight: bold;
  box-shadow: 0 6px 10px rgba(50, 79, 164, 0.3);
}
.month-list__item::first-letter {
 text-transform: uppercase;
}
</style>
