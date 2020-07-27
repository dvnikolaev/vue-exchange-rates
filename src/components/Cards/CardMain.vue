<template>
  <article class="card-main">
    <div class="card-main__header">
      <span class="card-main__curse">Курс</span>
      <span class="card-main__currency">{{ mainCurrency.name }}</span>
    </div>
    <span class="card-main__value">{{ mainCurrency.value }}</span>
  </article>
</template>

<script>
export default {
  props: {
    mainCurrency: Object,
  },
};
</script>

<style>
@import '../../assets/stylesheets/CardMain/CardMain.css';
</style>
