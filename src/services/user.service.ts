import api from '@/config/api.config';
import { UserStore } from '@/models/user.interface';
import { AxiosResponse } from 'axios';

const registerUser = async (userAccount:UserStore): Promise<AxiosResponse> => {
  const res = await api.post('/register', userAccount);
  return res;
};

export default registerUser;
