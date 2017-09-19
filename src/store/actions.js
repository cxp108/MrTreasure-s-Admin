import type from './type';
import { ajax } from '@/common';


const actions = {
  async GET_RESUME({commit}, payload) {
    let data = await ajax.get(`${baseURL}/resume/${payload.id}`);
    return data;
  }
};

export default actions;