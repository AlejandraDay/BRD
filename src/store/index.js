import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import itemsData from "@/views/IncomeExpense.json";

export default new Vuex.Store({
  state: {
    items: itemsData.items,
    loggedUser: { name: "User1" }
  },
  //////////
  actions: {
    addItem({ commit }, item) {
      // actions previous to mutations
      commit("mutateItemList", item);
      // only permit one param
    }
  },
  mutations: {
    // mutateStudentList(state, param) {
    mutateItemList(state, item) {
      state.items.push(item);
    }
  },
  ///////////
  getters: {
    getItemList(state) {
      return state.items;
    }
  },

  ///////////
  modules: {}
});
