import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import Category from "../database/Categories.json";

export default new Vuex.Store({
  state: {
    USERS: [{ ci: 0, name: "admin", email: "admin@default.com", pwd: "admin" }],
    CATEGORIES: Category.categories,
    HEADERCATEG: [["Index", "ID", "Name", "Created By"]]
  },
  mutations: {
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
  actions: {
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
  getters: {
    getCategoryList(state) {
      return state.CATEGORIES;
    },
    getCategoryTableHeader(state) {
      return state.HEADERCATEG[0];
    }
  },
  modules: {}
});
