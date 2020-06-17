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
  let wrapper;
  let wrapper1;

  before(function() {
    global.alert = function(alertMessage) {
      console.log(alertMessage);
    };
    const originalPush = VueRouter.prototype.push;
    VueRouter.prototype.push = function push(location) {
      return originalPush.call(this, location).catch(err => err);
    };
  });

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    store = new Vuex.Store(mockStore);
  });
  it("React to name input", () => {
    wrapper = shallowMount(ModifyDeleteItemView, {
      store,
      localVue
    });
    const alarmMessage = wrapper.find(".alarmName");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
  });
  it("React to amount input", () => {
    wrapper = shallowMount(ModifyDeleteItemView, {
      store,
      localVue
    });
    const alarmMessage = wrapper.find(".alarmAmount");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
  });
  it("decrease when delete", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    const router = new VueRouter({ routes: [] });
    wrapper1 = shallowMount(RegisterIncomeExpenseView, {
      router,
      store,
      localVue
    });
    wrapper = shallowMount(ModifyDeleteItemView, {
      router,
      store,
      localVue
    });
    assert.equal(wrapper1.vm.$store.state.TRANSACTIONS.length, 20);
    wrapper1.vm.id = 1010;
    wrapper1.vm.name = "example";
    wrapper1.vm.category = "OtherI";
    wrapper1.vm.amount = 600;
    wrapper1.vm.type = "income";
    wrapper1.vm.date = "2000-12-3";
    wrapper1.vm.registerItem();
    assert.equal(wrapper.vm.$store.state.TRANSACTIONS.length, 21);
    wrapper.vm.selectedItem = "example";
    wrapper.vm.Delete();
    assert.equal(wrapper.vm.$store.state.TRANSACTIONS.length, 20);
  });
  it("Update", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    const router = new VueRouter({ routes: [] });
    wrapper = shallowMount(RegisterIncomeExpenseView, {
      router,
      store,
      localVue
    });
    wrapper1 = shallowMount(ModifyDeleteItemView, {
      router,
      store,
      localVue
    });
    assert.equal(wrapper.vm.$store.state.TRANSACTIONS.length, 20);
    wrapper.vm.$store.state.CURRENT_USER = 0;
    wrapper.vm.id = 1010;
    wrapper.vm.name = "example";
    wrapper.vm.category = "OtherI";
    wrapper.vm.amount = 600;
    wrapper.vm.type = "income";
    wrapper.vm.date = "2000-12-3";
    wrapper.vm.registerItem();
    assert.equal(wrapper1.vm.$store.state.TRANSACTIONS[20].name, "example");
    wrapper1.vm.selectedItem = "example";
    wrapper1.vm.category = "OtherI";
    wrapper1.vm.amount = 600;
    wrapper1.vm.type = "income";
    wrapper1.vm.date = "2000-12-3";
    wrapper1.vm.name = "20";
    wrapper1.vm.ModifyItem();
    assert.equal(wrapper1.vm.$store.state.TRANSACTIONS[20].name, "20");
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
      localVue,
      store
    });
    const alarmMessage = wrapper.find(".alarmName");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
  });
  it("React to amount input", () => {
    const wrapper = shallowMount(RegisterIncomeExpenseView, {
      localVue,
      store
    });
    const alarmMessage = wrapper.find(".alarmAmount");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
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
    assert.equal(wrapper.vm.$store.state.TRANSACTIONS.length, 21);
    wrapper.vm.id = 1010;
    wrapper.vm.name = "name 200";
    wrapper.vm.category = "OtherI";
    wrapper.vm.amount = 600;
    wrapper.vm.type = "income";
    wrapper.vm.date = "2000-12-3";
    wrapper.vm.registerItem();
    assert.equal(wrapper.vm.$store.state.TRANSACTIONS.length, 22);
  });
  it("find id category", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    const router = new VueRouter({ routes: [] });
    const wrapper = shallowMount(RegisterIncomeExpenseView, {
      router,
      store,
      localVue
    });
    wrapper.vm.category = "OtherI";
    wrapper.vm.findCategoryId();
    assert.equal(wrapper.vm.category, 0);
  });
});
describe("Example LocalVue", () => {
  it("using the store directly", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    const router = new VueRouter({ routes: [] });

    let wrapper = shallowMount(ModifyDeleteItemView, {
      router,
      store,
      localVue
    });
    assert.equal(wrapper.vm.$store.state.TRANSACTIONS.length, 21);
  });
});
