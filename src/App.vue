<template>
  <div class="container">
    <TheHeader />
    <TheMain />
  </div>
</template>

<script>
import TheHeader from './components/Header/TheHeader.vue';
import TheMain from './components/Main/TheMain.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheMain
  }
}
</script>

<style lang="scss">
:root {
  --main-black-color: #0E1731;
}
body {
  margin: 0;
  box-sizing: border-box;
  font-family: 'Muli', sans-serif;
}
.container {
  max-width: 1600px;
  height: 1000px;
  background-color:#F7F8FC;
  margin: 0 auto;
}
</style>
