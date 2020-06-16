import { assert, expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import ModifyDeleteItemView from "@/views/ModifyDeleteItemView.vue";
import RegisterIncomeExpenseView from "@/views/RegisterIncomeExpenseView.vue";
import { mockStore } from "./mockStore";
import store from "@/store";

import VueRouter from "vue-router";
import Vuex from "vuex";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
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
  /*it("it should 8 items", () => {
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
  });*/
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
  it("change in item when save an update", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    const router = new VueRouter({ routes: [] });
    const wrapper = shallowMount(RegisterIncomeExpenseView, {
      router,
      store,
      localVue
    });
    const wrapper1 = shallowMount(ModifyDeleteItemView, {
      router,
      store,
      localVue
    });
    wrapper.setData({
      name: "example",
      category: "expense",
      amount: 500,
      type: "income",
      date: "2000-12-3"
    });
    wrapper.vm.registerItem();
    assert.equal(wrapper1.vm.$store.state.TRANSACTIONS[20].amount, 500);
    wrapper1.setData({
      name: "example",
      category: 0,
      amount: 600,
      type: "income",
      selectedItem: "example",
      date: { year: 2000, month: 12, date: 3 }
    });
    wrapper1.vm.ModifyItem();
    assert.equal(wrapper1.vm.$store.state.TRANSACTIONS[20].amount, 600);
  });
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
      localVue,
      store
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
      localVue,
      store
    });
    const alarmMessage = wrapper.find(".alarmAmount");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
    wrapper.setData({ amount: "123" });
    assert.isFalse(wrapper.isEmpty());
  });
  it("calls store register action", () => {
    const wrapper = shallowMount(RegisterIncomeExpenseView, {
      localVue,
      store
    });
    wrapper.find(".button.save");
    assert.isTrue(wrapper.exists());
  });
  it("increment when save an item", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    const router = new VueRouter({ routes: [] });
    const wrapper = shallowMount(RegisterIncomeExpenseView, {
      router,
      store,
      localVue
    });
    assert.equal(wrapper.vm.$store.state.TRANSACTIONS.length, 20);
    wrapper.setData({
      name: "name 1",
      category: "expense",
      amount: 600,
      type: "income",
      date: "2000-12-3"
    });
    wrapper.vm.registerItem();
    assert.equal(wrapper.vm.$store.state.TRANSACTIONS.length, 21);
  });
});
describe("Example LocalVue", () => {
  it("using the store directly", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    const router = new VueRouter({ routes: [] });

    const wrapper = shallowMount(ModifyDeleteItemView, {
      router,
      store,
      localVue
    });
    assert.equal(wrapper.vm.$store.state.TRANSACTIONS.length, 20);
  });
});
