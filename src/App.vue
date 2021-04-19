<template>
  <div>
    <notifications group="auth" position="top center" />
    <nav class="navbar navbar-light bg-primary mb-5">
      <div class="container-fluid">
        <a class="navbar-brand text-white col-3 d-flex align-items-center" href="#">
           Banco <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/110/regional-indicator-symbol-letter-c_1f1e8.png"
          alt="" width="35" height="35" class="p-0">apgemini
        </a>
        <a href="javascript:void(0)" @click="logOut" class="offset-8" >
          <exit-icons fillColor="#fff" :size="27" />
        </a>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
<script lang="ts" >
import Vue from 'vue';
import { logToOut } from './services/auth.service';

export default Vue.extend({
  methods: {
    logOut() {
      logToOut().then((res):any => {
        localStorage.clear();
        this.$router.replace('/');
      }).catch((error):any => {
        this.$notify({
          group: 'auth',
          type: 'error',
          title: 'Atenção',
          text: error.response.data.errors instanceof Array ? error.response.data.errors[0]
            : error.response.data.errors,
        });
      });
    },
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
