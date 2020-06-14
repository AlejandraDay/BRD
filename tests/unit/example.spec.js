import { assert } from "chai";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import AccountView from "@/views/Account.vue";
import RegisterAccount from "@/views/RegisterUsser.vue";
import RegisterAccountView from "@/components/Usser.vue";
import CategoryTable from "@/components/CategoryTable.vue";
import CategoryReg from "@/components/CategoryReg.vue";
import ModifyDeleteItemView from "@/views/ModifyDeleteItemView.vue";
import RegisterIncomeExpenseView from "@/views/RegisterIncomeExpenseView.vue";

import VueRouter from "vue-router";
import Vuex from "vuex";
import store from "@/store";
import { mockStore } from "./mockStore";
import { mockCategories } from "./mockCategories.js";

describe("Account.vue", () => {
  let localVue;
  let router;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    router = new VueRouter({ routes: [] });
    store = new Vuex.Store(mockStore);
    // NEXT steps> move this to a util.
    // wrapper = TestUtil.get(.....)
  });
  it("The Account-Actual should be rendered", () => {
    const wrapper = shallowMount(AccountView, {
      router,
      store,
      localVue
    }); // wrapper = { new Vue(), html, find, findAll, etc }
    const account = "Account";
    const titleAccountActual = wrapper.find("#account");

    assert.equal(titleAccountActual.text(), account);
  });
});
describe("RegisterAccount.vue", () => {
  let localVue;
  // let router;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    //router = new VueRouter({ routes: [] });
    store = new Vuex.Store(mockStore);
    // NEXT steps> move this to a util.
    // wrapper = TestUtil.get(.....)
  });
  it("The Register Account should be rendered", () => {
    const wrapper = shallowMount(RegisterAccount, {
      store,
      localVue
    }); // wrapper = { new Vue(), html, find, findAll, etc }
    const titleAccountActual = wrapper.find("#usser");

    assert.equal(titleAccountActual.text(), "Register Account");
  });
  it("All input have obligatory information", () => {
    const wrapper = shallowMount(RegisterAccountView, {
      data: {
        message: "*Obligatory information",
        name: "",
        ci: 0,
        email: "",
        phone: "",
        pwd: "",
        confirmPwd: ""
      },
      store,
      localVue
      //router
    });
    const alarmMessage = wrapper.find(".alarm");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
    wrapper.setData({
      name: "nombre",
      ci: 0,
      email: "email@gmail.com",
      phone: "122212",
      pwd: "12",
      confirmPwd: "12"
    });
    assert.isFalse(wrapper.isEmpty());
  });
});
describe("Modify Delete Income Expense", () => {
  let localVue;
  let store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    store = new Vuex.Store(mockStore);
  });
  it("process valid data", () => {
    const wrapper = shallowMount(ModifyDeleteItemView, {
      store,
      localVue
    });
    wrapper.setProps({
      name: "example",
      category: "other",
      type: "income",
      user: 0,
      id: 1,
      amount: "2222"
    });
    wrapper.vm.ModifyItem();
  });
  it("it should 8 items", () => {
    const expectedLenght = 8 + 1; // + 1 'cause the row of names
    const wrapper = shallowMount(ModifyDeleteItemView, {
      store,
      localVue
    });

    const itemsInTable = wrapper.findAll(".column");

    assert.isTrue(wrapper.exists());
    assert.equal(itemsInTable.length / 4, expectedLenght); // /4 'cause the names, every part of the table's name is column
  });
  it("it should load items to select", () => {
    const wrapper = shallowMount(ModifyDeleteItemView, {
      store,
      localVue
    });
    const expectedName = "name1";
    const itemsInOptions = wrapper.find(".optionsName");
    assert.isTrue(wrapper.exists());
    assert.isFalse(itemsInOptions.contains(expectedName));
  });
  it("it should load categories to select", () => {
    const wrapper = shallowMount(ModifyDeleteItemView, {
      store,
      localVue
    });
    const expectedName = "other";
    const itemsInOptions = wrapper.find(".optionsCategory");
    assert.isTrue(wrapper.exists());
    assert.isFalse(itemsInOptions.contains(expectedName));
  });
  it("React to name input", () => {
    const wrapper = shallowMount(ModifyDeleteItemView, {
      data: { message: "*Obligatory information", name: "" },
      store,
      localVue
    });
    const alarmMessage = wrapper.find(".alarmName");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
    wrapper.setData({ name: "nombre" });
    assert.isFalse(wrapper.isEmpty());
  });
  it("React to amount input", () => {
    const wrapper = shallowMount(ModifyDeleteItemView, {
      data: { message: "*Obligatory information", amount: "" },
      store,
      localVue
    });
    const alarmMessage = wrapper.find(".alarmAmount");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
    wrapper.setData({ amount: "123" });
    assert.isFalse(wrapper.isEmpty());
  });
  //
});
describe("Register Income Expense", () => {
  let localVue;
  let store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    store = new Vuex.Store(mockStore);
  });
  it("React to name input", () => {
    const wrapper = shallowMount(RegisterIncomeExpenseView, {
      data: { message: "*Obligatory information", name: "" },
      store,
      localVue
    });
    const alarmMessage = wrapper.find(".alarmName");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
    wrapper.setData({ name: "nombre" });
    assert.isFalse(wrapper.isEmpty());
  });
  it("React to amount input", () => {
    const wrapper = shallowMount(RegisterIncomeExpenseView, {
      data: { message: "*Obligatory information", amount: "" },
      store,
      localVue
    });
    const alarmMessage = wrapper.find(".alarmAmount");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
    wrapper.setData({ amount: "123" });
    assert.isFalse(wrapper.isEmpty());
  });
  //
});
describe("Example LocalVue", () => {
  it("using the store directly", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    const router = new VueRouter({ routes: [] });

    const wrapper = mount(ModifyDeleteItemView, {
      router,
      store,
      localVue
    });
    // How to test store:
    assert(wrapper.vm.$store.state.items.length, 8);
  });
});

describe("Category", () => {
  let localVue;
  let router;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    router = new VueRouter({ routes: [] });
    store = new Vuex.Store(mockCategories);
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
  it("Next id on categories list should be 4", () => {
    const wrapper = mount(CategoryReg, { store, localVue, router });
    assert(wrapper.vm.lastId, 4);
  });
});
