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
    viewAccount: false
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
      commit("updateAccount", accountToUpdate);
    },
    deleteAccount({ commit }, idToDelete) {
      commit("deleteAccount", idToDelete);
    }
  },
  mutations: {
    // mutateStudentList(state, param) {
    mutateItemList(state, item) {
      state.accounts.push(item);
    },
    updateAccount(state, accountToUpdate) {
      let foundAccountIndex = state.accounts.findIndex(
        account => account.ci == accountToUpdate.ci
      );
      console.log(accountToUpdate);
      state.accounts[foundAccountIndex] = accountToUpdate;
      console.log(state.accounts[foundAccountIndex]);
    },
    accountCurrent(state, account) {
      state.usserCurrent = account;
    },
    profileView(state, value) {
      state.viewAccount = value;
    },
    deleteAccount(state, idToDelete) {
      let indexToDelete = state.accounts.indexOf(
        user => user.ci === idToDelete
      );
      //delete state.accounts[aux];
      state.accounts.splice(indexToDelete, 1);
      console.log(state.accounts);
    }
  },
  ///////////
  getters: {
    getAccount(state) {
      let account = state.accounts.filter(
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
