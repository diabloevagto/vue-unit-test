<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul class="navbar-nav">
      <li>
        <router-link target="_self" :to="{ name: 'home' }">home</router-link>
      </li>
      <li>
        <router-link target="_self" :to="{ name: 'test1' }">test1</router-link>
      </li>
    </ul>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss" scoped>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    & > img {
      width: 10%;
    }
  }

  .navbar-nav {
    // float: right;
    list-style: none;
    padding-left: 0;
    & > li {
      display: inline-block;
      & > a {
        text-decoration: none;
        color: #a2a5a7;
        display: block;
        font-size: 20px;
        padding: 8px 25px;
      }
    }
  }

  .router-link-exact-active {
    background-color: yellow;
  }
</style>
