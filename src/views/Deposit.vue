<template>
   <div class="container" >
    <div class="card">
      <div class="card-header">
        Depósito
      </div>
      <div class="card-body p-3">
        <form>
          <div class="col-12 d-flex justify-content-center align-items-center flex-column" >
            <ValidationProvider class="validator" name="price" rules="required|min_length:1" >
              <div slot-scope="{ errors }" class="mb-3 col-md-3 col-lg-3 col-12 mb-5">
                <label for="money" class="form-label">Digite quanto deseja depósitar</label>
                <money v-model="price" v-bind="money" name="price" ></money>
                <p class="error" >{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
            <button class="btn btn-primary" type="button"
            v-on:click="withDraw" >
              Guardar Dinheiro
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import Vue from 'vue';
import { extend, ValidationProvider } from 'vee-validate';
import { required, min_value as minValue } from 'vee-validate/dist/rules';
import { addTransaction } from '@/services/transaction.service';

extend('required', {
  ...required,
  message: 'Esse campo é obrigatório.',
});

extend('min_length', {
  ...minValue,
  message: 'O valor minímo para depositar é R$ 1,00.',
});

type NewType=any;

export default Vue.extend({
  data() {
    return {
      price: 1.00 as number,
      money: {
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
    withDraw(event:NewType) {
      event.preventDefault();
      addTransaction(this.price).then((res):any => {
        if (res.status === 201) {
          this.$notify({
            group: 'auth',
            type: 'success',
            title: 'Atenção',
            text: 'Depósito efetuado com sucesso!',
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
