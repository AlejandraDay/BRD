// CHAI
import { assert, expect } from "chai";
// VUE TEST UTILS
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
// components
import ModifyDeleteItemView from "@/views/ModifyDeleteItemView.vue";
import RegisterIncomeExpenseView from "@/views/RegisterIncomeExpenseView.vue";
// mock data
import { mockStore } from "./mockStore";
/* Recommended for actions/mutations */
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
