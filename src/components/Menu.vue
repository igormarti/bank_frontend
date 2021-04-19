<template>
  <div class="menu col-12">
    <div class="row" >
        <router-link to="/sacar" class="item col-md-3 col-md-lg col-12" >
            <wallet-icons fillColor="#007bff" :size="48" />
            <span>Sacar</span>
        </router-link>
        <router-link to="/depositar" class="item col-md-3 col-md-lg col-12" >
            <piggy-icons fillColor="#007bff" :size="48" />
            <span>Depositar</span>
        </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Wallet from 'vue-material-design-icons/Wallet.vue';
import PiggyBank from 'vue-material-design-icons/PiggyBank.vue';
import ViewList from 'vue-material-design-icons/ViewList.vue';

Vue.component('wallet-icons', Wallet);
Vue.component('piggy-icons', PiggyBank);
Vue.component('viewlist-icons', ViewList);

export default Vue.extend({
  name: 'Menu',
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
    display: flex;
    margin: 20px 30px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
}

.item{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    border-radius: 4px;
    flex:1 0 25%;
    border: 2px solid #ccc;
    padding: 60px;
    cursor: pointer;
    margin: 42px;
    text-decoration: none;
}

.item span{
    color: #007bff;
    font-size: 20px;
    font-weight: 600;
}
</style>
