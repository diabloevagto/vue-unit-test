<template>
  <div id="home">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      msg: 'Welcome to test1',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home {
    background-color: red;
  }
  h1,
  h2 {
    font-weight: normal;
    color: white;
  }
</style>
