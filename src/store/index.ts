import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import account from '@/store/modules/account';
import auth from '@/store/modules/auth';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    account,
    auth,
  },
  strict: debug,
  plugins: [vuexLocalStorage.plugin],
});
