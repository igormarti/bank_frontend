<template>

  <div class="login" >
    <form>
      <div class="col-12 d-flex justify-content-center align-items-center flex-column" >
        <h2 class="m-5" >Cadastro</h2>
        <ValidationProvider class="validator" name="name"
        rules="required">
          <div slot-scope="{ errors }" class="mb-3 col-md-3 col-lg-3 col-12">
            <label for="name" class="form-label">Nome</label>
            <input type="text" class="form-control" id="name" v-model="name"
            placeholder="Digite seu nome" >
            <p class="error" >{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider class="validator" name="email"
        rules="required|email">
          <div slot-scope="{ errors }" class="mb-3 col-md-3 col-lg-3 col-12">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email"
            placeholder="Digite seu email" >
            <p class="error" >{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider class="validator" name="password" rules="required|min:6">
          <div slot-scope="{ errors }" class="mb-3 col-md-3 col-lg-3 col-12">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password"
            placeholder="Digite sua senha" autocomplete="new-password" >
            <p class="error" >{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <p class="text-center m-4">
          <span>
            <router-link to="/login">Fazer login</router-link>
          </span>
        </p>
        <button type="button" v-on:click="login" class="btn btn-primary tx">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" >
import Vue from 'vue';
import { extend, ValidationProvider } from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules';
import registerUser from '@/services/user.service';

extend('required', {
  ...required,
  message: 'Esse campo é obrigatório.',
});

extend('email', {
  ...email,
  message: 'O email não é válido.',
});

extend('min', {
  ...min,
  message: 'É nescessário informar no mínimo 6 caracteres.',
});

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      name: '' as string,
      email: '' as string,
      password: '' as string,
    };
  },
  components: {
    ValidationProvider,
  },
  methods: {
    async login(event:any):Promise<any> {
      event.preventDefault();
      const data = { name: this.name, email: this.email, password: this.password };
      registerUser(data).then((user:any) => {
        this.$notify({
          group: 'auth',
          type: 'success',
          title: 'Atenção',
          text: 'Usuário cadastrado com sucesso, por favor faça o login!',
        });
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
