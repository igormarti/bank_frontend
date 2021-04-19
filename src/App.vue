<template>
  <div>
    <notifications group="auth" position="top center" />
    <component-navbar></component-navbar>
    <router-view/>
  </div>
</template>
<script lang="ts" >
import Vue from 'vue';
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({
  components: {
    'component-navbar': NavBar,
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.card-header{
  color: #074d97;
  font-weight: 600;
}

.validator{
  display: contents;
}

.error{
  color: red;
}

.notification-title {
  color: #fff;
  font-weight: 700;
}

.notification-content {
  color: #fff;
  font-weight: 600;
}

</style>
