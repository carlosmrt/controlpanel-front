import Vue from 'vue';
import App from './App';
import router from './router';
import VueParticles from 'vue-particles'

import 'vuetify/dist/vuetify.min.css';
import 'font-awesome/css/font-awesome.css';
import VueNotification from "@kugatsu/vuenotification";

import Vuetify from 'vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './styles/global.css';
import './index.css';

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.use(VueParticles);
import fullCalendar from 'vue-fullcalendar';
import {setupComponents} from './config/setup-components';

import {setupAndGetI18n} from './config/setup-i18n';

const i18n = setupAndGetI18n(Vue);

import swatches from 'vue-swatches';
import "vue-swatches/dist/vue-swatches.min.css"

Vue.component('full-calendar', fullCalendar);
Vue.component('swatches', swatches);

setupComponents(Vue);

Vue.use(Vuetify);

Vue.use(VueNotification, {
  timer: 20
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {App},
  template: '<App/>',
  data: {
    themeColor: '#1D2939',
  },
  methods: {
    setLanguage(language) {
      const vm = this;

      localStorage.setItem('language', language);

      document.documentElement.lang = language;

      vm.$i18n.locale = language;

      vm.$vuetify.lang.current = language;
    }
  }
})
