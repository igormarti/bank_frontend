<template>
   <div class="container" >
    <div class="card">
      <div class="card-header">
        Sacar
      </div>
      <router-link class="m-3" to="/home" >Voltar</router-link>
      <div class="card-body p-3">
          <div class="col-12 d-flex justify-content-center align-items-center flex-column" >
            <ValidationProvider class="validator" name="withdrawprice"
            rules="required|min_length:5" >
              <div slot-scope="{ errors }" class="mb-3 col-md-3 col-lg-3 col-12 mb-5">
                <label for="money" class="form-label">Digite quanto deseja retirar</label>
                <money v-model="withdrawprice" v-bind="withdrawmoney" name="withdrawprice" ></money>
                <p class="error" >{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
            <button class="btn btn-primary" type="button"
            v-on:click="withDraw" >
              Retirar Dinheiro
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import Vue from 'vue';
import { extend, ValidationProvider } from 'vee-validate';
import { required, min_value as minValue } from 'vee-validate/dist/rules';
import subtTransaction from '@/services/transaction.service';

extend('required', {
  ...required,
  message: 'Esse campo é obrigatório.',
});

extend('min_length', {
  ...minValue,
  message: 'O valor minímo para sacar é R$ 5,00.',
});

export default Vue.extend({
  data() {
    return {
      withdrawprice: 5.00 as number,
      withdrawmoney: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: ' ',
        precision: 2,
        masked: false,
      },
    };
  },
  components: {
    ValidationProvider,
  },
  methods: {
    withDraw(event:any) {
      event.preventDefault();
      subtTransaction(this.withdrawprice).then((res) => {
        if (res.status === 201) {
          this.$notify({
            group: 'auth',
            type: 'success',
            title: 'Atenção',
            text: 'Saque efetuado com sucesso!',
          });
          this.$router.replace('/home');
        }
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
