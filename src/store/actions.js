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

  // 登录以及注册
  async SIGN_IN({commit}, payload) {
    let data = JSON.stringify(payload.data)
    let result = await ajax.post(`${baseURL}/user/signin`, data);
    console.log('signin', result);
    if(result.code == 1) {
      commit('SET_TOKEN', {token: result.data.token});
      commit('SET_ID', {id: result.data.id});
      return true;
    }
    return false;
  },

  async SIGN_UP({commit}, payload) {
    let data = JSON.stringify(payload.data);
    let result = await ajax.post(`${baseURL}/user/signup`, data);
    return result;
  },

  // 对个人进行增删改查
  async UPDATE_USER_INFO({commit, state}, payload) {
    let data = payload.data;
    data.id = state.id;
    data = JSON.stringify(data);
    let result = await ajax.put(`${baseURL}/userInfo/${state.id}`, data);
    return result;
  },

  async GET_CAREER_INFO({commit, state}, payload) {
    let result = await ajax.get(`${baseURL}/careerInfo/${state.id}`);
    commit('SET_CAREER', {data: result.data});
    return result;
  },

  async UPDATE_CAREER_INFO({commit, state}, payload) {
    let data = JSON.stringify(payload.data);
    let result = await ajax.put(`${baseURL}/careerInfo`, data);
    return result;
  },

  async ADD_CAREER_INFO({commit, state}, payload) {
    payload.data.userId = state.id;
    let data = JSON.stringify(payload.data);
    let result = await ajax.post(`${baseURL}/careerInfo`, data);
    return result;
  },

  async DELETE_CAREER_INFO({commit, state}, payload) {
    let data = payload;
    data = JSON.stringify(data);
    let result = await ajax.delete(`${baseURL}/careerInfo/${payload.id}`, data);
    return result;
  }
};

export default actions;