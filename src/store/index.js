import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    USERS:[
      {ci: 0, name: 'admin', email: 'admin@default.com',pwd:'admin'}
    ],
    CATEGORIES: [
      {id: 'I0', name: 'others', user: 0},
      {id: 'E0', name: 'others', user: 0}
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
