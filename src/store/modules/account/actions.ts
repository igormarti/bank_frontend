const actions = {
  setAccount({ commit, state }:any, account:any) {
    commit('saveAccount', account);
  },
  modifyBalance({ commit, state }:any, value:number) {
    if (value < 0) {
      commit('subBalance', value);
    } else {
      commit('addBalance', value);
    }
  },
};

export default actions;
