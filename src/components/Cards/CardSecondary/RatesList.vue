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
.secondary__name {
  font-size: 18px;
}

/* Иконка стрелочки вниз*/
.secondary-rates__icon {
  margin-left: 10px;
}

.secondary-rates__icon:hover + .secondary-rates__list {
  display: block;
}
/* Список валют */
.secondary-rates__list {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  max-height: 250px;
  overflow-y: scroll;
  border: 0.5px solid black;
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  background-color: white;
  display: none;
}
.secondary-rates__list:hover {
  display: block;
}
/* Наименование валюты */
.secondary-rates__item:hover {
  cursor: pointer;
  background-color: lightskyblue;
}
</style>
