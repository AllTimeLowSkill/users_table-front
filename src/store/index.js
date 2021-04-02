import Vue from 'vue'
import Vuex from 'vuex'

import Users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Users
  }
})
