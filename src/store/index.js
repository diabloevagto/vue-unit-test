import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const mutations = {
  increment(state, payload) {
    state.count += parseInt(payload, 10);
  },
  decrement(state, payload) {
    state.count -= parseInt(payload, 10);
  },
  updateMessage(state, input) {
    state.testMessage = input;
  },
  fetchName(state, input) {
    state.githubName = input;
  },
};

export const getters = {
  getMore: ({ count }) => val => (count * val),
};

export const actions = {
  increment(context, payload) {
    context.commit('increment', payload);
  },
  decrement({ commit }, payload) {
    commit('decrement', payload);
  },
  updateMessage({ commit }, payload) {
    commit('updateMessage', payload);
  },
  async fetchName({ commit }, payload) {
    const { data: { login } } = await axios.get(`https://api.github.com/users/${payload}`);
    commit('fetchName', login);
  },
};

const store = new Vuex.Store({
  strict: true,
  state: {
    count: 0,
    testMessage: 'testMessage',
    githubName: 'no fetch',
  },
  mutations,
  getters,
  actions,
});

export default store;
