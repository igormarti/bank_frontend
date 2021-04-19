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
import User from '@/models/user.interface';
import getAccount from '@/services/account.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const currencyMask = createNumberMask({
  prefix: 'R$ ',
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});

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
      mask: currencyMask as any,
      text: '' as string,
    };
  },
  created() {
    try {
      getAccount().then((res) => {
        const account = res.useraccount;
        this.balance = parseFloat(account.balance);
        this.agency = account.agency;
        this.numberAccount = account.number_account;
        this.name = res.name;
        this.$store.dispatch('account/setAccount', res.useraccount);
      }).catch((error):any => console.log(error));
    } catch (error) {
      console.log(error);
    }
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
