<template>
  <div class="container" >
    <div class="card">
      <div class="card-header">
        Selecione a operação desejada
      </div>
      <div class="card-body p-3">
        <!-- <input type="text" v-model="text" v-mask="mask" value="account.balance" > -->
        <strong>Seu Saldo: R$ {{formatPrice(balance)}}</strong>
        <ul class="infoaccount">
          <li><span>Conta: {{numberAccount}}</span></li>
          <li><span>Agência: {{agency}}</span></li>
          <li><span>Cliente: {{name}}</span></li>
        </ul>
        <div class="row" >
           <component-menu> </component-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import menu from '@/components/Menu.vue'; // @ is an alias to /src
import getAccount from '@/services/account.service';
import User from '../models/user.interface';

export default Vue.extend({
  components: {
    'component-menu': menu,
  },
  data() {
    return {
      balance: 0 as number,
      agency: 0 as number,
      name: '' as string,
      numberAccount: 0,
      text: '' as string,
    };
  },
  created() {
    getAccount().then((res):User|any => {
      this.balance = parseFloat(res.useraccount.balance);
      this.agency = res.useraccount.agency;
      this.numberAccount = res.useraccount.number_account;
      this.name = res.name;
      this.$store.dispatch('account/setAccount', res.useraccount);
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
  methods: {
    formatPrice(value:number) {
      const val = (value / 1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  },
});
</script>
<style scoped>

.infoaccount{
  display: flex;
  flex-direction: row;
  padding: 0;
}
.infoaccount > li{
  list-style: none;
  margin-top: 2px;
  margin-right: 10px;
  color: #007bff;
  font-size: 13px;
  font-weight: 600;
}
</style>
