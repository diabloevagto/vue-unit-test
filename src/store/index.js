import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    count: 0,
    testMessage: 'a',
  },
  mutations: {
    increment(state, { input }) {
      state.count += parseInt(input, 10);
    },
    decrement(state, { input }) {
      state.count -= parseInt(input, 10);
    },
    updateMessage(state, input) {
      state.testMessage = input;
    },
  },
  getters: {
    getMore: ({ count }) => (val, b) => (count * val) - b,
  },
  actions: {
    increment(context, payload) {
      context.commit('increment', payload);
    },
    decrement({ commit }, payload) {
      commit('decrement', payload);
    },
    updateMessage({ commit }, payload) {
      commit('updateMessage', payload);
    },
  },
});

export default store;
