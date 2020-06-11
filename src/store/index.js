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
      //var obj = itemsData;
      //JSON.stringify(obj.push(item));
    },
    updateItem({ commit }, itemToUpdate) {
      commit("updateItem", itemToUpdate);
    },
    deleteItem({ commit }, itemToDelete) {
      commit("deleteItem", itemToDelete);
    }
  },
  mutations: {
    // mutateStudentList(state, param) {
    mutateItemList(state, item) {
      state.items.push(item);
    },
    updateItem(state, itemToUpdate) {
      const foundItem = state.items.findIndex(
        st => st.name === itemToUpdate.name
      );
      state.items[foundItem] = itemToUpdate;
    },
    deleteItem(state, itemToUpdate) {
      state.items = state.items.filter(it => it.name !== itemToUpdate.name);
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
