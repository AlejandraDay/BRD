import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ACCOUNTS: [
      { ci: 0, name: "general", email: "general@example.com", pwd: "admin" },
      {
        ci: 7815499,
        name: "Alejandra Quelali",
        email: "aleq@gmail.com",
        phone: "79845264",
        pwd: "13234day"
      }
    ],
    CURRENT_USER: -1,
    VIEW_ACCOUNT: false,
    HEADERS: [["Index", "ID", "Category", "Amount", "Description"]],
    TRANSACTIONS: [
      {
        user: 0,
        id: 101,
        category: "I0",
        amount: 500,
        description: "description 1"
      },
      {
        user: 0,
        id: 111,
        category: "E0",
        amount: -50,
        description: "description 2"
      },
      {
        user: 0,
        id: 112,
        category: "E0",
        amount: -50,
        description: "description 3"
      },
      {
        user: 0,
        id: 113,
        category: "E0",
        amount: -50,
        description: "description 4"
      },
      {
        user: 0,
        id: 114,
        category: "E0",
        amount: -50,
        description: "description 5"
      },
      {
        user: 0,
        id: 115,
        category: "E0",
        amount: -50,
        description: "description 6"
      },
      {
        user: 0,
        id: 116,
        category: "E0",
        amount: -50,
        description: "description 7"
      },
      {
        user: 0,
        id: 117,
        category: "E0",
        amount: -50,
        description: "description 8"
      },
      {
        user: 0,
        id: 118,
        category: "E0",
        amount: -50,
        description: "description 9"
      },
      {
        user: 0,
        id: 102,
        category: "I0",
        amount: 80,
        description: "description 10"
      },
      {
        user: 0,
        id: 103,
        category: "I0",
        amount: 8,
        description: "description 11"
      },
      {
        user: 0,
        id: 104,
        category: "I0",
        amount: 66,
        description: "description 12"
      }
    ],
    CATEGORIES: [
      { id: "I0", name: "other incomes", user: 0 },
      { id: "E0", name: "other expenses", user: 0 }
    ]
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
    mutateItemList(state, item) {
      state.ACCOUNTS.push(item);
    },
    updateAccount(state, accountToUpdate) {
      let foundAccountIndex = state.ACCOUNTS.findIndex(
        account => account.ci == accountToUpdate.ci
      );
      console.log(accountToUpdate);
      state.ACCOUNTS[foundAccountIndex] = accountToUpdate;
      console.log(state.ACCOUNTS[foundAccountIndex]);
    },
    accountCurrent(state, account) {
      state.CURRENT_USER = account;
    },
    profileView(state, value) {
      state.VIEW_ACCOUNT = value;
    },
    deleteAccount(state, idToDelete) {
      let indexToDelete = state.ACCOUNTS.indexOf(
        user => user.ci === idToDelete
      );
      state.ACCOUNTS.splice(indexToDelete, 1);
      console.log(state.ACCOUNTS);
    }
  },
  ///////////
  getters: {
    getAccount(state) {
      let account = state.ACCOUNTS.filter(
        account => account.ci === state.CURRENT_USER
      );
      return account[0];
    },
    idAccount(state) {
      return state.CURRENT_USER;
    },
    getProfileView(state) {
      return state.VIEW_ACCOUNT;
    }
  },
  modules: {}
});
