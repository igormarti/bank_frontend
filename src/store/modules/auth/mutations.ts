const mutations = {
  addUserInSession(state:any, auth:any) {
    console.log(auth);
    console.log(state);
    state.auth = auth;
  },
  removeUserInSession(state:any) {
    state.auth = {};
  },
};

export default mutations;
