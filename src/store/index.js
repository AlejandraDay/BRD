import Vue from "vue";
import Vuex from "vuex";
//import * as fs from "fs";

Vue.use(Vuex);

import usser from "@/database/Usser.json";

export default new Vuex.Store({
  state: {
    items: usser.items,
    usserCurrent: { ci: "-1" }
  },
  //////////
  actions: {
    addItem({ commit }, item) {
      commit("mutateItemList", item);
      // only permit one param
    },
    updateAccountUsser({ commit }, account) {
      commit("accountCurrent", account);
    }
  },
  mutations: {
    // mutateStudentList(state, param) {
    mutateItemList(state, item) {
      state.items.push(item);
    },
    accountCurrent(state, account) {
      state.usserCurrent.ci = account;
    },
    updateAccount(state, studentToUpdate) {
      const foundStudentIndex = state.students.findIndex(
        st => st.id === studentToUpdate.id
      );
      // if (index >= 0)
      state.students[foundStudentIndex] = studentToUpdate;
    },
    deleteAccount(state, studetToDelete) {
      state.students = state.items.filter(st => st.id !== studetToDelete.id);
    }
  },
  ///////////
  getters: {
    getItemList(state) {
      return state.items; /*.filter(account => account.ci === filterAccount.ci);*/
    },
    idAccount(state) {
      return state.usserCurrent;
    }
  },

  ///////////
  modules: {}
});
