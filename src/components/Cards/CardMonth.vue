<template>
  <article class="card-month">
    <header class="card-month__header">
      <h2 class="card-month__name">Курс валют за предыщие месяцы</h2>
    </header>
    <ul class="month-list">
      <li class="month-list__item month-list__item--active">
        <span>Апрель</span>
      </li>
      <li class="month-list__item">
        <span>Май</span>
      </li>
      <li class="month-list__item">
        <span>Июнь</span>
      </li>
    </ul>
  </article>
</template>

<style>
.card-month {
  grid-column: span 2;
  grid-row: 3 / span 2;
  padding: 20px 40px;
  background: white;
  border-radius: 10px;
}
.card-month__name {
  margin: 0;
}

.month-list {
  display: flex;
  list-style: none;
  border-radius: 10px;
  padding: 5px;
  max-width: max-content;
  background-color: #F7F8FC;
  padding: 5px 10px;
}
.month-list__item {
  padding: 14px 27px;
  cursor: pointer;
  color: #0E1731;
}
.month-list__item--active {
  background-color: white;
  font-weight: bold;
  box-shadow: 0 6px 10px rgba(50,79,164,.3);
}
</style>
