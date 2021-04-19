const getters = {
  getUser: (state:any) => state.auth.user,
  getToken: (state:any) => state.auth.access_token,
  getAll: (state:any) => state.auth,
};

export default getters;
