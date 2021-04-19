<template>
<nav class="navbar navbar-light bg-primary mb-5">
    <div class="container-fluid">
    <a class="navbar-brand text-white col-3 d-flex align-items-center" href="#">
        Banco <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/110/regional-indicator-symbol-letter-c_1f1e8.png"
        alt="" width="35" height="35" class="p-0">apgemini
    </a>
      <a v-if="isLoggedIn" href="javascript:void(0)" @click="logOut" class="offset-12" >
          <exit-icons fillColor="#fff" :size="27" />
      </a>
    </div>
</nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Exit from 'vue-material-design-icons/ExitToApp.vue';
import { logToOut, getUserAuthenticate } from '../services/auth.service';

Vue.component('exit-icons', Exit);

export default Vue.extend({
  name: 'NavBar',
  data() {
    return {
      authenticated: true as boolean,
    };
  },
  methods: {
    logOut() {
      logToOut().then((res):any => {
        this.$store.dispatch('auth/removeUser');
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
  computed: {
    isLoggedIn() { return this.$store.getters['auth/getUser']; },
  },
});

</script>
