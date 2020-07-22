<template>
  <div class="card-graphic">
    <h1>Здесь будет график</h1>
  </div>
</template>

<style>
.card-graphic {
  padding: 20px 40px;
  background-color: white;
  border-radius: 10px;
  grid-column: span 8;
  grid-row: 3 / span 2;
}

@media screen and (max-width: 1265px) {
  .card-graphic {
    grid-row: 4 / span 2;
  }
}
@media screen and (max-width: 955px) {
  .card-graphic {
    grid-row: 5 / span 2;
    grid-column: span 12;
  }
}
</style>
