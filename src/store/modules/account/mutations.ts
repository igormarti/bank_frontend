const mutations = {
  saveAccount(state:any, account:any) {
    state.item = account;
  },
  addBalance(state:any, value:number) {
    state.item.balance = parseFloat(state.item.balance) + value;
  },
  subBalance(state:any, value:number) {
    state.item.balance = parseFloat(state.item.balance) - value;
  },
};

export default mutations;
