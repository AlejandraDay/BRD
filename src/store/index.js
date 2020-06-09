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
      //var obj = itemsData;
      //JSON.stringify(obj.push(item));
    }
  },
  mutations: {
    // mutateStudentList(state, param) {
    mutateItemList(state, item) {
      /*var found = this.items.filter(it => it.name === item.name);
      if (found === null) {
        state.items.push(item);
      } else {*/
      state.items.push(item);
      //}
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
