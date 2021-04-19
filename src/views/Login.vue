<template>

  <div class="login" >
    <form>
      <div class="col-12 d-flex justify-content-center align-items-center flex-column" >
        <h2 class="m-5" >Entrar</h2>
        <ValidationProvider class="validator" name="email"
        rules="required|email">
          <div slot-scope="{ errors }" class="mb-3 col-md-3 col-lg-3 col-12">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email"
            placeholder="Digite seu email" >
            <p class="error" >{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider class="validator" name="password" rules="required">
          <div slot-scope="{ errors }" class="mb-3 col-md-3 col-lg-3 col-12">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password"
            placeholder="Digite sua senha" >
            <p class="error" >{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <p class="text-center m-4">
          Você não tem conta?<br>
          <span>
            <router-link to="/register">Crie uma conta agora</router-link>
          </span>
        </p>
        <button type="button" v-on:click="login" class="btn btn-primary tx">Entrar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" >
import Vue from 'vue';
import { extend, ValidationProvider } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import User from '@/models/user.interface';
import authLogin from '@/services/auth.service';

extend('required', {
  ...required,
  message: 'Esse campo é obrigatório.',
});

extend('email', {
  ...email,
  message: 'O email não é válido.',
});

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      email: '' as string,
      password: '' as string,
    };
  },
  components: {
    ValidationProvider,
  },
  methods: {
    login(event:any):void {
      event.preventDefault();
      const data = { email: this.email, password: this.password };
      authLogin(data).then((user:User|any) => {
        this.$store.dispatch('auth/saveUser', user);
        this.$router.replace('home');
      }).catch((error) => {
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
