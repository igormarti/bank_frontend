import Vue from 'vue';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import money from 'v-money';
import Notifications from 'vue-notification';
import exit from 'vue-material-design-icons/ExitToApp.vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router';
import store from './store';

Vue.use(Notifications);
Vue.config.productionTip = false;
Vue.use(money, { precision: 4 });
Vue.component('exit-icons', exit);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
