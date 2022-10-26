<template>
  <div id="app">
 
      <transition name="fade">
        <router-view></router-view>
      </transition>


  </div>
</template>

<script>

import HomeViewVue from './views/HomeView.vue';

export default {
  name: 'Home',
  components: {
    HomeViewVue: HomeViewVue,
  },



}
</script>

<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

body {
}

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

</style>
