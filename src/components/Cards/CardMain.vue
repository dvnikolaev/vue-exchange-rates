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
    mainCurrency: Object
  }
}
</script>

<style>
  .card-main {
    grid-column: span 4;
    background-color: var(--main-black-color);
    padding: 20px 40px;
    border-radius: 10px;
    color: white;
    box-shadow: 0 5px 25px rgba(4,26,90, .34);
  }
  .card-main__header {
    display: flex;
    justify-content: space-between;
    font-size: 24px;
  }
  .card-main__currency {
    text-transform: uppercase;
  }
  .card-main__value {
    display: block;
    text-align: center;
    margin-top: 20px;
    font-size: 109px;
    font-weight: bold;
  }
</style>