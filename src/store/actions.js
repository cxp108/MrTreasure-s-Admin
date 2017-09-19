import type from './type';
import { ajax } from '@/common';

const baseURL = 'http://resume.mrtreasure.cn/api';

const actions = {
  async GET_RESUME({commit}, payload) {
    let result = await ajax.get(`${baseURL}/resume/${payload.id}`);
    console.log(result);
    commit('SET_USERINFO', {data: result.data.userInfo});
    commit('SET_CAREER', {data: result.data.careerInfo});
    commit('SET_PRO', {data: result.data.proInfo});
  }
};

export default actions;