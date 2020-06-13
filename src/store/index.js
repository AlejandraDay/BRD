import Vue from "vue";
import Vuex from "vuex";
//import * as fs from "fs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: [
      {
        name: "Alejandra Quelali",
        ci: 7815499,
        email: "aleq@gmail.com",
        phone: "79845264",
        pwd: "13234day"
      }
    ],
    usserCurrent: -1,
    viewAccount: true
  },
  //////////
  actions: {
    addItem({ commit }, item) {
      commit("mutateItemList", item);
      // only permit one param
    },
    updateAccountUsser({ commit }, account) {
      commit("accountCurrent", account);
    },
    profileView({ commit }, value) {
      commit("profileView", value);
    },
    updateAccount({ commit }, accountToUpdate) {
      commit("mutateUpdateAccount", accountToUpdate);
    }
  },
  mutations: {
    // mutateStudentList(state, param) {
    mutateItemList(state, item) {
      state.accounts.push(item);
    },
    mutateUpdateAccount(state, accountToUpdate) {
      const foundAccountIndex = state.accounts.findIndex(
        account => account.ci == accountToUpdate.ci
      );
      state.accounts[foundAccountIndex] = accountToUpdate;
      console.log(state.accounts[foundAccountIndex].name);
    },
    accountCurrent(state, account) {
      state.usserCurrent = account;
    },
    profileView(state, value) {
      state.viewAccount = value;
    }
  },
  ///////////
  getters: {
    getAccount(state) {
      const account = state.accounts.filter(
        account => account.ci === state.usserCurrent
      );
      return account[0];
    },
    idAccount(state) {
      return state.usserCurrent;
    },
    getProfileView(state) {
      return state.viewAccount;
    }
  },
  ///////////
  modules: {}
});
