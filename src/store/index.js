import Vue from "vue";
import Vuex from "vuex";
//import * as fs from "fs";

Vue.use(Vuex);

import itemsData from "@/database/Usser.json";

export default new Vuex.Store({
  state: {
    items: itemsData.items,
    loggedUser: { name: "User1" }
  },
  //////////
  actions: {
    addItem({ commit }, item) {
      /* var fs = require("fs");
      fs.writeFile(itemsData, JSON.stringify(item), function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("JSON saved");
        }
      });*/
      // actions previous to mutations
      commit("mutateItemList", item);
      // only permit one param
    }
  },
  mutations: {
    // mutateStudentList(state, param) {
    mutateItemList(state, item) {
      state.items.push(item);
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
