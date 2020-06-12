import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    USERS: [{ ci: 0, name: "admin", email: "admin@default.com", pwd: "admin" }],
    CATEGORIES: [
      { id: "I0", name: "others", user: 0 },
      { id: "E0", name: "others", user: 0 },
      { id: "I1", name: "inmobiliaria", user: 0 },
      { id: "E1", name: "inmobiliaria", user: 0 },
      { id: "I2", name: "electronicos", user: 0 },
      { id: "E2", name: "electronicos", user: 0 },
      { id: "I3", name: "transferencia", user: 0 },
      { id: "E3", name: "transferencia", user: 0 },
      { id: "I4", name: "others", user: 0 },
      { id: "E4", name: "others", user: 0 },
      { id: "I5", name: "others", user: 0 },
      { id: "E5", name: "others", user: 0 },
      { id: "I6", name: "others", user: 0 },
      { id: "E6", name: "others", user: 0 },
      { id: "I7", name: "others", user: 0 },
      { id: "E7", name: "others", user: 0 },
      { id: "I8", name: "others", user: 0 },
      { id: "E8", name: "others", user: 0 },
      { id: "I9", name: "others", user: 0 },
      { id: "E9", name: "others", user: 0 },
      { id: "I10", name: "others", user: 0 },
      { id: "E10", name: "others", user: 0 },
      { id: "I11", name: "others", user: 0 },
      { id: "E11", name: "others", user: 0 },
      { id: "I12", name: "others", user: 0 },
      { id: "E12", name: "others", user: 0 },
      { id: "I13", name: "others", user: 0 },
      { id: "E13", name: "others", user: 0 }
    ],
    HEADERCATEG: [["Index", "ID", "Name", "Created By"]]
  },
  mutations: {},
  actions: {},
  modules: {}
});
