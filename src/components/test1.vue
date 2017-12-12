<template>
  <div>
    <div id="home">
      <h1>{{ msg }}</h1>
      <h2>count: {{ count }}, getMore(10): {{getMore(10)}}</h2>
      <h3>testMessage: {{testMessage}}</h3>
    </div>
    <div id="mod-area">
      <ul>
        <li>
          <button @click="increment(1)">increment count</button>
        </li>
        <li>
          <button @click="decrement(1)">decrement count</button>
        </li>
        <li>
          <input type="text" v-model="message">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  data: () => ({
    msg: 'Welcome to home',
  }),
  computed: {
    ...mapState(['count', 'testMessage']),
    ...mapGetters(['getMore']),
    message: {
      get() {
        return this.testMessage;
      },
      set(val) {
        this.updateMessage(val);
      },
    },
  },
  methods: {
    ...mapActions(['increment', 'decrement', 'updateMessage']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #home {
    background-color: red;
  }
  #mod-area {
    * {
      font-size: 30px;
      margin: 5px;
    }

    li {
      list-style-type: none;
    }
  }
</style>
