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
          <button @click="fetchName('vuejs')">get github name</button>
        </li>
        <li>
          <h1>{{githubName}}</h1>
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
    ...mapState(['count', 'testMessage', 'githubName']),
    ...mapGetters(['getMore']),
  },
  methods: {
    ...mapActions(['fetchName']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #home {
    background-color: black;
  }
  h1,
  h2,
  h3 {
    color: white;
  }

  #mod-area {
    background-color: blue;
    * {
      font-size: 30px;
      margin: 5px;
    }

    li {
      list-style-type: none;
    }
  }
</style>
