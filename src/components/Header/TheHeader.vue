<template>
  <header class="header">
    <h1 class="header__header">Exchange rates</h1>
  </header>
</template>

<script>
export default {
}
</script>

<style>
.header {
  display: flex;
  align-items: center;
  background-color: #0e1731;
  padding: 35px;
  color: #ebebeb;
}
.header__header {
  margin: 0;
}
.header-list {
  display: flex;
  font-size: 26px;
  list-style-type: none;
  margin: 0 0 0 auto;
  padding: 0;
}
.header-list__item:not(:first-of-type) {
  margin-left: 40px;
}
</style>
