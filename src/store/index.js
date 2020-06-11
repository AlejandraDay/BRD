import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import itemsData from "@/views/IncomeExpense.json";

export default new Vuex.Store({
  state: {
    items: itemsData.items,
    CURRENT_USER: -1
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
      const foundItem = state.items.findIndex(st => st.id === itemToUpdate.id);
      state.items[foundItem] = itemToUpdate;
    },
    deleteItem(state, itemToUpdate) {
      state.items = state.items.filter(it => it.id !== itemToUpdate.id);
    }
  },
  ///////////
  getters: {
    getItemList(state) {
      return state.items;
    },
    getUser(state) {
      return state.CURRENT_USER;
    },
    getLastItemId(state) {
      return state.items[state.items.length - 1].id;
    }
  },

  ///////////
  modules: {}
});
