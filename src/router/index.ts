import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Deposit from '../views/Deposit.vue';
import WithDraw from '../views/WithDraw.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/depositar',
    name: 'Déposito',
    component: Deposit,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sacar',
    name: 'WithDraw',
    component: WithDraw,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const userString = localStorage.getItem('vuex');
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (userString) {
    console.log('oi');
    const userCurrent = JSON.parse(userString.toString());
    if (requiresAuth && !userCurrent) next('login');
    else if (!requiresAuth && userCurrent) next('home');
    else next();
    return;
  }

  if (requiresAuth) next('login');
  else next();
});

export default router;
