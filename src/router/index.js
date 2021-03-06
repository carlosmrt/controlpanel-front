import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../pages/crypto/Dashboard.vue';
import Login from '../pages/core/Login.vue';
import Error from '../pages/core/Error.vue';
import Register from "../pages/core/Register";
import Profile from "../pages/core/Profile";
import Feedback from "../pages/core/Feedback";
import Alerts from "../pages/crypto/Alerts";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        breadcrumb: [
          {name: 'dashboard'}
        ]
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback,
      meta: {
        breadcrumb: [
          {name: 'feedback'}
        ]
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        breadcrumb: [
          {name: 'profile'}
        ]
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: Alerts,
      meta: {
        breadcrumb: [
          {name: 'Alerts'}
        ]
      }
    },
  ]
});
