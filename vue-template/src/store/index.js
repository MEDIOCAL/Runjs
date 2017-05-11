import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from './logger.js'

import isLogin  from './modules/isLogin.js';
import search   from './modules/search.js';
import shenqing from './modules/shenqing.js';
import userInfo from './modules/userInfo.js';

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
  	isLogin,
  	search,
  	shenqing,
  	userInfo
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})