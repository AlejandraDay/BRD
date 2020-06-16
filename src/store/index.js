import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ACCOUNTS: [
      {
        ci: 0,
        name: "general",
        email: "general@example.com",
        phone: 0,
        pwd: "admin"
      },
      {
        ci: 2,
        name: "name2",
        email: "name2@example.com",
        phone: 123456789,
        pwd: "example2"
      },
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
    HEADERS: [
      ["Index", "ID", "Name", "Category", "Amount", "Description"],
      ["Index", "ID", "Name", "Created By", "Type"]
    ],
    TRANSACTIONS: [
      {
        user: 0,
        id: 101,
        name: "name 1",
        category: 0,
        amount: 500,
        description: "description 1"
      },
      {
        user: 0,
        id: 111,
        name: "name 2",
        category: 1,
        amount: -50,
        description: "description 2"
      },
      {
        user: 0,
        id: 112,
        name: "name 3",
        category: 1,
        amount: -50,
        description: "description 3"
      },
      {
        user: 0,
        id: 113,
        name: "name 4",
        category: 1,
        amount: -50,
        description: "description 4"
      },
      {
        user: 0,
        id: 114,
        name: "name 5",
        category: 1,
        amount: -50,
        description: "description 5"
      },
      {
        user: 0,
        id: 115,
        name: "name 6",
        category: 1,
        amount: -50,
        description: "description 6"
      },
      {
        user: 0,
        id: 116,
        name: "name 7",
        category: 1,
        amount: -50,
        description: "description 7"
      },
      {
        user: 0,
        id: 117,
        name: "name 8",
        category: 1,
        amount: -50,
        description: "description 8"
      },
      {
        user: 0,
        id: 118,
        name: "name 9",
        category: 1,
        amount: -50,
        description: "description 9"
      },
      {
        user: 0,
        id: 102,
        name: "name 10",
        category: 0,
        amount: 80,
        description: "description 10"
      },
      {
        user: 0,
        id: 103,
        name: "name 11",
        category: 0,
        amount: 8,
        description: "description 11"
      },
      {
        user: 0,
        id: 104,
        name: "name 12",
        category: 0,
        amount: 66,
        description: "description 12"
      },
      {
        user: 0,
        id: 1,
        name: "name13",
        category: 2,
        amount: 132,
        description: "description 13"
      },
      {
        user: 0,
        id: 2,
        name: "name14",
        category: 2,
        amount: 321,
        description: "description 14"
      },
      {
        user: 0,
        id: 3,
        name: "name15",
        category: 3,
        amount: -465,
        description: "description 15"
      },
      {
        user: 0,
        id: 4,
        name: "name16",
        category: 3,
        amount: -5465,
        description: "description 16"
      },
      {
        user: 0,
        id: 5,
        name: "name17",
        category: 0,
        amount: 654,
        description: "description 17"
      },
      {
        user: 0,
        id: 6,
        name: "name18",
        category: 0,
        amount: 465,
        description: "description 18"
      },
      {
        user: 0,
        id: 7,
        name: "name19",
        category: 1,
        amount: -564,
        description: "description 19"
      },
      {
        user: 0,
        id: 8,
        name: "name20",
        category: 1,
        amount: -333,
        description: "description 20"
      }
    ],
    CATEGORIES: [
      //type: true = income; type: false = expense
      { id: 0, name: "Other", user: 0, type: true },
      { id: 1, name: "Other", user: 0, type: false },
      { id: 2, name: "Transfer", user: 0, type: true },
      { id: 3, name: "Transfer", user: 0, type: false }
    ]
  },
  //////////
  actions: {
    addAccount({ commit }, item) {
      commit("mutateAccountList", item);
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
    },
    updateItem({ commit }, itemToUpdate) {
      commit("updateItem", itemToUpdate);
    },
    deleteItem({ commit }, itemToDelete) {
      commit("deleteItem", itemToDelete);
    },
    addItem({ commit }, item) {
      commit("mutateItemList", item);
    },
    addCategory({ commit }, categ) {
      commit("addCategory", categ);
    },
    updateCategory({ commit }, categ) {
      commit("updateCategory", categ);
    },
    deleteCategory({ commit }, categ) {
      commit("deleteCategory", categ);
    }
  },
  mutations: {
    mutateAccountList(state, item) {
      state.ACCOUNTS.push(item);
    },
    updateAccount(state, accountToUpdate) {
      let foundAccountIndex = state.ACCOUNTS.findIndex(
        account => account.ci == accountToUpdate.ci
      );
      state.ACCOUNTS.splice(foundAccountIndex, 1, accountToUpdate);
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
    },
    mutateItemList(state, item) {
      state.TRANSACTIONS.push(item);
    },
    updateItem(state, itemToUpdate) {
      const foundItem = state.TRANSACTIONS.findIndex(
        st => st.id === itemToUpdate.id
      );
      state.TRANSACTIONS[foundItem] = itemToUpdate;
    },
    deleteItem(state, itemToUpdate) {
      state.TRANSACTIONS = state.TRANSACTIONS.filter(
        it => it.id !== itemToUpdate.id
      );
    },
    deleteCategory(state, categDelete) {
      state.CATEGORIES = state.CATEGORIES.filter(
        categ => categ.id !== categDelete.id
      );
    },
    updateCategory(state, updatedCateg) {
      const categoryIndex = state.CATEGORIES.findIndex(
        categ => categ.id === updatedCateg.id
      );
      if (categoryIndex >= 0) {
        state.CATEGORIES[categoryIndex] = updatedCateg;
      }
    },
    addCategory(state, newCateg) {
      state.CATEGORIES.push(newCateg);
    }
  },
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
    },
    getItemList(state) {
      return state.TRANSACTIONS;
    },
    getUser(state) {
      return state.CURRENT_USER;
    },
    getLastItemId(state) {
      return state.items[state.items.length - 1].id;
    },
    getCategoryList(state) {
      return state.CATEGORIES;
    },
    getCategoryTableHeader(state) {
      return state.HEADERS[1];
    }
  },
  modules: {}
});
