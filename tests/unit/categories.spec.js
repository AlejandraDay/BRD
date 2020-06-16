import { assert } from "chai";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";

import CategoryTable from "@/components/CategoryTable.vue";
import CategoryReg from "@/components/CategoryReg.vue";
//import store from "@/store";
import { mockStore } from "./mockStore";
import VueRouter from "vue-router";
import Vuex from "vuex";

describe("Category", () => {
  let localVue;
  let router;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    router = new VueRouter({ routes: [] });
    store = new Vuex.Store(mockStore);
  });

  it("Table title should be rendered", () => {
    const expectedTitle = "Categories Table";
    const wrapper = shallowMount(CategoryTable, { store, localVue });
    const titleInComponent = wrapper.find("#categoryTable-title");
    assert.equal(titleInComponent.text(), expectedTitle);
  });
  it("Register title should be rendered", () => {
    const expectedTitle = "Register a Category";
    const wrapper = shallowMount(CategoryReg, { store, localVue });
    const titleInComponent = wrapper.find("#categoryRegister-title");
    assert.equal(titleInComponent.text(), expectedTitle);
  });
  it("Table filter should start with All", () => {
    const expectedFilter = "All";
    const wrapper = shallowMount(CategoryTable, { store, localVue });
    const filterInComponent = wrapper.vm.$data.filter;
    assert.equal(filterInComponent, expectedFilter);
  });
  it("Display Categories on table, must contain 4 rows [0..4]", () => {
    const wrapper = shallowMount(CategoryTable, { store, localVue });
    const tableContent = wrapper.findAll(".index");
    assert.equal(tableContent.length, 4);
  });
  it("Last id on Categories should be 3", () => {
    const wrapper = mount(CategoryReg, { store, localVue, router });
    assert.equal(wrapper.vm.lastId(), 3);
  });
  it("Searchbar should reduce the number of categories on list", () => {
    const wrapper = shallowMount(CategoryTable, { store, localVue });
    const tableContent = wrapper.vm.filtered.length;
    wrapper.setData({ searchName: "ther" });
    const tableContentSearch = wrapper.vm.filtered.length;
    assert.isTrue(tableContentSearch < tableContent);
  });
  it("Filter Incomes should reduce the number of categories on list", () => {
    const wrapper = shallowMount(CategoryTable, { store, localVue });
    const tableContent = wrapper.vm.filtered.length;
    wrapper.setData({ filter: "Incomes" });
    const tableContentSearch = wrapper.vm.filtered.length;
    assert.isTrue(tableContentSearch < tableContent);
  });
  it("Filter Expenses should reduce the number of categories on list", () => {
    const wrapper = shallowMount(CategoryTable, { store, localVue });
    const tableContent = wrapper.vm.filtered.length;
    wrapper.setData({ filter: "Expenses" });
    const tableContentSearch = wrapper.vm.filtered.length;
    assert.isTrue(tableContentSearch < tableContent);
  });
  it("Adding a new Category should increase the list in 1 (case Income)", () => {
    const wrapper = mount(CategoryReg, {
      store,
      localVue
    });
    assert.isTrue(wrapper.exists());
    wrapper.setData({ name: "Test", incomeBox: true, expenseBox: false });

    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before adding: " + categoriesLength);
    wrapper.vm.newCategory();
    const categoriesLengthAdded = wrapper.vm.categories.length;
    console.log("Length after adding: " + categoriesLengthAdded);
    assert.equal(categoriesLengthAdded, categoriesLength + 1);
  });
  it("Adding a new Category should increase the list in 1 (case Expense)", () => {
    const wrapper = mount(CategoryReg, {
      store,
      localVue
    });
    assert.isTrue(wrapper.exists());
    wrapper.setData({ name: "Test", incomeBox: false, expenseBox: true });

    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before adding: " + categoriesLength);
    wrapper.vm.newCategory();
    const categoriesLengthAdded = wrapper.vm.categories.length;
    console.log("Length after adding: " + categoriesLengthAdded);
    assert.equal(categoriesLengthAdded, categoriesLength + 1);
  });
  it("Adding a new Category should increase the list in 2 (both cases)", () => {
    const wrapper = mount(CategoryReg, {
      store,
      localVue
    });
    assert.isTrue(wrapper.exists());
    wrapper.setData({ name: "Test", incomeBox: true, expenseBox: true });

    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before adding: " + categoriesLength);
    wrapper.vm.newCategory();
    const categoriesLengthAdded = wrapper.vm.categories.length;
    console.log("Length after adding: " + categoriesLengthAdded);
    assert.equal(categoriesLengthAdded, categoriesLength + 2);
  });

  /*it("Input on register should hide Obligatory Field label", () => {
          const wrapper = mount(CategoryReg, {
              store, localVue, data: {
                  name: "",
                  incomeBox: true,
                  expenseBox: true
              },
          });
          const alarmMessage = wrapper.find("#alarmInput");
          assert.isTrue(wrapper.exists());
          wrapper.setData({ name: "Testing" });
          expect(alarmMessage).to.include("<!---->");
      });*/
});
