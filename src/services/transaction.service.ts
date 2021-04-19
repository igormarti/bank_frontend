import api from '@/config/api.config';
import { getTokenAuth } from './auth.service';

const subtTransaction = async (value:number):Promise<any> => {
  const res = await api.post('/withdraw', { value }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getTokenAuth()}`,
    },
  });

  return res;
};

export const addTransaction = async (value:number):Promise<any> => {
  const res = await api.post('/deposit', { value }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getTokenAuth()}`,
    },
  });

  return res;
};

export default subtTransaction;
