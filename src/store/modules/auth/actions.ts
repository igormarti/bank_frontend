const actions = {
  saveUser({ commit, state }:any, user:any) {
    commit('addUserInSession', user);
  },
  removeUser({ commit, state }:any) {
    commit('removeUserInSession');
  },
};

export default actions;
