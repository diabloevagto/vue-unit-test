import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    count: 0,
    testmessage: 'a',
  },
  mutations: {
    increment(state, { input }) {
      state.count += parseInt(input, 10);
    },
    decrement(state, { input }) {
      state.count -= parseInt(input, 10);
    },
    updateMessage(state, input) {
      state.testmessage = input;
    },
  },
  getters: {
    getMore: ({ count }) => (val, b) => (count * val) - b,
  },
  actions: {
    increment(context, payload) {
      console.log(context);
      console.log('increment action');
      setTimeout(() => {
        console.log('do');
        context.commit('increment', payload);
      }, 1000);
    },
    decrement({ commit }, payload) {
      console.log('decrement action');
      setTimeout(() => {
        console.log('do');
        commit('decrement', payload);
      }, 1000);
    },
    updateMessage({ commit }, payload) {
      commit('updateMessage', payload);
    },
  },
});

export default store;
