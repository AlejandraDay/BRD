import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    USERS: [
      { ci: 0, name: "general", email: "general@example.com", pwd: "admin" }
    ],
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
    CURRENT_ACCOUNT: -1,
    CATEGORIES: [
      { id: "I0", name: "other incomes", user: 0 },
      { id: "E0", name: "other expenses", user: 0 }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
