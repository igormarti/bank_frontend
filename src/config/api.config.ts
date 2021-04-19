import axios from 'axios';
import Vue from 'vue';
import router from '@/router';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// Add a response interceptor
api.interceptors.response.use((response) => {
  console.log(response);
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, (error) => {
  if (error.response.status === 401) {
    Vue.notify({
      group: 'auth',
      type: 'info',
      title: 'Atenção',
      text: error.response.data.errors instanceof Array ? error.response.data.errors[0]
        : error.response.data.errors,
    });
    localStorage.clear();
    router.replace('/login');
    return false;
  }

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default api;
