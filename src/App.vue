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
@import './assets/stylesheets/App/App.css';
</style>
