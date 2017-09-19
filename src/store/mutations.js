import type from './type';

const mutations = {
  [type.SET_LOGGED] (state, payload) {
    state.logged = payload.state;
  }
};

export default mutations;
