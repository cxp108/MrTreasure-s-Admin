import type from './type';
import { ajax } from '@/common';

const actions = {
  async GET_RESUME({commit}, payload) {
    let result = await ajax.get(`${baseURL}/resume/${payload.id}`);
    console.log('resume', result);
    commit('SET_USERINFO', {data: result.data.userInfo});
    commit('SET_CAREER', {data: result.data.careerInfo});
    commit('SET_PRO', {data: result.data.proInfo});
  },

  async SIGN_IN({commit}, payload) {
    let data = JSON.stringify(payload.data)
    let result = await ajax.post(`${baseURL}/user/signin`, data);
    console.log('signin', result);
    if(result.code == 1) {
      commit('SET_TOKEN', {token: result.token});
      return true;
    }
    return false;
  },

  async SIGN_UP({commit}, payload) {
    let data = JSON.stringify(payload.data);
    let result = await ajax.post(`${baseURL}/user/signup`, data);
    return result;
  }
};

export default actions;