import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home';
import Test1 from '@/components/test1';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/vue-unit-test/',
      name: 'home',
      component: Home,
    },
    {
      path: '/vue-unit-test/test1',
      name: 'test1',
      component: Test1,
    },
  ],
});
