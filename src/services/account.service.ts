import api from '@/config/api.config';
import User from '@/models/user.interface';
import { getTokenAuth, getUserAuthenticate } from './auth.service';

const getAccount = async ():Promise<User> => {
  const userAuthenticated = getUserAuthenticate();
  const user = await api.get(`/user/${userAuthenticated.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getTokenAuth()}`,
    },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user.data.user;
};

export default getAccount;
