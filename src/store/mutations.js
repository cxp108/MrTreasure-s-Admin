import type from './type';

const mutations = {
  [type.SET_LOGGED] (state, payload) {
    state.logged = payload.state;
  },
  [type.SET_USERINFO] (state, payload) {
    state.userInfo.careerYear = payload.data.careerYear;
    state.userInfo.diploma = payload.data.diploma;
    state.userInfo.email = payload.data.email;
    state.userInfo.introduction = payload.data.introduction;
    state.userInfo.jobForward = payload.data.jobForward;
    state.userInfo.major = payload.data.major;
    state.userInfo.motto = payload.data.motto;
    state.userInfo.name = payload.data.name;
    state.userInfo.phone = payload.data.phone;
    state.userInfo.skill = payload.data.skill;
    state.userInfo.university = payload.data.university;
  },
  [type.SET_CAREER] (state, payload) {
    state.careerInfo = payload.data;
  },
  [type.SET_PRO] (state, payload) {
    state.proInfo = payload.data;
  },
  [type.SET_TOKEN] (state, payload) {
    state.token = payload.token;
    axios.defaults.headers.common['Token'] = payload.token;
  },
  [type.SET_ID] (state, payload) {
    state.id = payload.id;
  }
};

export default mutations;
