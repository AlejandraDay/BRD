import { assert } from "chai";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";

import CategoryTable from "@/components/CategoryTable.vue";
import CategoryReg from "@/components/CategoryReg.vue";
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

  it("Name field can't be empty while adding", () => {
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(CategoryReg, {
      store,
      router,
      localVue
    });
    assert.isTrue(wrapper.exists());
    wrapper.setData({ name: "", incomeBox: true, expenseBox: true });

    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before adding: " + categoriesLength);
    wrapper.vm.newCategory();
    const categoriesLengthAdded = wrapper.vm.categories.length;
    console.log("Length after adding: " + categoriesLengthAdded);
    assert.equal(categoriesLengthAdded, categoriesLength);
  });
  it("Category type can't be both checked false while adding", () => {
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(CategoryReg, {
      store,
      router,
      localVue
    });
    assert.isTrue(wrapper.exists());
    wrapper.setData({ name: "Testing", incomeBox: false, expenseBox: false });

    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before adding: " + categoriesLength);
    wrapper.vm.newCategory();
    const categoriesLengthAdded = wrapper.vm.categories.length;
    console.log("Length after adding: " + categoriesLengthAdded);
    assert.equal(categoriesLengthAdded, categoriesLength);
  });
  it("Category can't be deleted if it has transactions", () => {
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(CategoryTable, {
      store,
      router,
      localVue
    });
    assert.isTrue(wrapper.exists());
    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before deleting: " + categoriesLength);
    const categoryItem = wrapper.vm.categories[0];
    wrapper.vm.deleteCat(categoryItem);
    const categoriesLengthDeleted = wrapper.vm.categories.length;
    console.log("Length after deleting: " + categoriesLengthDeleted);
    assert.equal(categoriesLengthDeleted, categoriesLength);
  });
  it("Category can be deleted if it doesnt has transactions", () => {
    global.confirm = function() {
      return true;
    };
    const wrapper = mount(CategoryTable, {
      store,
      router,
      localVue
    });
    const wrapperR = mount(CategoryReg, {
      store,
      router,
      localVue
    });
    assert.isTrue(wrapper.exists());
    assert.isTrue(wrapperR.exists());
    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before everything: " + categoriesLength);
    wrapperR.setData({ name: "Deletion", incomeBox: false, expenseBox: true });
    wrapperR.vm.newCategory();

    const categoryItem =
      wrapper.vm.categories[wrapper.vm.categories.length - 1];
    console.log(
      "This category is " + categoryItem.id + " | " + categoryItem.name
    );
    const categoriesLengthAdded = wrapper.vm.categories.length;
    console.log("Length after adding: " + categoriesLengthAdded);
    wrapper.vm.deleteCat(categoryItem);
    const categoriesLengthDeleted = wrapper.vm.categories.length;
    console.log("Length after deleting: " + categoriesLengthDeleted);
    assert.equal(categoriesLengthDeleted, categoriesLengthAdded - 1);
  });
  it("Category can be edited if it doesnt has transactions", () => {
    global.prompt = function() {
      return "Changed";
    };
    global.confirm = function() {
      return true;
    };
    const wrapper = mount(CategoryTable, {
      store,
      router,
      localVue
    });
    const wrapperR = mount(CategoryReg, {
      store,
      router,
      localVue
    });
    assert.isTrue(wrapper.exists());
    assert.isTrue(wrapperR.exists());
    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before everything: " + categoriesLength);
    wrapperR.setData({
      name: "Change This",
      incomeBox: false,
      expenseBox: true
    });
    wrapperR.vm.newCategory();

    var categoryItem = wrapper.vm.categories[wrapper.vm.categories.length - 1];
    console.log(
      "This category is " + categoryItem.id + " | " + categoryItem.name
    );
    wrapper.vm.editCat(categoryItem);
    console.log(
      "This category edited is " + categoryItem.id + " | " + categoryItem.name
    );
    assert.equal("Changed", categoryItem.name);
  });
  it("Category can be edited if it doesnt has transactions (but rejects the edit)", () => {
    global.prompt = function() {
      return "Changed";
    };
    global.confirm = function() {
      return false;
    };
    const wrapper = mount(CategoryTable, {
      store,
      router,
      localVue
    });
    const wrapperR = mount(CategoryReg, {
      store,
      router,
      localVue
    });
    assert.isTrue(wrapper.exists());
    assert.isTrue(wrapperR.exists());
    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before everything: " + categoriesLength);
    wrapperR.setData({
      name: "Change This",
      incomeBox: false,
      expenseBox: true
    });
    wrapperR.vm.newCategory();

    var categoryItem = wrapper.vm.categories[wrapper.vm.categories.length - 1];
    console.log(
      "This category is " + categoryItem.id + " | " + categoryItem.name
    );
    wrapper.vm.editCat(categoryItem);
    console.log(
      "This category edited is " + categoryItem.id + " | " + categoryItem.name
    );
    assert.equal("Change This", categoryItem.name);
  });
  it("Category cant be edited if its input is null or empty ", () => {
    global.prompt = function() {
      return "";
    };
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(CategoryTable, {
      store,
      router,
      localVue
    });
    const wrapperR = mount(CategoryReg, {
      store,
      router,
      localVue
    });
    assert.isTrue(wrapper.exists());
    assert.isTrue(wrapperR.exists());
    const categoriesLength = wrapper.vm.categories.length;
    console.log("Length before everything: " + categoriesLength);
    wrapperR.setData({
      name: "Change This",
      incomeBox: false,
      expenseBox: true
    });
    wrapperR.vm.newCategory();

    var categoryItem = wrapper.vm.categories[wrapper.vm.categories.length - 1];
    console.log(
      "This category is " + categoryItem.id + " | " + categoryItem.name
    );
    wrapper.vm.editCat(categoryItem);
    console.log(
      "This category edited is " + categoryItem.id + " | " + categoryItem.name
    );
    assert.equal("Change This", categoryItem.name);
  });
});
