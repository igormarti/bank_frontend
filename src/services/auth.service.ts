import api from '@/config/api.config';
import Store from '@/store';
import User from '@/models/user.interface';

export const getTokenAuth = ():string => Store.getters['auth/getToken'];

export const getUserAuthenticate = ():User => Store.getters['auth/getUser'];

const authLogin = async (data:any):Promise<any> => {
  const user = await api.post('/login', data);

  return user.data;
};

export const logToOut = async ():Promise<any> => {
  const user = await api.post('/logout');
  return user.data;
};

export default authLogin;
